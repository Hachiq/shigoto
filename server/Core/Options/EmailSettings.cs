namespace Core.Options;

public class EmailSettings
{
    public required string SenderEmail { get; set; }
    public required string SenderName { get; set; }
    public required SmtpSettings SmtpSettings { get; set; }
}