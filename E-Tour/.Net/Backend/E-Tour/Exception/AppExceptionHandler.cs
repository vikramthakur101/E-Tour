namespace E_Tour.Exception
{
    using Etour.Exception;
    using Microsoft.AspNetCore.Diagnostics;
    using Microsoft.AspNetCore.Http;
    using System.Text.Json;
    using System.Threading;
    using System.Threading.Tasks;

    namespace Etour
    {
        public class AppExceptionHandler(ILogger<AppExceptionHandler> logger) : IExceptionHandler
        {
            public async ValueTask<bool> TryHandleAsync(
                HttpContext httpContext, System.Exception exception, CancellationToken cancellationToken)
            {
                logger.LogError(exception, exception.Message);
                httpContext.Response.ContentType = "application/json";

                var response = new ErrorResponse
                {
                    Message = exception.Message,
                    Title = "An error occurred"
                };

                if (exception is KeyNotFoundException)
                {
                    httpContext.Response.StatusCode = StatusCodes.Status404NotFound;
                    response.StatusCode = StatusCodes.Status404NotFound;
                }
                else
                {
                    httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
                    response.StatusCode = StatusCodes.Status500InternalServerError;
                }

                var jsonResponse = JsonSerializer.Serialize(response);
                await httpContext.Response.WriteAsync(jsonResponse, cancellationToken);

                return true; // Marks the exception as handled
            }


        }
    }

}
