package kr.or.ddit.components.notice.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import kr.or.ddit.ServiceResult;
import kr.or.ddit.components.notice.vo.NoticeVO;

public interface INoticeService {

//	public int getTotal(PagingVO<NoticeVO> noticePage);
	
	public List<NoticeVO> getNoticeList();
	
	public NoticeVO detailNotice(Integer ntcNo);
	
	// 관리자
	public int ntcInsert(NoticeVO notice);
	
	public ServiceResult deleteNotice(HttpServletRequest req, Integer ntcNo);

	public ServiceResult ntcUpdate(HttpServletRequest req, NoticeVO notice);



	

}
