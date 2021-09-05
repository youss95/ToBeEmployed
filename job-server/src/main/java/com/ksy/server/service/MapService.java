package com.ksy.server.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
	
	@Transactional
	public Map saveMap(Map map , int userId) {
		User user = userRepository.findById(userId).orElseThrow(()->{
			throw new CustomIdException("id 확인");
		});
		map.setUser(user);
		return mapRepository.save(map);		
	}
	
	@Transactional(readOnly = true)
	public List<Map> getAllList(int userId){
		return mapRepository.findByUser_UserId(userId);
	}
	
	public Map getMap(int id) {
		return mapRepository.findById(id).orElseThrow(()->{
			throw new CustomIdException("id 확인");
		});
		
	}
	
	@Transactional
	public void deleteMpaById(int id) {
		mapRepository.deleteById(id);
	}
	
}
