package kr.or.ddit.components.plan.service;

import java.util.List;

import kr.or.ddit.components.plan.vo.ApproveResponseVO;
import kr.or.ddit.components.plan.vo.ChannelPlanVO;
import kr.or.ddit.components.plan.vo.PlanVO;

public interface IPlanService {

	// 멤버십list(화면출력)
	public List<PlanVO> list(int planNo);

	// 멤버십번호를 가져오기 없다면 해당 채널은 구매하지 않음
	public PlanVO buyChNo(int chNo);

	public int planExpCount();

	public int totalAmount(String itemName);

	public String kakaoPay(ApproveResponseVO approveResponseVO);

	public void payInsert(ApproveResponseVO approveResponseVO);

	public int setPlanNo(String itemName);

	public int chplanCnt();

	public int delete(ChannelPlanVO channelplan);

	public ApproveResponseVO getPrice(int chNo);

	public String kakaoCancel(ApproveResponseVO approveResponseVO);

	public ApproveResponseVO kakaoPayInfo(String parameter, String string, String string2, String tids);

	public void update(int chNo);

	public ChannelPlanVO newPrc(int planNo);

	public void changeDelete(int chNo);

	public List<PlanVO> adminMemShipList();

	public String AdminTotalAmount();

	public List<PlanVO> planExpList();

	public List<PlanVO> planCateName();

	public void AdminPlanInsert(PlanVO planVO);

	public void adminPlanUpdate(PlanVO planVO);

	public void adminPlanDelete(PlanVO planVO);

	public List<PlanVO> adminPaymentDetail(String planNm);

	public PlanVO PaymentAllPrice();

	public PlanVO paymentPluse(String planNm);
	
	public PlanVO paymentMinuse(String planNm);

	public float bronzePercent();

	public float silverPercent();

	public float goldPercent();

	public List<PlanVO> paymentPriceAverage();

	public List<PlanVO> paymentJoinNumAverage();
}
