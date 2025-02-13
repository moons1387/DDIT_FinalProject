package kr.or.ddit.components.declaration.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.declaration.service.DeclarationMapper;
import kr.or.ddit.components.declaration.service.IDeclarationService;
import kr.or.ddit.components.declaration.vo.DeclarationVO;
import kr.or.ddit.components.file.vo.AtchFileVO;
import kr.or.ddit.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;

@Primary
@Slf4j
@Service
public class DeclarationServiceImpl implements IDeclarationService {

	@Inject
	private DeclarationMapper mapper;
	
	@Override
	public List<MemberVO> getMemberList(int memNo) {
	    List<MemberVO> memberList = mapper.getMemberList(memNo);
	    return memberList;
	}
	
	@Override
	public List<MemberVO> getMemberSearch(MemberVO memberVO) {
		List<MemberVO> memberSearch = mapper.getMemberSearch(memberVO);
		return memberSearch;
	}

	@Override
	public void insertDclr(DeclarationVO dclrVO) {
		mapper.insertDclr(dclrVO);
	}

	@Override
	public List<DeclarationVO> dclrList(DeclarationVO dclrVO) {
		return mapper.dclrList(dclrVO);
	}


	
}
