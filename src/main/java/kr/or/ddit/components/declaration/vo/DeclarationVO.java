package kr.or.ddit.components.declaration.vo;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import lombok.Data;

@Data
public class DeclarationVO {
	private int dclrNo;			// 신고 번호
	private int dclrSort;		// 신고 카테고리
	private String dclrCn;		// 신고 내용
	private String dclrRcptYmd;	// 신고 접수일자
	private int dclrNmtm;		// 신고 횟수
	private int dclrWarnNmtm;	// 경고 횟수
	private int dclrAtchFileId;
	private String dclrImg;
	private int dclrId; 		// 신고 접수자 번호
	private int dclrSubId; 		// 신고 대상자 번호
	private int dclrState;
	
	private List<MultipartFile> dclrFileList;
	private List<AtchFileDetailVO> fileSrcList;

	private String FileName;
	
	private String dclrWtrName; // 신고 접수자 이름
	private String dclrWtrPrflimg; // 신고 접수자 프로필이미지
	private String dclrSubName; // 신고 대상자 이름
	private String dclrSubMemberId; // 신고 대상자 아이디
	private String dclrSubPrflimg; // 신고 대상자 프로필이미지
	
}
