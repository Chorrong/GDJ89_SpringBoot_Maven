package com.winter.app.websocket;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.Calendar;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Setter
@Getter
@ToString
public class MessageVO {
	private Long chatNum;
	private Long roomNum;
	private String sender;
	private String body;
	private String receiver;
	private String date;
	
	//0->전체, 1->1:1
	private String status;
	private boolean readStatus;

}
