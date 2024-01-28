using backend.Models.Requests;
using backend.Models.Response;

namespace backend.Interfaces;

public interface ITodoServices
{
    Task<List<GetAllTodoResponse>> GetAllTodo(int currentUserId);
    Task<GetTodoResponse> AddTodo(AddTodoRequest request, int currentUserId);
    Task<GetTodoResponse> MarkTodo(int id);
    Task<GeneralResponse> DeleteTodo(int id);
}
