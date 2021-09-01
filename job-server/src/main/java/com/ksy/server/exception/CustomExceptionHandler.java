package com.ksy.server.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice //모든 예외에 대해
@RestController
public class CustomExceptionHandler extends ResponseEntityExceptionHandler{

	@ExceptionHandler(CustomIdException.class)
	public final ResponseEntity<?> handleIdException(CustomIdException e){
		if(e.getErrorMap() == null) {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}else {
			return new ResponseEntity<>(e.getMessage(),HttpStatus.BAD_REQUEST);
		}
	}
	
}
