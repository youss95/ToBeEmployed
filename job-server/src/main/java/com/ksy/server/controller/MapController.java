package com.ksy.server.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ksy.server.domain.Map;
import com.ksy.server.service.MapService;

@RestController
@RequestMapping("/api/map")
public class MapController {

	@Autowired
	private MapService mapService;
	
	@PostMapping("/{userId}")
	public ResponseEntity<?> registerMap(@RequestBody Map map,@PathVariable int userId){
		
		return new ResponseEntity<Map>(mapService.saveMap(map, userId),HttpStatus.CREATED);
	}
	
}
