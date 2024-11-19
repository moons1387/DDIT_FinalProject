package kr.or.ddit;

import java.util.Locale;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {
	
	@PreAuthorize("hasRole('ROLE_MEMBER')")
	@GetMapping("/main")
	public String home(Locale locale, Model model) {
		return "page/home";
	}
	
}
