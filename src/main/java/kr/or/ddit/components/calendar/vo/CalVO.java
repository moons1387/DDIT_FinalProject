package kr.or.ddit.components.calendar.vo;

import java.util.Date;

import lombok.Data;

@Data
public class CalVO {
	private int schdlNo;
	private String schdlCd;
	private Date strtDt;
	private String std;
	private String stt;

	private Date endDt;
	private String end;
	private String endt;

	private String schdlTtl;
	private String chTtl;
	private String thTtl;
	private String schdlConts;
	private int memNo;
	private int chNo;
	private int thNo;
	private String color;
	private Boolean allDay;
	private Boolean TF;
}
