package com.winter.app.websocket;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.winter.app.user.UserVO;

@Mapper
public interface ChatDAO {
	
	public List<UserVO> getList()throws Exception;

}
