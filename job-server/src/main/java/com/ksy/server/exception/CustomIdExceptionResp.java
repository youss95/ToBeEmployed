package com.ksy.server.exception;

import lombok.Data;

@Data
public class CustomIdExceptionResp {
	
	private Long id;

	public CustomIdExceptionResp(Long id) {
	
		this.id = id;
	}

	
	
}
