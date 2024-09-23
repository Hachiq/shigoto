using Core.Contracts;
using Core.Options;
using Microsoft.Extensions.Options;
using System.Net.Mail;
using System.Net;

namespace Services.Implementations.Authentication;

public class EmailSender(IOptions<EmailSettings> emailOptions) : IEmailSender
{
    private readonly EmailSettings _emailSettings = emailOptions.Value;
    public async Task SendEmailAsync(string receiver, string subject, string message)
    {
        var smtpClient = new SmtpClient(_emailSettings.SmtpSettings.Server)
        {
            Port = _emailSettings.SmtpSettings.Port,
            Credentials = new NetworkCredential(
                    _emailSettings.SmtpSettings.Username,
                    _emailSettings.SmtpSettings.Password),
            EnableSsl = true
        };

        var email = new MailMessage
        {
            From = new MailAddress(
                _emailSettings.SenderEmail,
                _emailSettings.SenderName),
            Subject = subject,
            Body = message,
            IsBodyHtml = true
        };

        email.To.Add(receiver);

        await smtpClient.SendMailAsync(email);
    }
}