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
	@Bean
	public FilterRegistrationBean<CorsFilter> corsFilter(){
		System.out.println("CORS 필터 등록");
		FilterRegistrationBean<CorsFilter> bean = new FilterRegistrationBean<>(new CorsFilter());
		bean.addUrlPatterns("/*");
		bean.setOrder(0); // 낮은 번호부터 실행됨.
		return bean;
	}
	
	@Bean
	public FilterRegistrationBean<JwtAuthenticationFilter> jwtAuthenticationFilter(){
		System.out.println("JwtAuthenticationFilter 필터 등록");
		FilterRegistrationBean<JwtAuthenticationFilter> bean = 
				new FilterRegistrationBean<>(new JwtAuthenticationFilter(personRepository,passwordEncoder));
		bean.addUrlPatterns("/login");
		bean.setOrder(1); // 낮은 번호부터 실행됨.
		return bean;
	}
	
	@Bean
	public FilterRegistrationBean<JwtAuthorizationFilter> jwtAuthorizationFilter(){
		System.out.println("JwtAuthorizationFilter 필터 등록");
		FilterRegistrationBean<JwtAuthorizationFilter> bean = 
				new FilterRegistrationBean<>(new JwtAuthorizationFilter(personRepository));
		bean.addUrlPatterns("/api/**");
		bean.setOrder(2); // 낮은 번호부터 실행됨.
		return bean;
	}
	
}