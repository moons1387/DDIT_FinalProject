package kr.or.ddit.components.plan.vo;

import lombok.Data;

@Data							//멤버십설명VO
public class PlanExpVO {
	private int planIntrNo;		//멤버십설명번호
	private int PlanNo;			//멤버십번호
	private String planIntr;	//멤버십설명
	private String planCateNm;
	private String planUse;
}
