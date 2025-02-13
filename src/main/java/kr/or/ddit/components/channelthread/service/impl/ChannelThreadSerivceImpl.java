package kr.or.ddit.components.channelthread.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.channel.vo.ChannelThreadVO;
import kr.or.ddit.components.channelthread.service.IChannelThreadMapper;
import kr.or.ddit.components.channelthread.service.IChannelThreadSerivce;

@Primary
@Service
public class ChannelThreadSerivceImpl implements IChannelThreadSerivce  {
	
	@Inject
	private IChannelThreadMapper mapper;

	@Override
	public int insert(ChannelThreadVO ThreadVO) {
		return mapper.insert(ThreadVO);
	}

	@Override
	public List<ChannelThreadVO> list() {
		return mapper.list();
	}

	@Override
	public ChannelThreadVO threadselect(ChannelThreadVO ThreadVO) {
		return mapper.threadselect(ThreadVO);
	}

	@Override
	public void threadDelete(ChannelThreadVO threadVO) {
		mapper.threadDelete(threadVO);
	}

   @Override
    public int threadMemberTotal(ChannelThreadVO threadVO) {
        return mapper.threadMemberTotal(threadVO);
    }

	@Override
	public List<ChannelMemberVO> thMemberList(ChannelThreadVO threadVO) {
		return mapper.thMemberList(threadVO);
	}
	
	@Override
	public List<ChannelMemberVO> thMemberSearch(ChannelThreadVO threadVO) {
		return mapper.thMemberSearch(threadVO);
	}

}
