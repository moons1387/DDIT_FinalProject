package kr.or.ddit.components.declaration.web;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.apache.commons.io.IOUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.declaration.service.IDeclarationService;
import kr.or.ddit.components.declaration.vo.DeclarationVO;
import kr.or.ddit.components.file.service.IAtchFileService;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import kr.or.ddit.components.file.vo.AtchFileVO;
//import kr.or.ddit.vo.Item3;
//import kr.or.ddit.vo.Item3;
import kr.or.ddit.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping(value = "/declaration")
public class DeclarationController {

   @Resource(name = "localPath")
   private String localPath;

   @Resource(name = "uploadPath")
   private String resourcePath;

   @Resource(name = "uploadPathForMac")
   private String uploadPathForMac;

   @Inject
   private IDeclarationService dclrService;
   
   @Inject
   private IAtchFileService atchFileService;

   // 멤버 리스트 출력
   @PostMapping("/memberList")
   public ResponseEntity<List<MemberVO>> memberList(@RequestBody MemberVO memberVO) {
//      log.info("memberList() 실행...!");
      int memNo = memberVO.getMemNo();
      List<MemberVO> memberList = dclrService.getMemberList(memNo);

//      log.info("members: {}", memberList);

      return new ResponseEntity<List<MemberVO>>(memberList, HttpStatus.OK);
   }
   
   // 멤버 검색
   @PostMapping("/memberSearch")
   public ResponseEntity<List<MemberVO>> memberSearch(@RequestBody MemberVO memberVO) {
//      log.info("memberSearch() 실행...!");
      List<MemberVO> memberSearch = dclrService.getMemberSearch(memberVO);

//      log.info("memberSearchResult : " + memberSearch);
//      log.info("memName : " + memberVO.getMemName());
      return new ResponseEntity<List<MemberVO>>(memberSearch, HttpStatus.OK);
   }

   @PostMapping("/insert")
    public ResponseEntity<List<DeclarationVO>> insertDclr(DeclarationVO dclrVO) {
//        log.info("insertDclr() 실행...!");

        // 첨부파일 정보 등록
        AtchFileVO atchFileVO = new AtchFileVO();
        atchFileVO.setAtchFileExpln("dclr");

        // 첨부파일 정보를 DB에 저장하고 ID를 받아옴
        atchFileService.insert(atchFileVO);
        int atchFileId = atchFileVO.getAtchFileId();
//        log.info("atchFileId : " + atchFileId);

        // 첨부파일 리스트가 있을 경우
        if (dclrVO.getDclrFileList() != null && !dclrVO.getDclrFileList().isEmpty()) {
            for (MultipartFile file : dclrVO.getDclrFileList()) {
                if (!file.isEmpty()) {
                    try {
                        // 파일 저장
                        String savedPath = uploadFile(file.getOriginalFilename(), file.getBytes());

                        // AtchFileDetailVO 객체 생성 및 속성 설정
                        AtchFileDetailVO atchFileDetailVO = new AtchFileDetailVO();
                        atchFileDetailVO.setAtchFileId(atchFileId); // 받아온 ID 설정
                        atchFileDetailVO.setAtchFilePath(savedPath);
                        atchFileDetailVO.setAtchFileOrgnlNm(file.getOriginalFilename());
                        atchFileDetailVO.setAtchFileSize((Long) file.getSize());
                        atchFileDetailVO.setAtchFileExtn(getFileExtension(file.getOriginalFilename()));
                        atchFileDetailVO.setAtchFileSaveNm(savedPath);

                        // DB에 파일 상세 정보 저장
                        atchFileService.insertDetail(atchFileDetailVO);
                    } catch (Exception e) {
//                        log.error("저장 오류: {}", e.getMessage());
                    }
                }
            }
        }
        dclrVO.setDclrAtchFileId(atchFileId);
        dclrService.insertDclr(dclrVO);

        List<DeclarationVO> list = dclrService.dclrList(dclrVO);

        return new ResponseEntity<>(list, HttpStatus.OK);
    }
   
    // 파일 확장자를 반환하는 메서드
   private String getFileExtension(String filename) {
      return filename.substring(filename.lastIndexOf(".") + 1);
   }

   @ResponseBody
   @PostMapping(value = "/uploadAjax", produces = "text/plain; charset=utf-8")
   public ResponseEntity<String> uploadAjax(MultipartFile file) throws Exception {
//      log.info("uploadAjax() 실행...!");
//      log.info("OriginalFilename : " + file.getOriginalFilename());

      // savedName은 /2024/10/11/UUID_원본파일명
      String savedName = uploadFile(file.getOriginalFilename(), file.getBytes());
      return new ResponseEntity<String>(savedName, HttpStatus.OK);
   }

   @GetMapping(value = "/displayFile")
   public ResponseEntity<byte[]> displayFile(String fileName) {
//      log.info("displayFile() 실행...!");

      InputStream in = null;
      ResponseEntity<byte[]> entity = null;

      try {
         String formatName = fileName.substring(fileName.lastIndexOf(".") + 1);
//         log.info(formatName);
         MediaType mType = MediaUtils.getMediaType(formatName);
         HttpHeaders headers = new HttpHeaders();

         in = new FileInputStream(localPath + "declaration/" + fileName);
         if (mType != null) {
            headers.setContentType(mType);
         } else {
            fileName = fileName.substring(fileName.indexOf("_") + 1);
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.add("Content-Disposition",
                  "attachment; filename=\"" + new String(fileName.getBytes("UTF-8"), "ISO-8859-1") + "\"");
         }
         entity = new ResponseEntity<byte[]>(IOUtils.toByteArray(in), headers, HttpStatus.CREATED);
      } catch (Exception e) {
         e.printStackTrace();
         entity = new ResponseEntity<byte[]>(HttpStatus.BAD_REQUEST);
      } finally {
         try {
            in.close();
         } catch (IOException e) {
            e.printStackTrace();
         }
      }
      return entity;
   }

   // 파일 업로드를 위한 static method
   private String uploadFile(String originalName, byte[] fileData) throws Exception {

      UUID uuid = UUID.randomUUID();

      String savedName = uuid.toString() + "_" + originalName;

      String os = System.getProperty("os.name").toLowerCase();
      if (os.contains("mac")) {
         localPath = uploadPathForMac;
      }

      // /2024/09/09 폴더 경로를 만들고 경로를 리턴
      String savedPath = UploadFileUtiles.calcPath(localPath);

      File file = new File(localPath + "declaration/" + savedPath);
      if (!file.exists()) { 
         file.mkdirs();
      }

      // 배포된 서버 업로드 경로 + /2024/09/09 saveName.d
      File target = new File(localPath + "declaration/" + savedPath.replaceFirst("/", ""), savedName);
      FileCopyUtils.copy(fileData, target); // 파일 복사(업로드 하기 위해 만들어진 최종 경로로 파일 복사가 이루어짐)

      String formatName = originalName.substring(originalName.lastIndexOf(".") + 1);
//      String uploadedFileName = savedPath.replace(File.separatorChar, '/') + "/" + savedName;
      String uploadedFileName = resourcePath + "declaration" + savedPath.replace(File.separatorChar, '/') + "/" + savedName;

      // 확장자가 이미지 파일이면 s_가 붙은 파일이 썸네일 이미지 파일을 생성
      if (MediaUtils.getMediaType(formatName) != null) {
         UploadFileUtiles.makeThumbnail((localPath + "declaration/"), savedPath, savedName);
      }

//      log.info("uploadedFileName : " + uploadedFileName);

      return uploadedFileName;
   }

}
