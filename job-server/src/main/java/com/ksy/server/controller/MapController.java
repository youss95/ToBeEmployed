package com.ksy.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
	
	@GetMapping("/{userId}")
	public ResponseEntity<?> getMapList(@PathVariable int userId){
		
		return new ResponseEntity<List<Map>>(mapService.getAllList(userId),HttpStatus.OK);
	}
	
	@GetMapping("/one/{id}")
	public ResponseEntity<?> getMap(@PathVariable int id){
		return new ResponseEntity<Map>(mapService.getMap(id),HttpStatus.OK);
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteMap(@PathVariable int id){
		mapService.deleteMpaById(id);
		return new ResponseEntity<String>("deleted",HttpStatus.OK);
	}
	
}
