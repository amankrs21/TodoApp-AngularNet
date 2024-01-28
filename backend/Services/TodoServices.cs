using backend.Interfaces;
using backend.Models;
using backend.Models.Requests;
using Microsoft.EntityFrameworkCore;
using backend.Models.Response;

namespace backend.Services;

public class TodoServices : ITodoServices
{
    private readonly TodoDbContext _context;

    public TodoServices(TodoDbContext context)
    {
        _context = context;
    }

    public async Task<List<GetAllTodoResponse>> GetAllTodo(int currentUserId)
    {
        var todos = await _context.Todos!.Where(t => t.CreatedBy == currentUserId).ToListAsync();
        return todos.Select(todo => new GetAllTodoResponse
        {
            id = todo.Id,
            title = todo.Title,
            description = todo.Description,
            isDone = todo.IsDone,
            createdAt = todo.CreatedAt
        }).ToList();
    }

    public async Task<GetTodoResponse> AddTodo(AddTodoRequest request, int currentUserId)
    {
        var todo = new Todo
        {
            Title = request.title,
            Description = request.description,
            IsDone = false,
            CreatedBy = currentUserId,
        };
        _context.Todos?.Add(todo);
        await _context.SaveChangesAsync();
        
        return new GetTodoResponse
        {
            id = todo.Id,
            title = todo.Title,
            description = todo.Description,
            isDone = todo.IsDone,
            createdAt = todo.CreatedAt
        };
    }

    public async Task<GetTodoResponse> MarkTodo(int id)
    {
        var todo = await _context.Todos!.FirstOrDefaultAsync(t => t.Id == id ) 
                   ?? throw new Exception("Todo not found");
        todo.IsDone = !todo.IsDone;
        await _context.SaveChangesAsync();
        return new GetTodoResponse
        {
            id = todo.Id,
            title = todo.Title,
            description = todo.Description,
            isDone = todo.IsDone,
            createdAt = todo.CreatedAt
        };
    }

    public async Task<GeneralResponse> DeleteTodo(int id)
    {
        if (_context.Todos == null) throw new Exception("No todo found");
        var todo = await _context.Todos.FirstOrDefaultAsync(t => t.Id == id) 
                   ?? throw new Exception("Todo not found");
        _context.Todos.Remove(todo);
        await _context.SaveChangesAsync();
        
        return new GeneralResponse{message = "Todo Deleted Successfully!!"};
    }
}