package kr.or.ddit.components.autograph.service;

import java.util.List;

import kr.or.ddit.components.autograph.vo.AutographVO;

public interface IAutographService {

	public int insertAutograph(AutographVO atVO);

	public List<AutographVO> getAutograph(AutographVO atVO);

	public int deleteAutograph(AutographVO atVO);

	public int updateAutograph(AutographVO atVO);

}
