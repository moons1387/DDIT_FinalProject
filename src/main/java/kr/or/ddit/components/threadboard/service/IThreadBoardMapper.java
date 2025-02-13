package kr.or.ddit.components.threadboard.service;

import java.util.List;
import java.util.Map;

import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.threadboard.vo.ThreadBoardVO;
import kr.or.ddit.vo.PagingVO;

public interface IThreadBoardMapper {

	public List<ThreadBoardVO> thboardlist(ThreadBoardVO thboardVO);

	public int thboardInsert(ThreadBoardVO thboardVO);

	public ThreadBoardVO thboardSelect(int brdNo);

	public void thboardUpdate(ThreadBoardVO thboardVO);

	public String getThTtl(int thNo);

	public void thBoardDelete(ThreadBoardVO thboardVO);

	public void incrementHit(int brdNo);

	public List<ThreadBoardVO> thboardSearch(ThreadBoardVO thBoardVO);

	public List<ThreadBoardVO> thboardFreeList(PagingVO<ThreadBoardVO> pagingVO);

	public int thboardFreeTotal(PagingVO<ThreadBoardVO> pagingVO);

	public int thboardDailyTotal(PagingVO<ThreadBoardVO> pagingVO);

	public List<ThreadBoardVO> thboardDailyList(PagingVO<ThreadBoardVO> pagingVO);

	
	public List<ThreadBoardVO> thboardFree(ThreadBoardVO thboardVO);

	public List<ThreadBoardVO> thboardDaily(ThreadBoardVO thboardVO);

	public int thboardAuthority(PagingVO<ThreadBoardVO> pagingVO);




}
