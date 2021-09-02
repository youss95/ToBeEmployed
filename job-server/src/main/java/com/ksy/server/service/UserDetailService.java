package com.ksy.server.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
@Service
public class UserDetailService implements UserDetailsService{
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	
	
	//디비에서 유저정보 로딩
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		return new User("peter",passwordEncoder.encode("password"),new ArrayList<>());
	}
	
}
