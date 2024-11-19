package kr.or.ddit.components.plan.vo;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;

@Data
public class PlanVO {		  //멤버십

	private int planNo; 	  //멤버십번호
	private String planNm;    //멤버십명 
	private int planPrc;	  //멤버십가격
	private String planWPrc;
	private int planMaxMem;   //채널최대인원
	private BigDecimal planTotSz;    //채널총자료용량	
	private List<PlanExpVO> ExpList;
	private int planExpCount;
	private int planCnt;
	private String url;
	private String PlanIOExp;	// INSERT / MINUSE
	private String planPrice;
	private String TotalPrice;
	private String planCateNm;
	private String bzInput;
	private String svInput;
	private String gdInput;
	private String bzCheck;
	private String svCheck;
	private String gdCheck;
	private float bzSize;
	private float svSize;
	private float gdSize;
	private int bzNo;
	private int svNo;
	private int gdNo;
	private String chTtl;
	private String pmntDate;
	
    public int getPlanPrc() {
        return planPrc;
    }
    public void setPlanPrc(int planPrc) {
        this.planPrc = planPrc;
    }
    // 멤버십가격 원화 변환
    public String getFormattedPlanPrc() {
        return String.format("%,d", planPrc); 
    }
    
}
