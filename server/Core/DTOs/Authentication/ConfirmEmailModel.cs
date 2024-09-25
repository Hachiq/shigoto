namespace Core.DTOs.Authentication;

public class ConfirmEmailModel
{
    public Guid UserId { get; }
    public Guid EmailConfirmationToken { get; }
}
