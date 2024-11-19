package kr.or.ddit.components.chatting.vo;

import lombok.Data;

@Data
public class ChattingMemberVO {
	private int groupNo;
	private int memNo;
	private String userName;
	private String authRole;
	private int msgId;
}
