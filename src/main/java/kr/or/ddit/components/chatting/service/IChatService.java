package kr.or.ddit.components.chatting.service;

import java.util.List;

import kr.or.ddit.components.chatting.vo.ChatMessageVO;
import kr.or.ddit.components.chatting.vo.ChattingGroupVO;
import kr.or.ddit.components.chatting.vo.ChattingMemberVO;


public interface IChatService {

	public List<ChatMessageVO> messageList(int groupNo);

	public int insertMessage(ChatMessageVO chatMessage);

	public List<ChattingGroupVO> getChattingGroupListById(int memNo);

	public List<ChattingMemberVO> getChattingMember(int groupNo);

	public void readChatMessage(ChatMessageVO chatMessage);

	public int getChatCnt(String memId);

	public int getMemberCount(int groupNo);

	public List<Integer> getUnreadCntByUser(ChatMessageVO chatMessage);

	public void readMessageInRoom(ChatMessageVO chatMessage);

	public List<ChatMessageVO> getLastMsgList();
	
}
