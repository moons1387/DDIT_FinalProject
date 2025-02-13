package kr.or.ddit.components.calendar.web;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import org.apache.commons.lang.time.DateUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.or.ddit.components.calendar.service.ICalService;
import kr.or.ddit.components.calendar.vo.CalVO;
import kr.or.ddit.components.calendar.vo.MoveVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/calendar")
public class CalendarController {
	@Inject
	private ICalService calService;

	
	@PostMapping("/form")
	// 페이지 열때 정보들 받아오기
	public ResponseEntity<List<CalVO>> form(@RequestBody CalVO cal) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		Date end;
		int MEM_NO = cal.getMemNo();
		List<CalVO> calList = calService.list(cal);						// 전체 일정 리스트로 받아오기
		for (CalVO callist : calList) {
			String st = sdf.format(callist.getStrtDt());				// 시작 날짜 Date타입이라 String으로 변경하여 st에 저장
			
			// 입력시 전날의 23:59분으로 입력되어 하루 추가
			if (!callist.getAllDay()) {
				// 종일 클리안되어있으면 무조건 당일 시간으로 입력되어 끝나는날짜 그상태로 출력
				end = callist.getEndDt();							
			} else {
				// 끝나는 날짜 다음날로 저장
				end = DateUtils.addDays(callist.getEndDt(), 1);				
			}

			// 날짜를 yyyy-mm-dd HH:mm 형태로 저장
			// 모달창 입력할때는 yyyy-mm-dd (string)형태가 필요해서 string 타입으로 저장
			callist.setStd(st);												
			callist.setEnd(sdf.format(end));

			// 날짜를 sep 09 kst형식으로 저장
			// 달력에 출력용으로 date타입 저장
			Date start = sdf.parse(st);
			callist.setStrtDt(start);
			callist.setEndDt(end);
			
			// 채널장이 아니면 채널 권한 불가
			if(MEM_NO == callist.getMemNo()) {
				callist.setTF(true);
			}else {
				callist.setTF(false);
			}
		}
		return new ResponseEntity<List<CalVO>>(calList, HttpStatus.OK);
	}

	
	@PostMapping("/insert")
	public ResponseEntity<CalVO> insert(@RequestBody CalVO cal) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		// 모달창은 String으로 yyy-mm-dd / hh:mm따로 들어와서 붙여서 데이트 타입으로 저장
		Date start = sdf.parse(cal.getStd() + " " + cal.getStt());
		Date end = sdf.parse(cal.getEnd() + " " + cal.getEndt());
		// 종일이면 끝나는 날자 하루 추가
		if (cal.getAllDay()) {
			cal.setEnd(sdf.format(DateUtils.addDays(end, 1)));
		} else {
			cal.setEnd(sdf.format(end));
		}
		cal.setStrtDt(start);
		cal.setEndDt(end);
		calService.insert(cal);
		return new ResponseEntity<CalVO>(cal, HttpStatus.OK);
	}

	@PreAuthorize("hasAnyRole('ROLE_MEMBER')")
	@PostMapping("/move")
	// 이동 또는 늘리기 
	public ResponseEntity<String> Update(@RequestBody MoveVO move) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		CalVO cal = calService.selectone(move.getSchdlNo());
		Date nend;
		// 변경일시 시작날짜 변경 resize일시 끝나느 날짜만 변경
		if ("move".equals(move.getState())) {
			Date nst = DateUtils.addDays(cal.getStrtDt(), move.getEvent());
			cal.setStd(sdf.format(nst));
			cal.setStrtDt(nst);
		}
		// 초가 들어오면 분기준으로 이동하고
		// 0으로 입력되면 일기준으로 이동
		if (move.getMill() == 0) {
			nend = DateUtils.addDays(cal.getEndDt(), move.getEvent());
		} else {
			nend = DateUtils.addMilliseconds(cal.getEndDt(), move.getMill());
		}
		// 2024-09-12 형태 저장
		cal.setEnd(sdf.format(nend));

		// sep 12 2024 kst형태 저장
		cal.setEndDt(nend);
		calService.update(cal);
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}

	@PostMapping("updateForm")
	// 수정에 출력용으로 해당 일정 출력
	public ResponseEntity<CalVO> UpdateForm(@RequestBody CalVO cal) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		CalVO schdlNo = calService.selectone(cal.getSchdlNo());
		// 모달창은 yyyy-mm-dd / hh:mm으로 출력해야해서 split으로 분리
		schdlNo.setStd(sdf.format(schdlNo.getStrtDt()).split(" ")[0]);
		schdlNo.setStt(sdf.format(schdlNo.getStrtDt()).split(" ")[1]);
		schdlNo.setEnd(sdf.format(schdlNo.getEndDt()).split(" ")[0]);
		schdlNo.setEndt(sdf.format(schdlNo.getEndDt()).split(" ")[1]);
		return new ResponseEntity<CalVO>(schdlNo, HttpStatus.OK);
	}
	
	@PostMapping("update")
	// 수정 기능(insert와 비슷)
	public ResponseEntity<CalVO> Update(@RequestBody CalVO cal) throws ParseException {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
		Date start = sdf.parse(cal.getStd() + " " + cal.getStt());
		Date end = sdf.parse(cal.getEnd() + " " + cal.getEndt());
		if (cal.getAllDay()) {
			cal.setEnd(sdf.format(DateUtils.addDays(end, 1)));
		} else {
			cal.setEnd(sdf.format(end));
		}
		cal.setStd(sdf.format(start));
		cal.setStrtDt(start);
		cal.setEndDt(end);
		calService.update(cal);
		return new ResponseEntity<CalVO>(cal, HttpStatus.OK);
	}
	
	@PostMapping("delete")
	// 삭제 기능
	public ResponseEntity<String> Delete(@RequestBody CalVO cal){
		calService.delete(cal.getSchdlNo());
		return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
	}
		
}
