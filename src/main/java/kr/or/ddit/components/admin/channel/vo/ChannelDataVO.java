package kr.or.ddit.components.admin.channel.vo;

import lombok.Data;

@Data
public class ChannelDataVO {
	
	private int chNo;
	private String chTtl;
	private String chCode;
	private int memCnt;
	private int curMemCnt;
	private float curVol;
	private float maxVol;
	
}
