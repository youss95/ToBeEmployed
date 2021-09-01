package com.ksy.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ksy.server.domain.ProjectTask;
import com.ksy.server.domain.ProjectTodo;
import com.ksy.server.exception.CustomExceptionHandler;
import com.ksy.server.exception.CustomIdException;
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
		ProjectTask task = taskRepository.findById(id).orElseThrow(()->{
			throw new CustomIdException("id를 확인");
			});
		todo.setProjectTask(task);
		
		return toDoRepository.save(todo);
		}catch(Exception e) {
			e.printStackTrace();
			//throw new notfoundExcpetion
			return null;
		}
	}
	
	public ProjectTodo getOneTodo(Long task_id , Long todo_id) {
		return toDoRepository.findByProjectTask_IdAndId(task_id, todo_id);
	}
	
	public ProjectTodo updateTodo(ProjectTodo projectTodo, Long task_id , Long todo_id) {
		
		ProjectTodo todo = getOneTodo(task_id, todo_id);
		todo = projectTodo;
		
		return toDoRepository.save(todo);
	}
	
	public void deleteTodo(Long task_id, Long todo_id) {
		ProjectTodo todo = toDoRepository.findByProjectTask_IdAndId(task_id, todo_id);
		toDoRepository.delete(todo);
	}
}
