package kr.or.ddit.components.board.qna.vo;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import kr.or.ddit.vo.BoardFileVO;
import lombok.Data;

@Data
public class QnaVO {
	private int	qnaNo;
	private int qnaCategory;
	private String qnaTtl;
	private String qnaConts;
	private String qnaDt; 
	private int qnaWtr;
	private int qnaAtchFileId;
	private String ansConts;
	private Date ansDt;
	private int ansWtr;
	private int ansState;
	private int ansAtchFilId;
	private int rowCnt;
	
	private List<AtchFileDetailVO> fileSrcList;

	private List<MultipartFile> qnaFileList;
	
	private String qnaWtrName;
	private String qnaWtrPrflimg;
	private String chMemNm;
}
