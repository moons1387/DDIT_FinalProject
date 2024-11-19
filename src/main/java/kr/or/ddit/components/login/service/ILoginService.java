package kr.or.ddit.components.login.service;

import kr.or.ddit.components.login.vo.MemLogVO;
import kr.or.ddit.vo.MemberVO;

public interface ILoginService {

	//로그인 체킁
	public MemberVO loginCheck(MemberVO member);

	// 아이디 찾기
	public String findId(MemberVO member);

	// 비번 찾기
	public MemberVO find(MemberVO member);

	// 임시 비밀번호로 변경
	public void updatePw(MemberVO member);

	public void updateStatusToLogin(int memNo);

	public void updateStatusToLogout(int memNo);

	public void updateStatusToAfk(int memNo);

	public int updateLogTime(MemLogVO mlVO);

}
