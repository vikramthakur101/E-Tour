package com.example.aspect;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoggingAspect {

	private static final Logger logger = Logger.getLogger(LoggingAspect.class);
	
	@Before("execution(* com.example.controller.*.*(..))")
	public void logBefore(JoinPoint joinPoint)
	{
		logger.info("Executin method: "+joinPoint.getSignature().getName());
	}
	
	@After("execution(* com.example.controller.*.*(..))")
	public void logAfter(JoinPoint joinPoint)
	{
		logger.info("Finished executing method: "+joinPoint.getSignature().getName());
	}
}
