package kr.or.ddit.components.member.service;

import java.util.List;

import kr.or.ddit.components.admin.declaration.vo.AdminDeclarationVO;
import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.declaration.vo.DeclarationVO;
import kr.or.ddit.vo.MemberVO;
import kr.or.ddit.vo.PaginationInfoVO;

public interface IMemberService {

	public MemberVO getUser(MemberVO memberVO);

	public void editProfile(MemberVO memberVO);

	public Integer getMemNoById(String memId);

	public MemberVO getMemInfoById(String memId);

	public boolean chkMemExists(String memId);

	public List<ChannelMemberVO> getChList(MemberVO memberVO);

	public List<DeclarationVO> getDelList(DeclarationVO declarationVO);

	public int memberCount(PaginationInfoVO<MemberVO> pagingVO);

	public List<MemberVO> pagingMemList(PaginationInfoVO<MemberVO> pagingVO);

	public List<MemberVO> getAdminList();

	public void adminUpdate(MemberVO memberVO);


}
