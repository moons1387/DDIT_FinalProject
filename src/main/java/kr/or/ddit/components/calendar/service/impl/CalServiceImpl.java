package kr.or.ddit.components.calendar.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.calendar.service.ICalMapper;
import kr.or.ddit.components.calendar.service.ICalService;
import kr.or.ddit.components.calendar.vo.CalVO;
import kr.or.ddit.components.equipment.service.IEquipmentMapper;
import kr.or.ddit.components.login.service.impl.loginservice;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Primary
@Service
public class CalServiceImpl implements ICalService {

	@Inject
	private ICalMapper mapper;
	
	@Inject
	private IEquipmentMapper eqpMapper;
	
	@Override
	public List<CalVO> list(CalVO cal) {
		// 전체 일정
		if (cal.getThNo() != 0) {
			cal.setChNo(eqpMapper.getChNo(cal.getThNo()));
		}
		if((cal.getSchdlCd()).equals("0")) {
			return mapper.list(cal);
		}
		// 개인 또는 조직
		else {
			return mapper.gubunList(cal);
		}
	}

	@Override
	public void insert(CalVO cal) {
		if(cal.getSchdlCd().equals("SCHST002")) {
			log.info("SCHST002");
			cal.setColor(mapper.selectThColor(cal.getThNo()));
		}
		log.info("cal : {}" , cal);
		mapper.insert(cal);
		
	}

	@Override
	public CalVO selectone(int schdlNo) {
		return mapper.selectone(schdlNo);
	}

	@Override
	public void update(CalVO cal) {
		mapper.update(cal);
	}

	@Override
	public void delete(int schdlNo) {
		mapper.delete(schdlNo);
	}

}
