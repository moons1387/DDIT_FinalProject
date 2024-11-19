package kr.or.ddit.vo;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;

@Data
public class MemberVO {
	private int memNo;
	private String memId;
	private String memPw;
	private String memName;
	private String memPrflimg;
	private MultipartFile imgFile;
	private String memEmail;
	private String memPh;
	private String memAddr1;
	private String memAddr2;
	private int memPstCd;
	private String memAgree;
	private String memIntr;
	private int memAutograph;
	private Date memRgdt;
	private String memRgdtString;
	private int memStatus;
	private int memDrmnt;
	private int memShtot;
	private int enabled;
	private int rememberLogin;
	private int rememberId;
	private List<RoleVO> authList;
	private int channelCount;
	private String chCnntdt;
	private int rnum;
	private int chNo;
	private String chMemNm;
	private String chRoleNm;
}
