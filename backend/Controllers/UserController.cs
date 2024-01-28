using backend.Interfaces;
using backend.Models.Requests;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace backend.Controllers;

[ApiController, Route("auth")]
public class UserController : ControllerBase
{
    private readonly IUserServices _userServices;

    public UserController(IUserServices userServices)
    {
        _userServices = userServices;
    }

    [HttpPost, Route("login")]
    public async Task<IActionResult> Login([Required, FromBody] LoginRequest request)
    {
        return Ok(await _userServices.Login(request));
    }

    [HttpPost, Route("register")]
    public async Task<IActionResult> Register([Required, FromBody] RegisterRequest request)
    {
        return Ok(await _userServices.Register(request));
    }

    [HttpPost, Route("logout")]
    public async Task<IActionResult> Logout()
    {
        await _userServices.Logout();
        return Ok(new { message = "Logout successful" });
    }
}