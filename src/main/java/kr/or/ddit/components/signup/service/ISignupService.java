package kr.or.ddit.components.signup.service;

import javax.servlet.http.HttpServletRequest;

import kr.or.ddit.ServiceResult;
import kr.or.ddit.vo.MemberVO;

public interface ISignupService {

	public ServiceResult idCheck(String string);
	public ServiceResult signupProfile(HttpServletRequest req, MemberVO memberVO);
	public void certifiedPhoneNumber(String userPhoneNumber, int randomNumber, String flag);
	public String phoneCheck(String userPhoneNumber);
	public ServiceResult signAdmin(MemberVO memberVO);
}

