namespace Core.Exceptions;

public class UsernameHasBeenUsedException : Exception
{
    public UsernameHasBeenUsedException() : base("Cannot register due to username already taken") { }
}
