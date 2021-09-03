package com.ksy.server.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;
import com.ksy.server.domain.User;
import com.ksy.server.repository.UserRepository;

public class CustomUserDetailsService implements UserDetailsService{

	   @Autowired
	    private UserRepository userRepository;

	    @Override
	    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	        User user = userRepository.findByUsername(username);
	        if(user==null) new UsernameNotFoundException("User not found");
	        return user;
	    }


	    @Transactional
	    public User loadUserById(Long id){
	        User user = userRepository.getById(id);
	        if(user==null) new UsernameNotFoundException("User not found");
	        return user;

	    }
	
}
