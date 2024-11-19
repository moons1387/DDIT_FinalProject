package kr.or.ddit.components.channelboard.service;

import java.util.List;

import kr.or.ddit.components.channelboard.vo.ChannelBoardVO;
import kr.or.ddit.components.threadboard.vo.ThreadBoardVO;
import kr.or.ddit.vo.PagingVO;

public interface IChannelBoardService {

	
	public List<ChannelBoardVO> chBoardList(PagingVO<ChannelBoardVO> paging);

	public int chBoardInsert(ChannelBoardVO chBoard);

	public ChannelBoardVO chBoardSelect(int brdNo);

	public void deleteChb(int brdNo);

	public String getChTtl(int chNo);
	
	public void chBoardUpdate(ChannelBoardVO chBoard);
	
	public void chBoardDelete(ChannelBoardVO chBoard);
	
	// 채널 클릭시 나오게 하기
	public List<ChannelBoardVO> chBoardList2(ChannelBoardVO chBoard);
	
	
	// 페이징 처리
	public int chBoardTotal(PagingVO<ChannelBoardVO> paging);

	public List<ChannelBoardVO> chNtcList(ChannelBoardVO chBoard);
	

}
