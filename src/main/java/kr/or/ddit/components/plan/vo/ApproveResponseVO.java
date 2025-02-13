package kr.or.ddit.components.plan.vo;

import lombok.Data;

@Data
public class ApproveResponseVO {
	private String itemName;
	private int totalAmount;
	private int memNo;
	private int paidNo;
	private int planNo;
	private int chNo;
	private int pmntNo;
	private int cnt;
	private String url;
	private String tid;
	private String updateTF;
}
