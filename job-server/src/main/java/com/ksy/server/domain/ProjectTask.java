package com.ksy.server.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;

import com.fasterxml.jackson.annotation.JsonFormat;

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
	private Integer taskSeq = 0;
	private String content;
	private String category;
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date startDate;
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date endDate;
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date createDate;
	@JsonFormat(pattern="yyyy-mm-dd")
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
