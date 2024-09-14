namespace Core.DTOs.Authentication;
public class ConflictResponse
{
    public bool HasConflict = true;
    public required string ConflictReason { get; set; }
    public required string Message { get; set; }
}
