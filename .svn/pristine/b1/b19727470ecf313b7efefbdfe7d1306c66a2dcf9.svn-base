
package kr.or.ddit.components.signup.service.impl;

import java.io.File;
import java.util.HashMap;
import java.util.UUID;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.json.simple.JSONObject;
import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.ServiceResult;
import kr.or.ddit.components.login.service.ILoginMapper;
import kr.or.ddit.components.signup.service.ISignupService;
import kr.or.ddit.vo.MemberVO;
import kr.or.ddit.vo.RoleVO;
import net.nurigo.java_sdk.api.Message;
import net.nurigo.java_sdk.exceptions.CoolsmsException;

@Primary
@Service
public class SignupServiceImpl implements ISignupService {

	@Inject
	private ILoginMapper loginMapper;

	@Inject
	private PasswordEncoder pe;

	@Override
	public ServiceResult idCheck(String memId) {
		ServiceResult result = null;
		MemberVO member = loginMapper.idCheck(memId);
		if (member != null) {
			result = ServiceResult.EXIST; // 아이디와 일치하는 회원정보 존재
		} else {
			result = ServiceResult.NOTEXIST; // 아이디와 일치하는 회원정보 없음
		}
		return result;
	}

	@Override
	public ServiceResult signupProfile(HttpServletRequest req, MemberVO memberVO) {
		ServiceResult result = null;

		// 비밀번호 암호화(스프링 시큐리티 적용시)
		memberVO.setMemPw(pe.encode(memberVO.getMemPw()));

		int status = loginMapper.signupProfile(memberVO);
		if (status > 0) { // 등록 성공
			// RoleVO 객체 생성
			RoleVO roleVO = new RoleVO();
			roleVO.setMemNo(memberVO.getMemNo()); // memberVO에서 memNo 가져오기

			// 한 명의 회원이 등록될 때 하나의 권한을 무조건 가질 수 있도록 권한 등록(스프링 시큐리티 적용 시 사용 예정)
			loginMapper.signupAuth(roleVO); // RoleVO를 사용하여 권한 등록
			result = ServiceResult.OK;
		} else { // 등록 실패
			result = ServiceResult.FAILED;
		}
		return result;

	}

	@Override
	public void certifiedPhoneNumber(String userPhoneNumber, int randomNumber, String flag) {
		String api_key = "NCSENE7W54ZKLQIG";
		String api_secret = "RHMTBECKIJYX1I8WIZOLUE5M3F8NI0DX";
		Message coolsms = new Message(api_key, api_secret);

		HashMap<String, String> params = new HashMap<String, String>();
		params.put("to", userPhoneNumber); // 수신전화번호
		params.put("from", "01052660343"); // 발신전화번호. 테스트시에는 발신,수신 둘다 본인 번호로 하면 됨
		params.put("type", "SMS");
		if (("sign").equals(flag)) {
			params.put("text", "인증번호는" + "[" + randomNumber + "]" + "입니다."); // 문자 내용 입력
		} else if (("password").equals(flag)) {
			params.put("text",
					"'SynerHUB'에 요청하신 임시 비밀번호를 보내드립니다. \n아래 발급된 임시 비밀번호로 로그인 하신 후, 새 비밀번호를 설정해주시기 바랍니다.\n\n\t"
							+ "임시 비밀번호 : [" + randomNumber + "]");
		}
		params.put("app_version", "test app 1.2"); // application name and version

		try {
			JSONObject obj = (JSONObject) coolsms.send(params);
			System.out.println(obj.toString());
		} catch (CoolsmsException e) {
			System.out.println(e.getMessage());
			System.out.println(e.getCode());
		}

	}

	@Override
	public String phoneCheck(String userPhoneNumber) {
		int cnt = loginMapper.phoneCheck(userPhoneNumber);

		return cnt > 0 ? "error" : "success";
	}

	@Override
	public ServiceResult signAdmin(MemberVO memberVO) {
		memberVO.setMemPw(pe.encode(memberVO.getMemPw()));
		loginMapper.signupProfileAdmin(memberVO);
		RoleVO roleVO = new RoleVO();
		roleVO.setMemNo(memberVO.getMemNo());

		int cnt = loginMapper.signupAuthAdmin(roleVO);

		ServiceResult result = null;

		if (cnt > 0) {
			result = ServiceResult.OK;
		} else { // 등록 실패
			result = ServiceResult.FAILED;
		}
		return result;

	}
}
