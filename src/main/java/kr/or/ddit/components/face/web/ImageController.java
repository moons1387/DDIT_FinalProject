package kr.or.ddit.components.face.web;

import javax.inject.Inject;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import kr.or.ddit.components.face.service.IFaceCaptureService;
import kr.or.ddit.vo.ImageRequest;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequestMapping("/login")
@Controller
public class ImageController {
	
    @Inject
    private IFaceCaptureService faceCaptureService; // 서비스 주입
    
    // 이미지 업로드 페이지 요청
    @GetMapping("/uploadImage")
    public String mainImage(@RequestParam(value = "host", required = false) String host, Model model) {
    	log.info(host);
    	model.addAttribute("host",host);
    	
        return "test/faceTest"; // 업로드 페이지로 이동
    }

    // 이미지 업로드 처리
    @PostMapping("/uploadImage")
    public ResponseEntity<String> uploadImage(@RequestBody ImageRequest imageRequest) {
        // 이미지 정보 처리 로직 (예: 데이터베이스에 저장)
        String fileName = imageRequest.getFileName();
        String fileSavePath = imageRequest.getFileSavePath();
        
        // 이미지 저장 로직 (구현 필요)
        return ResponseEntity.status(HttpStatus.OK).body("Image info saved successfully."); // 성공 메시지 반환
    }
    
}
   
