using JikanDotNet;

namespace Web;

public static class DependencyInjection
{
    public static IServiceCollection AddPresentationServices(this IServiceCollection services)
    {
        services.AddControllers();

        services.AddCors();

        services.AddJikan();

        return services;
    }

    private static IServiceCollection AddCors(this IServiceCollection services)
    {
        services.AddCors(options =>
            options.AddPolicy(
                name: "NgOrigins",
                policy =>
                {
                    policy.WithOrigins("http://localhost:4200")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials();
                }
            )
        );

        return services;
    }

    // TODO: Maybe move it to the service layer
    private static IServiceCollection AddJikan(this IServiceCollection services)
    {
        services.AddSingleton<IJikan, Jikan>();
        return services;
    }
}
