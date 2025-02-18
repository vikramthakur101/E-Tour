package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
@ComponentScan(basePackages="com.example.*")
@EntityScan(basePackages="com.example.*")
@EnableJpaRepositories(basePackages="com.example.*")
public class ETourApplication {
 
	public static void main(String[] args) {
		SpringApplication.run(ETourApplication.class, args);
	}
	
	@Bean
	public RestTemplate restTemplate() {
	return new RestTemplate();
}

}
