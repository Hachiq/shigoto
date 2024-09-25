namespace Core.Exceptions;

public class InvalidEmailConfirmationTokenException : Exception
{
    public InvalidEmailConfirmationTokenException() : base("Email confirmation token is not valid") { }
}
