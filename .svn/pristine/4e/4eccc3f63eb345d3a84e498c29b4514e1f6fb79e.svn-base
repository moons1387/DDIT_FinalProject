package kr.or.ddit.components.channelthread.service;

import java.util.List;

import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.channel.vo.ChannelThreadVO;

public interface IChannelThreadSerivce {

	public int insert(ChannelThreadVO ThreadVO);

	public List<ChannelThreadVO> list();

	public ChannelThreadVO threadselect(ChannelThreadVO ThreadVO);

	public void threadDelete(ChannelThreadVO threadVO);

	public int threadMemberTotal(ChannelThreadVO threadVO);

	//스레드 멤버 List
	public List<ChannelMemberVO> thMemberList(ChannelThreadVO threadVO);
	
	//스레드 멤버 List 검색
	public List<ChannelMemberVO> thMemberSearch(ChannelThreadVO threadVO);
	
}
