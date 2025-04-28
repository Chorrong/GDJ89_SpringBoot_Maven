package com.winter.app.websocket;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.winter.app.user.UserDAO;
import com.winter.app.user.UserVO;

@Service
public class ChatService {
	
	@Autowired
	private ChatDAO chatDAO;
	
	public List<UserVO> getList()throws Exception{
		List<UserVO> list = chatDAO.getList();
		
		list.forEach(vo ->{
			if(LoginUsers.USERNAMES.contains(vo.getUsername())) {
				vo.setStatus(true);
			}
		});
		
		return chatDAO.getList();
	}

}
