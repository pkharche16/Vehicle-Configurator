package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@ComponentScan("com.example.*")
@EntityScan("com.example.*")
@EnableJpaRepositories("com.example.*")
public class VehicleConfiguratorApplication {

	public static void main(String[] args) {
		SpringApplication.run(VehicleConfiguratorApplication.class, args);
	}
	@Bean
	public WebMvcConfigurer configure()
	{
		return new WebMvcConfigurer()
				{
			@Override
			public void addCorsMappings(CorsRegistry reg)
			{
				reg.addMapping("/*").allowedOrigins("*");
			}
				};
	}

}
