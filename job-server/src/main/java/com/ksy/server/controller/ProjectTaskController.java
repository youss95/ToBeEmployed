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
	
	@PostMapping("/{category}")
	public ResponseEntity<?> createNewTask(@RequestBody ProjectTask task,@PathVariable String category){
		ProjectTask projectTask = projectTaskService.saveProject(task,category);
		return new ResponseEntity<ProjectTask>(projectTask,HttpStatus.CREATED);
	}
	
	@GetMapping("/{category}")
	public List<?> getTaskByCategory(@PathVariable String category){
		return projectTaskService.findByCategory(category);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteTask(@PathVariable Long id){
		projectTaskService.deleteTaskById(id);
		return new ResponseEntity<String>("deleted",HttpStatus.OK);
	}
}
