namespace Core.Contracts;

public interface IEmailSender
{
    Task SendEmailAsync(string receiver, string subject, string message);
}
