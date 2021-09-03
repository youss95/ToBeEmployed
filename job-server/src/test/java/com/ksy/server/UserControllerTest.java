package com.ksy.server;


import static org.junit.Assert.assertThat;


import org.assertj.core.api.Assertions;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import com.ksy.server.domain.User;
import com.ksy.server.repository.UserRepository;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class UserControllerTest {

	@Autowired
	TestRestTemplate testRestTemplate;  //client
	@Autowired
	UserRepository userRepository;
	@Before
	public void cleanup() {
		userRepository.deleteAll();
	}
	
	@Test
	public void postUserIfValidOk() {
		User user = createUser();	
		ResponseEntity<Object> response = testRestTemplate.postForEntity("/api/users",user, Object.class);
		Assertions.assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
	}
	
	private User createUser() {
		User user = new User();
		user.setUsername("test");
		user.setPassword("password");
		return user;
	}
	
	@Test
	public void postUserIfValidSave() {
		User user = createUser();
		testRestTemplate.postForEntity("/api/users", user, Object.class);
		Assertions.assertThat(userRepository.count()).isEqualTo(1);
	}
	
	
}
