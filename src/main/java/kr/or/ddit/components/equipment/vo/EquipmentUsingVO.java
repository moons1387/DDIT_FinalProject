package kr.or.ddit.components.equipment.vo;

import java.util.Date;

import lombok.Data;

@Data
public class EquipmentUsingVO {
	public int logNo;
	public int memNo;
	private String chmemNm;
	public Date reqDt;
	public Date useStrtDt;
	public Date rtnEstmtDt;
	public Date rtnDt;
	public String useFor;
	public String useNote;
	public int eqpmntNo;
	public String thTtl;
	public String chTtl;
	public String thClr;
	private int chNo;
	private int thNo;
	private String eqpmntNm;
	public String startDate;
	public String endDate;
	public int loginMemNo;
	public int event;
	public String state;
}
