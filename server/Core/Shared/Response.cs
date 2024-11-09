namespace Core.Shared;

public class Response<T>
{
    public required bool Success { get; set; }
    public T? Payload { get; set; }
    public string? ErrorType { get; set; }
}

public class Response
{
    public required bool Success { get; set; }
    public string? ErrorType { get; set; }
}
