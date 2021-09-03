package com.ksy.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ksy.server.domain.User;
import com.ksy.server.exception.CustomIdException;
import com.ksy.server.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
public class UserService {
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	
	public User save(User user) {
		try {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			user.setUsername(user.getUsername());
			user.setConfirmPassword("");
			return userRepository.save(user);
		}catch(Exception e) {
			e.printStackTrace();
			throw new CustomIdException("중복");
		}
	
	}
	
	
}
