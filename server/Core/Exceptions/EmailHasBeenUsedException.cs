namespace Core.Exceptions;

public class EmailHasBeenUsedException : Exception
{
    public EmailHasBeenUsedException() : base("Cannot register due to email already taken") { }
}
