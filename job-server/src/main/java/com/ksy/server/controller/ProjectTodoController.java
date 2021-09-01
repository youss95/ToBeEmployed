package com.ksy.server.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ksy.server.domain.ProjectTodo;
import com.ksy.server.exception.CustomExceptionHandler;
import com.ksy.server.exception.CustomIdException;
import com.ksy.server.service.ErrorValidationService;
import com.ksy.server.service.ProjectTodoService;

@RestController
@RequestMapping("/api/todo")
public class ProjectTodoController {

	@Autowired
	private ProjectTodoService toDoService;
	
	@Autowired
	private ErrorValidationService errorService;
	
	@GetMapping("/{task_id}")
	public ResponseEntity<?> getProjectTodo(@PathVariable Long task_id ){
		
		return new ResponseEntity<List<ProjectTodo>>(toDoService.findTodoById(task_id),HttpStatus.OK);
	}
	
	@GetMapping("/{task_id}/{todo_id}")
	public ResponseEntity<?> findTodoByTaskIdAndId(@PathVariable Long task_id , @PathVariable Long todo_id){
		
		return new ResponseEntity<ProjectTodo>(toDoService.getOneTodo(task_id, todo_id),HttpStatus.OK);
	}
		
	@PostMapping("/{task_id}")
	public ResponseEntity<?> registerTodo(@Valid @RequestBody ProjectTodo todo,@PathVariable Long task_id, BindingResult result){
		
		ResponseEntity<?> errorMap = errorService.ValidationService(result);
		if(errorMap != null) {
			return errorMap;
		}
		
		ProjectTodo projectTodo = toDoService.registerProjectTodo(todo, task_id);
		return new ResponseEntity<ProjectTodo>(projectTodo,HttpStatus.CREATED); 
		
	}
	
	@DeleteMapping("/{task_id}/{todo_id}")
	public ResponseEntity<?> deleteTodo(@PathVariable Long task_id, @PathVariable Long todo_id){
		toDoService.deleteTodo(task_id, todo_id);
		return new ResponseEntity<String>("deleted",HttpStatus.OK);
	}
	
	@PutMapping("/update/{task_id}/{todo_id}")
	public ResponseEntity<?> updateTodo(@Valid @RequestBody ProjectTodo todo, @PathVariable Long task_id  , @PathVariable Long todo_id, BindingResult result){
		ResponseEntity<?> errorMap  =errorService.ValidationService(result);
		if(errorMap != null) {
			return errorMap;
		}else {
	ProjectTodo updatedTodo = toDoService.updateTodo(todo, task_id, todo_id);
	return new ResponseEntity<ProjectTodo>(updatedTodo,HttpStatus.OK);
		}
	}
}
