package kr.or.ddit.components.project.web;

import java.util.Map;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.ddit.components.document.vo.DocumentVO;
import kr.or.ddit.components.project.service.IProjectService;
import kr.or.ddit.components.project.vo.ProjectDetailSubWrkVO;
import kr.or.ddit.components.project.vo.ProjectDetailVO;
import kr.or.ddit.components.project.vo.ProjectPrgrsInfoVO;
import kr.or.ddit.components.project.vo.ProjectVO;
import kr.or.ddit.vo.PagingVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/project")
public class ProjectController {

	@Inject
	private IProjectService service;
	
	// 프로젝트 리스트를 조회함
	@PostMapping("/list")
	public ResponseEntity<PagingVO<ProjectVO>> projectList(@RequestBody PagingVO<ProjectVO> page) {
		
		page.setTotal(service.getTotal(page));
		page.setList(service.getList(page));
		
		return new ResponseEntity<PagingVO<ProjectVO>>(page, HttpStatus.OK);
	}
	
	// 프로젝트 등록시 필요한 근거문서를 조회함
	@PostMapping("/dataforinsert")
	public PagingVO<DocumentVO> dataForInsert(@RequestBody PagingVO<DocumentVO> page) {
		return service.dataForInsert(page);
	}

	// 프로젝트를 등록함
	@PostMapping("/insert")
	public int projectInsert(@RequestBody ProjectVO pjtVO) {
		pjtVO = service.projectInsert(pjtVO);
		return pjtVO.getPjtNo();
	}
	
	// 프로젝트의 상태를 진행으로 변경
	@GetMapping("/go/{no}")
	public ResponseEntity<String> projectGo(@PathVariable long no) {
		String res = "";
		// 상태변경의 성공여부를 판별하기 위해 int값을 받음
		int cnt = service.projectGo(no);
		if(cnt > 0) {
			res = "Go Success";
		} else {
			res = "Go Fail";
		}
		return new ResponseEntity<String>(res, HttpStatus.OK);
	}
	
	// 프로젝트의 상태를 중단으로 변경
	@GetMapping("/stop/{no}")
	public ResponseEntity<String> projectStop(@PathVariable long no) {
		String res = "";
		int cnt = service.projectStop(no);
		if(cnt > 0) {
			res = "Stop Success";
		} else {
			res = "Stop Fail";
		}
		return new ResponseEntity<String>(res, HttpStatus.OK);
	}
	
	// 프로젝트의 상태를 종료로 변경
	@GetMapping("/terminate/{no}")
	public ResponseEntity<String> projectTerminate(@PathVariable long no) {
		String res = "";
		int cnt = service.projectTerminate(no);
		if(cnt > 0) {
			res = "Terminate Success";
		} else {
			res = "Terminate Fail";
		}
		return new ResponseEntity<String>(res, HttpStatus.OK);
	}
	
	// 프로젝트 세부업무 상태를 진행으로 변경
	@GetMapping("/detail/go/{no}")
	public ResponseEntity<String> projectDetailGo(@PathVariable long no) {
		String res = "";
		int cnt = service.projectDetailGo(no);
		if(cnt > 0) {
			res = "Go Success";
		} else {
			res = "Go Fail";
		}
		return new ResponseEntity<String>(res, HttpStatus.OK);
	}
	
	// 프로젝트 세부업무 상태를 중단으로 변경
	@GetMapping("/detail/stop/{no}")
	public ResponseEntity<String> projectDetailStop(@PathVariable long no) {
		String res = "";
		int cnt = service.projectDetailStop(no);
		if(cnt > 0) {
			res = "Stop Success";
		} else {
			res = "Stop Fail";
		}
		return new ResponseEntity<String>(res, HttpStatus.OK);
	}
	
	// 프로젝트 세부업무 상태를 종료로 변경
	@GetMapping("/detail/terminate/{no}")
	public ResponseEntity<String> projectDetailTerminate(@PathVariable long no) {
		String res = "";
		int cnt = service.projectDetailTerminate(no);
		if(cnt > 0) {
			res = "Terminate Success";
		} else {
			res = "Terminate Fail";
		}
		return new ResponseEntity<String>(res, HttpStatus.OK);
	}
	
	// 프로젝트를 수정함
	@PostMapping("/update")
	public ResponseEntity<ProjectVO> projectModify(ProjectVO pv) {
		return new ResponseEntity<ProjectVO>(service.updateProject(pv), HttpStatus.OK);
	}
	
	// 프로젝트의 세부업무를 조회함
	@PostMapping("/details")
	public ResponseEntity<PagingVO<ProjectVO>> projectDetailList(@RequestBody PagingVO<ProjectVO> page) {
		log.info("page : " + page);
		// 세부업무 목록을 페이징 VO로 전달 
		page.setProjectVO(service.getProject(page));
		page.setTotal(service.getProjectDetailTotal(page));
		page.setList(service.getProjectDetailList(page));
		
		return new ResponseEntity<PagingVO<ProjectVO>>(page, HttpStatus.OK);
	}
	
	// 프로젝트를 삭제함
	@GetMapping("/delete/{no}")
	public ResponseEntity<String> projectDelete(@PathVariable long no) {
		String res = "";
		if(service.deleteProject(no) < 1) {
			res = "Deleted";
		} else {
			res = "Failed";
		}
		return new ResponseEntity<String>(res, HttpStatus.OK);
	}
	
	// 프로젝트 하위업무를 등록함
	@PostMapping("/subworkinsert")
	public ProjectDetailVO insertDetail(@RequestBody ProjectDetailVO projectDetailVO) {
		return service.insertPjtDetail(projectDetailVO);
	}
	
	// 프로젝트 하위업무 리스트를 조회함
	@GetMapping("/getsubworklist/{no}")
	public ProjectDetailVO getPjtDtlSubWrkList(@PathVariable int no) {
		return service.getPjtDtlSubWrkList(no);
	}
	
	// 프로젝트 하위업무를 수정함
	@PostMapping("/uploadpds")
	public ProjectDetailSubWrkVO uploadPds(@RequestBody ProjectDetailSubWrkVO pdsVO) {
		return service.uploadPds(pdsVO);
	}
	
	// 프로젝트 하위업무의 진행도를 수정함
	@PostMapping("/updateprgrs")
	public Map<String, Object> uploadPrgrs(@RequestBody ProjectDetailVO pdVO) {
		return service.updatePrgrs(pdVO);
	}
	
	// 채널 홈페이지에서 진행중인 프로젝트 리스트를 조회함
	@PostMapping("/chprojectinfo")
	public PagingVO<ProjectPrgrsInfoVO> chProjectInfo(@RequestBody PagingVO<ProjectPrgrsInfoVO> page) {
		page.setList(service.getChProjectInfo(page));
		return page;
	}
	
}
