package com.ksy.server.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ksy.server.domain.ProjectTodo;

public interface ProjectTodoRepository extends JpaRepository<ProjectTodo,Long>{

	List<ProjectTodo> findByProjectTask_IdOrderByPriority(Long id);
	
}
