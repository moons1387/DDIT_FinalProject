package kr.or.ddit.components.admin.channel.service;

import java.util.List;

import kr.or.ddit.components.admin.channel.vo.ChannelDataVO;
import kr.or.ddit.vo.PagingVO;

public interface IChannelStatisticsService {

	public int getChTotal();

	public List<ChannelDataVO> getChList(PagingVO<ChannelDataVO> page);

}
