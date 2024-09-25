namespace Core.Exceptions;

public class UserNotFoundException : Exception
{
    public UserNotFoundException() : base("This user cannot be found") { }
}
