package com.ksy.server.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ksy.server.domain.User;

public interface UserRepository extends JpaRepository<User, Long>{

	User findByUsername(String username);
	User getById(Long id);
	
}