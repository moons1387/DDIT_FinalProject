package kr.or.ddit.components.chatting.web;

import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.board.qna.vo.QnaVO;
import kr.or.ddit.components.chatting.service.IChatService;
import kr.or.ddit.components.chatting.vo.ChatMessageVO;
import kr.or.ddit.components.chatting.vo.ChattingGroupVO;
import kr.or.ddit.components.chatting.vo.ChattingMemberVO;
import kr.or.ddit.components.declaration.web.MediaUtils;
import kr.or.ddit.components.declaration.web.UploadFileUtiles;
import kr.or.ddit.components.file.service.IAtchFileService;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import kr.or.ddit.components.file.vo.AtchFileVO;
import kr.or.ddit.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/chat")
public class ChatController {
	
	@Resource(name = "localPath")
	private String localPath;

	@Resource(name = "uploadPath")
	private String resourcePath;

	@Resource(name = "uploadPathForMac")
	private String uploadPathForMac;
	
	@Inject
	private IAtchFileService atchFileService;

	@Inject
	private IChatService chatService;

	// 채팅방 폼으로 이동
	@RequestMapping(value = "chathome", method = RequestMethod.GET)
	public String chatForm() {
		return "chat";
	}

	// 채팅방 리스트 가져오기 ajax
	@ResponseBody
	@PostMapping("/getChattingList")
	public ResponseEntity<List<ChattingGroupVO>> getChatList(@RequestBody Map<String, String> map) {
		MemberVO memberVO = new MemberVO();
		memberVO.setMemNo(Integer.parseInt(map.get("memNo")));

		int memNo = memberVO.getMemNo();
		log.info("memNo" + memNo);

		// 해당 유저가 속해있는 채팅방 가져오기
		List<ChattingGroupVO> list = chatService.getChattingGroupListById(memNo);
		return new ResponseEntity<List<ChattingGroupVO>>(list, HttpStatus.OK);
	}

	// 채팅방 마지막 메세지 가져오기 ajax
	@ResponseBody
	@GetMapping("/getLastMsgList")
	public ResponseEntity<List<ChatMessageVO>> getLastMsgList() {
		// 해당 유저가 속해있는 채팅방 마지막 메세지 가져오기
		List<ChatMessageVO> list = chatService.getLastMsgList();
		return new ResponseEntity<List<ChatMessageVO>>(list, HttpStatus.OK);
	}

	@ResponseBody // 객체를 응답 데이터로 보내기위한 어노테이션 (default 데이터 형식 json)
	@RequestMapping(value = "{groupNo}.do")
	public ResponseEntity<List<ChatMessageVO>> messageList(@PathVariable int groupNo, String memNo) {
		// 해당 방의 매시지 리스트 가져오기
		List<ChatMessageVO> list = chatService.messageList(groupNo);
		log.info("list : " + list);
		// userId 는 안읽은 메시지 처리 위해서 받아온건데 1:1이 아니라 멀티 채팅방일때 생각중
		return new ResponseEntity<List<ChatMessageVO>>(list, HttpStatus.OK);
	}

	@ResponseBody
	@RequestMapping(value = "/chattingmember.do")
	public ResponseEntity<List<ChattingMemberVO>> getChattingMember(int stNo) {
		// 해당 방의 멤버 리스트 가져오기
		List<ChattingMemberVO> list = chatService.getChattingMember(stNo);
		return new ResponseEntity<List<ChattingMemberVO>>(list, HttpStatus.OK);
	}

	@ResponseBody
	@RequestMapping(value = "/getChatCnt.do")
	public ResponseEntity<Integer> getChatCnt(String memId) {
		// 해당 유저의 안읽은 메시지 개수 가져오기
		int chatCnt = chatService.getChatCnt(memId);
		return new ResponseEntity<Integer>(chatCnt, HttpStatus.OK);
	}
	
