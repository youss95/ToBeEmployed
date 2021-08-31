package com.ksy.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ksy.server.domain.ProjectTask;
import com.ksy.server.service.ProjectTaskService;

@RestController
@RequestMapping("/api/task")
public class ProjectTaskController {

	@Autowired
	private ProjectTaskService projectTaskService;
	
	@PostMapping("/")
	public ResponseEntity<?> createNewTask(@RequestBody ProjectTask task){
		ProjectTask projectTask = projectTaskService.saveProject(task);
		return new ResponseEntity<ProjectTask>(projectTask,HttpStatus.CREATED);
	}
	
	@GetMapping("/{category}")
	public List<?> getTaskByCategory(@PathVariable String category){
		return projectTaskService.findByCategory(category);
	}
	
	
	  @GetMapping("/chosen/{id}") public ResponseEntity<?> getTaskById(@PathVariable Long id){ 
		  return new ResponseEntity<ProjectTask>(projectTaskService.getTaskById(id),HttpStatus.OK); 
		  }
	 
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteTask(@PathVariable Long id){
		projectTaskService.deleteTaskById(id);
		return new ResponseEntity<String>("deleted",HttpStatus.OK);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<?> updateTask(@RequestBody ProjectTask task,@PathVariable Long id){
		return new ResponseEntity<ProjectTask>(projectTaskService.updateById(task, id),HttpStatus.OK);
	}
}
