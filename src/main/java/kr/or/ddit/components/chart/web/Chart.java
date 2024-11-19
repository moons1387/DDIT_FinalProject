package kr.or.ddit.components.chart.web;

import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import kr.or.ddit.components.chart.service.IChartService;

@Controller
@RequestMapping("/main")
public class Chart {
	
	@Inject
	private IChartService service;

	@GetMapping("/test")
	public String chart(){
		return "test/charttest";
	}
	
	@GetMapping("/tests")
	public String sankey(){
		return "test/sankey";
	}
	
	@GetMapping("/data/{number}")
	public ResponseEntity<String> getData(@PathVariable int number) {
		
		String data = service.getData(number);
		
		return new ResponseEntity<String>("", HttpStatus.OK);
	}
	
}
