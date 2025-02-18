namespace E_Tour.Logging
{
      using Microsoft.AspNetCore.Mvc.Filters;
      using Microsoft.Extensions.Logging;

    namespace Etour.Aspects
    {
        public class LoggingFilterAttribute : ActionFilterAttribute
        {
            private readonly ILogger<LoggingFilterAttribute> _logger;

            public LoggingFilterAttribute(ILogger<LoggingFilterAttribute> logger)
            {
                _logger = logger;
            }

            public override void OnActionExecuting(ActionExecutingContext context)
            {
                _logger.LogInformation("Executing method: {Method} in {Controller}",
                    context.ActionDescriptor.DisplayName,
                    context.Controller.GetType().Name);
            }

            public override void OnActionExecuted(ActionExecutedContext context)
            {
                _logger.LogInformation("Finished executing method: {Method} in {Controller}",
                    context.ActionDescriptor.DisplayName,
                    context.Controller.GetType().Name);
            }
        }
    }


}
