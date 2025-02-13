package kr.or.ddit.components.chart.service.impl;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.chart.service.ChartMapper;
import kr.or.ddit.components.chart.service.IChartService;

@Primary
@Service
public class ChartServicesImpl implements IChartService {

	@Inject
	private ChartMapper mapper;
	
	@Override
	public String getData(int number) {
		return mapper.getData(number);
	}

}
