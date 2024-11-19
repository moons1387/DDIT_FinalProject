package kr.or.ddit.components.chatting.web;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.naming.spi.DirStateFactory.Result;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.xml.bind.ParseConversionEvent;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.chatting.service.IChattingGroupService;
import kr.or.ddit.components.chatting.vo.AlarmVO;
import kr.or.ddit.components.chatting.vo.ChattingGroupVO;
import kr.or.ddit.components.chatting.vo.ChattingMemberVO;
import kr.or.ddit.components.declaration.web.UploadFileUtiles;
import kr.or.ddit.components.file.service.IAtchFileService;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import kr.or.ddit.components.file.vo.AtchFileVO;
import kr.or.ddit.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class ChatGroupContoller {

	@Resource(name = "localPath")
	private String localPath;

	@Resource(name = "uploadPath")
	private String resourcePath;

	@Resource(name = "uploadPathForMac")
	private String uploadPathForMac;

	@Inject
	private IAtchFileService atchFileService;

	@Inject
	private IChattingGroupService groupService;

	@RequestMapping(value = "Chattinghome", method = RequestMethod.GET)
	public String ChattingForm(Model model) {
		List<ChattingGroupVO> list = groupService.getChattingGroupList();
		model.addAttribute("studyList", list);
		return "study";
	}

	// 스터디그룹 생성(채팅방)
	@ResponseBody
	@PostMapping("/CreateChattingGroup")
	public String insertChatting(ChattingGroupVO group) {

		int memNo = group.getMemNo();

		log.info("group : " + group);

		AtchFileVO atchFileVO = new AtchFileVO();
		atchFileVO.setAtchFileExpln("chatGroup");

		// 첨부파일 정보를 DB에 저장하고 ID를 받아옴
		atchFileService.insert(atchFileVO);
		int atchFileId = atchFileVO.getAtchFileId();

		String savedPath = "";

		if (group.getImgFile() != null && !group.getImgFile().isEmpty()) {
			try {
				// 파일 저장
				savedPath = uploadFile(group.getImgFile().getOriginalFilename(), group.getImgFile().getBytes());

				// AtchFileDetailVO 객체 생성 및 속성 설정
				AtchFileDetailVO atchFileDetailVO = new AtchFileDetailVO();
				atchFileDetailVO.setAtchFileId(atchFileId); // 받아온 ID 설정
				atchFileDetailVO.setAtchFilePath(savedPath);
				atchFileDetailVO.setAtchFileOrgnlNm(group.getImgFile().getOriginalFilename());
				atchFileDetailVO.setAtchFileSize((Long) group.getImgFile().getSize());
				atchFileDetailVO.setAtchFileExtn(getFileExtension(group.getImgFile().getOriginalFilename()));
				atchFileDetailVO.setAtchFileSaveNm(savedPath.substring(savedPath.lastIndexOf("/") + 1));

				// DB에 파일 상세 정보 저장
				atchFileService.insertDetail(atchFileDetailVO);

				group.setGroupImg(savedPath);

				groupService.insertChatting(group);
			} catch (Exception e) {
				log.error("저장 오류: {}", e.getMessage());

			}
		}

		int count = group.getMemList().size();

		List<Integer> memberNo = group.getMemList();
		// 채팅원
		for (int i = 0; i < count; i++) {
			MemberVO member = new MemberVO();
			member.setMemNo(memberNo.get(i));

			member = groupService.getUser(member);

			ChattingMemberVO chattingMember = new ChattingMemberVO();
			chattingMember.setGroupNo(group.getGroupNo());
			chattingMember.setMemNo(member.getMemNo());
			chattingMember.setUserName(member.getMemName());
			chattingMember.setAuthRole("채팅원");

			joinChattingGroup(chattingMember);
		}

		// 채팅방장
		MemberVO member = new MemberVO();
		member.setMemNo(memNo);

		member = groupService.getUser(member);

		ChattingMemberVO chattingMember = new ChattingMemberVO();
		chattingMember.setGroupNo(group.getGroupNo());
		chattingMember.setMemNo(member.getMemNo());
		chattingMember.setUserName(member.getMemName());
		chattingMember.setAuthRole("채팅방제작");

		joinChattingGroup(chattingMember);

//		int memNo = group.getMemNo();
//		// 자신을 뺀 모든 유저의 List를 가져옴
//		List<MemberVO> memberList = mapper.getUserList(memNo);
//		Map<String , Object> map = new HashMap<String, Object>();
//		for (MemberVO member : memberList) {
//			map.put("senderMemNo", group.getMemNo());
//			map.put("userId", member.getMemId());
//			map.put("stNo", group.getGroupNo());
//			
//			// alarm테이블에 자신을 뺀 모든 유저에 대한 알림 추가 
//			mapper.insertAlarm(map);
//		}

		return "success";

	}

	// 해당 유저의 안읽은 알람 정보 가져오기
	@ResponseBody
	@PostMapping("/ChattingHome/getAlarmInfo")
	public List<AlarmVO> getAlarmInfo(HttpSession session) {
		MemberVO member = (MemberVO) session.getAttribute("member"); // 수정해야함

		List<AlarmVO> data = groupService.getAlarmInfo(member.getMemId());

		return data;
	}

	// 읽은 알람 삭제하기
	@ResponseBody
	@PostMapping("/studyHome/deleteAlarm")
	public ResponseEntity<String> deleteAlarm(int alarmNo) {
		groupService.deleteAlarm(alarmNo);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	// 스터디 가입하기
	@ResponseBody
	@PostMapping("/joinChatting")
	public ResponseEntity<String> joinChattingGroup(@RequestBody ChattingMemberVO member) {
		int result = groupService.joinChattingGroup(member);

		if (result > 0) {
			return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("FAILED", HttpStatus.BAD_REQUEST);
		}
	}

	// 스터디 그룹 나가기
	@ResponseBody
	@PostMapping("/outChatting")
	public ResponseEntity<String> outStudyGroup(@RequestBody Map<String, String> map) {
		ChattingGroupVO chattingGroup = new ChattingGroupVO();

		int groupNo = Integer.parseInt(map.get("roomId"));
		chattingGroup.setGroupNo(groupNo);
		chattingGroup.setMemNo(Integer.parseInt(map.get("memNo")));

		int result = groupService.outChattingGroup(chattingGroup);

		if (result > 0) {
			return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
		} else {
			return new ResponseEntity<String>("FAILED", HttpStatus.BAD_REQUEST);
		}
	}

	// 모든 인원 가져오기
	@ResponseBody
	@PostMapping("/getMembers")
	public List<MemberVO> getMembers(@RequestBody Map<String, String> map) {

		List<MemberVO> memberList = groupService.getMembers();

		int groupNo = Integer.parseInt(map.get("groupNo"));

		List<ChattingMemberVO> list = groupService.getChattingMember(groupNo);

		for (int i = 0; i < memberList.size(); i++) {
			for (int j = 0; j < list.size(); j++) {
				log.info(memberList.get(i).getMemId());

				if (memberList.get(i).getMemId().equals(list.get(j).getMemNo())) {
					memberList.remove(i); // 이미 초대된 인원 빼기
					i--;
					break;
				}
			}
		}
		return memberList;
	}

	// 초대하기
	@PostMapping("/join")
	public ResponseEntity<String> join(@RequestBody List<Integer> data) {

		ResponseEntity<String> result = null;
		int groupNo = data.get(0);

		for (int i = 1; i < data.size(); i++) {
			MemberVO member = new MemberVO();
			log.info("id : " + data.get(i));
			member.setMemNo(data.get(i));

			member = groupService.getUser(member);

			ChattingMemberVO chattingMember = new ChattingMemberVO();
			chattingMember.setGroupNo(groupNo);
			chattingMember.setMemNo(member.getMemNo());
			chattingMember.setUserName(member.getMemName());
			chattingMember.setAuthRole("채팅원");

			joinChattingGroup(chattingMember);
		}

		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	private String uploadFile(String originalName, byte[] fileData) throws Exception {
		UUID uuid = UUID.randomUUID();
		String savedName = uuid.toString() + "_" + originalName;

		// OS에 따라 파일 경로 설정
		String os = System.getProperty("os.name").toLowerCase();
		if (os.contains("mac")) {
			localPath = uploadPathForMac;
		}

		// 폴더 경로를 만들고 경로를 리턴
		File file = new File(localPath + "chattingGroup/");
		if (!file.exists()) {
			file.mkdirs();
		}

		File target = new File(localPath + "chattingGroup/", savedName);
		FileCopyUtils.copy(fileData, target);

		String uploadedFileName = resourcePath + "chattingGroup/" + savedName;

		return uploadedFileName; // 상대 경로 반환
	}

	// 파일 확장자를 반환하는 메서드
	private String getFileExtension(String filename) {
		return filename.substring(filename.lastIndexOf(".") + 1);
	}

	@ResponseBody
	@PostMapping("/CreateChattingGroupByContact")
	public String CreateChattingGroupByContact(ChattingGroupVO group) {

		int memNo = group.getMemNo();
		String groupTitle = group.getGroupTitle();
		int inviteMemNo = group.getInviteMemNo();
		String groupImg = group.getGroupImg();

		ChattingGroupVO checkGroup = group;

		List<ChattingGroupVO> list = groupService.getGroupNo(checkGroup);

		for (int i = 0; i < list.size(); i++) {
			ChattingGroupVO groupVO = new ChattingGroupVO();
			
			groupVO.setGroupNo(list.get(i).getGroupNo());
			groupVO.setInviteMemNo(inviteMemNo);
			groupVO.setMemNo(memNo);
			
			int cnt = groupService.getCount(groupVO);
			
			if (cnt == 2) {
				return list.get(i).getGroupNo()+"";
			}
		}

		groupService.insertChatting(group);

		MemberVO member = new MemberVO();
		member.setMemNo(inviteMemNo);

		member = groupService.getUser(member);

		ChattingMemberVO chattingMember = new ChattingMemberVO();
		chattingMember.setGroupNo(group.getGroupNo());
		chattingMember.setMemNo(member.getMemNo());
		chattingMember.setUserName(member.getMemName());
		chattingMember.setAuthRole("채팅원");

		joinChattingGroup(chattingMember);

		// 채팅방장
		member = new MemberVO();
		member.setMemNo(memNo);

		member = groupService.getUser(member);

		chattingMember = new ChattingMemberVO();
		chattingMember.setGroupNo(group.getGroupNo());
		chattingMember.setMemNo(member.getMemNo());
		chattingMember.setUserName(member.getMemName());
		chattingMember.setAuthRole("채팅방제작");

		joinChattingGroup(chattingMember);

		return group.getGroupNo()+"";
	}
}
