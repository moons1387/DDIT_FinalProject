package kr.or.ddit.components.plan.web;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.or.ddit.components.plan.service.IPlanService;
import kr.or.ddit.components.plan.vo.ApproveResponseVO;
import kr.or.ddit.components.plan.vo.ChannelPlanVO;
import kr.or.ddit.components.plan.vo.PlanVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/plan")
public class PlanController {

	@Inject
	private IPlanService planService;

	// 멤버십 페이징 열때 정보 받아오기
	@PostMapping("/from")
	public ResponseEntity<List<PlanVO>> plan(@RequestBody ChannelPlanVO channelPlanVO) { // 들어간 채널 번호가 넘어와야 함 아직 안됨

		int chNo = channelPlanVO.getChNo();
		// int chNo = 4; //채널값 하드코딩
		PlanVO paramVO = planService.buyChNo(chNo);

		List<PlanVO> planlist = null;
		if (paramVO != null) {
			planlist = planService.list(paramVO.getPlanNo());
			// 포맷된 가격을 출력할 경우
		} else {
			planlist = planService.list(0);
		}
		return new ResponseEntity<List<PlanVO>>(planlist, HttpStatus.OK);
	}

	// 멤버십 해지삭제
	@PostMapping("/delete")
	public ResponseEntity<List<PlanVO>> PlanDelete(@RequestBody ChannelPlanVO channelplan) {
		// api 환불
		planService.kakaoCancel(planService.getPrice(channelplan.getChNo()));
		
		channelplan.setNewPrc(planService.totalAmount(channelplan.getPlanNm()));
		int cnt = planService.delete(channelplan);
		// list 출력
		List<PlanVO> planlist = null;
		if(cnt > 0) {
			planlist = planService.list(0);
		}
		
		return new ResponseEntity<List<PlanVO>>(planlist, HttpStatus.OK);
	}
	
	//멤버십 변경
	@PostMapping("/update")
	public ResponseEntity<ApproveResponseVO> PlanUpdate(@RequestBody ChannelPlanVO channelplan){
		// 이전 가격
		ApproveResponseVO approveResponseVO = planService.getPrice(channelplan.getChNo());
		// 변경 가격
		ChannelPlanVO newPrc = planService.newPrc(channelplan.getPlanNo());
		
		// 더 비싼거 변경시
		approveResponseVO.setTotalAmount(newPrc.getNewPrc());
		approveResponseVO.setPlanNo(channelplan.getPlanNo());
		approveResponseVO.setMemNo(channelplan.getMemNo());
		approveResponseVO.setItemName(newPrc.getPlanNm());
		approveResponseVO.setChNo(channelplan.getChNo());
		approveResponseVO.setUpdateTF("T");
		String url = planService.kakaoPay(approveResponseVO);
		approveResponseVO.setUrl(url);
		approveResponseVO.setCnt(planService.chplanCnt());
		return new ResponseEntity<ApproveResponseVO>(approveResponseVO, HttpStatus.OK);
	}
	

	@PostMapping("/pay/ready")
	public ResponseEntity<ApproveResponseVO> kakaoPay(@RequestBody ApproveResponseVO approveResponseVO) throws SQLException {
		approveResponseVO.setTotalAmount(planService.totalAmount(approveResponseVO.getItemName()));
		approveResponseVO.setPlanNo(planService.setPlanNo(approveResponseVO.getItemName()));
		approveResponseVO.setUpdateTF("F");
		String url = planService.kakaoPay(approveResponseVO);
		// 등록 전 channel-plan 총 개수
		approveResponseVO.setCnt(planService.chplanCnt());
		approveResponseVO.setUrl(url);
		return new ResponseEntity<ApproveResponseVO>(approveResponseVO, HttpStatus.OK);
	}
	
	@GetMapping("/paySuccess")
	public String paySuccess(HttpServletRequest request) throws IOException {
		ApproveResponseVO approveResponseVO = new ApproveResponseVO();
		// 승인 서비스
		String tid = null;
		if(("T").equals(request.getParameter("updateTF"))){
			// 이전 값 해제
			ApproveResponseVO approveresponseVO = planService.getPrice(Integer.parseInt(request.getParameter("chNo")));
			planService.kakaoCancel(planService.getPrice(Integer.parseInt(request.getParameter("chNo"))));
			planService.changeDelete(Integer.parseInt(request.getParameter("chNo")));
			planService.update(Integer.parseInt(request.getParameter("chNo")));
			tid = approveresponseVO.getTid();
		}else {
			tid = request.getParameter("pg_token");
		}
		ApproveResponseVO success = planService.kakaoPayInfo(request.getParameter("pg_token"), request.getParameter("totalAmount"), request.getParameter("memNo"), tid);
		// plan결제 내용들 vo에 세팅
		approveResponseVO.setChNo(Integer.parseInt(request.getParameter("chNo")));
		approveResponseVO.setItemName(request.getParameter("itemName"));
		approveResponseVO.setTotalAmount(Integer.parseInt(request.getParameter("totalAmount")));
		approveResponseVO.setMemNo(Integer.parseInt(request.getParameter("memNo")));
		approveResponseVO.setPlanNo(Integer.parseInt(request.getParameter("planNo")));
		approveResponseVO.setTid(success.getTid());
		//  변경시
		planService.payInsert(approveResponseVO);
		return "page/paySuccess";
	}	

	@PostMapping("/datacheck")
	public ResponseEntity<List<PlanVO>> dataCheck(@RequestBody ApproveResponseVO approveResponseVO) {
		int dataCnt = planService.chplanCnt();

		PlanVO paramVO = planService.buyChNo(approveResponseVO.getChNo());
		List<PlanVO> planlist = null;
		if (approveResponseVO.getCnt() < dataCnt) {
			planlist = planService.list(paramVO.getPlanNo());
		}
		return new ResponseEntity<List<PlanVO>>(planlist, HttpStatus.OK);
	}
	
	@PostMapping("/optionChk")
	public ResponseEntity<PlanVO> optionChk(@RequestBody ChannelPlanVO channelPlanVO){
		PlanVO channel = planService.buyChNo(channelPlanVO.getChNo());
		return new ResponseEntity<PlanVO>(channel,HttpStatus.OK);
	}
	
}