package kr.or.ddit.security;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CommonController {

	private static final Logger log = LoggerFactory.getLogger(CommonController.class);
	
	@GetMapping("/accessError")
	public void accessDenied(Authentication auth, Model model) {
		log.info("# access denide...!");
		log.info("auth : "+auth);
		
		/*
		 * auth 출력 정보
		 * org.springframwork.security.authentication.UsernamePasswordAuthenticationToken@418ddd:
		 * Principal : org.springframework.security.core.Userdatails.User@84h8f4f
		 * Username : member;
		 * Password : [PROTECTED];
		 * Enabled :  true;
		 * AccountNonExpired : true;
		 * credentialNonExpired : true;
		 * AccountNonLocked : true;
		 * Granted Authorities : ROLE_MEMBER;
		 * Credentials : [PROTECTED];
		 * Authenticated : true;
		 * Details : org.springframework.securify.web.authentication.WebAuthticationDetails@23r89u34d:
		 * SessionId : QEJJJHBDSAJDASKDSA2
		 */
		
		model.addAttribute("msg","Access Denied");
	}
}
