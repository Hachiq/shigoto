using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Net;
using System.Text.Json;

namespace Core.ExceptionHandling;

public class ExceptionMiddleware(RequestDelegate next, ILogger<ExceptionMiddleware> logger)
{
    private const string ApplicationJsonType = "application/json";

    private readonly RequestDelegate _next = next;

    private readonly ILogger<ExceptionMiddleware> _logger = logger;

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError("Something went wrong: {ex}", ex);
            await HandleExceptionAsync(context, ex);
        }
    }

    private Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        var handleExceptionModel = new HandleExceptionModel
        {
            Code = HttpStatusCode.InternalServerError,
            Message = "Internal Server Error. Please try again later.",
            Details = exception.Message
        };

        var responseContent = JsonSerializer.Serialize(handleExceptionModel);

        context.Response.ContentType = ApplicationJsonType;
        context.Response.StatusCode = (int)handleExceptionModel.Code;

        return context.Response.WriteAsync(responseContent);
    }
}
