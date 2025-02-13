package kr.or.ddit.components.threaddailyboard.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.threadboard.vo.ThreadBoardVO;
import kr.or.ddit.components.threaddailyboard.service.IDailyworkBoardMapper;
import kr.or.ddit.components.threaddailyboard.service.IDailyworkBoardService;
import kr.or.ddit.vo.PagingVO;

@Primary
@Service
public class DailyworkBoardServiceImpl implements IDailyworkBoardService {

	@Inject
	private IDailyworkBoardMapper DailyworkMapper;
	
	@Override
	public List<ThreadBoardVO> Dailyworklist(ThreadBoardVO thboardVO) {
		return DailyworkMapper.Dailyworklist(thboardVO);
	}

	@Override
	public int thDailyInsert(ThreadBoardVO thboardVO) {
		return DailyworkMapper.thDailyInsert(thboardVO);
	}

	@Override
	public ThreadBoardVO thDailySelect(int brdNo) {
		return DailyworkMapper.thDailySelect(brdNo);
	}

	@Override
	public void thDailyDelete(ThreadBoardVO thboardVO) {
		DailyworkMapper.thDailyDelete(thboardVO);
	}

	@Override
	public void thDailyUpdate(ThreadBoardVO thboardVO) {
		DailyworkMapper.thDailyUpdate(thboardVO);
		
	}

	@Override
	public List<ThreadBoardVO> thDailySearch(ThreadBoardVO thboardVO) {
		return DailyworkMapper.thDailySearch(thboardVO);
	}

	@Override
	public int thDailyAuthority(PagingVO<ThreadBoardVO> pagingVO) {
		return DailyworkMapper.thDailyAuthority(pagingVO);
	}


}
