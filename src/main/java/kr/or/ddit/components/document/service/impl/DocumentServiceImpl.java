package kr.or.ddit.components.document.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.autograph.service.impl.IAutographMapper;
import kr.or.ddit.components.autograph.vo.AutographVO;
import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.channel.vo.ChannelThreadVO;
import kr.or.ddit.components.document.service.IDocumentMapper;
import kr.or.ddit.components.document.service.IDocumentService;
import kr.or.ddit.components.document.vo.AplnVO;
import kr.or.ddit.components.document.vo.DocumentVO;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import kr.or.ddit.vo.PagingVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Primary
@Service
public class DocumentServiceImpl implements IDocumentService{

	@Inject
	private IDocumentMapper mapper;
	
	@Inject
	private IAutographMapper atgrphMapper;
	
	@Override
	public int getTotal(PagingVO<DocumentVO> page) {
		return mapper.getDocOnGointTotal(page);
	}

	@Override
	public List<DocumentVO> getDocList(PagingVO<DocumentVO> page) {
		return mapper.getDocOnGointList(page);
	}

	@Override
	public int getDocCurrentTotal(PagingVO<DocumentVO> page) {
		return mapper.getDocCurrentTotal(page);
	}

	@Override
	public List<DocumentVO> getDocCurrentList(PagingVO<DocumentVO> page) {
		return mapper.getDocCurrentList(page);
	}

	@Override
	public int getDocApprovalTotal(PagingVO<DocumentVO> page) {
		return mapper.getDocApprovalTotal(page);
	}

	@Override
	public List<DocumentVO> getDocApprovalList(PagingVO<DocumentVO> page) {
		return mapper.getDocApprovalList(page);
	}

	@Override
	public DocumentVO getDocDetail(int no) {
		return mapper.getDocDetail(no);
	}

	@Override
	public void docInsert(DocumentVO docVO) {
		mapper.docInsert(docVO);
		int docNo = docVO.getDocNo();
		int memNo = docVO.getMemNo();
		// 등록에 필요한 결재선 리스트를 받아 등록함
		List<AplnVO> list = docVO.getAplnList();
		// order : 결재선 순서를 위한 정수 변수
		int order = 1;
		for (AplnVO aplnVO : list) {
			// 결재선에 문서번호를 등록
			aplnVO.setDocNo(docNo);
			if(memNo == aplnVO.getAplnMemNo()) {
				// 결재를 상신한 사람은 자동으로 결재되어 등록됨
				aplnVO.setAplnStat("APST01");
			} else {
				// 이외의 결재선은 진행중으로 상태부여
				aplnVO.setAplnStat("APST00");
			}
			aplnVO.setAplnOrder(order++);
			mapper.aplnInsert(aplnVO);
		}
	}

	@Override
	public List<ChannelMemberVO> getAutographer(ChannelThreadVO ctVO) {
		List<ChannelMemberVO> list = mapper.getAutographer(ctVO);
		ChannelMemberVO boss = mapper.getBoss(ctVO);
		// 채널장 체크용 불리언
		boolean isBossExist = false;
		AutographVO atVO = new AutographVO();
		atVO.setMemNo(ctVO.getMemNo());
		
		// 서명이 가능한 인원의 리스트를 조회하고 채널장을 반드시 목록에 추가하는 코드
		for (ChannelMemberVO cm : list) {
			if(cm.getMemNo() == boss.getMemNo()) {
				isBossExist = true;
			}
			
			if(cm.getChMemNo() == ctVO.getMemNo()) {
				cm.setMyAtgrphList(atgrphMapper.getAutograph(atVO));
			}
		}
		// 채널장이 없다면 가장 앞에 추가
		if(!isBossExist) {
			list.add(0, boss);
		}
		return list;
	}

	@Override
	public List<AtchFileDetailVO> getDocFileList(int docNo) {
		return mapper.getDocFileList(docNo);
	}

