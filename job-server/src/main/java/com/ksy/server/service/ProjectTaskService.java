package com.ksy.server.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ksy.server.domain.ProjectTask;
import com.ksy.server.domain.User;
import com.ksy.server.exception.CustomIdException;
import com.ksy.server.repository.ProjectTaskRepository;
import com.ksy.server.repository.UserRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	@Autowired
	private UserRepository userRepository;
	public List<ProjectTask> findByCategory(String category){
		return projectTaskRepository.findByCategory(category);
	}
	
	@Transactional
	public ProjectTask saveProject(ProjectTask projectTask, int userId) {
		User user = userRepository.findById(userId).orElseThrow(()->{
			throw new CustomIdException("없는 id");
		});
		projectTask.setUser(user);
		return projectTaskRepository.save(projectTask);
	}
	
	@Transactional
	public void deleteTaskById(Long id) {
			
		projectTaskRepository.deleteById(id);
	}
	
	@Transactional
	public ProjectTask updateById(ProjectTask projectTask,Long id) {
		//경로에 잘못된 id
		ProjectTask task = projectTaskRepository.findById(id).orElseThrow(()->{
			throw new CustomIdException("없는 id");
			});
		
		task.setContent(projectTask.getContent());
		task.setProjectName(projectTask.getProjectName());
		
		return task;
		
	}
	
	@Transactional(readOnly = true)
	public ProjectTask getTaskById(Long id) {
		return projectTaskRepository.findById(id).orElseThrow(()->{
			throw new CustomIdException("id를 확인");
			});
	}
	 
}
