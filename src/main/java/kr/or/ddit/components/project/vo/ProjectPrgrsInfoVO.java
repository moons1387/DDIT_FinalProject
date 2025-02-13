package kr.or.ddit.components.project.vo;

import lombok.Data;

@Data
public class ProjectPrgrsInfoVO {

	private int chNo;
	private int thNo;
	
	private int page;
	private int total;
	
	private int pjtNo;
	private String pjtNm;
	private int prgrs;
	
}
