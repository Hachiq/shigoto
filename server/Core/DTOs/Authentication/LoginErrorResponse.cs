namespace Core.DTOs.Authentication;

public class LoginErrorResponse
{
    public required string ErrorType { get; set; }
    public required string Message { get; set; }
}
