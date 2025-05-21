package com.winter.app.websocket;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class WebSocketListner {
	
	@EventListener
	public void connect(SessionConnectedEvent event) {
		log.info("Event : {}", event);
	}

}
