
using E_Tour.Logging.Etour.Aspects;
using E_Tour.Models;
using E_Tour.Service;
using Etour.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Serilog;
using System.Text;

namespace E_Tour
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<EtourDbContext>(options =>
                options.UseMySql(builder.Configuration.GetConnectionString("DefaultConnection"),
                ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))));

            // Configure Serilog
            Log.Logger = new LoggerConfiguration()
                .WriteTo.Console()  // Logs to console
                .WriteTo.File("Logs/app_log.txt", rollingInterval: RollingInterval.Day) // Logs to a file
                .CreateLogger();

            // Replace default logging with Serilog
            builder.Host.UseSerilog();



            //Dependency Injections

            builder.Services.AddScoped<IHomeService, HomeService>();
            builder.Services.AddScoped<ISubCategoryService, SubCategoryService>();
            builder.Services.AddScoped<IToursService, ToursService>();
            builder.Services.AddScoped<IItenaryService, ItenaryService>();
            builder.Services.AddScoped<IDepartureDatesService, DepartureDatesService>();
            builder.Services.AddScoped<ICustomerService, CustomerService>();
            builder.Services.AddScoped<IBookingServices, BookingSerivce>();
            builder.Services.AddScoped<IPaymentConfirmation, PaymentConfirmationService>();

            builder.Services.AddScoped<LoggingFilterAttribute>();   //For Logging
            builder.Services.AddHttpClient<PaymentConfirmationService>();



            // Add services to the container.
            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddControllers(options =>
            {
                options.Filters.Add<LoggingFilterAttribute>();
            });




            //  Define CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:3000") // Use React frontend URL instead of "*"
                              .AllowAnyHeader()
                              .AllowAnyMethod();
                    });
            });


            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
      .AddJwtBearer(option =>
      {
          option.RequireHttpsMetadata = false;
          option.SaveToken = true;
          option.TokenValidationParameters = new TokenValidationParameters()
          {
              ValidateIssuer = true,
              ValidateAudience = true,
              ValidateLifetime = true,
              ClockSkew = TimeSpan.Zero,
              ValidAudience = builder.Configuration["Jwt:Audience"],
              ValidIssuer = builder.Configuration["Jwt:Issuer"],
              IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
          };
      }
);
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Test01", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme."

                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                 Reference = new OpenApiReference
                    {
                        Type = ReferenceType.SecurityScheme,
                        Id = "Bearer"
                    }
                },
               new string[] {}
          }
    });
            });


            var app = builder.Build();

            app.UseSerilogRequestLogging(); // Logs HTTP requests

            app.UseHttpsRedirection();

            // Enable Swagger
            app.UseSwagger();
            app.UseSwaggerUI();

            app.UseHttpsRedirection();

            app.UseRouting();

            //  Apply CORS Middleware
            app.UseCors("AllowReactApp");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();

        }
    }
}
