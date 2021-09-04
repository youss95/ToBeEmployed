package com.ksy.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ksy.server.domain.Map;

public interface MapRepository extends JpaRepository<Map, Integer> {

	List<Map> findByUser_UserId(int userId);
	
}
