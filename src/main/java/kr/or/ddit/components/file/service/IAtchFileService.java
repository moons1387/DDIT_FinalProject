package kr.or.ddit.components.file.service;

import java.util.List;

import kr.or.ddit.components.chatting.vo.ChattingGroupVO;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import kr.or.ddit.components.file.vo.AtchFileVO;

public interface IAtchFileService {

	public void insert(AtchFileVO atchFileVO);

	public void insertDetail(AtchFileDetailVO atchFileDetailVO);

	public List<AtchFileDetailVO> getDetail(int atchFileId);

	public List<AtchFileDetailVO> getOnlyFile(ChattingGroupVO chattingGroupVO);

	public void thboardInsert(AtchFileVO atchFileVO);



	
}
