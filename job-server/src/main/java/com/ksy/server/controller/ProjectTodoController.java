package com.ksy.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ksy.server.domain.ProjectTodo;
import com.ksy.server.service.ProjectTodoService;

@RestController
@RequestMapping("/api/todo")
public class ProjectTodoController {

	@Autowired
	private ProjectTodoService toDoService;
	
	
	@GetMapping("/{task_id}")
	public ResponseEntity<?> getProjectTodo(@PathVariable Long task_id ){
		
		return new ResponseEntity<List<ProjectTodo>>(toDoService.findTodoById(task_id),HttpStatus.OK);
	}
		
	@PostMapping("/{task_id}")
	public ResponseEntity<?> registerTodo(@RequestBody ProjectTodo todo,@PathVariable Long task_id){
		ProjectTodo projectTodo = toDoService.registerProjectTodo(todo, task_id);
		return new ResponseEntity<ProjectTodo>(projectTodo,HttpStatus.CREATED); 
	}
	
	@DeleteMapping("/{task_id}/{todo_id}")
	public ResponseEntity<?> deleteTodo(@PathVariable Long task_id, @PathVariable Long todo_id){
		toDoService.deleteTodo(task_id, todo_id);
		return new ResponseEntity<String>("deleted",HttpStatus.OK);
	}
}
