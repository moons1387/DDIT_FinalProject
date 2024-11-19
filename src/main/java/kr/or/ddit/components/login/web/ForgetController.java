package kr.or.ddit.components.login.web;

import java.util.Map;

import javax.inject.Inject;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.ddit.components.login.service.ILoginService;
import kr.or.ddit.components.signup.service.ISignupService;
import kr.or.ddit.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class ForgetController {
	
	@Inject
	private ISignupService signupService;

	@Inject
	private PasswordEncoder pe;

	@Inject
	private JavaMailSender mailSender;

	@Inject
	private ILoginService loginservice;

	@RequestMapping(value = "/forget.do", method = RequestMethod.GET)
	public String Forget() {
		return "login/forget";
	}

	@ResponseBody
	@PostMapping("/find")
	public String findId(@RequestBody Map<String, String> map) {
		log.info("map@!" + map);
		MemberVO member = new MemberVO();

		member.setMemName(map.get("name"));
		String checkType = map.get("checkType");

		if (checkType.equals("이메일")) {
			member.setMemEmail(map.get("email"));
		} else {
			member.setMemPh(map.get("email"));
		}

		log.info("Id" + map.get("Id"));
		if (map.get("Id") != null && map.get("Id") != "") {
			int password = (int) (Math.random() * 8999) + 1000;
			member.setMemId(map.get("Id"));
			member = loginservice.find(member);
			
			if (checkType.equals("이메일")) {

				log.info("member" + member);

				try {
					MimeMessage mimeMessage = mailSender.createMimeMessage();
					MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

					messageHelper.setFrom("tjfgusajddl@naver.com"); // 보내는사람 이메일 여기선 google 메일서버 사용하는 아이디를 작성하면됨
					messageHelper.setTo(member.getMemEmail()); // 받는사람 이메일
					// messageHelper.setTo("tjfgusajddl12@gmail.com"); // 받는사람 이메일
					messageHelper.setSubject("[SynerHUB] 임시 비밀번호 발급 안내"); // 메일제목
					messageHelper.setText(
						    "<div style=\"width: 100%; max-width: 600px; margin: auto; margin-bottom: 15px;\">" +
						        "<div style=\"box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); border-radius: 15px; overflow: hidden;\">" +
						            "<div style=\"padding: 20px;\">" +
						                "<h5>SynerHUB 고객센터</h5>" +
						                "<h3 style=\"font-size: 2em;\"><strong style=\"color: #0085DB;\">임시 비밀번호</strong> 안내입니다.</h3>" + // 텍스트 크기 2배 증가
						                "<hr style=\"margin: 0;\" />" +
						                "<div style=\"padding: 20px;\">" +
						                    "<div style=\"display: flex; flex-direction: column;\">" +
						                        "<p>안녕하세요. <strong>박현진</strong>님!</p>" +
						                        "<p>요청하신 임시 비밀번호가 발급되었습니다.</p>" +
						                        "<p> 아래 발급된 임시 비밀번호를 확인하시고, 임시 비밀번호로 로그인하세요.</p>" +
						                    "</div>" +
						                    "<div style=\"display: flex; align-items: center; justify-content: center; color: #007bff; background-color: #e7f1ff; border-radius: 10px; height: 100px; margin-top: 20px;\">" +
						                        "<div>" +
						                        "<h5 style=\"font-size: 1.5em;\"><span style=\"color: black;\">임시 비밀번호:&ensp;</span><strong>[ " + password + " ]</strong></h5>" + // 텍스트 크기 3배 증가
						                        "</div>" +
						                    "</div>" +
						                    "<p style=\"text-align: center; margin: 10px 0;\">※&nbsp;로그인 후 꼭 비밀번호를 변경해주세요!</p>" + // 위아래 마진 10px 추가
						                    "<div style=\"display: flex; justify-content: center;\">" +
						                    "<a href=\"http://192.168.36.215/synerhub/login.do\" style=\"background-color: #007bff; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; cursor: pointer;\">" + // a 태그로 변경
					                            "로그인 하러 가기" +
					                        "</a>" +
						                    "</div>" +
						                "</div>" +
						            "</div>" +
						        "</div>" +
						    "</div>", 
						    true // HTML 형식
						);	// 메일 내용

					String passwordEncode = Integer.toString(password);

					member.setMemPw(pe.encode(passwordEncode));
					loginservice.updatePw(member);

					mailSender.send(mimeMessage);
				} catch (Exception e) {
					e.printStackTrace();
				}

				return "password";
			} else {
				String flag = "password";
				
				String passwordEncode = Integer.toString(password);

				member.setMemPw(pe.encode(passwordEncode));
				loginservice.updatePw(member);
				
				signupService.certifiedPhoneNumber(member.getMemPh(), password, flag);
				
				return Integer.toString(password);
			}
		} else {

			String memId = loginservice.findId(member);

			log.info("memId" + memId);

			return memId;
		}
	}
}
