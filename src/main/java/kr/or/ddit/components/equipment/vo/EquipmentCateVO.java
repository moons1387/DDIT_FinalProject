package kr.or.ddit.components.equipment.vo;

import java.util.Date;

import lombok.Data;

@Data
public class EquipmentCateVO {
	private int eqpmntCateNo;
	private String eqpmntCateNm;
	private int chNo;
	private int thNo;
	private Date eqpmntCateRegdate;
}
