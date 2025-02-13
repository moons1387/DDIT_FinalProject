package kr.or.ddit.security;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import kr.or.ddit.components.login.service.ILoginMapper;
import kr.or.ddit.vo.CustomUser;
import kr.or.ddit.vo.MemberVO;

public class CustomUserDetailsService implements UserDetailsService{

	private static final Logger log = LoggerFactory.getLogger(CustomUserDetailsService.class);
	
	@Inject
	private ILoginMapper loginMapper;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
	try {
		MemberVO member = loginMapper.readByUserId(username);
		return member == null ? null : new CustomUser(member); //존재한다면 유저라는 맴버를 재정의 후 리턴
	}catch (Exception e) {
		e.printStackTrace();
	}
	
		return null;
	}

}
