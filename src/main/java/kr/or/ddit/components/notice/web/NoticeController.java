package kr.or.ddit.components.notice.web;

import java.util.List;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import kr.or.ddit.components.notice.service.INoticeService;
import kr.or.ddit.components.notice.vo.NoticeVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/notice")
public class NoticeController {
	
	@Inject
	private INoticeService service;
	
	@PostMapping("/list")
	public ResponseEntity<List<NoticeVO>> noticeList(){
		log.info("공지사항 리스트 실행..!");
//		noticePage.setTotal(service.getTotal(noticePage));
		
		List<NoticeVO> ntcList = service.getNoticeList();
		return new ResponseEntity<List<NoticeVO>>(ntcList, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/detail/{ntcNo}", method = RequestMethod.POST)
	public ResponseEntity<NoticeVO> ntcDetail(@PathVariable int ntcNo) {
				
		log.info("공지사항 상세보기 실행, ntcNo: {}", ntcNo);
		
		NoticeVO notice = service.detailNotice(ntcNo);
		
		log.info("notice" + notice);
		
		return new ResponseEntity<NoticeVO>(notice, HttpStatus.OK);
		
	}
	
}
