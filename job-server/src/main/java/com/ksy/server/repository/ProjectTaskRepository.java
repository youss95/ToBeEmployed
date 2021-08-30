package com.ksy.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ksy.server.domain.ProjectTask;

public interface ProjectTaskRepository extends JpaRepository<ProjectTask, Long> {

	List<ProjectTask> findByCategory(String category);
	
}
