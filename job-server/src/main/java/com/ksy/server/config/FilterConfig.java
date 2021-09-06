package com.ksy.server.config;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.ksy.server.config.filter.CorsFilter;
import com.ksy.server.config.jwt.JwtAuthenticationFilter;
import com.ksy.server.config.jwt.JwtAuthorizationFilter;
import com.ksy.server.repository.UserRepository;

import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor
@Configuration
public class FilterConfig {

	private final UserRepository personRepository;
	private final BCryptPasswordEncoder passwordEncoder;
	
	//CorFilter
	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilter(){
		
		FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter());
		bean.addUrlPatterns("/*");
		bean.setOrder(0); 
		return bean;
	}
	//login
	@Bean
	public FilterRegistrationBean<JwtAuthenticationFilter> jwtAuthenticationFilter(){
		
		FilterRegistrationBean<JwtAuthenticationFilter> bean = 
				new FilterRegistrationBean<>(new JwtAuthenticationFilter(personRepository,passwordEncoder));
		bean.addUrlPatterns("/login");
		bean.setOrder(1); 
		return bean;
	}
	//권한
	@Bean
	public FilterRegistrationBean<JwtAuthorizationFilter> jwtAuthorizationFilter(){
		
		FilterRegistrationBean<JwtAuthorizationFilter> bean = 
				new FilterRegistrationBean<>(new JwtAuthorizationFilter(personRepository));
		bean.addUrlPatterns("/api/**");
		bean.setOrder(2); 
		return bean;
	}
	
}
