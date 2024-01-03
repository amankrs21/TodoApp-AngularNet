using System.ComponentModel.DataAnnotations;
using backend.Interfaces;
using backend.Models.Requests;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController, Route("todo")]
public class TodoController : ControllerBase
{
    private readonly ITodoServices _todoServices;

    public TodoController(ITodoServices todoServices)
    {
        _todoServices = todoServices;
    }

    [HttpGet, Route("all")]
    public async Task<IActionResult> GetAllTodo()
    {
        return Ok(await _todoServices.GetAllTodo());
    }

    [HttpPost, Route("add")]
    public async Task<IActionResult> AddTodo([Required] AddTodoRequest request)
    {
        return Ok(await _todoServices.AddTodo(request));
    }

    [HttpPatch, Route("mark")]
    public async Task<IActionResult> MarkTodo([Required] int id)
    {
        return Ok(await _todoServices.MarkTodo(id));
    }

    [HttpDelete, Route("delete")]
    public async Task<IActionResult> DeleteTodo([Required] int id)
    {
        return Ok(await _todoServices.DeleteTodo(id));
    }
}