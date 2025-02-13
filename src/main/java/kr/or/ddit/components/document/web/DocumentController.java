package kr.or.ddit.components.document.web;

import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import kr.or.ddit.components.channel.service.IChannelService;
import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.channel.vo.ChannelThreadVO;
import kr.or.ddit.components.channel.vo.ChannelVO;
import kr.or.ddit.components.document.service.IDocumentService;
import kr.or.ddit.components.document.vo.AplnVO;
import kr.or.ddit.components.document.vo.DocumentVO;
import kr.or.ddit.components.project.vo.ProjectDetailVO;
import kr.or.ddit.vo.PagingVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/document")
public class DocumentController {

	@Inject
	private IDocumentService service;
	
	@Inject
	private IChannelService channelService;
	
	// 문서의 리스트를 조회 post방식으로 body에 파라미터를 담음
	@PostMapping("/list")
	public ResponseEntity<PagingVO<DocumentVO>> docList(@RequestBody PagingVO<DocumentVO> page){
		// 페이징 처리를 위한 VO에 필수파라미터(현제 페이지)를 넘겨줌
		page.setTotal(service.getTotal(page));
		page.setList(service.getDocList(page));
		
		return new ResponseEntity<PagingVO<DocumentVO>>(page, HttpStatus.OK);
	}

	// 결재의 상황을 확인할 수 있는 문서의 리스트를 조회함
	@PostMapping("/currentlist")
	public ResponseEntity<PagingVO<DocumentVO>> docCurrentList(@RequestBody PagingVO<DocumentVO> page) {
		
		page.setTotal(service.getDocTotalByStat(page));
		page.setList(service.getDocListByStat(page));
		
		return new ResponseEntity<PagingVO<DocumentVO>>(page, HttpStatus.OK);
	}
	
	// 결재를 해야할 문서의 리스트를 조회
	@PostMapping("/currentapprovallist")
	public ResponseEntity<PagingVO<DocumentVO>> docApprovalList(@RequestBody PagingVO<DocumentVO> page) {
		
		page.setTotal(service.getDocApprovalTotal(page));
		page.setList(service.getDocApprovalList(page));
		// 문자열로 문서의 상태를 확인하기 위한 파라미터를 추가한다.
		page.setStat("toApprove");
		
		return new ResponseEntity<PagingVO<DocumentVO>>(page, HttpStatus.OK);
	}
	
	// 결재가 완료된 문서의 리스트를 조회
	@PostMapping("/completelist")
	public PagingVO<DocumentVO> docCompleteList(@RequestBody PagingVO<DocumentVO> page) {
		
		page.setTotal(service.getDocCompleteTotal(page));
		page.setList(service.getDocCompleteList(page));
		page.setStat("complete");
		
		return page;
	}
	
	// 문서를 등록
	@PostMapping("/insert")
	public ResponseEntity<DocumentVO> docInsert(@RequestBody DocumentVO docVO) {
		
		service.docInsert(docVO);
		// 등록된 문서의 키값이 VO에 저장됨

		// 등록후 상세페이지 이동을 위해 세부정보를 받아옴
		docVO = service.getDocDetail(docVO.getDocNo());
		docVO.setFileList(service.getDocFileList(docVO.getDocNo()));
		
		return new ResponseEntity<DocumentVO>(docVO, HttpStatus.OK);
	}
	
	// 문서의 상세페이지를 조회 get방식을 사용해 문서번호를 쿼리스트링으로 받음
	@GetMapping("/detail/{no}")
	public ResponseEntity<DocumentVO> docDetail(@PathVariable int no) {
		
		DocumentVO docVO = service.getDocDetail(no);
		
		// 첨부파일 리스트의 길이를 확인해 있다면 파일리스트를 가져옴
		if(service.getDocFileList(no).size() > 0) {
			docVO.setFileList(service.getDocFileList(no));
 		}
		
		return new ResponseEntity<DocumentVO>(docVO, HttpStatus.OK);
	}
	
	// 결재선 등록 화면에 필요한 정보를 조회
	@PostMapping(value = "/autographerlist")
	public ResponseEntity<List<ChannelMemberVO>> getAutographer(@RequestBody ChannelThreadVO ctVO) {
		// ctVO == {MEM_NO, CH_MEM_NM, cm.CH_ROLE, CH_ROLE_NM, CH_MEM_TH_NO, CH_MEM_TH_NM, CH_PRF_IMG, ch.ch_ttl}
		List<ChannelMemberVO> list = service.getAutographer(ctVO);
		return new ResponseEntity<List<ChannelMemberVO>>(list, HttpStatus.OK);
	}
	
	// 상신된 문서를 반려
	@GetMapping("/cancle/{no}")
	public String cancleDocument (@PathVariable int no) {
		String res = "";
		
		// 상태 변경에 성공 실패 분기를 나눔
		if(service.cancleDocument(no) > 0) {
			res = "Y";
		} else {
			res = "N";
		}
		
		return res;
	}
	
	// 상신한 문서를 회수
	@GetMapping("/return/{no}")
	public String returnDocument (@PathVariable int no) {
		String res = "";
		
		if(service.returnDocument(no) > 0) {
			res = "Y";
		} else {
			res = "N";
		}
		
		return res;
	}
	
	// 문서의 상태별로 리스트를 조회
	@PostMapping("/getdoclistbystat")
	public PagingVO<DocumentVO> getDocListByStat (@RequestBody PagingVO<DocumentVO> pagingVO) {
		
		pagingVO.setTotal(service.getDocTotalByStat(pagingVO));
		pagingVO.setList(service.getDocListByStat(pagingVO));
		
		return pagingVO;
	}
	
	// 반려 또는 회수한 문서를 수정
	@PostMapping("/update")
	public DocumentVO docUpdate(@RequestBody DocumentVO docVO) {
		
		service.docUpdate(docVO);
		docVO = service.getDocDetail(docVO.getDocNo());
		docVO.setFileList(service.getDocFileList(docVO.getDocNo()));
		
		return docVO;
	}
	
	// 상신받은 문서를 결재
	@PostMapping("/approve")
	public String docApprove(@RequestBody AplnVO aplnVO) {
		String res = "";
		if(service.docApprove(aplnVO) > 0) {
			res = "Y";
		} else {
			res = "N";
		}
		return res;
	}
	
	// 상신받은 문서를 반려
	@PostMapping("/reject")
	public String docReject(@RequestBody DocumentVO docVO) {
		
		log.info(docVO.toString());
		log.info(docVO.getAplnList().get(0).toString());
		
		String res = "";
		if(service.docReject(docVO) > 0) {
			res = "Y";
		} else {
			res = "N";
		}
		return res;
	}
	
	// 문서 메인페이지에 보여질 문서 리스트(상태별 최신 문서 5개)를 조회
	@PostMapping("/main")
	public Map<String, PagingVO<DocumentVO>> docMain (@RequestBody PagingVO<DocumentVO> page) {
		return service.getMainDocList(page);
	}
	
	@PostMapping("/getChAndTh")
	public ChannelVO getChAndTh(@RequestBody ChannelVO channelVO) {
		return channelService.getChAndTh(channelVO);
	}
	
	
}
