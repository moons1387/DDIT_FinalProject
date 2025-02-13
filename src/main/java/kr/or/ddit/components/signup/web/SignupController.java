package kr.or.ddit.components.signup.web;

import java.io.File;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.annotation.Resource;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import kr.or.ddit.ServiceResult;
import kr.or.ddit.components.signup.service.ISignupService;
import kr.or.ddit.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/login")
public class SignupController { 
	
	// root-context.xml 에서 설정한 uploadPath라는 이름으로 빈 등록 된 value의 경로 값을 가져온다.
	@Resource(name="uploadPath")
	private String resourcePath;
 
	@Resource(name="localPath")
	private String localPath;
	
	@Resource(name="uploadPathForMac")
	private String uploadPathForMac;
	
	@Inject
	private ISignupService signupService;
	
	private static final Logger log = LoggerFactory.getLogger(SignupController.class);
	
	@Inject
	private PasswordEncoder pe;
	
	@PostConstruct
	public void init() {
		log.info("##### 암호화된 비밀번호 : " + pe.encode("1234"));
	}
	
	@RequestMapping(value = "/signup_terms.do", method=RequestMethod.GET)
	public String SynerHubSignupTerms() {
		return "login/terms";
	}
	
	@PostMapping("/signup_terms.do")
	public String termsSubmit(@RequestParam boolean checkAll,
			MemberVO memberVO, 
			RedirectAttributes ra, Model model) {
		log.info("termsSubmit() 실행...!");
	    log.info("이용약관 동의!!!", checkAll);
	    model.addAttribute("member", memberVO);
	    
		if(!checkAll) {
			return "login/terms";
		}
		return "login/signup";
	}
	
	@RequestMapping(value = "/signup.do", method=RequestMethod.GET)
	public String SynerHubSignup() {
		return "login/signup";
	}
	
	@PostMapping("/signup.do")
	public String signup(MemberVO memberVO, 
			RedirectAttributes ra, Model model) {
		log.info("signup() 실행...!");
	    log.info("회원가입 입력 정보: {}", memberVO);
	    model.addAttribute("member", memberVO);
	    
	    return "login/profile"; // 프로필 페이지로 이동
	}
	
	@RequestMapping(value = "/signup_pf.do", method=RequestMethod.GET)
	public String SynerHubSignupProfile() {
		return "login/profile";
	}
	
	@PostMapping("/signup_pf.do")
	public String signupProfile(MemberVO memberVO,
			RedirectAttributes ra, HttpServletRequest req,
			Model model) throws Exception {
		log.info("signupProfile() 실행...!");
		log.info("회원가입 정보: {}", memberVO);
		String goPage = "";
		Map<String, String> errors = new HashMap<String, String>();
//		if(StringUtils.isBlank(memberVO.getMemId())) {
//			errors.put("memId", "아이디를 입력해주세요.");
//		}
//		if(StringUtils.isBlank(memberVO.getMemPw())) {
//			errors.put("memPw", "비밀번호를 입력해주세요.");
//		}
//		if(StringUtils.isBlank(memberVO.getMemPw())) {
//			errors.put("memName", "이름을 입력해주세요.");
//		}
		
		if(errors.size() > 0) {	// 에러 발생
			model.addAttribute("errors", errors);
			model.addAttribute("member", memberVO);
			goPage = "login/profile";
		}else {					// 정상적인 데이터
			
			// MultipartFile을 통해 파일 정보 가져오기
	        MultipartFile file = memberVO.getImgFile();
	        if (file != null && !file.isEmpty()) {
	            log.info("originalFileName : {}", file.getOriginalFilename());
	            log.info("size : {}", file.getSize());
	            log.info("contentType : {}", file.getContentType());

	            // 파일 업로드 진행
	            String createdFileName = uploadFile(file.getOriginalFilename(), file.getBytes());
	            memberVO.setMemPrflimg(createdFileName); // 파일 경로 설정
	        }
			
			ServiceResult result = signupService.signupProfile(req, memberVO);
			if(result.equals(ServiceResult.OK)) {	
				goPage = "redirect:/login.do";
				log.info("회원가입 완료 정보: {}", memberVO);
			}else {
				model.addAttribute("message", "서버에러, 다시 시도해주세요!");
				model.addAttribute("member", memberVO);
				goPage = "login/profile";
			}
		}
		return goPage;
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

	@ResponseBody
	@PostMapping("/idCheck.do")
	public ResponseEntity<ServiceResult> idCheck(
			@RequestBody Map<String, String> map){
		log.info("idCheck() 실행...!");
		log.info("넘겨받은 아이디 : " + map.get("memId"));
		ServiceResult result = signupService.idCheck(map.get("memId"));
		return new ResponseEntity<ServiceResult>(result, HttpStatus.OK);
	}
	
	
	// 일반회원 회원가입 - 휴대폰 번호 인증 api
	@RequestMapping(value = "/phoneCheck", method = RequestMethod.GET)
	@ResponseBody 
	public String sendSMS(@RequestParam("memPh") String userPhoneNumber) {	// 휴대폰 문자보내기
		
		String flag = "sign";
		
		String result = signupService.phoneCheck(userPhoneNumber);
		if("error".equals(result)) {
			return "phError";
		}
		
		log.info("userPhoneNumber() 실행...!" + userPhoneNumber);
		int randomNumber = (int)((Math.random()* (9999 - 1000 + 1)) + 1000);	//난수 생성

		signupService.certifiedPhoneNumber(userPhoneNumber,randomNumber, flag);
		
		return Integer.toString(randomNumber);
	}
	
	@ResponseBody
	@PostMapping("/signAdmin")
	public ResponseEntity<ServiceResult> signAdmin(
			@RequestBody MemberVO memberVO){
		log.info("signAdmin() 실행" + memberVO);
		ServiceResult result = signupService.signAdmin(memberVO);
		return new ResponseEntity<ServiceResult>(result, HttpStatus.OK);
	}
	

}
