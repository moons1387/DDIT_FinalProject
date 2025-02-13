package kr.or.ddit.components.channelboard.service;

import java.util.List;

import kr.or.ddit.components.channelboard.vo.ChannelBoardVO;
import kr.or.ddit.components.threadboard.vo.ThreadBoardVO;
import kr.or.ddit.vo.PagingVO;

public interface IChannelBoardMapper {

	public List<ChannelBoardVO> chBoardList(PagingVO<ChannelBoardVO> paging);

	public int chBoardInsert(ChannelBoardVO chBoard);

	public ChannelBoardVO chBoardSelect(int brdNo);

	public void deleteChb(int brdNo);

	public void incrementHit(int brdNo);

	public String getChTtl(int chNo);

	public void chBoardUpdate(ChannelBoardVO chBoard);

	public void chBoardDelete(ChannelBoardVO chBoard);

	public int chBoardTotal(PagingVO<ChannelBoardVO> paging);

	public List<ChannelBoardVO> chBoardList2(ChannelBoardVO chBoard);

	public List<ChannelBoardVO> chNtcList(ChannelBoardVO chBoard);
	
}
