package kr.or.ddit.fileio;

import java.io.File;
import java.util.UUID;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.components.autograph.service.IAutographService;
import kr.or.ddit.components.autograph.vo.AutographVO;
import kr.or.ddit.components.declaration.web.UploadFileUtiles;
import kr.or.ddit.components.file.service.IAtchFileService;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import kr.or.ddit.components.file.vo.AtchFileVO;
import kr.or.ddit.fileio.vo.FileIoVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/fileio")
public class FileIO {
	
	@Inject
	private IAtchFileService atchFileService;
	
	@Inject
	private IAutographService autographService;
	
	@Resource(name = "localPath")
	private String localPath;

	@Resource(name = "uploadPath")
	private String resourcePath;

	@Resource(name = "uploadPathForMac")
	private String uploadPathForMac;
	
	@PostMapping("/uploadeditor")
	public String editorSaveImg(FileIoVO fileIoVO) {
		String res = "";
        // 첨부파일 정보 등록
        AtchFileVO atchFileVO = new AtchFileVO();
        atchFileVO.setAtchFileExpln(fileIoVO.getFolderName());

        // 첨부파일 정보를 DB에 저장하고 ID를 받아옴
        atchFileService.insert(atchFileVO);
        int atchFileId = atchFileVO.getAtchFileId();

        // 첨부파일 리스트가 있을 경우
        if (fileIoVO.getFileList() != null && !fileIoVO.getFileList().isEmpty()) {
            for (MultipartFile file : fileIoVO.getFileList()) {
                if (!file.isEmpty()) {
                    try {
                        // 파일 저장
                        String savedPath = uploadFile(file.getOriginalFilename(), file.getBytes(), fileIoVO.getFolderName());

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
                        
                        res = "/synerhub/upload/temp/" + fileIoVO.getFolderName() + atchFileDetailVO.getAtchFilePath();
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }

		return res;
	}
	
	@PostMapping("/upload")
	public int saveFile(FileIoVO fileIoVO){
        // 첨부파일 정보 등록
        AtchFileVO atchFileVO = new AtchFileVO();
        atchFileVO.setAtchFileExpln(fileIoVO.getFolderName());

        // 첨부파일 정보를 DB에 저장하고 ID를 받아옴
        atchFileService.insert(atchFileVO);
        int atchFileId = atchFileVO.getAtchFileId();

        // 첨부파일 리스트가 있을 경우
        if (fileIoVO.getFileList() != null && !fileIoVO.getFileList().isEmpty()) {
            for (MultipartFile file : fileIoVO.getFileList()) {
                if (!file.isEmpty()) {
                    try {
                        // 파일 저장
                        String savedPath = uploadFile(file.getOriginalFilename(), file.getBytes(), fileIoVO.getFolderName());

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
                        log.info("sort : " + fileIoVO.getSort());
                        if(fileIoVO.getSort() != null && fileIoVO.getSort().equals("autograph/insert")) {
                        	AutographVO atVO = new AutographVO();
                        	atVO.setAtchDetailFileId(atchFileDetailVO.getAtchDetailFileId());
                        	atVO.setAtchFileId(atchFileId);
                        	atVO.setMemNo(fileIoVO.getMemNo());
                        	atVO.setChNo(fileIoVO.getChNo());
                        	atVO.setSrc(savedPath);
                        	autographService.insertAutograph(atVO);
                        	return atVO.getAtgrphNo();
                        } else if (fileIoVO.getSort() != null && fileIoVO.getSort().equals("autograph/update")) {
                        	AutographVO atVO = new AutographVO();
                        	atVO.setAtchDetailFileId(atchFileDetailVO.getAtchDetailFileId());
                        	atVO.setAtchFileId(atchFileId);
                        	atVO.setMemNo(fileIoVO.getMemNo());
                        	atVO.setChNo(fileIoVO.getChNo());
                        	atVO.setAtgrphNo(fileIoVO.getAtgrphNo());
                        	atVO.setSrc(savedPath);
                        	autographService.updateAutograph(atVO);
                        	return atVO.getAtgrphNo();
                        }
                        
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }

		return atchFileId;
	}
	
	
	public String uploadFileAndGetName(MultipartFile file, String folderName) throws Exception {
		
		String savedName = uploadFile(file.getOriginalFilename(), file.getBytes(), folderName);
		return savedName;
	}
	
	private String uploadFile(String originalName, byte[] fileData, String folderName) throws Exception {

		UUID uuid = UUID.randomUUID();

		String savedName = uuid.toString() + "_" + originalName;

		String os = System.getProperty("os.name").toLowerCase();
		if (os.contains("mac")) {
			localPath = uploadPathForMac;
		}
		log.info(localPath);
		String savedPath = UploadFileUtiles.calcPath(localPath);

		File file = new File(localPath + folderName + "/" + savedPath);
		if (!file.exists()) {
			file.mkdirs();
		}

		File target = new File(localPath +  folderName + "/" + savedPath.replaceFirst("/", ""), savedName);
		FileCopyUtils.copy(fileData, target);

		String uploadedFileName = savedPath.replace(File.separatorChar, '/') + "/" + savedName;

		return uploadedFileName;
	}
	
    private String getFileExtension(String filename) {
        return filename.substring(filename.lastIndexOf(".") + 1);
    }
	
}
