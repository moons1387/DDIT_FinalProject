package kr.or.ddit.components.edit.web;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.channel.vo.ChannelVO;
import kr.or.ddit.components.declaration.vo.DeclarationVO;
import kr.or.ddit.components.member.service.IMemberService;
import kr.or.ddit.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/profile")
public class EditController {
	
	@Resource(name="uploadPath")
	private String resourcePath;
 
	@Resource(name="localPath")
	private String localPath;
	
	@Resource(name="uploadPathForMac")
	private String uploadPathForMac;
	
	@Inject
	private IMemberService service; 
	
	@Inject
	private PasswordEncoder pe;
	
	@PostConstruct
	public void init() {
		log.info("##### 암호화된 비밀번호 : " + pe.encode("1234"));
	}
	
	@ResponseBody
	@PostMapping("/getUser")
	public MemberVO getUser(@RequestBody MemberVO memberVO) {
		log.info("getUser" + memberVO);
		
		memberVO = service.getUser(memberVO);
		
		return memberVO;
	}
	
	
	@RequestMapping(value = "/saveUser", method = {RequestMethod.GET, RequestMethod.POST})
    public ResponseEntity<String> saveUserProfile(MemberVO memberVO) throws Exception {
		
		log.info("saveUserProfile() 실행 !!! ");
        log.info("saveUserProfile: " + memberVO);
        
        MultipartFile file = memberVO.getImgFile();
        if (file != null && !file.isEmpty()) {
            log.info("originalFileName : {}", file.getOriginalFilename());
            log.info("size : {}", file.getSize());
            log.info("contentType : {}", file.getContentType());

            // 파일 업로드 진행
            String createdFileName = uploadFile(file.getOriginalFilename(), file.getBytes());
            memberVO.setMemPrflimg(createdFileName); // 파일 경로 설정
        }
        
        try {
            service.editProfile(memberVO); // 프로필 업데이트 서비스 호출
            return ResponseEntity.ok("프로필이 성공적으로 저장되었습니다.");
        } catch (Exception e) {
            log.error("프로필 저장 오류 ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("저장 중 오류가 발생했습니다.");
        }
    }
	
	private String uploadFile(String originalFilename, byte[] bytes) throws Exception {
		log.info("uploadFile in...!");
	 	UUID uuid = UUID.randomUUID();	// UUID로 파일명 생성
	 	
	 	// UUID_원본파일명
	 	String createdFileName = uuid.toString() + "_" + originalFilename;
	 	
	 	String os = System.getProperty("os.name").toLowerCase();
	 	if(os.contains("mac")) {
	 		localPath = "/Users/upload"; 
	 	} 
	 	
	 	// localPath 활용
	 	File file = new File(localPath + "profile/");
	 	if(!file.exists()) {
	 		file.mkdirs();
	 	}
	 	File target = new File(localPath + "profile/", createdFileName);	// 파일 업로드 준비
	 	FileCopyUtils.copy(bytes, target);		// 파일 복사
	 	return resourcePath + "profile/" + createdFileName;
	}
	
	@ResponseBody
	@PostMapping("/getChList")
	public List<ChannelMemberVO> getChList(@RequestBody MemberVO memberVO) {
		log.info("getUser" + memberVO);
		
		List<ChannelMemberVO> list = service.getChList(memberVO);
		
		return list;
	}
	
	@ResponseBody
	@PostMapping("/getDelList")
	public List<DeclarationVO> getDelList(@RequestBody DeclarationVO declarationVO) {
		log.info("getUser" + declarationVO);
		
		List<DeclarationVO> list = service.getDelList(declarationVO);
		
		return list;
	}
}
