package kr.or.ddit.components.threadboard.web;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.declaration.web.MediaUtils;
import kr.or.ddit.components.declaration.web.UploadFileUtiles;
import kr.or.ddit.components.file.service.IAtchFileService;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import kr.or.ddit.components.file.vo.AtchFileVO;
import kr.or.ddit.components.threadboard.service.IThreadBoardService;
import kr.or.ddit.components.threadboard.vo.ThreadBoardVO;
import kr.or.ddit.vo.PagingVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/thboard")
public class ThreadBoardController {

   @Resource(name = "localPath")
   private String localPath;

   @Resource(name = "uploadPath")
   private String resourcePath;

   @Resource(name = "uploadPathForMac")
   private String uploadPathForMac;

   @Inject
   private IThreadBoardService thBoardService;

   @Inject
   private IAtchFileService atchFileService;

   @PostMapping("/list")
   public ResponseEntity<Map<String, Object>> thboardList(@RequestBody ThreadBoardVO thboardVO) {
      int thNo = thboardVO.getThNo();
      thboardVO.setBrdRgdt(new Date());

      List<ThreadBoardVO> thboardlist = thBoardService.thboardlist(thboardVO);
      String thTtl = thBoardService.getThTtl(thNo);
      Map<String, Object> map = new HashMap<String, Object>();

      map.put("thTtl", thTtl);
      map.put("thboardlist", thboardlist);

      return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
   }
   @ResponseBody
   @PostMapping("/list2")
   public ResponseEntity<Map<String, Object>> thboardList2(
           @RequestBody PagingVO<ThreadBoardVO> pagingVO) {

       // 스레드 번호 => thNo : 238
       int thNo = pagingVO.getThNo();
       // 현재 페이지 번호 => page : 1
       int page = pagingVO.getPage();
       PagingVO<ThreadBoardVO> pagingVO1 = new PagingVO<>();
       
       // 전체 글 수
       int total = thBoardService.thboardFreeTotal(pagingVO);
       pagingVO1.setTotal(total);
       pagingVO1.setRowCnt(pagingVO.getRowCnt());
       
       // 글 목록
       List<ThreadBoardVO> threadBoardVOList = thBoardService.thboardFreeList(pagingVO);
       pagingVO1.setList(threadBoardVOList);
       log.info("thboardAuthority setList =>" ,threadBoardVOList);
       String thTtl = thBoardService.getThTtl(thNo);
       Map<String, Object> map = new HashMap<>();

       // 권한 관련 파라미터 설정
       int thboardAuthority = thBoardService.thboardAuthority(pagingVO);

       // 권한 정보 추가
       map.put("thboardAuthority", thboardAuthority);

       map.put("page", page);
       map.put("thTtl", thTtl);
       map.put("thNo", thNo);
       map.put("thboardFreeList", pagingVO1);

       return new ResponseEntity<>(map, HttpStatus.OK);
   }

   @PostMapping("/insert")
   public ResponseEntity<ThreadBoardVO> thboardInsert(ThreadBoardVO thboardVO) {
      // 첨부파일 정보 등록
      AtchFileVO atchFileVO = new AtchFileVO();
      atchFileVO.setAtchFileExpln("thboard");

      // 첨부파일 정보를 DB에 저장하고 ID를 받아옴
      atchFileService.thboardInsert(atchFileVO);
      int thatchFileId = atchFileVO.getAtchFileId();
      // 첨부파일 리스트가 있을 경우
      if (thboardVO.getThboardFileList() != null && !thboardVO.getThboardFileList().isEmpty()) {
         for (MultipartFile file : thboardVO.getThboardFileList()) {
            if (!file.isEmpty()) {
               try {
                  // 파일 저장
                  String savedPath = uploadFile(file.getOriginalFilename(), file.getBytes());

                  // AtchFileDetailVO 객체 생성 및 속성 설정
                  AtchFileDetailVO atchFileDetailVO = new AtchFileDetailVO();
                  atchFileDetailVO.setAtchFileId(thatchFileId); // 받아온 ID 설정
                  atchFileDetailVO.setAtchFilePath(savedPath);
                  atchFileDetailVO.setAtchFileOrgnlNm(file.getOriginalFilename());
                  atchFileDetailVO.setAtchFileSize((Long) file.getSize());
                  atchFileDetailVO.setAtchFileExtn(getFileExtension(file.getOriginalFilename()));
                  atchFileDetailVO.setAtchFileSaveNm(savedPath);

                  // DB에 파일 상세 정보 저장
                  atchFileService.insertDetail(atchFileDetailVO);
               } catch (Exception e) {
                  log.error("저장 오류: {}", e.getMessage());

               }
            }
         }
      }
      thboardVO.setBrdAtchFileId(thatchFileId);

      thBoardService.thboardInsert(thboardVO);
      int brdNo = thboardVO.getBrdNo();
      thboardVO = thBoardService.thboardSelect(brdNo); // 시퀀스로 brdNo 받았기떄문에 select에 있는 brdNo가지고 select 값을 가져와 쓸수있다..

      return new ResponseEntity<ThreadBoardVO>(thboardVO, HttpStatus.OK);
   }

