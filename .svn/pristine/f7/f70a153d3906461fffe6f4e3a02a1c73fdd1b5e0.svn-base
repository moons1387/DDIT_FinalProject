package kr.or.ddit.components.admin;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.member.service.IMemberService;
import kr.or.ddit.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/admin")
public class AdminController {
	
	@Resource(name="uploadPath")
	private String resourcePath;
 
	@Resource(name="localPath")
	private String localPath;
	
	@Resource(name="uploadPathForMac")
	private String uploadPathForMac;

	@Inject
	private IMemberService service;

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@GetMapping("/home")
	public String main() {
		return "admin/home";
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@GetMapping("/management")
	public String adminMangement(Model model) {

		List<MemberVO> list = service.getAdminList();
		
		model.addAttribute("adminList", list);
		
		return "admin/adminManagement";
	}
	
	@PostMapping("/update")
	public String adminMangement(MemberVO memberVO, Model model) throws Exception {
		
		log.info("memberVO : " + memberVO);
		
		MultipartFile file = memberVO.getImgFile();
        if (file != null && !file.isEmpty()) {
            log.info("originalFileName : {}", file.getOriginalFilename());
            log.info("size : {}", file.getSize());
            log.info("contentType : {}", file.getContentType());

            // 파일 업로드 진행
            String createdFileName = uploadFile(file.getOriginalFilename(), file.getBytes());
            memberVO.setMemPrflimg(createdFileName); // 파일 경로 설정
        }
		
		service.adminUpdate(memberVO);

		return "redirect:/admin/management";
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
	 	
	 	localPath = localPath + "profile/";
	 	resourcePath = resourcePath + "profile/";
	 	
	 	// localPath 활용
	 	File file = new File(localPath);
	 	if(!file.exists()) {
	 		file.mkdirs();
	 	}
	 	File target = new File(localPath, createdFileName);	// 파일 업로드 준비
	 	FileCopyUtils.copy(bytes, target);		// 파일 복사
	 	return resourcePath + createdFileName;
	}

}
