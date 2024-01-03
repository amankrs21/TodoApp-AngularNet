namespace TodoApi.Models.Response;

public class GetTodoResponse
{
    public int id { get; set; }
    public string title { get; set; }
    public string description { get; set; }
    public bool isDone { get; set; }
    public DateTime createdAt { get; set; }
}