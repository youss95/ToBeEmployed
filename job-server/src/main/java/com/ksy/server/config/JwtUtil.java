package com.ksy.server.config;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
//jst token 생성
@Component
@RequiredArgsConstructor
public class JwtUtil {

	
	private final String SECRET_KEY = "secret";
	
	public String generateToken(UserDetails userDetails) {
		Map<String, Object> claims = new HashMap<String, Object>();
		return createToken(claims, userDetails.getUsername());
	}
	
	private String createToken(Map<String, Object> claims, String username) {
		return Jwts.builder().setClaims(claims).setSubject(username).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis()+1000*60*60*24*7)) //7일
				.signWith(SignatureAlgorithm.HS256,SECRET_KEY).compact();
	}
	
	//secret key 검사
	public Authentication validateToken(String token) {
		Claims claims = extractClaims(token);
		
		if(claims.getExpiration().before(new Date())) {
			return null;
		}
		//만료되면 다시 claim
		String username = claims.getSubject();
		
		return new UsernamePasswordAuthenticationToken(username, null, new ArrayList<>());
	}
	
	private Claims extractClaims(String token) {
		return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
	}
	
}
