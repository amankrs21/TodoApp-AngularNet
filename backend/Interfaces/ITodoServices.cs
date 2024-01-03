using backend.Models.Requests;
using TodoApi.Models.Response;

namespace backend.Interfaces;

public interface ITodoServices
{
    Task<List<GetAllTodoResponse>> GetAllTodo();
    Task<GetTodoResponse> AddTodo(AddTodoRequest request);
    Task<GetTodoResponse> MarkTodo(int id);
    Task<string> DeleteTodo(int id);
}
