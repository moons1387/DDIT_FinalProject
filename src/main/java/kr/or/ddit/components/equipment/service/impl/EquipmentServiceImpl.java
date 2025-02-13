package kr.or.ddit.components.equipment.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.equipment.service.IEquipmentMapper;
import kr.or.ddit.components.equipment.service.IEquipmentService;
import kr.or.ddit.components.equipment.vo.EquipmentCateVO;
import kr.or.ddit.components.equipment.vo.EquipmentUsingVO;
import kr.or.ddit.components.equipment.vo.EquipmentVO;
import kr.or.ddit.vo.PagingVO;

@Service
@Primary
public class EquipmentServiceImpl implements IEquipmentService {

	@Inject
	private IEquipmentMapper mapper;

	@Override
	public List<EquipmentCateVO> cateList(EquipmentCateVO eqpCateVO) {
		return mapper.cateList(eqpCateVO);
	}

	@Override
	public void cateInsert(EquipmentCateVO eqpCateVO) {
		mapper.cateInsert(eqpCateVO);
	}

	@Override
	public void cateUpdate(EquipmentCateVO eqpCateVO) {
		mapper.cateUpdate(eqpCateVO);
	}

	@Override
	public void cateDelete(int eqpmntCateNo) {
		mapper.cateDelete(eqpmntCateNo);
	}

	@Override
	public void eqpInsert(EquipmentVO eqpVO) {
		mapper.eqpInsert(eqpVO);
	}

	@Override
	public List<EquipmentVO> selectList(PagingVO<EquipmentVO> pagingVO) {
		if (pagingVO.getThNo() != 0) {
			pagingVO.setChNo(mapper.getChNo(pagingVO.getThNo()));
		}
		return mapper.selectList(pagingVO);
	}

	@Override
	public EquipmentVO selectOne(EquipmentVO eqpVO) {
		return mapper.selectOne(eqpVO);
	}

	@Override
	public void eqpUpdate(EquipmentVO eqpVO) {
		mapper.eqpUpdate(eqpVO);

	}

	@Override
	public void eqpDelete(int eqpmntNo) {
		mapper.eqpDelete(eqpmntNo);
	}

	@Override
	public void eqpUnable(EquipmentVO eqpVO) {
		mapper.eqpUnable(eqpVO);
		mapper.eqpUnableUsingReturn(eqpVO);
	}

	@Override
	public void eqpUsingInsert(EquipmentUsingVO eqpUseVO) {
		eqpUseVO.setChNo(mapper.getChNo(eqpUseVO.getThNo()));
		mapper.eqpUsingInsert(eqpUseVO);
		mapper.eqpUsingUpdate(eqpUseVO.eqpmntNo);
	}

	public List<EquipmentUsingVO> eqpLiveList(int chNo) {
		return mapper.eqpLiveList(chNo);
	}

	@Override
	public EquipmentUsingVO eqpUsingSelectOne(EquipmentUsingVO eqpUsingVo) {
		return mapper.eqpUsingSelectOne(eqpUsingVo);
	}

	@Override
	public void eqpUsingLiveUpdate(EquipmentUsingVO eqpUsingVO) {
		mapper.eqpUsingLiveUpdate(eqpUsingVO);
	}

	@Override
	public void eqpUsingReturn(int logNo) {
		mapper.eqpUsingReturn(logNo);
		mapper.eqpUsingReturnState(logNo);
	}

	@Override
	public EquipmentVO getChUser(EquipmentVO eqpVO) {
		return mapper.getChUser(eqpVO);
	}

	@Override
	public int equipmentTotal(PagingVO<EquipmentVO> pagingVO) {
		return mapper.equipmentTotal(pagingVO);
	}

	@Override
	public int eqpCount(EquipmentVO eqpVO) {
		eqpVO.setChNo(mapper.getChNo(eqpVO.getThNo()));
		return mapper.eqpCount(eqpVO);
	}

	@Override
	public int eqpUsingCount(EquipmentVO eqpVO) {
		eqpVO.setChNo(mapper.getChNo(eqpVO.getThNo()));
		return mapper.eqpUsingCount(eqpVO);
	}

}
