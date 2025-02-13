package kr.or.ddit.components.project.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.document.vo.DocumentVO;
import kr.or.ddit.components.project.service.IProjectMapper;
import kr.or.ddit.components.project.service.IProjectService;
import kr.or.ddit.components.project.vo.ProjectDetailSubWrkVO;
import kr.or.ddit.components.project.vo.ProjectDetailVO;
import kr.or.ddit.components.project.vo.ProjectGroupMemberVO;
import kr.or.ddit.components.project.vo.ProjectGroupVO;
import kr.or.ddit.components.project.vo.ProjectPrgrsInfoVO;
import kr.or.ddit.components.project.vo.ProjectVO;
import kr.or.ddit.vo.PagingVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Primary
@Service
public class ProjectServiceImpl implements IProjectService{

	@Inject
	private IProjectMapper mapper;
	
	@Override
	public List<ProjectVO> getProjectList(PagingVO<ProjectVO> page) {
		return mapper.getProjectList(page);
	}

	@Override
	public ProjectVO getProjectDetail(long no) {
		return mapper.getProjectDetail(no);
	}

	@Override
	public ProjectVO updateProject(ProjectVO pv) {
		return mapper.updateProject(pv);
	}

	@Override
	public int deleteProject(long no) {
		return mapper.deleteProject(no);
	}

//	@Override
//	public int getTotal(PagingVO<ProjectVO> page) {
//		return mapper.getTotal(page);
//	}

	@Override
	public int projectGo(long no) {
		return mapper.projectGo(no);
	}

	@Override
	public int projectStop(long no) {
		return mapper.projectStop(no);
	}

	@Override
	public int projectTerminate(long no) {
		return mapper.projectTerminate(no);
	}

	@Override
	public ProjectDetailVO projectDtailList(long no) {
		return mapper.projectDetailList(no);
	}

	@Override
	public List<ProjectVO> getProjectDetailList(PagingVO<ProjectVO> page) {
		return mapper.getProjectDetailList(page);
	}

	@Override
	public int getProjectDetailTotal(PagingVO<ProjectVO> page) {
		return mapper.getProjectDetailTotal(page);
	}

	@Override
	public int projectDetailGo(long no) {
		return mapper.projectDetailGo(no);
	}

	@Override
	public int projectDetailStop(long no) {
		return mapper.projectDetailStop(no);
	}

	@Override
	public int projectDetailTerminate(long no) {
		return mapper.projectDetailTerminate(no);
	}

	@Override
	public int getTotal(PagingVO<ProjectVO> page) {
		return mapper.getTotal(page);
	}

	@Override
	public List<ProjectVO> getList(PagingVO<ProjectVO> page) {
		return mapper.getList(page);
	}

	@Override
	public PagingVO<DocumentVO> dataForInsert(PagingVO<DocumentVO> page) {
		
		// 페이징 VO로 문서목록을 불러옴
		page.setChannelMemberVO(mapper.getMyinfo(page));
		page.setTotal(mapper.getDocListTotal(page));
		page.setList(mapper.getDocList(page));
		
		return page;
	}

	@Override
	public ProjectVO projectInsert(ProjectVO pjtVO) {
		// 프로젝트를 등록함
		mapper.projectInsert(pjtVO);
		
		// 프로젝트에 참여할 그룹에 프로젝트 키값을 외레키로 등록 
		ProjectGroupVO pgVO = pjtVO.getPgVO();
		pgVO.setPjtNo(pjtVO.getPjtNo());
		// 프로젝트 그룹을 등록
		mapper.projectGroupInsert(pgVO);
		
		// 프로젝트의 그룹 키값을 
		// 프로젝트 그룹 각각의 인원에 외레키로 등록
		int groupNo = pgVO.getGroupNo();
		List<ProjectGroupMemberVO> pgmList = pjtVO.getPgmList();
		for (ProjectGroupMemberVO pgmVO : pgmList) {
			pgmVO.setGroupNo(groupNo);
			// 프로젝트 그룹 인원을 등록
			mapper.projectGroupMemberInsert(pgmVO);
		}
		
		return pjtVO;
	}

	@Override
	public ProjectVO getProject(PagingVO<ProjectVO> page) {
		
		// 각 프로젝트의 진행도를 담은 맵
		// SQL Developer의 AVG함수를 사용함
		Map<String, Object> map = new HashMap<String, Object>();
		List<ProjectDetailVO> dataList = mapper.getDataList(page.getSynerhub1());
		map.put("dataList", dataList);
		page.setMap(map);
		
		ProjectVO pjtVO = mapper.getProject(page);
		if(mapper.getFileList(page).size() != 0) {
			pjtVO.setFileList(mapper.getFileList(page));
		}
		return pjtVO;
	}

	@Override
	public ProjectDetailVO insertPjtDetail(ProjectDetailVO projectDetailVO) {
		mapper.inserPjtDetail(projectDetailVO);
		int no = projectDetailVO.getPjtDtlNo();
		return mapper.getPjtDetailVO(no);
	}

	@Override
	public ProjectDetailVO getPjtDtlSubWrkList(int no) {
		return mapper.getPjtDtlSubWrkList(no);
	}

	@Override
	public ProjectDetailSubWrkVO uploadPds(ProjectDetailSubWrkVO pdsVO) {
		
		if(pdsVO.getPdsNo() == 0) {
			// 프로젝트 세부업무 등록
			mapper.uploadPds(pdsVO);
			pdsVO = mapper.getPds(mapper.getMaxPdsNo());
		}else {
			// 프로젝트 세부업무 수정
			mapper.uploadPds(pdsVO);
		}
		
		return pdsVO;
	}

	@Override
	public Map<String, Object> updatePrgrs(ProjectDetailVO pdVO) {
		Map <String, Object> dataMap = new HashMap<String, Object>();
		// 진행도를 수정함
		mapper.updatePrgrs(pdVO);
		int no = mapper.selectPjt(pdVO);
		
		// 진행도가 수정된 프로젝트의 진행도를 다시 조회함
		List<ProjectDetailVO> dataList = mapper.getDataList(no);
		
		dataMap.put("dataList", dataList);
		
		return dataMap; 
	}

	@Override
	public List<ProjectPrgrsInfoVO> getChProjectInfo(PagingVO<ProjectPrgrsInfoVO> page) {
		page.setTotal(mapper.getChProjectInfoTotal(page));
		return mapper.getChProjectInfo(page);
	}

	
}