	@PostMapping("/saveFiles")
    public ResponseEntity<Integer> saveFiles(ChatMessageVO chatMessageVO) {
        log.info("insertQna() 실행 !!!");
        
        int memCnt = chatService.getMemberCount(chatMessageVO.getGroupNo());
        chatMessageVO.setUnreadCount(memCnt);

        // 첨부파일 정보 등록
        AtchFileVO atchFileVO = new AtchFileVO();
        atchFileVO.setAtchFileExpln("chat");

        // 첨부파일 정보를 DB에 저장하고 ID를 받아옴
        atchFileService.insert(atchFileVO);
        int atchFileId = atchFileVO.getAtchFileId();
        
        // 첨부파일 리스트가 있을 경우
        if (chatMessageVO.getChatFileList() != null && !chatMessageVO.getChatFileList().isEmpty()) {
            for (MultipartFile file : chatMessageVO.getChatFileList()) {
                if (!file.isEmpty()) {
                    try {
                        // 파일 저장
                        String savedPath = uploadFile(file.getOriginalFilename(), file.getBytes(), chatMessageVO.getGroupNo());

                        // AtchFileDetailVO 객체 생성 및 속성 설정
                        AtchFileDetailVO atchFileDetailVO = new AtchFileDetailVO();
                        atchFileDetailVO.setAtchFileId(atchFileId); // 받아온 ID 설정
                        atchFileDetailVO.setAtchFilePath(savedPath);
                        atchFileDetailVO.setAtchFileOrgnlNm(file.getOriginalFilename());
                        atchFileDetailVO.setAtchFileSize((Long) file.getSize());
                        atchFileDetailVO.setAtchFileExtn(getFileExtension(file.getOriginalFilename()));
                        atchFileDetailVO.setAtchFileSaveNm(savedPath.substring(savedPath.lastIndexOf("/") + 1));

                        // DB에 파일 상세 정보 저장
                        atchFileService.insertDetail(atchFileDetailVO);
                    } catch (Exception e) {
                        log.error("저장 오류: {}", e.getMessage());
                        
                    }
                }
            }
        }
        chatMessageVO.setMessageContent("file");
        chatMessageVO.setMsgFileId(atchFileId);
        chatService.insertMessage(chatMessageVO);

        return new ResponseEntity<Integer>(atchFileId, HttpStatus.OK);
    }
	
	@PostMapping("/getFile")
    public ResponseEntity<List<AtchFileDetailVO>> getFiles(@RequestBody AtchFileDetailVO atchFileDetailVO) {
		
		log.info("atchFileDetailVO.getAtchFileId() : " + atchFileDetailVO.getAtchFileId());
		
		List<AtchFileDetailVO> list = atchFileService.getDetail(atchFileDetailVO.getAtchFileId());
		
		return new ResponseEntity<List<AtchFileDetailVO>>(list, HttpStatus.OK);
	}
	
	// 파일 업로드를 위한 static method
    private String uploadFile(String originalName, byte[] fileData, int groupNo) throws Exception {
        UUID uuid = UUID.randomUUID();
        String savedName = uuid.toString() + "_" + originalName;

        // OS에 따라 파일 경로 설정
        String os = System.getProperty("os.name").toLowerCase();
        if (os.contains("mac")) {
            localPath = uploadPathForMac;
        }

        // 폴더 경로를 만들고 경로를 리턴
        String savedPath = UploadFileUtiles.calcPath(localPath);
        File file = new File(localPath + "chat/" + groupNo + "/" + savedPath);
        if (!file.exists()) {
            file.mkdirs();
        }

        File target = new File(localPath + "chat/" + groupNo + "/"  + savedPath.replaceFirst("/", ""), savedName);
        FileCopyUtils.copy(fileData, target);

        String uploadedFileName = resourcePath + "chat/" + groupNo + savedPath.replace(File.separatorChar, '/') + "/" + savedName;

        return uploadedFileName; // 상대 경로 반환
    }

    // 파일 확장자를 반환하는 메서드
    private String getFileExtension(String filename) {
        return filename.substring(filename.lastIndexOf(".") + 1);
    }
    
    @PostMapping("/getOnlyFile")
    public ResponseEntity<List<AtchFileDetailVO>> getOnlyFile(@RequestBody ChattingGroupVO chattingGroupVO) {
		
		log.info("chattingGroupVO : " + chattingGroupVO);
		
		List<AtchFileDetailVO> list = atchFileService.getOnlyFile(chattingGroupVO);
		
		return new ResponseEntity<List<AtchFileDetailVO>>(list, HttpStatus.OK);
	}
    

}
