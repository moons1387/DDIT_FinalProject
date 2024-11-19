package kr.or.ddit.components.threadboard.service;

import java.util.List;
import java.util.Map;

import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.threadboard.vo.ThreadBoardVO;
import kr.or.ddit.vo.PagingVO;

public interface IThreadBoardService {

	public List<ThreadBoardVO> thboardlist(ThreadBoardVO thboardVO);

	public int thboardInsert(ThreadBoardVO thboardVO);

	public ThreadBoardVO thboardSelect(int brdNo);

	public void thboardUpdate(ThreadBoardVO thboardVO);

	public String getThTtl(int thNo);

	public void thBoardDelete(ThreadBoardVO thboardVO);

	public List<ThreadBoardVO> thboardSearch(ThreadBoardVO thBoardVO);
	//페이징 처리
	public int thboardFreeTotal(PagingVO<ThreadBoardVO> pagingVO);

	public List<ThreadBoardVO> thboardFreeList(PagingVO<ThreadBoardVO> pagingVO);

	public int thboardDailyTotal(PagingVO<ThreadBoardVO> pagingVO);

	public List<ThreadBoardVO> thboardDailyList(PagingVO<ThreadBoardVO> pagingVO);

	//스레드 클릭시 자유게시판 List 가져오기
	public List<ThreadBoardVO> thboardFree(ThreadBoardVO thboardVO);
	
	//스레드 클릭시 일일 게시판 List 가져오기
	public List<ThreadBoardVO> thboardDaily(ThreadBoardVO thboardVO);

	public int thboardAuthority(PagingVO<ThreadBoardVO> pagingVO);



}
