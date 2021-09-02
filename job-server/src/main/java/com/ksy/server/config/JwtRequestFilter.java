package com.ksy.server.config;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import lombok.RequiredArgsConstructor;
@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter{

	private final JwtUtil jwtUtil;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
	//intercept everty request -> valid -> access
		
		String tokenWithBearer = request.getHeader("Authorization");
		
		if(tokenWithBearer == null || !tokenWithBearer.startsWith("Bearer")) {
			filterChain.doFilter(request, response);
			return; //검증되지 않음 
		}
		
		String token = tokenWithBearer.substring(7); //token에서 Bearer 빼고
		
		Authentication authentication = jwtUtil.validateToken(token);
		SecurityContextHolder.getContext().setAuthentication(authentication);
		filterChain.doFilter(request, response);
		
	}
	
}
