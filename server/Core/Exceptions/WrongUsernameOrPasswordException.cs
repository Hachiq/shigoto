namespace Core.Exceptions;

public class WrongUsernameOrPasswordException : Exception
{
    public WrongUsernameOrPasswordException() : base("Wrong username or password") { }
}
