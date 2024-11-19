package kr.or.ddit.components.plan.service;

import java.util.List;

import kr.or.ddit.components.plan.vo.ApproveResponseVO;
import kr.or.ddit.components.plan.vo.ChannelPlanVO;
import kr.or.ddit.components.plan.vo.PlanVO;

public interface IPlanMapper {

	public List<PlanVO> list(int planNo);

	public int planExpCount();

	public int totalAmount(String itemName);

	public PlanVO buyChNo(int chNo);

	public void ChannelPlanInsert(ApproveResponseVO approveResponseVO);

	public int setPlanNo(String itemName);

	public void paymentInsert(ApproveResponseVO approveResponseVO);

	public int chplantCnt();

	public int delete(ChannelPlanVO channelPlanVO);

	public ApproveResponseVO getPrice(int chNo);

	public void update(int chNo);

	public ChannelPlanVO newPrc(int planNo);

	public void planMinuse(ChannelPlanVO channelPlanVO);

	public ChannelPlanVO changePrc(int chNo);

	public List<PlanVO> adminMemShipList();

	public PlanVO adminMemberShipCnt();

	public String AdminTotalAmount();

	public List<PlanVO> planExpList();

	public List<PlanVO> planCateName();

	public void AdminBzPlanInsert(PlanVO planVO);

	public void AdminSvPlanInsert(PlanVO planVO);

	public void AdminGdPlanInsert(PlanVO planVO);

	public void AdminBzCheckInsert(PlanVO planVO);

	public void AdminSvCheckInsert(PlanVO planVO);

	public void AdminGdCheckInsert(PlanVO planVO);

	public void AdminBzPlanUpdate(PlanVO planVO);

	public void AdminSvPlanUpdate(PlanVO planVO);

	public void AdminGdPlanUpdate(PlanVO planVO);

	public void AdminBzCheckUpdate(PlanVO planVO);

	public void AdminSvCheckUpdate(PlanVO planVO);

	public void AdminGdCheckUpdate(PlanVO planVO);

	public void AdminBzDelete(PlanVO planVO);

	public void AdminSvDelete(PlanVO planVO);

	public void AdminGdDelete(PlanVO planVO);

	public void AdminBzPlanSizeUpdate(PlanVO planVO);

	public void AdminSvPlanSizeUpdate(PlanVO planVO);

	public void AdminGdPlanSizeUpdate(PlanVO planVO);

	public void AdminBzPlanPriceUpdate(PlanVO planVO);
	
	public void AdminSvPlanPriceUpdate(PlanVO planVO);
	
	public void AdminGdPlanPriceUpdate(PlanVO planVO);
	
	public void AdminBzPlanMemNoUpdate(PlanVO planVO);
	
	public void AdminSvPlanMemNoUpdate(PlanVO planVO);
	
	public void AdminGdPlanMemNoUpdate(PlanVO planVO);

	public void BzPlanMemNoUpdate(PlanVO planVO);

	public void SvPlanMemNoUpdate(PlanVO planVO);

	public void GdPlanMemNoUpdate(PlanVO planVO);

	public List<PlanVO> adminPaymentDetail(String planNm);

	public PlanVO PaymentAllPrice();

	public PlanVO paymentPluse(String planNm);

	public PlanVO paymentMinuse(String planNm);

	public int bronzeLastYear();

	public int bronzeThisYear();
	
	public int silverLastYear();
	
	public int silverThisYear();
	
	public int goldLastYear();
	           
	public int goldThisYear();

	public List<PlanVO> paymentPriceAverage();

	public List<PlanVO> paymentJoinNumAverage();
	
}
