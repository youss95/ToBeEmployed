package com.ksy.server.repository;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.ksy.server.domain.ProjectTodo;

public interface ProjectTodoRepository extends JpaRepository<ProjectTodo,Long>{

	List<ProjectTodo> findByProjectTask_IdOrderByPriority(Long id);
	ProjectTodo findByProjectTask_IdAndId(Long task_id,Long todo_id);
	List<ProjectTodo> findAllByProjectTask_IdAndCreateDateBetween(Long id , LocalDateTime start, LocalDateTime end);
	
}
