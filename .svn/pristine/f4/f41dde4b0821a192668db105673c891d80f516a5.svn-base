package kr.or.ddit.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

public class CustomLogoutSuccessHandler implements LogoutSuccessHandler{

//	private ILoginService service;
	
	private static final Logger log = LoggerFactory.getLogger(CustomLogoutSuccessHandler.class);
	
	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
			throws IOException, ServletException {
		log.info("CustomLogoutSuccessHandler:onLogoutSuccess() 실행...!");
		
		User user = (User) authentication.getPrincipal();
//		service.updateStatusToLogout(Integer.parseInt(user.getUsername()));
		response.sendRedirect("/synerhub/login.do"); //로그인페이지로 보내는 url
	}

}
