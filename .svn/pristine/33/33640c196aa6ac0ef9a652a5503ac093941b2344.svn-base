package kr.or.ddit.components.board.faq.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import kr.or.ddit.ServiceResult;
import kr.or.ddit.components.board.faq.vo.FaqVO;

public interface IFaqService {

	public List<FaqVO> faqList();

	public ServiceResult insertFaq(HttpServletRequest req, FaqVO faqVO);

	public FaqVO selectFaq(int faqNo);

	public ServiceResult updateFaq(HttpServletRequest req, FaqVO faqVO);

	public ServiceResult deleteFaq(HttpServletRequest req, int faqNo);


}
