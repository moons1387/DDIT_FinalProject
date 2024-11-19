package kr.or.ddit.components.admin.declaration.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.admin.declaration.service.AdminDeclarationMapper;
import kr.or.ddit.components.admin.declaration.service.IAdminDeclarationService;
import kr.or.ddit.components.admin.declaration.vo.AdminDeclarationStatsVO;
import kr.or.ddit.components.admin.declaration.vo.AdminDeclarationVO;
import kr.or.ddit.vo.MemberVO;
import kr.or.ddit.vo.PaginationInfoVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Primary
@Service
public class AdminDeclarationServiceImpl implements IAdminDeclarationService {

	@Inject
	private AdminDeclarationMapper adminDclrMapper;

	@Override
	public AdminDeclarationVO selectDclr(int dclrNo) {
		return adminDclrMapper.selectDclr(dclrNo);
	}

	@Override
	public List<AdminDeclarationVO> getRecentDclr(int dclrSubId) {
		return adminDclrMapper.getRecentDclr(dclrSubId);
	}

	@Override
	public AdminDeclarationVO rctDclrDetail(int dclrNo) {
		return adminDclrMapper.rctDclrDetail(dclrNo);
	}

	@Override
	public int increaseWarningCount(int dclrSubId) {
		return adminDclrMapper.increaseWarningCount(dclrSubId);
	}

	@Override
	public int decreaseWarningCount(int dclrSubId) {
		return adminDclrMapper.decreaseWarningCount(dclrSubId);
	}
	
	@Override
	public void blackListInsert(AdminDeclarationVO adminDclVO) {
		if(adminDclVO.getBlackType().equals("insert")) {
			adminDclrMapper.blackInsert(adminDclVO);
		}
		else {
			adminDclrMapper.blackDelete(adminDclVO);
		}
	}

	@Override
	public int selectDclrCount(PaginationInfoVO<AdminDeclarationVO> pagingVO) {
		return adminDclrMapper.selectDclrCount(pagingVO);
	}

	@Override
	public List<AdminDeclarationVO> dclrList(PaginationInfoVO<AdminDeclarationVO> pagingVO) {
		return adminDclrMapper.dclrList(pagingVO);
	}

	@Override
	public int selectBlackCount(PaginationInfoVO<MemberVO> pagingVO) {
		return adminDclrMapper.selectBlackCount(pagingVO);
	}

	@Override
	public List<MemberVO> blackListManage(PaginationInfoVO<MemberVO> pagingVO) {
		return adminDclrMapper.blackListManage(pagingVO);
	}

	@Override
	public int selectHandledCount(AdminDeclarationVO pagingVO) {
		return adminDclrMapper.selectHandledCount(pagingVO);
	}

	@Override
	public int selectUnHandledCount(AdminDeclarationVO pagingVO) {
		return adminDclrMapper.selectUnHandledCount(pagingVO);
	}

	@Override
	public List<AdminDeclarationStatsVO> dclrStats() {
		return adminDclrMapper.dclrStats();
	}

//	@Override
//	public List<AdminDeclarationStatsVO> dclrStatsPerMonth(int month) {
//		return adminDclrMapper.dclrStatsPerMonth(month);
//	}

	@Override
	public List<AdminDeclarationStatsVO> dclrStatsPerYear(int year) {
		return adminDclrMapper.dclrStatsPerYear(year);
	}

	@Override
	public List<AdminDeclarationStatsVO> dclrStatsPerYearAndMonth(int year, int month) {
	    return adminDclrMapper.dclrStatsPerYearAndMonth(year, month);
	}



	


}
