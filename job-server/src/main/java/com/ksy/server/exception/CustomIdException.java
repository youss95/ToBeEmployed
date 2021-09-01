package com.ksy.server.exception;

import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class CustomIdException extends RuntimeException{

	
	private static final long serialVersionUID = 1L;

	private Map<String, String> errorMap;
	
	public CustomIdException(String message,Map<String,String>errorMap) {
		
		super(message);
		this.errorMap = errorMap;
	}
	
	public CustomIdException(String message) {
		super(message);
	}
	
	public Map<String,String> getErrorMap(){
		return errorMap;
	}
	
	
	
}
