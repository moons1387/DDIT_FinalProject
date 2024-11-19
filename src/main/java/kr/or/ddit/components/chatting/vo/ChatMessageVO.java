package kr.or.ddit.components.chatting.vo;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class ChatMessageVO {
	private int messageId;
	private int groupNo;
	private String messageContent;
	private Date messageRegdate;
	private int memNo;
	private String memName;
	private int unreadCount;
	private int msgFileId;
	private String memPrflimg;
	
	// DB에 없는 필요한 변수
	private String type;
	private int lastMessageId;
	private List<MultipartFile> chatFileList;
}
