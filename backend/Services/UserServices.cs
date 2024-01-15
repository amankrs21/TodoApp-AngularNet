using System.Globalization;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Interfaces;
using backend.Models;
using backend.Models.Requests;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TodoApi.Models.Response;

namespace backend.Services;

public class UserServices : IUserServices
{
    private readonly TodoDbContext _context;
    private readonly JwtSettings _jwtSettings;

    public UserServices(TodoDbContext context, JwtSettings jwtSettings)
    {
        _context = context;
        _jwtSettings = jwtSettings;
    }

    public async Task<LoginResponse> Login(LoginRequest request)
    {
        var user = await _context.Users!.SingleOrDefaultAsync(u => u.Username == request.username)
                   ?? throw new Exception("Username or password is incorrect");
        if (!BCrypt.Net.BCrypt.Verify(request.password, user.Password))
            throw new Exception("Username or password is incorrect");

        if (!user.IsActive) throw new Exception("User is not active");
        
        var token = GenerateJwtToken(user);

        return new LoginResponse
        {
            token = new JwtSecurityTokenHandler().WriteToken(token),
            message = "Login successfully"
        };
    }

    public async Task<RegisterResponse> Register(RegisterRequest request)
    {
        var user = new Users
        {
            Username = request.username,
            Password = BCrypt.Net.BCrypt.HashPassword(request.password),
            Name = request.name,
            IsAdmin = false,
            IsActive = true
        };
        _context.Users?.Add(user);
        await _context.SaveChangesAsync();
        return new RegisterResponse
        {
            UserId = user.Id,
            Username = user.Username,
            Name = user.Name,
            IsActive = user.IsActive,
            CreatedAt = user.CreatedAt
        };
    }

    private JwtSecurityToken GenerateJwtToken(Users user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim("id", user.Id.ToString()),
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        return new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            expires: DateTime.Now.AddMinutes(30),
            signingCredentials: credentials
        );
    }
}