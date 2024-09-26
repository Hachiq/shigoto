namespace Core.DTOs.Authentication;

public class ConfirmEmailModel
{
    public Guid UserId { get; set; }
    public Guid EmailConfirmationToken { get; set; }
}
