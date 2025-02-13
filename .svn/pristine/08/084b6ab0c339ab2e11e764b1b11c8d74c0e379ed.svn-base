package kr.or.ddit.components.notice.web;

import javax.inject.Inject;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import kr.or.ddit.components.notice.service.INoticeService;
import kr.or.ddit.components.notice.vo.NoticeVO;
import lombok.extern.slf4j.Slf4j;


@Slf4j
@Controller
@RequestMapping("/admin")
public class NoticeInsertController {
	
	@Inject
	private INoticeService service;
	
	// 공지사항 등록 페이지를 보여주는 메서드
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@GetMapping("/noticeForm")
	public String noticeInsertForm(Model model) {
	    log.info("공지사항 등록 페이지 요청");
	    return "admin/noticeForm"; // JSP 파일 경로
	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@PostMapping("/noticeInsert")
	public String ntcInsert(@ModelAttribute NoticeVO notice, RedirectAttributes ra) {
		log.info("공지사항 게시판 등록 실행..");
		
		int cnt = service.ntcInsert(notice);
		
		if(cnt > 0) {
			ra.addFlashAttribute("msg", "공지사항 등록 성공!");
		} else {
			ra.addFlashAttribute("msg", "공지사항 등록 실패!");
		}
		
		return "redirect:/admin/notice";
	}
}
