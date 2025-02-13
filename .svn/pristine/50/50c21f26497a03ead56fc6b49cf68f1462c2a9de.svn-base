package kr.or.ddit.components.facechat.service;

import java.util.List;

import kr.or.ddit.components.facechat.vo.FaceChatVO;
import kr.or.ddit.vo.PagingVO;

public interface IFaceChatService {
	
	public List<FaceChatVO> faceChatList();

	public FaceChatVO create(FaceChatVO faceChatVO);

	public void closeRoom(String id);

	public int isTitleExist(String title);

	public void getList(PagingVO<FaceChatVO> page);

	public String getRoomUrlId(FaceChatVO fcVO);
	
}
