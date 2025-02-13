package kr.or.ddit.components.channelboard.vo;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import lombok.Data;

@Data
public class ChannelBoardVO {
	
	private int rnum;
	private int brdNo;
	private int chNo;
	private int thNo;
	private String brdTtl;
	private int brdWrtr;
	private String brdConts;
	private Date brdRgdt;
	private int brdHit;
	private int tmp;
	
	private int brdAtchFileId;
	private List<MultipartFile> chBoardFileList;
	private List<AtchFileDetailVO> chBoardFileDetail;

	
	private String memPrflimg;
	private String thTtl;
	private Date thRgdt;
	private String thClr;
	private String brdWrtrNm;
	
	
	
	
	public String getFormattedBrdRgdt() {
        if (this.brdRgdt != null) {
            SimpleDateFormat chboardRgdt = new SimpleDateFormat("yyyy-MM-dd");
            return chboardRgdt.format(this.brdRgdt);
        }
        return null; // brdRgdt가 null인 경우
    }
}
