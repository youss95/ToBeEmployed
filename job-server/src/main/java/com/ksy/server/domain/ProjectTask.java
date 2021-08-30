package com.ksy.server.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

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
	private String projectName;
	private String prjIdentifier;
	private String content;
	private String category;
	private Date startDate;
	private Date endDate;
	private Date createDate;
	private Date updateDate;
	
	@PrePersist
	protected void createPrj() {
		this.createDate = new Date();
	}
	
	@PreUpdate
	protected void updatePrj() {
		this.updateDate = new Date();
	}
	
}
