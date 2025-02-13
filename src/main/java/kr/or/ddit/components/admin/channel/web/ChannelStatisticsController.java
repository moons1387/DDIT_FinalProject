package kr.or.ddit.components.admin.channel.web;

import javax.inject.Inject;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import kr.or.ddit.components.admin.channel.service.IChannelStatisticsService;
import kr.or.ddit.components.admin.channel.vo.ChannelDataVO;
import kr.or.ddit.vo.PagingVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
@RequestMapping("/admin/channel")
public class ChannelStatisticsController {
	
	@Inject
	private IChannelStatisticsService service;
	
//	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
//	@GetMapping("/accounting.do")
//	public String channelAccountingPage() {
//		return "admin/channel/channelAccounting";
//	}
	
	@PreAuthorize("hasAnyRole('ROLE_ADMIN')")
	@PostMapping("/statisticslist")
	public PagingVO<ChannelDataVO> channelList(@RequestBody PagingVO<ChannelDataVO> page) {
		page.setTotal(service.getChTotal());
		page.setList(service.getChList(page));
		return page;
	}
	
}
