using backend.Interfaces;
using backend.Models;
using backend.Models.Requests;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models.Response;

namespace backend.Services;

public class TodoServices : ITodoServices
{
    private readonly TodoDbContext _context;

    public TodoServices(TodoDbContext context)
    {
        _context = context;
    }

    public async Task<List<GetAllTodoResponse>> GetAllTodo()
    {
        var todos = await _context.Todos.Select(t => new GetAllTodoResponse
        {
            id = t.id,
            title = t.title,
            description = t.description,
            isDone = t.isDone,
            createdAt = t.createdAt
        }).ToListAsync();
        if (todos.Count == 0)
            throw new Exception("No todo found");
        return todos;
    }

    public async Task<GetTodoResponse> AddTodo(AddTodoRequest request)
    {
        var todo = new Todo
        {
            title = request.title,
            description = request.description,
            isDone = false
        };
        _context.Todos.Add(todo);
        await _context.SaveChangesAsync();
        
        return new GetTodoResponse
        {
            id = todo.id,
            title = todo.title,
            description = todo.description,
            isDone = todo.isDone,
            createdAt = todo.createdAt
        };
    }

    public async Task<GetTodoResponse> MarkTodo(int id)
    {
        var todo = await _context.Todos.FirstOrDefaultAsync(t => t.id == id) 
                   ?? throw new Exception("Todo not found");
        todo.isDone = !todo.isDone;
        await _context.SaveChangesAsync();
        return new GetTodoResponse
        {
            id = todo.id,
            title = todo.title,
            description = todo.description,
            isDone = todo.isDone,
            createdAt = todo.createdAt
        };
    }

    public async Task<string> DeleteTodo(int id)
    {
        var todo = await _context.Todos.FirstOrDefaultAsync(t => t.id == id) 
                   ?? throw new Exception("Todo not found");
        _context.Todos.Remove(todo);
        await _context.SaveChangesAsync();
        
        return "Todo Deleted Successfully!!";
    }
}