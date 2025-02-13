package kr.or.ddit.components.notice.vo;

import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Data;

@Data
public class NoticeVO {
	
	private int ntcNo;
	private String ntcTtl;
	private String ntcConts;
	private Date ntcRgdt;
	private Date ntcVldDt;
	private int ntcHit;
	private int ntcWtr;
	
	
	public String getNtcWtrDisplay() {
		switch (ntcWtr) {
		case 0 : return "SynerHUB 고객센터";
		
		default : return "Unknown";
		}
	}
	
	
	 public String getNtcRgdtFormatted() {
	        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	        return formatter.format(ntcRgdt);
	    }
}
