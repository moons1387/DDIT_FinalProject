package kr.or.ddit.components.contact.service;

import java.util.List;

import kr.or.ddit.vo.MemberVO;

public interface IContactService {
	public List<MemberVO> getContactList(int chNo, int memNo);
}
