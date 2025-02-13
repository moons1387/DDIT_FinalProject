package kr.or.ddit.components.threadboard.vo;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import lombok.Data;

@Data
public class ThreadBoardVO {

	private int rnum;			// row 넘버
	private int brdNo;			//게시물번호
	private int thNo;			//스레드번호
	private int chNo;			//채널번호
	private String brdTtl;		//게시물 제목
	private int brdWrtr;		//게시물작성자(회원번호)
	private String brdConts;	//게시물내용
	private Date brdRgdt;		//게시물작성일
	private int brdHit;			//게시물조회수
	private int tmp;			//임시저장
	private String gubun;       //구분
	
	//파일
	private int brdAtchFileId;
	private List<MultipartFile> thboardFileList;
	private List<AtchFileDetailVO> thboardFileDetail;
	
	private int thboardAuthority; //권한
	private int synerhub1;
	private int synerhub2;
	
	//페이징
//	private int page;
//	private int rowCnt;
	
	//join값을 가져오기위한 vo
	private String memPrflimg;
	private String thTtl; // 스레드 이름
	private String thPw;
	private Date thRgdt;	
	private String thClr;
	private String brdWrtrNm;
	
	// 날짜를 (2024-10-19)로 변환
	public String getFormattedBrdRgdt() {
		if (this.brdRgdt != null) {
			SimpleDateFormat thboardRgdt = new SimpleDateFormat("yyyy-MM-dd");
			return thboardRgdt.format(this.brdRgdt);
		}
		return null; // brdRgdt가 null인 경우
	}
	
	
}
