package kr.or.ddit.components.autograph.service.impl;

import java.util.List;

import kr.or.ddit.components.autograph.vo.AutographVO;

public interface IAutographMapper {

	public List<AutographVO> getAutograph(AutographVO atVO);

	public int insertAutograph(AutographVO atVO);

	public int updateAutograph(AutographVO atVO);

	public int deleteAutograph(AutographVO atVO);

}
