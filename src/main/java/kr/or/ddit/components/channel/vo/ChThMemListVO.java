package kr.or.ddit.components.channel.vo;

import java.util.List;

import kr.or.ddit.vo.MemberVO;
import lombok.Data;

@Data
public class ChThMemListVO {
	
	public ChThMemListVO(){}
	
	public ChThMemListVO(List<ChannelThreadVO> thList, List<MemberVO> memList, String memRoleList, String memMngrRoleList){
		this.thList = thList;
		this.memList = memList;
		this.memRoleList = memRoleList;
		this.memMngrRoleList = memMngrRoleList;
	}
	
	private List<ChannelThreadVO> thList;
	private List<MemberVO> memList;
	private String memRoleList;
	private String memMngrRoleList;
}
