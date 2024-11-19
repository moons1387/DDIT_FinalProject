package kr.or.ddit.components.admin.declaration.vo;

import lombok.Data;

@Data
public class AdminDeclarationStatsVO {
	private int dclrCategory;
    private int count;
    private int year;  
    private int month;
    private int dclrSort;
}
