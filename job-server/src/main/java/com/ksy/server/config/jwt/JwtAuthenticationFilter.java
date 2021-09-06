package com.ksy.server.config.jwt;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ksy.server.domain.User;
import com.ksy.server.dto.AuthenticationRequest;
import com.ksy.server.repository.UserRepository;

import lombok.RequiredArgsConstructor;


public class JwtAuthenticationFilter implements Filter{

	private UserRepository personRepository;
	
	
	private  BCryptPasswordEncoder passwordEncoder;
	
	public JwtAuthenticationFilter(UserRepository personRepository , BCryptPasswordEncoder passwordEncoder) {
		this.personRepository = personRepository;
		this.passwordEncoder = passwordEncoder;
	}
	
	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {
		
		
		HttpServletRequest req = (HttpServletRequest) request;
		HttpServletResponse resp = (HttpServletResponse) response;
		PrintWriter out = resp.getWriter();
		
		String method = req.getMethod();
		System.out.println(method);
		if(!method.equals("POST")) {
			out.print("required post method");
			out.flush();
		}else {
			ObjectMapper om = new ObjectMapper();
			AuthenticationRequest authDto = null ;
			try {
				authDto = om.readValue(req.getInputStream(), AuthenticationRequest.class);
				
				System.out.println(authDto);
				User getUserPw = 
				personRepository.findByUsername(authDto.getUsername());
				User personEntity = 
						personRepository.findByUsernameAndPassword(authDto.getUsername(), getUserPw.getPassword());
				if(personEntity == null) {
					out.print("fail");
					out.flush();
				}else {
					System.out.println("인증되었습니다.");
					
					String jwtToken = 
							JWT.create()
							.withSubject("토큰제목")
							.withExpiresAt(new Date(System.currentTimeMillis()+1000*60*60))
							.withClaim("id", personEntity.getUserId())
							.sign(Algorithm.HMAC512(JwtProps.secret));
					
					resp.addHeader(JwtProps.header, JwtProps.auth+jwtToken);
					out.print("ok");
					out.flush();
				}
			} catch (Exception e) {
				System.out.println("오류 : "+e.getMessage());
			}
		}
	}

}
