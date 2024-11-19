package kr.or.ddit.components.member.service.impl;

import java.util.List;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.admin.declaration.vo.AdminDeclarationVO;
import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.channel.vo.ChannelVO;
import kr.or.ddit.components.declaration.vo.DeclarationVO;
import kr.or.ddit.components.member.service.IMemberMapper;
import kr.or.ddit.components.member.service.IMemberService;
import kr.or.ddit.vo.MemberVO;
import kr.or.ddit.vo.PaginationInfoVO;

@Primary
@Service
public class MemberServiceImpl implements IMemberService{

	@Inject
	private IMemberMapper mapper;
	
	@Inject
	private PasswordEncoder pe;
	
	@Override
	public MemberVO getUser(MemberVO memberVO) {
		return mapper.getUser(memberVO);
	}

	@Override
	public void editProfile(MemberVO memberVO) {
		if (memberVO.getMemPw() != null && !memberVO.getMemPw().isEmpty()) {
            memberVO.setMemPw(pe.encode(memberVO.getMemPw())); // 비밀번호가 존재할 경우에만 암호화
        }

        // 프로필 업데이트
		mapper.editProfile(memberVO);
	}

	@Override
	public Integer getMemNoById(String memId) {
		// TODO Auto-generated method stub
		return mapper.getMemNoById(memId);
	}

	@Override
	public MemberVO getMemInfoById(String memId) {
		
		return mapper.getMemInfoById(memId);
	}

	@Override
	public boolean chkMemExists(String memId) {
		
		return mapper.selectMemById(memId) != null;
	}

	@Override
	public List<ChannelMemberVO> getChList(MemberVO memberVO) {
		return mapper.getChList(memberVO);
	}

	@Override
	public List<DeclarationVO> getDelList(DeclarationVO declarationVO) {
		return mapper.getDelList(declarationVO);
	}

	@Override
	public int memberCount(PaginationInfoVO<MemberVO> pagingVO) {
		return mapper.memberCount(pagingVO);
	}

	@Override
	public List<MemberVO> pagingMemList(PaginationInfoVO<MemberVO> pagingVO) {
		return mapper.pagingMemList(pagingVO);
	}

	@Override
	public List<MemberVO> getAdminList() {
		return mapper.getAdminList();
	}

	@Override
	public void adminUpdate(MemberVO memberVO) {
		mapper.adminUpdate(memberVO);
	}

}
