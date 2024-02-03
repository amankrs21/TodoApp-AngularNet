using System.Text;
using backend.Models;
using backend.Interfaces;
using System.Security.Claims;
using backend.Models.Requests;
using backend.Models.Response;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

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
        if (await _context.Users!.AnyAsync(u => u.Username == request.username))
            throw new Exception("Username is already taken");
        var user = new Users
        {
            Username = request.username,
            Password = BCrypt.Net.BCrypt.HashPassword(request.password),
            Name = request.name,
            IsAdmin = false,
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        _context.Users?.Add(user);
        await _context.SaveChangesAsync();

        return new RegisterResponse
        {
            UserId = user.Id,
            Username = user.Username,
            Name = user.Name,
            IsActive = user.IsActive,
            CreatedAt = user.CreatedAt,
            Message = "User created successfully"
        };
    }

    public Task Logout()
    {
        // Perform any logout-related actions (e.g., revoke tokens, update user status)
        // This method could be extended based on your specific requirements
        return Task.CompletedTask;
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
            expires: DateTime.UtcNow.AddMinutes(30),
            signingCredentials: credentials
        );
    }
}