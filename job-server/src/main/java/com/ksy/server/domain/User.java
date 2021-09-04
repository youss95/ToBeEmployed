package com.ksy.server.domain;

import java.util.Collection;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Transient;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;
	@Column(unique = true)
	@Size(min=4,max=8,message = "4~8자 사이")
	@NotBlank(message = "빈칸은 안되요")
	private String username;
	@NotBlank(message = "빈칸은 안되요")
	private String password;
	@JsonFormat(pattern="yyyy-mm-dd")
	private Date createDate;

	@PrePersist
	protected void onCreate() {
		this.createDate = new Date();
	}
	
}
