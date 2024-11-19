package kr.or.ddit.components.channelthread.service;

import java.util.List;

import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.channel.vo.ChannelThreadVO;

public interface IChannelThreadMapper {

	public int insert(ChannelThreadVO ThreadVO);

	public List<ChannelThreadVO> list();

	public ChannelThreadVO threadselect(ChannelThreadVO threadVO);

	public void threadDelete(ChannelThreadVO threadVO);

	public int threadMemberTotal(ChannelThreadVO threadVO);

	public List<ChannelMemberVO> thMemberList(ChannelThreadVO threadVO);

	public List<ChannelMemberVO> thMemberSearch(ChannelThreadVO threadVO);


}
