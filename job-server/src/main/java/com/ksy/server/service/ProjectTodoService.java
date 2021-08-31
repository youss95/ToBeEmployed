package com.ksy.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ksy.server.domain.ProjectTask;
import com.ksy.server.domain.ProjectTodo;
import com.ksy.server.repository.ProjectTaskRepository;
import com.ksy.server.repository.ProjectTodoRepository;

@Service
public class ProjectTodoService {

	@Autowired
	private ProjectTodoRepository toDoRepository;
	
	@Autowired
	private ProjectTaskRepository taskRepository;
	
	public List<ProjectTodo> findTodoById(Long id){
		//id : 프로젝트 아이디
		return toDoRepository.findByProjectTask_IdOrderByPriority(id);
	}
	
	public ProjectTodo registerProjectTodo(ProjectTodo todo,Long id) {
		try {
		ProjectTask task = taskRepository.findById(id).orElseThrow(()->new IllegalArgumentException("id 없음"));
		todo.setProjectTask(task);
		
		return toDoRepository.save(todo);
		}catch(Exception e) {
			e.printStackTrace();
			//throw new notfoundExcpetion
			return null;
		}
	}
}