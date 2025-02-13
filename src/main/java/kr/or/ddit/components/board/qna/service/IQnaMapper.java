package kr.or.ddit.components.board.qna.service;

import java.util.List;

import kr.or.ddit.components.board.qna.vo.QnaStatsVO;
import kr.or.ddit.components.board.qna.vo.QnaVO;
import kr.or.ddit.vo.PaginationInfoVO;
import kr.or.ddit.vo.PagingVO;

public interface IQnaMapper {
    public void incrementHit(int qnaNo);
    public List<QnaVO> qnaList(QnaVO qnaVO);
	public QnaVO selectQna(int qnaNo);
	public int deleteQna(int qnaNo);
	public int modifyQna(QnaVO qnaVO);
	public void insertQna(QnaVO qnaVO);
	
	// 여기서 부터 관리자용
	public int adminInsertQna(QnaVO qnaVO);
	public int updateQna(QnaVO qnaVO);
	public int selectQnaCount(PaginationInfoVO<QnaVO> pagingVO);
	public List<QnaVO> selectQnaList(PaginationInfoVO<QnaVO> pagingVO);
	public List<QnaStatsVO> qnaStats();
	public List<QnaStatsVO> qnaStatsPerMonth(int month);
	public int getTotalPosts();
	public List<QnaVO> getUnansweredCount();
	public List<QnaVO> selectUnAQnaList(PaginationInfoVO<QnaVO> pagingVO);
	public int selectUnAQnaCount(PaginationInfoVO<QnaVO> pagingVO);
	
	// 여기서 부터 페이징
	public int qnaTotal(PagingVO<QnaVO> pagingVO);
	public List<QnaVO> qnaList2(PagingVO<QnaVO> pagingVO);
}
