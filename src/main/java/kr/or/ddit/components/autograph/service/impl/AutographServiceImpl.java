package kr.or.ddit.components.autograph.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.autograph.service.IAutographService;
import kr.or.ddit.components.autograph.vo.AutographVO;

@Primary
@Service
public class AutographServiceImpl implements IAutographService {

	@Inject
	private IAutographMapper mapper;
	
	
	@Override
	public List<AutographVO> getAutograph(AutographVO atVO) {
		return mapper.getAutograph(atVO);
	}


	@Override
	public int insertAutograph(AutographVO atVO) {
		return mapper.insertAutograph(atVO);
	}


	@Override
	public int updateAutograph(AutographVO atVO) {
		return mapper.updateAutograph(atVO);
	}


	@Override
	public int deleteAutograph(AutographVO atVO) {
		return mapper.deleteAutograph(atVO);
	}

}
