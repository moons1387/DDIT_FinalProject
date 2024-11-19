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
	
	@PostMapping("/list")
	public ResponseEntity<PagingVO<DocumentVO>> docList(@RequestBody PagingVO<DocumentVO> page){
		
		page.setTotal(service.getTotal(page));
		page.setList(service.getDocList(page));
		
		return new ResponseEntity<PagingVO<DocumentVO>>(page, HttpStatus.OK);
	}

	@PostMapping("/currentlist")
	public ResponseEntity<PagingVO<DocumentVO>> docCurrentList(@RequestBody PagingVO<DocumentVO> page) {
		
		page.setTotal(service.getDocTotalByStat(page));
		page.setList(service.getDocListByStat(page));
		
		return new ResponseEntity<PagingVO<DocumentVO>>(page, HttpStatus.OK);
	}
	
	@PostMapping("/currentapprovallist")
	public ResponseEntity<PagingVO<DocumentVO>> docApprovalList(@RequestBody PagingVO<DocumentVO> page) {
		
		page.setTotal(service.getDocApprovalTotal(page));
		page.setList(service.getDocApprovalList(page));
		page.setStat("toApprove");
		
		return new ResponseEntity<PagingVO<DocumentVO>>(page, HttpStatus.OK);
	}
	
	@PostMapping("/completelist")
	public PagingVO<DocumentVO> docCompleteList(@RequestBody PagingVO<DocumentVO> page) {
		
		page.setTotal(service.getDocCompleteTotal(page));
		page.setList(service.getDocCompleteList(page));
		page.setStat("complete");
		
		return page;
	}
	
	@PostMapping("/insert")
	public ResponseEntity<DocumentVO> docInsert(@RequestBody DocumentVO docVO) {
		
		service.docInsert(docVO);
		
		docVO = service.getDocDetail(docVO.getDocNo());
		docVO.setFileList(service.getDocFileList(docVO.getDocNo()));
		
		return new ResponseEntity<DocumentVO>(docVO, HttpStatus.OK);
	}
	
	@GetMapping("/detail/{no}")
	public ResponseEntity<DocumentVO> docDetail(@PathVariable int no) {
		
		DocumentVO docVO = service.getDocDetail(no);
		if(service.getDocFileList(no).size() > 0) {
			docVO.setFileList(service.getDocFileList(no));
 		}
		
		return new ResponseEntity<DocumentVO>(docVO, HttpStatus.OK);
	}
	
	@PostMapping(value = "/autographerlist")
	public ResponseEntity<List<ChannelMemberVO>> getAutographer(@RequestBody ChannelThreadVO ctVO) {
		List<ChannelMemberVO> list = service.getAutographer(ctVO);
		return new ResponseEntity<List<ChannelMemberVO>>(list, HttpStatus.OK);
	}
	
	@GetMapping("/cancle/{no}")
	public String cancleDocument (@PathVariable int no) {
		String res = "";
		
		if(service.cancleDocument(no) > 0) {
			res = "Y";
		} else {
			res = "N";
		}
		
		return res;
	}
	
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
	
	@PostMapping("/getdoclistbystat")
	public PagingVO<DocumentVO> getDocListByStat (@RequestBody PagingVO<DocumentVO> pagingVO) {
		
		pagingVO.setTotal(service.getDocTotalByStat(pagingVO));
		pagingVO.setList(service.getDocListByStat(pagingVO));
		
		return pagingVO;
	}
	
	@PostMapping("/update")
	public DocumentVO docUpdate(@RequestBody DocumentVO docVO) {
		
		service.docUpdate(docVO);
		docVO = service.getDocDetail(docVO.getDocNo());
		docVO.setFileList(service.getDocFileList(docVO.getDocNo()));
		
		return docVO;
	}
	
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
	
	@PostMapping("/main")
	public Map<String, PagingVO<DocumentVO>> docMain (@RequestBody PagingVO<DocumentVO> page) {
		return service.getMainDocList(page);
	}
	
	@PostMapping("/getChAndTh")
	public ChannelVO getChAndTh(@RequestBody ChannelVO channelVO) {
		return channelService.getChAndTh(channelVO);
	}
	
	
}
