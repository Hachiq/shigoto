using Core.Contracts;
using Core.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Services.Implementations.Security;
using Services.Implementations.Authentication;
using Services.Implementations.Repository;
using Services.Implementations.Password;
using Core.Constants;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Services;

public static class DependencyInjection
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuthentication(configuration);
        services.AddEmailSender(configuration);
        services.AddRepository();
        services.AddPasswordService();
        services.AddRefreshTokenGenerator();

        return services;
    }

    private static IServiceCollection AddAuthentication(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
           .AddCookie(options =>
           {
               options.Cookie.SameSite = SameSiteMode.None;
               options.SlidingExpiration = true;
               options.Events.OnRedirectToLogin = (context) =>
               {
                   context.Response.StatusCode = 401;
                   return Task.CompletedTask;
               };
           });

        services.AddScoped<IAuthService, AuthService>();

        return services;
    }

    private static IServiceCollection AddEmailSender(this IServiceCollection services, IConfiguration configuration)
    {
        services.Configure<EmailSettings>(configuration.GetSection(AuthConstants.EmailSettings));

        services.AddTransient<IEmailSender, EmailSender>();

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
