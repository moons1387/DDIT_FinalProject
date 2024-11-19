package kr.or.ddit.components.todolist.vo;

import java.util.Date;

import lombok.Data;

@Data
public class TodoListVO {
	private int tdlNo;
	private String tdlListnm;
	private String tdlTtl;
	private String tdlConts;
	private Date tdlDt;
	private int tdlOrder;
	private int tdlState;
	private int memNo;
}
