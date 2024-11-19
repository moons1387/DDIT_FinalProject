package kr.or.ddit.components.notice.service.Impl;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.ServiceResult;
import kr.or.ddit.components.notice.service.INoticeMapper;
import kr.or.ddit.components.notice.service.INoticeService;
import kr.or.ddit.components.notice.vo.NoticeVO;

@Primary
@Service
public class NoticeServiceImpl implements INoticeService {
	
	@Inject
	private INoticeMapper mapper;
	
//	@Override
//	public int getTotal(PagingVO<NoticeVO> noticePage) {
//		
//		return mapper.getTotal(noticePage);
//	}

	@Override
	public List<NoticeVO> getNoticeList() {
		
		return mapper.getNoticeList();
	}

	@Override
	public int ntcInsert(NoticeVO notice) {
		
		return mapper.ntcInsert(notice);
	}

	@Override
	public ServiceResult deleteNotice(HttpServletRequest req, Integer ntcNo) {
		
		// ntcNo가 null인 경우 처리
	    if (ntcNo == null) {
	        return ServiceResult.FAILED; // 또는 적절한 에러 코드를 반환
	    }
		
		
		ServiceResult result = null;
		
		int status = mapper.deleteNotice(ntcNo);
		if(status > 0) {
			result = ServiceResult.OK;
		} else {
			result = ServiceResult.FAILED;
		}
		
		return result;
		
	}

	@Override
	public NoticeVO detailNotice(Integer ntcNo) {
		
		mapper.incrementHit(ntcNo);
		return mapper.detailNotice(ntcNo);
	}

	@Override
	public ServiceResult ntcUpdate(HttpServletRequest req, NoticeVO notice) {
		
		ServiceResult res = null;
		
		int status = mapper.ntcUpdate(notice);
		
		if(status > 0) {
			res = ServiceResult.OK;
		} else {
			res = ServiceResult.FAILED;
		}
		
		return res;
	}


		
}
