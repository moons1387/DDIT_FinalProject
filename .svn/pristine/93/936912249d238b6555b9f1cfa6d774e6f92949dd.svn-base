package kr.or.ddit.vo;

import java.util.List;
import java.util.Map;

import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.project.vo.ProjectPrgrsInfoVO;
import kr.or.ddit.components.project.vo.ProjectVO;
import lombok.Data;

@Data
public class PagingVO<T> {
	
	// 키값
	private int synerhub1;
	private int synerhub2;
	private int synerhub3;
	private int synerhub4;
	private int synerhub5;
	
	// 현재페이지
	private int page;
	
	// 자료갯수
	private int rowCnt;
	
	// 총 자료갯수
	private int total;
	
	// 공통분류코드
	private String stat; 
	
	// 검색어
	private String searchTitle;
	private String searchName;
	private String searchThread;
	private String searchQna;
	
	// 자료리스트
	private List<T> list;
	private List<T> list2;
	
	// 자료맵
	private Map<String, Object> map; 
	
	// 채널맴버VO
	private ChannelMemberVO channelMemberVO;
	
	// 프로젝트VO
	private ProjectVO projectVO;

	// thread
	private int thNo;
	private int chNo;
	private String thTtl;
	private String memId;
	
	// channel 게시판 관련
	private String brdSearchWord;
	
	// equipment
	private int eqpmntCateNo;
	private String eqpSearchWord;
	
	// qna
	private int qnaNo;
	private String qnaTtl;
}
