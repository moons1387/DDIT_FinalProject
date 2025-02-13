package kr.or.ddit.components.notice.service;

import java.util.List;

import kr.or.ddit.components.notice.vo.NoticeVO;
import kr.or.ddit.vo.PaginationInfoVO;


public interface INoticeMapper {

//	public int getTotal(PagingVO<NoticeVO> noticePage);

	public List<NoticeVO> getNoticeList();

	public int ntcInsert(NoticeVO notice);

	public int deleteNotice(Integer ntcNo);

	public NoticeVO detailNotice(Integer ntcNo);

	public void incrementHit(int ntcNo);
	
	// 관리자
	public int selectNtcCount(PaginationInfoVO<NoticeVO> paging);

	public List<NoticeVO> selectNtcList(PaginationInfoVO<NoticeVO> paging);

	public int ntcUpdate(NoticeVO notice);
	
}
