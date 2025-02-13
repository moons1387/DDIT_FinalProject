package kr.or.ddit.components.file.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.chatting.vo.ChattingGroupVO;
import kr.or.ddit.components.file.service.IAtchFileMapper;
import kr.or.ddit.components.file.service.IAtchFileService;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import kr.or.ddit.components.file.vo.AtchFileVO;

@Service
@Primary
public class AtchFileServiceImpl implements IAtchFileService {

    @Inject
    private IAtchFileMapper atchFileMapper;

    @Override
    public void insert(AtchFileVO atchFileVO) {
        // 첨부파일 정보를 등록
        atchFileMapper.insert(atchFileVO);
    }

    @Override
    public void insertDetail(AtchFileDetailVO atchFileDetailVO) {
        // 첨부파일 상세 정보를 등록
        atchFileMapper.insertDetail(atchFileDetailVO);
    }

	@Override
	public List<AtchFileDetailVO> getDetail(int atchFileId) {
		return atchFileMapper.getDetail(atchFileId);
	}

	@Override
	public List<AtchFileDetailVO> getOnlyFile(ChattingGroupVO chattingGroupVO) {
		return atchFileMapper.getOnlyFile(chattingGroupVO);
	}

	@Override
	public void thboardInsert(AtchFileVO atchFileVO) {
		atchFileMapper.thboardInsert(atchFileVO);
	}
}
