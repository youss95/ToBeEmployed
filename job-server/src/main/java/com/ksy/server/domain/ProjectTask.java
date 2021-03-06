package com.ksy.server.domain;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class ProjectTask {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message = "프로젝트 이름을 입력")
	private String projectName;
	@NotBlank(message = "내용을 입력")
	private String content;
	@NotBlank(message = "category 필요")
	private String category;
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date startDate;
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date endDate;
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date createDate;
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date updateDate;
	
	@ManyToOne
	@JoinColumn(name="userId")
	private User user;
	
	@OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE, mappedBy = "projectTask")
	@JsonIgnore
	private List<ProjectTodo> todo;
	
	@PrePersist
	protected void createPrj() {
		this.createDate = new Date();
	}
	
	@PreUpdate
	protected void updatePrj() {
		this.updateDate = new Date();
	}
	
}
