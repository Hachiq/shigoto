namespace Core.Exceptions;

public class EmailAndUsernameHaveBeenUsedException : Exception
{
    public EmailAndUsernameHaveBeenUsedException() : base("Cannot register due to credentials already taken") { }
}
