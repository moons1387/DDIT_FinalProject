package kr.or.ddit.components.chatting.web;

import javax.inject.Inject;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.ddit.components.member.service.IMemberService;
import kr.or.ddit.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/chat")
public class ChattingController {

	@Inject
	private IMemberService service;  
	
	@ResponseBody
	@PostMapping("/getUser")
	public MemberVO getUser(@RequestBody MemberVO memberVO) {
		log.info("getUser" + memberVO);
		
		memberVO = service.getUser(memberVO);
		
		return memberVO;
	}
}
