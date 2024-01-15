namespace backend.Models.Requests;

public class RegisterRequest
{
    public string username { get; set; }
    public string password { get; set; }
    public string name { get; set; }
}