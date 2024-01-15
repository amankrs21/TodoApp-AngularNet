using System.ComponentModel.DataAnnotations;
using backend.Interfaces;
using backend.Models.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController, Authorize, Route("auth")]
public class UserController : ControllerBase
{
    private readonly IUserServices _userServices;

    public UserController(IUserServices userServices)
    {
        _userServices = userServices;
    }
    
    [HttpPost, Route("login")]
    public async Task<IActionResult> Login([Required] LoginRequest request)
    {
        return Ok(await _userServices.Login(request));
    }
    
    [HttpPost, Route("register")]
    public async Task<IActionResult> Register([Required] RegisterRequest request)
    {
        return Ok(await _userServices.Register(request));
    }
}