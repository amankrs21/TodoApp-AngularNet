using backend.Models.Requests;
using TodoApi.Models.Response;

namespace backend.Interfaces;

public interface ITodoServices
{
    Task<List<GetAllTodoResponse>> GetAllTodo();
    Task<GetTodoResponse> AddTodo(AddTodoRequest request, int currentUserId);
    Task<GetTodoResponse> MarkTodo(int id);
    Task<GeneralResponse> DeleteTodo(int id);
}
