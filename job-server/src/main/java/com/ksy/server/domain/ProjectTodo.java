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
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Builder;
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
	@NotBlank(message = "제목을 입력해주세요!")
	private String title;
	@NotBlank(message = "내용을 입력해 주세요!")
	private String content;
	@NotBlank(message = "진행상태를 선택해 주세요!")
	private String status;
	@NotNull(message = "우선순위를 선택하세요")
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
