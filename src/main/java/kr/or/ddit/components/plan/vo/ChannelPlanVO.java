package kr.or.ddit.components.plan.vo;

import java.util.Date;

import lombok.Data;

@Data 
public class ChannelPlanVO {		//채널멤버십

	private int paidNo;   //변경된결재번호
	private Date paidDt;   //결제일시
	private int planNo;	   //멤버십번호
	private int chNo;	   //채널번호
	private int planCcl;   //해지여부
	private String cclRsn; //해지사유
	
	private int pmntNo;
	private int newPrc;
	private int memNo;
	private String planNm;
}
