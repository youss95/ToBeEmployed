package com.ksy.server.service;

import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ksy.server.domain.ProjectTask;
import com.ksy.server.repository.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	
	public List<ProjectTask> findByCategory(String category){
		return projectTaskRepository.findByCategory(category);
	}
	
	@Transactional
	public ProjectTask saveProject(ProjectTask projectTask) {
	
		/*
		 * Integer taskSeq = projectTask.getTaskSeq(); taskSeq ++;
		 * projectTask.setTaskSeq(taskSeq);
		 * projectTask.setPrjIdentifier(category+"-"+taskSeq);
		 */
		return projectTaskRepository.save(projectTask);
	}
	
	@Transactional
	public void deleteTaskById(Long id) {
		//null판단
		
		projectTaskRepository.deleteById(id);
	}
	
	@Transactional
	public ProjectTask updateById(ProjectTask projectTask,Long id) {
		ProjectTask task = projectTaskRepository.findById(id).orElseThrow(()->new IllegalArgumentException("id를 확인"));
		task.setContent(projectTask.getContent());
		task.setProjectName(projectTask.getProjectName());
		return task;
	}
	
	@Transactional(readOnly = true)
	public ProjectTask getTaskById(Long id) {
		return projectTaskRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Id 확인"));
	}
	 
}
