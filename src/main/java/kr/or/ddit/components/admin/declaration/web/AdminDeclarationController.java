package kr.or.ddit.components.admin.declaration.web;

import java.util.List;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.apache.commons.lang.StringUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.ddit.components.admin.declaration.service.IAdminDeclarationService;
import kr.or.ddit.components.admin.declaration.vo.AdminDeclarationStatsVO;
import kr.or.ddit.components.admin.declaration.vo.AdminDeclarationVO;
import kr.or.ddit.components.file.service.IAtchFileService;
import kr.or.ddit.vo.MemberVO;
import kr.or.ddit.vo.PaginationInfoVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/admin")
public class AdminDeclarationController {

	@Resource(name = "localPath")
	private String localPath;

	@Resource(name = "uploadPath")
	private String resourcePath;

	@Resource(name = "uploadPathForMac")
	private String uploadPathForMac;

	@Inject
	private IAdminDeclarationService adminDclrService;

	@Inject
	private IAtchFileService atchFileService;

	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@GetMapping("/dclrList")
	public String dclrList(
			@RequestParam(name = "currentPage", required = false, defaultValue = "1") int currentPage,
			@RequestParam(name = "searchType", required = false, defaultValue = "title") String searchType,
			@RequestParam(name = "searchWord", required = false) String searchWord, 
			Model model) {
//		log.info("dclrList() 실행...!");
		
		
		// 페이징 정보 객체 생성
		PaginationInfoVO<AdminDeclarationVO> pagingVO = new PaginationInfoVO<>(10, 5);
		
		// 검색 기능 추가
		if (StringUtils.isNotBlank(searchWord)) {
			pagingVO.setSearchWord(searchWord);
			pagingVO.setSearchType(searchType);
			model.addAttribute("searchWord", searchWord);
			model.addAttribute("searchType", searchType);
		}
//		log.info("searchWord : {}", searchWord);
//		log.info("searchType : {}", searchType);
		
		// 시작 끝 등을 결정
	    pagingVO.setCurrentPage(currentPage);
//	    log.info("currentPage", currentPage);
	    
		// 총 게시글 수를 이용하여 총 페이지수를 결정하기 위해 총 게시글 수인 totalRecord를 얻어옴
	    int totalRecord = adminDclrService.selectDclrCount(pagingVO);
		// totalPage를 설정
	    pagingVO.setTotalRecord(totalRecord);
		// 리스트 데이터를 가져옴
		List<AdminDeclarationVO> list = adminDclrService.dclrList(pagingVO);
	    pagingVO.setDataList(list);
	    
	    for (AdminDeclarationVO adminDeclarationVO : list) {
			adminDeclarationVO.setDclrHandledCount(adminDclrService.selectHandledCount(adminDeclarationVO));
			adminDeclarationVO.setDclrUnHandledCount(adminDclrService.selectUnHandledCount(adminDeclarationVO));
//			log.info("adminDeclarationVO : {}", adminDeclarationVO);
		}
		
	    model.addAttribute("pagingVO", pagingVO);
		model.addAttribute("list", list);
//		log.info("pagingVO : {} ", pagingVO);
//		log.info("list : {} ", list);
		
		return "admin/dclrList";
	}

	// 최근 신고내역
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@GetMapping("/dclrDetail")
	public String dclrDetail(int dclrNo, Model model) {
//      log.info("dclrDetail() 실행...!");

		AdminDeclarationVO adminDeclarationVO = adminDclrService.selectDclr(dclrNo);
		model.addAttribute("adminDeclarationVO", adminDeclarationVO);
//      log.info("adminDeclarationVO: {}", adminDeclarationVO);

		// 신고 대상자의 최근 신고 내역을 가져오는 메서드
//      log.info("recentDclr() 실행...!");

		List<AdminDeclarationVO> recentDclr = adminDclrService.getRecentDclr(adminDeclarationVO.getDclrSubId());
//      log.info("dclrSubId : {}", adminDeclarationVO.getDclrSubId());
		model.addAttribute("recentDclr", recentDclr);
//      log.info("recentDclr : {}", recentDclr);

		return "admin/dclrDetail";
	}

	// 최근 신고내역 상세보기
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@PostMapping("/rctDclrDetail/{dclrNo}")
	public ResponseEntity<AdminDeclarationVO> rctDclrDetail(@PathVariable int dclrNo) {
//      log.info("rctDclrDetail() 실행, dclrNo : {}", dclrNo);

		AdminDeclarationVO adminDeclarationVO = adminDclrService.rctDclrDetail(dclrNo);
//      log.info("adminDeclarationVO : {}",  adminDeclarationVO);

		return new ResponseEntity<AdminDeclarationVO>(adminDeclarationVO, HttpStatus.OK);
	}

