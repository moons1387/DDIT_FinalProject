package kr.or.ddit.components.threaddailyboard.service;

import java.util.List;

import kr.or.ddit.components.threadboard.vo.ThreadBoardVO;
import kr.or.ddit.vo.PagingVO;

public interface IDailyworkBoardMapper {

	public List<ThreadBoardVO> Dailyworklist(ThreadBoardVO thboardVO);

	public int thDailyInsert(ThreadBoardVO thboardVO);

	public ThreadBoardVO thDailySelect(int brdNo);

	public void thDailyDelete(ThreadBoardVO thboardVO);

	public void thDailyUpdate(ThreadBoardVO thboardVO);

	public List<ThreadBoardVO> thDailySearch(ThreadBoardVO thboardVO);

	public int thDailyAuthority(PagingVO<ThreadBoardVO> pagingVO);

}
