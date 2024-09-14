using Core.Contracts;
using Core.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Services.Implementations.Security;
using Services.Implementations.Authentication;
using Services.Implementations.Repository;
using Services.Implementations.Password;

namespace Services;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuthentication(configuration);
        services.AddRepository();
        services.AddPasswordService();
        services.AddRefreshTokenGenerator();

        return services;
    }

    private static IServiceCollection AddAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.Section));

        services.AddSingleton<IAccessTokenGenerator, AccessTokenGenerator>();

        services.AddScoped<IAuthService, AuthService>();

        services.ConfigureOptions<JwtBearerTokenValidationConfiguration>()
            .AddAuthentication(defaultScheme: JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer();

        return services;
    }

    private static IServiceCollection AddRepository(this IServiceCollection services)
    {
        services.AddScoped<IRepository, Repository>();
        return services;
    }

    private static IServiceCollection AddPasswordService(this IServiceCollection services)
    {
        services.AddScoped<IPasswordService, PasswordService>();
        return services;
    }

    private static IServiceCollection AddRefreshTokenGenerator(this IServiceCollection services)
    {
        services.AddScoped<IRefreshTokenGenerator, RefreshTokenGenerator>();
        return services;
    }
}
