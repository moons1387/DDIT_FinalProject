package kr.or.ddit.components.document.vo;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import lombok.Data;

@Data
public class DocumentVO {
	private int rnum;
	private int docNo;
	private int memNo;
	private int chNo;
	private int thNo;
	private String docTtl;
	private String docConts;
	private String docWrtr;
	private String docRgdt;
	private String docStat;
	private String rsltnYmd;
	private String rjctRsn;
	private int docFileId;
	private int fileCnt;
	private String memNm;
	private String thTtl;
	private String chMemNm;
	private String chRoleNm;
	private int chRole;
	private String aplnMemNm;
	private int aplnMemNo;
	private String aplnStat;
	private List<AplnVO> aplnList;
	private List<AtchFileDetailVO> fileList;
	
}
