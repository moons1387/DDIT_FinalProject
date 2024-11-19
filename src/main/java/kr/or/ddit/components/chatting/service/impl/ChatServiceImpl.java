package kr.or.ddit.components.chatting.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.chatting.service.IChatMapper;
import kr.or.ddit.components.chatting.service.IChatService;
import kr.or.ddit.components.chatting.vo.ChatMessageVO;
import kr.or.ddit.components.chatting.vo.ChattingGroupVO;
import kr.or.ddit.components.chatting.vo.ChattingMemberVO;

@Primary
@Service
public class ChatServiceImpl implements IChatService {
	
	@Inject
	private IChatMapper mapper;
	
	@Override
	public List<ChatMessageVO> messageList(int groupNo) {
		return mapper.messageList(groupNo);
	}

	@Override
	public int insertMessage(ChatMessageVO chatMessage) {
		// 메시지 삽입
		int result = mapper.insertMessage(chatMessage);
		
		// 나를 제외한 해당 방 사람들에게 안읽은 메시지 카운트
		mapper.updateMessageCountExceptMe(chatMessage);
		
		int groupNo = chatMessage.getGroupNo();
		List<ChattingMemberVO> memberList = mapper.getChattingMember(groupNo);
		
		return result;
	}

	@Override
	public List<ChattingGroupVO> getChattingGroupListById(int memNo) {
		return mapper.getChattingGroupListById(memNo);
	}

	@Override
	public List<ChattingMemberVO> getChattingMember(int stNo) {
		return mapper.getChattingMember(stNo);
	}

	@Override
	public void readChatMessage(ChatMessageVO chatMessage) {
		mapper.readChatMessage(chatMessage);
	}

	@Override
	public int getChatCnt(String userId) {
		return mapper.getChatCnt(userId);
	}

	@Override
	public int getMemberCount(int stNo) {
		return mapper.getMemberCount(stNo);
	}

	@Override
	public List<Integer> getUnreadCntByUser(ChatMessageVO chatMessage) {
		return mapper.getUnreadCntByUser(chatMessage);
	}

	@Override
	public void readMessageInRoom(ChatMessageVO chatMessage) {
		// 안읽은 멤버 테이블에 해당 방에 대한 유저에 관한 행 삭제
		mapper.readMessageInRoom(chatMessage);
	}

	@Override
	public List<ChatMessageVO> getLastMsgList() {
		return mapper.getLastMsgList();
	}

}
