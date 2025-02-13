package kr.or.ddit.components.facechat.service;

import java.util.List;

import kr.or.ddit.components.facechat.vo.FaceChatVO;
import kr.or.ddit.vo.PagingVO;

public interface IFaceChatMapper {

	public List<FaceChatVO> faceChatList();

	public void create(FaceChatVO faceChatVO);

	public void closeRoom(String id);

	public int isTitleExist(String title);

	public FaceChatVO getFcVO(FaceChatVO faceChatVO);

	public int getFCTotal(PagingVO<FaceChatVO> page);

	public List<FaceChatVO> getFCList(PagingVO<FaceChatVO> page);

	public String getRoomUrlId(FaceChatVO fcVO);
	
}
