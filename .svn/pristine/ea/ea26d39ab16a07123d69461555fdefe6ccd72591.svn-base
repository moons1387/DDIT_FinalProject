package kr.or.ddit.components.chatting.service;

import java.util.List;
import java.util.Map;

import kr.or.ddit.components.chatting.vo.ChatMessageVO;
import kr.or.ddit.components.chatting.vo.ChattingGroupVO;
import kr.or.ddit.components.chatting.vo.ChattingMemberVO;


public interface IChatMapper {

	public List<ChatMessageVO> messageList(int groupNo);

	public int insertMessage(ChatMessageVO chatMessage);

	public void updateMessageCountExceptMe(ChatMessageVO chatMessage);

	public List<ChattingMemberVO> getChattingMember(int groupNo);

	public void insertUnreadMember(Map<String, Object> map);

	public List<ChattingGroupVO> getChattingGroupListById(int memNo);

	public void readChatMessage(ChatMessageVO chatMessage);

	public int getChatCnt(String userId);

	public int getMemberCount(int stNo);

	public List<Integer> getUnreadCntByUser(ChatMessageVO chatMessage);

	public void readMessageInRoom(ChatMessageVO chatMessage);

	public List<ChatMessageVO> getLastMsgList();

}
