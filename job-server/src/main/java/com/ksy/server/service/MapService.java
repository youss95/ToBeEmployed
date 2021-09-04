package com.ksy.server.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ksy.server.domain.Map;
import com.ksy.server.domain.User;
import com.ksy.server.exception.CustomIdException;
import com.ksy.server.repository.MapRepository;
import com.ksy.server.repository.UserRepository;

import lombok.RequiredArgsConstructor;
@RequiredArgsConstructor
@Service
public class MapService {

	private final UserRepository userRepository;
	private final MapRepository mapRepository;
	
	
	public Map saveMap(Map map , int userId) {
		User user = userRepository.findById(userId).orElseThrow(()->{
			throw new CustomIdException("id 확인");
		});
		map.setUser(user);
		return mapRepository.save(map);		
	}
	
	public List<Map> getAllList(int userId){
		return mapRepository.findByUser_UserId(userId);
	}
	
}
