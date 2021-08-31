package com.ksy.server.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ProjectTodo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String content;
	private String status;
	private Integer priority;
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date startDate;
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date endDate;
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date createDate;
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date updateDate;
	
	//.외래키 연관관계주인
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name="task_id",updatable = false, nullable=false)
	private ProjectTask projectTask;
	
	@PrePersist
	protected void onCreate() {
		this.createDate = new Date();
	}
	
	@PreUpdate
	protected void onUpdate() {
		this.updateDate = new Date();
	}
	
	
	
}
