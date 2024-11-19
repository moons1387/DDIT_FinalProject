package kr.or.ddit.components.board.faq.vo;

import java.util.Date;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.vo.BoardFileVO;
import lombok.Data;

@Data
public class FaqVO {
	private int	faqNo;
	private int faqCategory;
	private String faqTtl;
	private String faqConts;
	private int faqWtr;
	private int faqAtchFileId;
	
	private List<MultipartFile> faqFileList;

}
