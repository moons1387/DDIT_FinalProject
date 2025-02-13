package kr.or.ddit.components.board.faq.service.impl;

import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.ServiceResult;
import kr.or.ddit.components.board.faq.service.IFaqMapper;
import kr.or.ddit.components.board.faq.service.IFaqService;
import kr.or.ddit.components.board.faq.vo.FaqVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Primary
public class FaqServiceImpl implements IFaqService {
	
	@Inject
    private IFaqMapper faqMapper;

	@Override
	public List<FaqVO> faqList() {
		return faqMapper.faqList();
	}

	@Override
	public ServiceResult insertFaq(HttpServletRequest req, FaqVO faqVO) {
		ServiceResult result = null;
		int status = faqMapper.insertFaq(faqVO);
		if(status > 0) {	// 등록 성공
			// 공지사항 게시글 등록 시 업로드 한 파일 목록을 가져온다.
			List<MultipartFile> faqFileList = faqVO.getFaqFileList();
			
			// 공지사항 파일 업로드 자리
			faqFileUpload(faqFileList, faqVO.getFaqNo(), req);
			
			result = ServiceResult.OK;
		}else {				// 등록 실패
			result = ServiceResult.FAILED;
		}
		log.info("result : " + result);
		return result;
	}

	private void faqFileUpload(List<MultipartFile> faqFileList, int faqNo, HttpServletRequest req) {
//		String savedPath = "/resources/notice/";
//		
//		if(faqFileList != null && faqFileList.size() > 0) {	// 넘겨받은 파일 데이터가 존재할 때
//			// 파일을 하나씩 꺼내서 파일 복사를 진행한다.
//			for(NoticeFileVO noticeFileVO : noticeFileList) {
//				String savedName = UUID.randomUUID().toString();	// UUID의 랜덤 파일명 생성
//				savedName += "_" + noticeFileVO.getFileName();
//				// '/resources/notice/2/'와 같은 폴더 구조를 생성
//				String saveLocate = req.getServletContext().getRealPath(savedPath + boNo);
//				File file = new File(saveLocate);
//				if(!file.exists()) {
//					file.mkdirs();
//				}
//				
//				saveLocate += "/" + savedName;	// 파일 복사를 위한 경로 설정
//				
//				// 파일 데이터를 추가 하기 위한 준비
//				noticeFileVO.setBoNo(boNo);
//				noticeFileVO.setFileSavepath(saveLocate);
//				noticeMapper.insertNoticeFile(noticeFileVO);
//				
//				File saveFile = new File(saveLocate);
//				try {
//					noticeFileVO.getItem().transferTo(saveFile);
//				} catch (IllegalStateException e) {
//					e.printStackTrace();
//				} catch (IOException e) {
//					e.printStackTrace();
//				}	// 파일 복사
//			}
//		}
	}

	@Override
	public FaqVO selectFaq(int faqNo) {
//		noticeMapper.incrementHit(boNo);	// 조회수 증가
		return faqMapper.selectFaq(faqNo);
	}

	@Override
	public ServiceResult updateFaq(HttpServletRequest req, FaqVO faqVO) {
		ServiceResult result = null;
		int status = faqMapper.updateFaq(faqVO);
		if (status > 0) { // 수정 성공
		    result = ServiceResult.OK;
		} else { // 수정 실패
		    result = ServiceResult.FAILED;
		}
		return result;
	}

	@Override
	public ServiceResult deleteFaq(HttpServletRequest req, int faqNo) {
		ServiceResult result = null;

	    // 공지사항 삭제
	    int status = faqMapper.deleteFaq(faqNo);
	    if (status > 0) { // 삭제 성공
	        result = ServiceResult.OK;
	    } else { // 삭제 실패
	        result = ServiceResult.FAILED;
	    }
	    return result;
	}
}
