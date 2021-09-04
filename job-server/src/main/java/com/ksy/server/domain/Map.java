package com.ksy.server.domain;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.PrePersist;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Map {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@NotBlank(message = "내용을 입력해 주세요")
	private String content;
	@NotBlank(message = "회사 이름을 입력햊 주세요")
	private String bizName;
	@NotBlank(message = "주소를 입력해 주세요")
	private String address;
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date interviewDate;
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date createDate;
	
	@ManyToOne
	@JoinColumn(name="userId")
	private User user;
	

	@PrePersist
	protected void onCreate() {
		this.createDate = new Date();
	}
}
