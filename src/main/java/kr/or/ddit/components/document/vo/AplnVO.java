package kr.or.ddit.components.document.vo;

import lombok.Data;

@Data
public class AplnVO {
	private int aplnNo;
	private int docNo;
	private int aplnMemNo;
	private String aplnMemNm;
	private String aplnRegdt;
	private String aplnCn;
	private String aplnStat;
	private String atgrphImg;
	private String chMemNm;
	private String chRoleNm;
	private String chRole;
	private int aplnOrder;
	
	public AplnVO () {}
	
	public AplnVO (int docNo) {
		this.docNo = docNo;
	}
	
}
