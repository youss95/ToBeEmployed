package com.ksy.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ksy.server.config.JwtUtil;
import com.ksy.server.dto.AuthenticationRequest;
import com.ksy.server.dto.AuthenticationResponse;
import com.ksy.server.service.UserDetailService;

@RestController
@RequestMapping("/api/user")
public class UserController {

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserDetailService userDetailService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request){
		try {
			authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
			
		}catch(BadCredentialsException e) {
			throw new RuntimeException("username or password is incorrect");
		}
		
		UserDetails userDetails = userDetailService.loadUserByUsername(request.getUsername());
		String token = jwtUtil.generateToken(userDetails);
		
		return ResponseEntity.ok(new AuthenticationResponse("Bearer "+token));
	}
	
}
