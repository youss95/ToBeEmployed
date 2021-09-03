package com.ksy.server.controller;

import javax.servlet.http.HttpSession;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ksy.server.domain.User;
import com.ksy.server.repository.UserRepository;
import com.ksy.server.service.ErrorValidationService;
import com.ksy.server.service.UserService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
public class UserController {

	private final UserRepository personRepository;
	private final HttpSession session;
	private final UserService userService;
	private final ErrorValidationService errorService;
	@PostMapping("/join")
	public ResponseEntity<?> join(@Valid @RequestBody User person,BindingResult result) {
		
		ResponseEntity<?> errorMap = errorService.ValidationService(result);
		if(errorMap != null) {
			return errorMap;
		}
		userService.registerUser(person);
		return new ResponseEntity<String>("ok", HttpStatus.CREATED);
	}
	
	@GetMapping("/logout")
	public ResponseEntity<?> logout() {
		session.invalidate();
		return new ResponseEntity<String>("ok", HttpStatus.OK);
	}
	
}
