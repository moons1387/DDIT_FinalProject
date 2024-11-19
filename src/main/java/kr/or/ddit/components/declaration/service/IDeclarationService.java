package kr.or.ddit.components.declaration.service;

import java.util.List;

import kr.or.ddit.components.declaration.vo.DeclarationVO;
import kr.or.ddit.components.file.vo.AtchFileVO;
import kr.or.ddit.vo.MemberVO;

public interface IDeclarationService {
	public List<MemberVO> getMemberList(int memNo);
	public List<MemberVO> getMemberSearch(MemberVO memberVO);
	public void insertDclr(DeclarationVO dclrVO);
	public List<DeclarationVO> dclrList(DeclarationVO dclrVO);
}
