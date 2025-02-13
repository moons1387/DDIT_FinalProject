package kr.or.ddit.components.chatting.vo;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ChattingGroupVO {
	private int groupNo;
	private int memNo;
	private String groupTitle;
	private String groupDate;
	private int chattingFileId;
	private String groupImg;
	
	//DB에는 없음 스터디장설정 위한 변수
	private String authRole;
	private String msgId;
	
	private MultipartFile imgFile;
	private List<Integer> memList;
	private int inviteMemNo;
}
