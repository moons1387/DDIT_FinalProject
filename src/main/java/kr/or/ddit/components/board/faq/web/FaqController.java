package kr.or.ddit.components.board.faq.web;

import java.util.List;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.or.ddit.components.board.faq.service.IFaqService;
import kr.or.ddit.components.board.faq.vo.FaqVO;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Controller
@RequestMapping("/faq")
public class FaqController {
	
	@Inject
	private IFaqService faqService;
	
	@PostMapping("/list")
	public ResponseEntity<List<FaqVO>> faqList() {
		log.info("faqList() 실행 !!!");
        List<FaqVO> list = faqService.faqList(); // QnA 목록 가져오기
        
        log.info("faqList: {}", list); 
        
        return new ResponseEntity<List<FaqVO>>(list, HttpStatus.OK); // 200 OK 응답과 함께 목록 반환
	}
}
