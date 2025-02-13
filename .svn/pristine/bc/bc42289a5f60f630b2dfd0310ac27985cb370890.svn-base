package kr.or.ddit.components.admin.declaration.vo;

import java.util.List;
import org.springframework.web.multipart.MultipartFile;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import lombok.Data;

@Data
public class AdminDeclarationVO {
   private int dclrNo;            	// 신고 번호
   private int dclrSort;         	// 신고 카테고리
   private String dclrCn;         	// 신고 내용
   private String dclrRcptYmd;      // 신고 접수일자
   private int dclrNmtm;         	// 신고 횟수
   private int dclrWarnNmtm;      	// 경고 횟수
   private int dclrAtchFileId;
   private String dclrImg;
   private int dclrId;       	   // 신고 접수자
   private int dclrSubId;          // 신고 대상자
   private int memShtot;
   
   private List<MultipartFile> dclrFileList;
   private List<AtchFileDetailVO> fileSrcList;

   private String FileName;
   
   private String dclrWtrName;    	// 신고 접수자 이름
   private String dclrWtrPrflimg; 	// 신고 접수자 프로필이미지
   private String dclrWtrId;      	// 신고 접수자 아이디
   private String dclrSubName;    	// 신고 대상자 이름
   private String dclrSubPrflimg;	// 신고 대상자 프로필이미지
   private String dclrSubAddr1; 	// 신고 대상자 주소1
   private String dclrSubAddr2;  	// 신고 대상자 주소2
   private String dclrSubPstCd;   	// 신고 대상자 우편번호
   private String dclrSubPh;      	// 신고 대상자 휴대폰번호
   private String dclrSubEmail;   	// 신고 대상자 이메일
   private String dclrSubNo;      	// 신고 대상자 회원번호
   private String dclrAtchFilePath;	// 신고 첨부파일 경로
   private int dclrState;			// 신고 처리상태
   private int dclrHandledCount;	
   private int dclrUnHandledCount;	
   private int totalDclr;			// 신고 대상자 수
   private String blackType;
}
