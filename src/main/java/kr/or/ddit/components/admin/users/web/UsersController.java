package kr.or.ddit.components.admin.users.web;

import java.util.List;

import javax.inject.Inject;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.or.ddit.components.member.service.IMemberService;
import kr.or.ddit.vo.MemberVO;
import kr.or.ddit.vo.PaginationInfoVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
@RequestMapping("/admin")
public class UsersController {
	
	@Inject
	private IMemberService service; 

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@GetMapping("/users")
	public String UsersManagement(
			@RequestParam(name = "currentPage", required = false, defaultValue = "1") int currentPage,
			@RequestParam(name = "searchType", required = false, defaultValue = "title") String searchType,
			@RequestParam(name = "searchWord", required = false) String searchWord, 
			Model model) {
		log.info("usersList() 실행...!");
		
		// 페이징 정보 객체 생성
		PaginationInfoVO<MemberVO> pagingVO = new PaginationInfoVO<>(10, 5);
		
		// 시작 끝 등을 결정
	    pagingVO.setCurrentPage(currentPage);
	    log.info("currentPage", currentPage);
	    
		// 총 게시글 수를 이용하여 총 페이지수를 결정하기 위해 총 게시글 수인 totalRecord를 얻어옴
	    int totalRecord = service.memberCount(pagingVO);
		// totalPage를 설정
	    pagingVO.setTotalRecord(totalRecord);
		// 리스트 데이터를 가져옴
		List<MemberVO> list = service.pagingMemList(pagingVO);
	    pagingVO.setDataList(list);
	    
		
	    model.addAttribute("pagingVO", pagingVO);
		model.addAttribute("list", list);
		log.info("pagingVO : {} ", pagingVO);
		log.info("list : {} ", list);
		
		return "admin/users";
	}
	
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@GetMapping("/users/detail")
	public String UsersDetail(MemberVO memberVO, Model model) {
		
		log.info("memberVO : " + memberVO);
		
		memberVO = service.getUser(memberVO);
		
		model.addAttribute("member", memberVO);
		
		return "admin/usersDetail";
	}
}
