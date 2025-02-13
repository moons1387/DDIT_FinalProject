package kr.or.ddit.components.facechat.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.facechat.service.IFaceChatMapper;
import kr.or.ddit.components.facechat.service.IFaceChatService;
import kr.or.ddit.components.facechat.vo.FaceChatVO;
import kr.or.ddit.vo.PagingVO;

@Primary
@Service
public class FaceChatService implements IFaceChatService {

	@Inject
	private IFaceChatMapper mapper;

	@Override
	public List<FaceChatVO> faceChatList() {
		return mapper.faceChatList();
	}

	@Override
	public FaceChatVO create(FaceChatVO faceChatVO) {
		mapper.create(faceChatVO);
		return mapper.getFcVO(faceChatVO);
	}

	@Override
	public void closeRoom(String id) {
		mapper.closeRoom(id);
	}

	@Override
	public int isTitleExist(String title) {
		return mapper.isTitleExist(title);
	}

	@Override
	public void getList(PagingVO<FaceChatVO> page) {
		page.setTotal(mapper.getFCTotal(page));
		page.setList(mapper.getFCList(page));
	}

	@Override
	public String getRoomUrlId(FaceChatVO fcVO) {
		return mapper.getRoomUrlId(fcVO);
	}

}
