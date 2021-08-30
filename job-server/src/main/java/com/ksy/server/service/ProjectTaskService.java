package com.ksy.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ksy.server.domain.ProjectTask;
import com.ksy.server.repository.ProjectTaskRepository;

@Service
public class ProjectTaskService {

	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	
	public List<ProjectTask> findByCategory(String category){
		return projectTaskRepository.findByCategory(category);
	}
	
	public ProjectTask saveProject(ProjectTask projectTask,String category) {
	
		/*
		 * Integer taskSeq = projectTask.getTaskSeq(); taskSeq ++;
		 * projectTask.setTaskSeq(taskSeq);
		 * projectTask.setPrjIdentifier(category+"-"+taskSeq);
		 */
		return projectTaskRepository.save(projectTask);
	}
	
}
