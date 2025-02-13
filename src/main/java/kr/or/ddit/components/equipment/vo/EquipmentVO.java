package kr.or.ddit.components.equipment.vo;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import lombok.Data;

@Data
public class EquipmentVO {
	private int eqpmntNo;
	private String eqpmntNm;
	private int eqpmntMngr;
	private int eqpmntUsing;
	private String eqpmntDt;
    private String eqpmntDue;
    private String eqpmntImg;
    
    private List<AtchFileDetailVO> fileEqpList;
    private List<MultipartFile> eqpFileList;
    
    private int eqpAtchFileId;
    
    private String eqmntContent;
    private int chNo;
    private int thNo;
    private int eqpmntCateNo;
    private String eqpmntCateNm;
    private String memNm;
    private String memPrflimg;
    private String type;
	public String thTtl;
	public String thClr;
	public String chTtl;
	public int rnum;
	private int memNo;
	private String chPrp;
	private int chMemThNo;
	private int rownum;
	private int eqpCount;
}