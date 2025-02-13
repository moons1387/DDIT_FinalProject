package kr.or.ddit.components.project.vo;

import java.util.List;

import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.document.vo.AplnVO;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import lombok.Data;

@Data
public class ProjectVO {

	private int 	rnum;
	private int 	pjtNo;
	private String 	pjtNm;
	private int 	pjtMngr;
	private String 	strtDt;
	private String 	estDtEnd;
	private String 	endDt;
	private String 	smry;
	private String 	conts;
	private int 	chNo;
	private int 	thNo;
	private int 	docNo;
	private int 	atchFileId;
	private int 	fileCnt;
	private String 	prgrs;
	private String 	chMemNm;
	private String 	pjtStat;
	private String	mngrNm;
	private String	docTtl;
	private String	pjtRgdt;
	private String	pjtMngrNm;
	
	private ProjectGroupVO pgVO;
	
	private List<ChannelMemberVO> cmList;
	private List<ProjectGroupMemberVO> pgmList;
	private List<AplnVO> aplnList;
	private List<AtchFileDetailVO> fileList;
}