	@Override
	public int cancleDocument(int no) {
		mapper.cancleApln(no);
		return mapper.cancleDocuemt(no);
	}

	@Override
	public int returnDocument(int no) {
		// 기존 결재선을 지움
		mapper.aplnDelete(new AplnVO(no));
		return mapper.returnDocument(no);
	}

	@Override
	public int getDocTotalByStat(PagingVO<DocumentVO> pagingVO) {
		return mapper.getDocTotalByStat(pagingVO);
	}

	@Override
	public List<DocumentVO> getDocListByStat(PagingVO<DocumentVO> pagingVO) {
		return mapper.getDocListByStat(pagingVO);
	}

	@Override
	public void docUpdate(DocumentVO docVO) {
		// 기존 문서를 갱신 함
		mapper.docUpdate(docVO);
		int docNo = docVO.getDocNo();
		int memNo = docVO.getMemNo();
		// 결재 순번
		int order = 1;
		// 신규 결재선을 등록함
		List<AplnVO> list = docVO.getAplnList();
		for (AplnVO aplnVO : list) {
			// 결재선에 문서번호를 부여
			aplnVO.setDocNo(docNo);
			// 결재 순번을 증가
			aplnVO.setAplnOrder(order++);
			if(memNo == aplnVO.getAplnMemNo()) {
				// 본인의 결재는 자동으로 처리
				aplnVO.setAplnStat("APST01");
			} else {
				aplnVO.setAplnStat("APST00");
			}
			mapper.aplnLnUpdate(aplnVO);
		}
	}

	@Override
	public int docApprove(AplnVO aplnVO) {
		return mapper.docApprove(aplnVO);
	}

	@Override
	public int docReject(DocumentVO docVO) {
		
		AplnVO aplnVO = docVO.getAplnList().get(0);
		
		if(mapper.docReject(docVO) > 0) {
			return mapper.aplnDelete(aplnVO);
		} else {
			return -1;
		}
	}

	@Override
	public Map<String, PagingVO<DocumentVO>> getMainDocList(PagingVO<DocumentVO> page) {
		// 페이징 VO를 사용해 문서 메인페이지에 출력할 4가지 목록을 조회
		PagingVO<DocumentVO> p1 = new PagingVO<DocumentVO>();
		PagingVO<DocumentVO> p2 = new PagingVO<DocumentVO>();
		PagingVO<DocumentVO> p3 = new PagingVO<DocumentVO>();
		PagingVO<DocumentVO> p4 = new PagingVO<DocumentVO>();
		
		page.setPage(1);
		page.setRowCnt(5);
		page.setStat("DCST00");
		p1.setTotal(mapper.getDocOnGointTotal(page));
		p1.setList(mapper.getDocOnGointList(page));
		page.setStat("DCST00");
		p2.setTotal(mapper.getDocApprovalTotal(page));
		p2.setList(mapper.getDocApprovalList(page));
		p2.setStat("toApprove");
		page.setStat("DCST02");
		p3.setTotal(mapper.getDocTotalByStat(page));
		p3.setList(mapper.getDocListByStat(page));
		page.setStat("DCST04");
		p4.setTotal(mapper.getDocTotalByStat(page));
		p4.setList(mapper.getDocListByStat(page));
		
		// 각각의 VO를 map 컬렉션으로 리턴함
		Map<String, PagingVO<DocumentVO>> map = new HashMap<String, PagingVO<DocumentVO>>();
		
		map.put("onGoingList", p1);
		map.put("toApproveList", p2);
		map.put("returnedList", p3);
		map.put("rejectedList", p4);
		
		return map;
	}

	@Override
	public int getDocCompleteTotal(PagingVO<DocumentVO> page) {
		return mapper.getDocCompleteTotal(page);
	}

	@Override
	public List<DocumentVO> getDocCompleteList(PagingVO<DocumentVO> page) {
		return mapper.getDocCompleteList(page);
	}


}

