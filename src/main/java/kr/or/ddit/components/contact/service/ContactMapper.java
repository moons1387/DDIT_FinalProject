package kr.or.ddit.components.contact.service;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import kr.or.ddit.vo.MemberVO;

public interface ContactMapper {
	public List<MemberVO> getContactList(@Param("chNo") int chNo, @Param("memNo") int memNo);
}