	// 경고 횟수 증가 이벤트
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@PostMapping("/increaseWarningCount/{dclrSubId}")
	public ResponseEntity<Integer> increaseWarningCount(@PathVariable int dclrSubId) {
		int newWarningCount = adminDclrService.increaseWarningCount(dclrSubId);
		return new ResponseEntity<>(newWarningCount, HttpStatus.OK);
	}

	// 경고 횟수 감소 이벤트
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@PostMapping("/decreaseWarningCount/{dclrSubId}")
	public ResponseEntity<Integer> decreaseWarningCount(@PathVariable int dclrSubId) {
		int newWarningCount = adminDclrService.decreaseWarningCount(dclrSubId);
		return new ResponseEntity<>(newWarningCount, HttpStatus.OK);
	}

	// 블랙리스트 설정
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@PostMapping("/blackList")
	public ResponseEntity<String> blackList(@RequestBody AdminDeclarationVO adminDclVO) {
//		log.info("blakcList실행...!");
		adminDclrService.blackListInsert(adminDclVO);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	// 블랙리스트 페이지
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@GetMapping("/blackListManage")
	public String blackListManage(
			@RequestParam(name = "currentPage", required = false, defaultValue = "1") int currentPage,
			@RequestParam(name = "searchType", required = false, defaultValue = "title") String searchType,
			@RequestParam(name = "searchWord", required = false) String searchWord, 
			Model model) { 	
//		log.info("blackList() 실행...!");
		
		// 페이징 정보 객체 생성
		PaginationInfoVO<MemberVO> pagingVO = new PaginationInfoVO<>(10, 5);

		// 검색 기능 추가
		if (StringUtils.isNotBlank(searchWord)) {
			pagingVO.setSearchWord(searchWord);
			pagingVO.setSearchType(searchType);
			model.addAttribute("searchWord", searchWord);
			model.addAttribute("searchType", searchType);
		}
//		log.info("searchWord : {}", searchWord);
//		log.info("searchType : {}", searchType);
		
		// 시작 끝 등을 결정
	    pagingVO.setCurrentPage(currentPage);
//	    log.info("currentPage", currentPage);

	    // 총 게시글 수를 이용하여 총 페이지수를 결정하기 위해 총 게시글 수인 totalRecord를 얻어옴
	    int totalRecord = adminDclrService.selectBlackCount(pagingVO);
	    
		// totalPage를 설정
	    pagingVO.setTotalRecord(totalRecord);
		
		List<MemberVO> blackList = adminDclrService.blackListManage(pagingVO);
		pagingVO.setDataList(blackList);
		
		model.addAttribute("pagingVO", pagingVO);
		model.addAttribute("blackList", blackList);
//		log.info("pagingVO : {} ", pagingVO);
//		log.info("blackList : {} ", blackList);

		return "admin/blackListManage";
	}

	// 신고 차트
	@GetMapping("/dclrStats")
    public String dclrStats(Model model) {
		List<AdminDeclarationStatsVO> list = adminDclrService.dclrStats();
		
        model.addAttribute("dclrStats", list);
        return "admin/dclrList"; 
    }
	
	// 월별 차트
//	@GetMapping("/api/dclrdata/{month}")
//	@ResponseBody
//	public ResponseEntity<List<AdminDeclarationStatsVO>> getDclrStatsData(@PathVariable int month) {
//	    try {
//	        List<AdminDeclarationStatsVO> stats = adminDclrService.dclrStatsPerMonth(month);
//	        return ResponseEntity.ok(stats);
//	    } catch (Exception e) {
//	        e.printStackTrace();
//	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
//	    }
//	}
	
	// 연도별+월별 차트
	@GetMapping("/api/dclrdata/{year}/{month}")
	@ResponseBody
	public ResponseEntity<List<AdminDeclarationStatsVO>> getDclrStatsByYearAndMonth(@PathVariable int year, @PathVariable int month) {
	    try {
	        List<AdminDeclarationStatsVO> stats = adminDclrService.dclrStatsPerYearAndMonth(year, month);
	        return ResponseEntity.ok(stats);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}
	
	// 연도별 차트
	@GetMapping("/api/dclrdata/year/{year}")
	@ResponseBody
	public ResponseEntity<List<AdminDeclarationStatsVO>> getDclrStatsByYear(@PathVariable int year) {
	    try {
	        List<AdminDeclarationStatsVO> stats = adminDclrService.dclrStatsPerYear(year);
	        return ResponseEntity.ok(stats);
	    } catch (Exception e) {
	        e.printStackTrace();
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
	    }
	}


	
	
}
