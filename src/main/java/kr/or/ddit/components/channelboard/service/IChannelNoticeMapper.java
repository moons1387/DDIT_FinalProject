package kr.or.ddit.components.channelboard.service;

import java.util.List;

import kr.or.ddit.components.channelboard.vo.ChannelBoardVO;
import kr.or.ddit.components.threadboard.vo.ThreadBoardVO;
import kr.or.ddit.vo.PagingVO;

public interface IChannelNoticeMapper {

	public int chNtcTotal(PagingVO<ChannelBoardVO> pagingVO);

	public List<ChannelBoardVO> chNtcList(PagingVO<ChannelBoardVO> pagingVO);

	public ThreadBoardVO chNtcSelect(int brdNo);

	public void chNtcInsert(ChannelBoardVO chBoard);

	public void deleteChNtc(int brdNo);

	public void chNtcUpdate(ChannelBoardVO chBoard);

	public String getChTtl(int chNo);

	public void incrementNtcHit(int brdNo);

}
