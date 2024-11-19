package kr.or.ddit.components.file.vo;

import java.util.Date;

import lombok.Data;

@Data
public class AtchFileVO {
	private int atchFileId;
	private String atchFileExpln;
	private Date atchFileRegdt;
	private Date atchFileRemovedt;
	private String[] files;	
}
