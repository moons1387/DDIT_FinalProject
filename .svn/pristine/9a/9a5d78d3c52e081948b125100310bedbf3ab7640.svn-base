package kr.or.ddit.components.channelboard.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.channelboard.service.IChannelBoardMapper;
import kr.or.ddit.components.channelboard.service.IChannelBoardService;
import kr.or.ddit.components.channelboard.vo.ChannelBoardVO;
import kr.or.ddit.components.threadboard.vo.ThreadBoardVO;
import kr.or.ddit.vo.PagingVO;

@Primary
@Service
public class ChannelBoardServiceImpl implements IChannelBoardService {
	
	@Inject
	private IChannelBoardMapper mapper;
	
	@Override
	public List<ChannelBoardVO> chBoardList(PagingVO<ChannelBoardVO> paging) {
		
		return mapper.chBoardList(paging);
	}

	@Override
	public int chBoardInsert(ChannelBoardVO chBoard) {
		
		return mapper.chBoardInsert(chBoard);
	}

	@Override
	public ChannelBoardVO chBoardSelect(int brdNo) {
		
		mapper.incrementHit(brdNo);
		return mapper.chBoardSelect(brdNo);
	}


	@Override
	public void deleteChb(int brdNo) {
		mapper.deleteChb(brdNo);
	}

	@Override
	public String getChTtl(int chNo) {
		
		return mapper.getChTtl(chNo);
	}

	@Override
	public void chBoardUpdate(ChannelBoardVO chBoard) {
		
		mapper.chBoardUpdate(chBoard);
		
	}

	@Override
	public void chBoardDelete(ChannelBoardVO chBoard) {
		
		mapper.chBoardDelete(chBoard);
		
	}


	@Override
	public int chBoardTotal(PagingVO<ChannelBoardVO> paging) {
		
		return mapper.chBoardTotal(paging);
	}

	@Override
	public List<ChannelBoardVO> chBoardList2(ChannelBoardVO chBoard) {
		
		return mapper.chBoardList2(chBoard);
	}

	@Override
	public List<ChannelBoardVO> chNtcList(ChannelBoardVO chBoard) {
		// TODO Auto-generated method stub
		return mapper.chNtcList(chBoard);
	}



}
