package kr.or.ddit.components.login.service.impl;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.login.service.ILoginMapper;
import kr.or.ddit.components.login.service.ILoginService;
import kr.or.ddit.components.login.vo.MemLogVO;
import kr.or.ddit.vo.MemberVO;

@Primary
@Service
public class loginservice implements ILoginService {
	
	@Inject
	private ILoginMapper loginMapper;
	
	@Override
	public MemberVO loginCheck(MemberVO member) {
		return loginMapper.loginCheck(member);
	}

	@Override
	public String findId(MemberVO member) {
		return loginMapper.findId(member);
	}

	@Override
	public MemberVO find(MemberVO member) {
		return loginMapper.find(member);
	}

	@Override
	public void updatePw(MemberVO member) {
		loginMapper.updatePw(member);
	}

	@Override
	public void updateStatusToLogin(int memNo) {
		loginMapper.updateStatusToLogin(memNo);
	}

	@Override
	public void updateStatusToLogout(int memNo) {
		loginMapper.updateStatusToLogout(memNo);
	}

	@Override
	public void updateStatusToAfk(int memNo) {
		loginMapper.updateStatusToAfk(memNo);
	}

	@Override
	public int updateLogTime(MemLogVO mlVO) {
		loginMapper.updateLogTime(mlVO);
		return loginMapper.logNo();
	}

}
