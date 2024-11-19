package kr.or.ddit.components.chatting.vo;

import lombok.Data;

@Data
public class AlarmVO {
	private int alarmNo;
	private int memNo;
	private String alarmType;
	private String alarmCdate;
	private String alarmPrefix;
	private int stNo;
}
