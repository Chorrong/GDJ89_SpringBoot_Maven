package com.winter.app.home;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.winter.app.user.UserVO;
import com.winter.app.websocket.ChatDAO;
import com.winter.app.websocket.MessageVO;

import jakarta.servlet.http.HttpSession;

@Controller
public class HomeController {
	@Autowired
	private ChatDAO chatDAO;
	
	@GetMapping("/")
	public String home(@AuthenticationPrincipal UserVO userVO, HttpSession httpSession) throws Exception {
		if(userVO != null) {
			MessageVO messageVO = new MessageVO();
			messageVO.setReceiver(userVO.getUsername());
			List<MessageVO> list = chatDAO.getMemoList(messageVO);
			httpSession.setAttribute("memoList", list);
		}
		return "home";
	}

}