   // 파일 업로드를 위한 static method
   private String uploadFile(String originalName, byte[] fileData) throws Exception {
      UUID uuid = UUID.randomUUID();
      String thsavedName = uuid.toString() + "_" + originalName;

      // OS에 따라 파일 경로 설정
      String os = System.getProperty("os.name").toLowerCase();
      if (os.contains("mac")) {
         localPath = uploadPathForMac; 
      }
      // 폴더 경로를 만들고 경로를 리턴
      String savedPath = UploadFileUtiles.calcPath(localPath);
      File file = new File(localPath + "thboard/" + savedPath);
      if (!file.exists()) {
         file.mkdirs();
      }

      File target = new File(localPath + "thboard/" + savedPath.replaceFirst("/", ""), thsavedName);
      FileCopyUtils.copy(fileData, target);

      String formatName = originalName.substring(originalName.lastIndexOf(".") + 1);
      String uploadedFileName = resourcePath + "thboard" + savedPath.replace(File.separatorChar, '/') + "/"
            + thsavedName;

      // 이미지 파일이면 썸네일 생성
      if (MediaUtils.getMediaType(formatName) != null) {
         UploadFileUtiles.makeThumbnail((localPath + "thboard/"), savedPath, thsavedName);
      }

      return uploadedFileName; // 상대 경로 반환
   }

   // 파일 확장자를 반환하는 메서드
   private String getFileExtension(String filename) {
      return filename.substring(filename.lastIndexOf(".") + 1);
   }

   @PostMapping("/select")
   public ResponseEntity<Map<String, Object>> thboardSelect(@RequestBody ThreadBoardVO thboardVO) {
      int brdNo = thboardVO.getBrdNo();

      int no1 = thboardVO.getSynerhub1();
      int no2 = thboardVO.getSynerhub2();
      thboardVO = thBoardService.thboardSelect(brdNo);

      PagingVO<ThreadBoardVO> pagingVO = new PagingVO<ThreadBoardVO>();
      pagingVO.setSynerhub1(no1);
	  pagingVO.setSynerhub2(no2);
      int thboardAuthority = thBoardService.thboardAuthority(pagingVO);
      
      Map<String, Object> map = new HashMap<String, Object>();
       
      map.put("thboardAuthority",thboardAuthority);
      map.put("thTtl", thboardVO.getThTtl());
      map.put("thboardVO", thboardVO);
      
      return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
   }

   @PostMapping("/update")
   public ResponseEntity<Map<String, Object>> thboardUpdate(@RequestBody ThreadBoardVO thboardVO) {
      int brdNo = thboardVO.getBrdNo();
      thBoardService.thboardUpdate(thboardVO);

      thboardVO = thBoardService.thboardSelect(brdNo);

      Map<String, Object> map = new HashMap<String, Object>();
      map.put("thboardVO", thboardVO);
      return new ResponseEntity<Map<String, Object>>(map, HttpStatus.OK);
   }

   @PostMapping("/delete")
   public ResponseEntity<String> thboardDelete(@RequestBody ThreadBoardVO thboardVO) {
      thBoardService.thBoardDelete(thboardVO);
      return new ResponseEntity<String>("SUCEESS", HttpStatus.OK);
   }

   @PostMapping("/thSearch")
   public ResponseEntity<List<ThreadBoardVO>> thboardSearch(@RequestBody ThreadBoardVO thBoardVO) {
      log.info("thboardSearch 실행@@@@@@@@@@@@@");
      List<ThreadBoardVO> res = thBoardService.thboardSearch(thBoardVO);
      
      return new ResponseEntity<List<ThreadBoardVO>>(res, HttpStatus.OK);
   }
   

}
