package kr.or.ddit.components.admin.customerService.faq;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import kr.or.ddit.ServiceResult;
import kr.or.ddit.components.board.faq.service.IFaqService;
import kr.or.ddit.components.board.faq.vo.FaqVO;
import kr.or.ddit.components.file.service.IAtchFileService;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/admin")
public class AdminFaqController {
	
	@Resource(name = "localPath")
	private String localPath;

	@Resource(name = "uploadPath")
	private String resourcePath;

	@Resource(name = "uploadPathForMac")
	private String uploadPathForMac;
	
	@Inject
	private IFaqService faqService;
	
	@Inject
	private IAtchFileService atchFileService;
	
	@GetMapping("/faq")
	public String faq(Model model) {
		log.info("faq() 실행 !!!");

		List<FaqVO> faqList = faqService.faqList();
		List<Integer> faqCate = new ArrayList<Integer>();

		for (FaqVO faq : faqList) {
			int cate = faq.getFaqCategory();
			if (!faqCate.contains(cate)) {
				faqCate.add(cate);
			}
		}
		Collections.sort(faqCate);

		model.addAttribute("faqList", faqList);
		model.addAttribute("faqCategory", faqCate);
		log.info("faqList: {}", faqList);
		log.info("faqCategory: {}", faqCate);

		return "admin/faq";
	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@GetMapping("/faqForm")
	public String faqInsertForm() {
		return "admin/faqInsert";
	}

	@PostMapping("/faqInsert")
	public String faqInsert(HttpServletRequest req, FaqVO faqVO, Model model) {
		String goPage = "";

		Map<String, String> errors = new HashMap<String, String>();
		if (StringUtils.isBlank(faqVO.getFaqTtl())) { // 제목 데이터가 누락되었을 때
			errors.put("faqTtl", "제목을 입력해주세요!");
		}
		if (StringUtils.isBlank(faqVO.getFaqConts())) { // 내용 데이터가 누락되었을 때
			errors.put("faqConts", "내용을 입력해주세요!");
		}

		if (errors.size() > 0) { // 에러 발생
			model.addAttribute("errors", errors);
			model.addAttribute("faqVO", faqVO);
			goPage = "admin/faqInsert";

		} else {
			ServiceResult result = faqService.insertFaq(req, faqVO);
//
//			if(result.equals(ServiceResult.OK)) {
//				goPage = "redirect:/faq/detail?faqNo=" + faqVO.getFaqNo();
//
//			}else {
			if (result.equals(ServiceResult.OK)) {
				goPage = "redirect:/admin/faq";
			} else {
				model.addAttribute("message", "서버에러, 다시 시도해주세요!");
				goPage = "admin/faqInsert";
			}
		}
		return goPage;
	}

//	@PostMapping("/faqInsert")
//	public String faqInsert(HttpServletRequest req, @ModelAttribute FaqVO faqVO,
//			@RequestParam("faqFile") MultipartFile file, Model model) {
//		String goPage = "";
//
//		Map<String, String> errors = new HashMap<>();
//		if (StringUtils.isBlank(faqVO.getFaqTtl())) { // 제목 데이터가 누락되었을 때
//			errors.put("faqTtl", "제목을 입력해주세요!");
//		}
//		if (StringUtils.isBlank(faqVO.getFaqConts())) { // 내용 데이터가 누락되었을 때
//			errors.put("faqConts", "내용을 입력해주세요!");
//		}
//
//		if (errors.size() > 0) { // 에러 발생
//			model.addAttribute("errors", errors);
//			model.addAttribute("faqVO", faqVO);
//			goPage = "admin/faqInsert";
//		} else {
//			// 첨부파일 정보 등록
//			AtchFileVO atchFileVO = new AtchFileVO();
//			atchFileVO.setAtchFileExpln("faq"); // 설명 설정
//
//			// 첨부파일 정보를 DB에 저장하고 ID를 받아옴
//			atchFileService.insert(atchFileVO);
//			int atchFileId = atchFileVO.getAtchFileId();
//			log.info("atchFileId : " + atchFileId);
//
//			// 파일 처리
//			if (!file.isEmpty()) {
//				try {
//					String savedPath = uploadFile(file.getOriginalFilename(), file.getBytes()); // 파일 저장
//					AtchFileDetailVO atchFileDetailVO = new AtchFileDetailVO();
//					atchFileDetailVO.setAtchFileId(atchFileId); // 받아온 ID 설정
//					atchFileDetailVO.setAtchFilePath(savedPath);
//					atchFileDetailVO.setAtchFileOrgnlNm(file.getOriginalFilename());
//					atchFileDetailVO.setAtchFileSize((int) file.getSize());
//					atchFileDetailVO.setAtchFileExtn(getFileExtension(file.getOriginalFilename()));
//					atchFileDetailVO.setAtchFileSaveNm(savedPath);
//
//					// DB에 파일 상세 정보 저장
//					atchFileService.insertDetail(atchFileDetailVO);
//					faqVO.setFaqFilePath(savedPath); // FAQ VO에 파일 경로 추가
//				} catch (Exception e) {
//					model.addAttribute("message", "파일 저장 오류: " + e.getMessage());
//					model.addAttribute("faqVO", faqVO);
//					goPage = "admin/faqInsert";
//					return goPage;
//				}
//			}
//
//			// FAQ 데이터베이스에 삽입
//			ServiceResult result = faqService.insertFaq(req, faqVO);
//
//			if (result.equals(ServiceResult.OK)) {
//				goPage = "redirect:/admin/faq";
//			} else {
//				model.addAttribute("message", "서버에러, 다시 시도해주세요!");
//				model.addAttribute("faqVO", faqVO);
//				goPage = "admin/faqInsert";
//			}
//		}
//		return goPage;
//	}
//
//	// 파일 업로드를 위한 static method
//	private String uploadFile(String originalName, byte[] fileData) throws Exception {
//		UUID uuid = UUID.randomUUID();
//		String savedName = uuid.toString() + "_" + originalName;
//
//		// OS에 따라 파일 경로 설정
//		String os = System.getProperty("os.name").toLowerCase();
//		if (os.contains("mac")) {
//			localPath = uploadPathForMac; // Mac용 경로 설정
//		}
//
//		// 폴더 경로를 만들고 경로를 리턴
//		String savedPath = UploadFileUtiles.calcPath(localPath);
//		File file = new File(localPath + "faq/" + savedPath);
//		if (!file.exists()) {
//			file.mkdirs();
//		}
//
//		File target = new File(localPath + "faq/" + savedPath.replaceFirst("/", ""), savedName);
//		FileCopyUtils.copy(fileData, target);
//
//		return savedPath + "/" + savedName; // 상대 경로 반환
//	}
//
//	// 파일 확장자를 반환하는 메서드
//	private String getFileExtension(String filename) {
//		return filename.substring(filename.lastIndexOf(".") + 1);
//	}
//
//	// 파일 업로드를 위한 static method
//	private String uploadFile(String originalName, byte[] fileData) throws Exception {
//		UUID uuid = UUID.randomUUID();
//		String savedName = uuid.toString() + "_" + originalName;
//
//		// OS에 따라 파일 경로 설정
//		String os = System.getProperty("os.name").toLowerCase();
//		if (os.contains("mac")) {
//			localPath = uploadPathForMac; // Mac용 경로 설정
//		}
//
//		// 폴더 경로를 만들고 경로를 리턴
//		String savedPath = UploadFileUtiles.calcPath(localPath);
//		File file = new File(localPath + "faq/" + savedPath);
//		if (!file.exists()) {
//			file.mkdirs();
//		}
//
//		File target = new File(localPath + "faq/" + savedPath.replaceFirst("/", ""), savedName);
//		FileCopyUtils.copy(fileData, target);
//
//		return savedPath + "/" + savedName; // 상대 경로 반환
//	}

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@GetMapping("/faqUpdate")
	public String faqUpdateForm(int faqNo, Model model) {
		log.info("faqUpdateForm() 실행...!");

		FaqVO faqVO = faqService.selectFaq(faqNo);
		model.addAttribute("faqVO", faqVO);
		model.addAttribute("status", "u");

		return "admin/faqInsert";
	}

	@PostMapping("/faqUpdate")
	public String faqUpdate(RedirectAttributes ra, HttpServletRequest req, FaqVO faqVO, Model model) {
		log.info("faqUpdate() 실행...!");
		String goPage = "";
		ServiceResult result = faqService.updateFaq(req, faqVO);
		if (result.equals(ServiceResult.OK)) { // 수정 성공
			ra.addFlashAttribute("message", "수정이 완료되었습니다!");
			goPage = "redirect:/admin/faq";
		} else { // 수정 실패
			model.addAttribute("message", "수정에 실패하였습니다!");
			model.addAttribute("faqVO", faqVO);
			model.addAttribute("status", "u");
			goPage = "admin/faqInsert";
		}

		return goPage;
	}

	@PostMapping("/faqDelete")
	public String faqDelete(RedirectAttributes ra, HttpServletRequest req, int faqNo, Model model) {
		log.info("faqDelete() 실행...!");
		String goPage = "";
		ServiceResult result = faqService.deleteFaq(req, faqNo);
		if (result.equals(ServiceResult.OK)) { // 삭제 성공
			ra.addFlashAttribute("message", "삭제가 완료되었습니다!");
			goPage = "redirect:/admin/faq";
		} else { // 삭제 실패
			ra.addFlashAttribute("message", "서버에러, 다시 시도해주세요!");
			goPage = "redirect:/admin/faq";
		}
		return goPage;
	}

}
