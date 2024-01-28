using backend.Models.Requests;
using backend.Models.Response;

namespace backend.Interfaces;

public interface IUserServices
{
    Task<LoginResponse> Login(LoginRequest request);
    Task<RegisterResponse> Register(RegisterRequest request);
    Task Logout();
}