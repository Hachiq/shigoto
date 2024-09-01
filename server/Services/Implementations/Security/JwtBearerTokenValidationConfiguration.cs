using Core.Options;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace Services.Implementations.Security;

public class JwtBearerTokenValidationConfiguration(
    IOptions<JwtSettings> jwtOptions,
    ILogger<JwtBearerTokenValidationConfiguration> logger) : IConfigureNamedOptions<JwtBearerOptions>
{
    private readonly JwtSettings _jwtSettings = jwtOptions.Value;
    public void Configure(string? name, JwtBearerOptions options)
    {
        try
        {
            Configure(options);
        }
        catch (Exception ex)
        {
            logger.LogError("An error occurred while configuring JWT: {ex}", ex);
            throw;
        }
    }

    public void Configure(JwtBearerOptions options)
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = _jwtSettings.Issuer,
            ValidAudience = _jwtSettings.Audience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Secret))
        };
    }
}
