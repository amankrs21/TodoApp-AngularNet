using backend.Models.Requests;
using TodoApi.Models.Response;

namespace backend.Interfaces;

public interface IUserServices
{
    Task<LoginResponse> Login(LoginRequest request);
    Task<RegisterResponse> Register(RegisterRequest request);
}