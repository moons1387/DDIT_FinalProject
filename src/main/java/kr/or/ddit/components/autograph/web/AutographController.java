package kr.or.ddit.components.autograph.web;

import java.util.List;

import javax.inject.Inject;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.ddit.components.autograph.service.IAutographService;
import kr.or.ddit.components.autograph.vo.AutographVO;

@RestController
@RequestMapping("/autograph")
public class AutographController {
	
	@Inject
	private IAutographService service;
	
	@PostMapping("/getautograph")
	public List<AutographVO> getAutograph(@RequestBody AutographVO atVO){
		List<AutographVO> list = service.getAutograph(atVO); 
		return list;
	}
	
	@PostMapping("/insert")
	public String insertAutograph(@RequestBody AutographVO atVO) {
		String res = "";
		if(service.insertAutograph(atVO) > 0) {
			res = "Y";
		} else {
			res = "N";
		}
		return res;
	}
	
	@PostMapping("/update")
	public String updateAutograph(@RequestBody AutographVO atVO) {
		String res = "";
		if(service.updateAutograph(atVO) > 0) {
			res = "Y";
		} else {
			res = "N";
		}
		return res;
	}
	
	@PostMapping("/delete")
	public String deleteAutograph(@RequestBody AutographVO atVO) {
		String res ="";
		if(service.deleteAutograph(atVO) > 0) {
			res = "Y";
		} else {
			res = "N";
		}
		return res;
	}
	
}
