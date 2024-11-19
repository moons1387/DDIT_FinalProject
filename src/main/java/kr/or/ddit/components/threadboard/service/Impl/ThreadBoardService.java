package kr.or.ddit.components.threadboard.service.Impl;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.threadboard.service.IThreadBoardMapper;
import kr.or.ddit.components.threadboard.service.IThreadBoardService;
import kr.or.ddit.components.threadboard.vo.ThreadBoardVO;
import kr.or.ddit.vo.PagingVO;

@Primary
@Service
public class ThreadBoardService implements IThreadBoardService {
	
	@Inject
	private IThreadBoardMapper thboardMapper;
	
	
	@Override
	public List<ThreadBoardVO> thboardlist(ThreadBoardVO thboardVO) {
		return thboardMapper.thboardlist(thboardVO);
	}


	@Override
	public int thboardInsert(ThreadBoardVO thboardVO) {
	    return thboardMapper.thboardInsert(thboardVO);
	}


	@Override
	public ThreadBoardVO thboardSelect(int brdNo) {
		thboardMapper.incrementHit(brdNo);
		return thboardMapper.thboardSelect(brdNo);
	}


	@Override
	public void thboardUpdate(ThreadBoardVO thboardVO) {
		thboardMapper.thboardUpdate(thboardVO);
	}


	@Override
	public String getThTtl(int thNo) {
		return thboardMapper.getThTtl(thNo);
	}


	@Override
	public void thBoardDelete(ThreadBoardVO thboardVO) {
		 thboardMapper.thBoardDelete(thboardVO);
	}

	@Override
	public List<ThreadBoardVO> thboardSearch(ThreadBoardVO thBoardVO) {
		return thboardMapper.thboardSearch(thBoardVO);
	}


	@Override
	public int thboardFreeTotal(PagingVO<ThreadBoardVO> pagingVO) {
		return thboardMapper.thboardFreeTotal(pagingVO);
	}


	@Override
	public List<ThreadBoardVO> thboardFreeList(PagingVO<ThreadBoardVO> pagingVO) {
		return thboardMapper.thboardFreeList(pagingVO);
	}


	@Override
	public int thboardDailyTotal(PagingVO<ThreadBoardVO> pagingVO) {
		return thboardMapper.thboardDailyTotal(pagingVO);
	}


	@Override
	public List<ThreadBoardVO> thboardDailyList(PagingVO<ThreadBoardVO> pagingVO) {
		return thboardMapper.thboardDailyList(pagingVO);
	}


	//일반 게시판
	@Override
	public List<ThreadBoardVO> thboardFree(ThreadBoardVO thboardVO) {
		return thboardMapper.thboardFree(thboardVO);
	}

	//일일 게시판
	@Override
	public List<ThreadBoardVO> thboardDaily(ThreadBoardVO thboardVO) {
		return thboardMapper.thboardDaily(thboardVO);
	}


	@Override
	public int thboardAuthority(PagingVO<ThreadBoardVO> pagingVO) {
		return thboardMapper.thboardAuthority(pagingVO);
	}





}
