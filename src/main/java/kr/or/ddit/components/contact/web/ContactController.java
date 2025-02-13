package kr.or.ddit.components.contact.web;

import java.util.List;

import javax.inject.Inject;

import org.apache.ibatis.annotations.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.contact.service.IContactService;
import kr.or.ddit.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/contact")
public class ContactController {

	@Inject
	private IContactService contactService;

	// 멤버 리스트 출력
	@ResponseBody
	@PostMapping("/contactList")
	public ResponseEntity<List<MemberVO>> contactList(@RequestBody ChannelMemberVO channelMemberVO) {
//		log.info("contactList() 실행...!");
		
		int chNo = channelMemberVO.getChNo(); // 채널 번호 가져오기
		int memNo = channelMemberVO.getMemNo();
		
//		log.info("chNo : {}", chNo);
//		log.info("memNo : {}", memNo);
		List<MemberVO> contactList = contactService.getContactList(chNo, memNo); // 채널 번호를 사용하여 멤버 리스트 가져오기

//		log.info("contactList: {}", contactList);

		return new ResponseEntity<List<MemberVO>>(contactList, HttpStatus.OK);
	}


}









