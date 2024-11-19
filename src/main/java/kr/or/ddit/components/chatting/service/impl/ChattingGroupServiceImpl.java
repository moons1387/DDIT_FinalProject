package kr.or.ddit.components.chatting.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.chatting.service.IChattingGroupService;
import kr.or.ddit.components.chatting.service.IChattingMapper;
import kr.or.ddit.components.chatting.vo.AlarmVO;
import kr.or.ddit.components.chatting.vo.ChattingGroupVO;
import kr.or.ddit.components.chatting.vo.ChattingMemberVO;
import kr.or.ddit.vo.MemberVO;

@Primary
@Service
public class ChattingGroupServiceImpl implements IChattingGroupService {
	
	@Inject
	private IChattingMapper mapper;
	
	@Override
	public List<ChattingGroupVO> getChattingGroupList() {
		return mapper.getChattingGroupList();
	}

	@Override
	public int insertChatting(ChattingGroupVO group) {
		// 스터디그룹 생성
		int result = mapper.insertChatting(group);
		
		return result;
	}

	@Override
	public List<AlarmVO> getAlarmInfo(String userId) {
		return mapper.getAlarmInfo(userId);
	}

	@Override
	public void deleteAlarm(int alarmNo) {
		mapper.deleteAlarm(alarmNo);
	}

	@Override
	public int joinChattingGroup(ChattingMemberVO member) {
		return mapper.joinChattingGroup(member);
	}

	@Override
	public int outChattingGroup(ChattingGroupVO chattingGroup) {
		return mapper.outChattingGroup(chattingGroup);
	}

	@Override
	public List<MemberVO> getMembers() {
		return mapper.getMembers();
	}

	@Override
	public MemberVO getUser(MemberVO member) {
		return mapper.getUser(member);
	}

	@Override
	public List<ChattingMemberVO> getChattingMember(int groupNo) {
		return mapper.getChattingMember(groupNo);
	}

	@Override
	public List<ChattingGroupVO> getGroupNo(ChattingGroupVO checkGroup) {
		return mapper.getGroupNo(checkGroup);
	}

	@Override
	public int getCount(ChattingGroupVO groupVo) {
		return mapper.getCount(groupVo);
	}

}
