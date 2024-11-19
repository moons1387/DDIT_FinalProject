package kr.or.ddit.components.drive.web;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.annotation.Resource;
import javax.inject.Inject;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import kr.or.ddit.ServiceResult;
import kr.or.ddit.components.channel.service.IChannelService;
import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.channel.vo.ChannelThreadVO;
import kr.or.ddit.components.channel.vo.ChannelVO;
import kr.or.ddit.components.chatting.service.IChatService;
import kr.or.ddit.components.declaration.web.UploadFileUtiles;
import kr.or.ddit.components.document.service.IDocumentService;
import kr.or.ddit.components.document.vo.AplnVO;
import kr.or.ddit.components.document.vo.DocumentVO;
import kr.or.ddit.components.drive.service.IDriveService;
import kr.or.ddit.components.drive.vo.DriveVO;
import kr.or.ddit.components.file.service.IAtchFileService;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;
import kr.or.ddit.components.file.vo.AtchFileVO;
import kr.or.ddit.vo.PagingVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/drive")
public class DriveController {

	@Inject
	private IDriveService service;

	@Resource(name = "localPath")
	private String localPath;

	@Resource(name = "uploadPath")
	private String resourcePath;

	@Resource(name = "uploadPathForMac")
	private String uploadPathForMac;

	@Inject
	private IAtchFileService atchFileService;

	@PostMapping("/getList")
	public ResponseEntity<Map<String, List<ChannelMemberVO>>> getList(@RequestBody ChannelMemberVO channelMemberVO) {
		Map<String, List<ChannelMemberVO>> map = new HashMap<String, List<ChannelMemberVO>>();

		List<ChannelMemberVO> chList = service.getChList(channelMemberVO);

		List<ChannelMemberVO> thList = service.getThList(channelMemberVO);

		log.info("chList : " + chList);
		log.info("thList : " + thList);

		map.put("chList", chList);
		map.put("thList", thList);

		return new ResponseEntity<Map<String, List<ChannelMemberVO>>>(map, HttpStatus.OK);
	}

	@PostMapping("/getFileList")
	public ResponseEntity<List<AtchFileDetailVO>> getFileList(@RequestBody ChannelMemberVO channelMemberVO) {

		List<AtchFileDetailVO> list = new ArrayList<AtchFileDetailVO>();
		ServiceResult result = null;

		log.info("driveVO : " + channelMemberVO);
		DriveVO driveVO = new DriveVO();

		list = service.getFileList(channelMemberVO);

		if (list.size() > 0) {
			if (channelMemberVO.getChNo() == 0 && channelMemberVO.getThNo() == 0) {
				list.get(0).setTotalSize(53687091200L);
			} else if (channelMemberVO.getChNo() == 0 && channelMemberVO.getThNo() != 0) {
				driveVO = service.getTotalSizeToTh(channelMemberVO.getThNo());
			} else if (channelMemberVO.getChNo() != 0 && channelMemberVO.getThNo() == 0) {
				driveVO = service.getTotalSizeToCh(channelMemberVO.getChNo());
			}

			log.info("driveVO : " + driveVO);

			if (driveVO == null) {
				list.get(0).setTotalSize(53687091200L);
			}else if(driveVO.getPlanCcl() != 0) {
				list.get(0).setTotalSize(driveVO.getChSize());
			}else {
				list.get(0).setTotalSize(53687091200L);
			}
		}

		return new ResponseEntity<List<AtchFileDetailVO>>(list, HttpStatus.OK);
	}

	@PostMapping("/deletFile")
	public String deletFile(@RequestBody DriveVO driveVO) {

		log.info("driveVO : " + driveVO);

		int cnt = service.deletFile(driveVO);

		String result = "";
		if (cnt > 0) {
			result = "success";
		}

		return result;
	}

	@PostMapping("/updateFile")
	public String updateFile(DriveVO driveVO) throws Exception {

		log.info("driveVO : " + driveVO);

		AtchFileVO atchFileVO = new AtchFileVO();
		atchFileVO.setAtchFileExpln("drive");

		atchFileService.insert(atchFileVO);
		int atchFileId = atchFileVO.getAtchFileId();
		log.info("atchFileId : " + atchFileId);

		MultipartFile file = driveVO.getUpdateFile();
		AtchFileDetailVO atchFileDetailVO = new AtchFileDetailVO();

		if (file != null && !file.isEmpty()) {
			String savedPath = uploadFile(file.getOriginalFilename(), file.getBytes());

			// AtchFileDetailVO 객체 생성 및 속성 설정
			atchFileDetailVO.setAtchFileId(atchFileId); // 받아온 ID 설정
			atchFileDetailVO.setAtchFilePath(savedPath);
			atchFileDetailVO.setAtchFileOrgnlNm(file.getOriginalFilename());
			atchFileDetailVO.setAtchFileSize((Long) file.getSize());
			atchFileDetailVO.setAtchFileExtn(getFileExtension(file.getOriginalFilename()));
			atchFileDetailVO.setAtchFileSaveNm(savedPath.substring(savedPath.lastIndexOf("/") + 1));

			// DB에 파일 상세 정보 저장
			atchFileService.insertDetail(atchFileDetailVO);
		}

		driveVO.setUpdateFileId(atchFileDetailVO.getAtchDetailFileId());

		int cnt = service.updateFile(driveVO);

		String result = "";
		if (cnt > 0) {
			result = "success";
		}

		return result;
	}

	private String uploadFile(String originalName, byte[] fileData) throws Exception {
		UUID uuid = UUID.randomUUID();
		String savedName = uuid.toString() + "_" + originalName;

		// OS에 따라 파일 경로 설정
		String os = System.getProperty("os.name").toLowerCase();
		if (os.contains("mac")) {
			localPath = uploadPathForMac;
		}

		// 폴더 경로를 만들고 경로를 리턴
		String savedPath = UploadFileUtiles.calcPath(localPath);
		File file = new File(localPath + "drive/" + savedPath);
		if (!file.exists()) {
			file.mkdirs();
		}

		File target = new File(localPath + "drive/" + savedPath.replaceFirst("/", ""), savedName);
		FileCopyUtils.copy(fileData, target);

		String uploadedFileName = resourcePath + "drive/" + savedPath.replace(File.separatorChar, '/') + "/"
				+ savedName;

		return uploadedFileName; // 상대 경로 반환
	}

	private String getFileExtension(String filename) {
		return filename.substring(filename.lastIndexOf(".") + 1);
	}

	@PostMapping("/uploadFile")
	public String uploadFiles(DriveVO driveVO) throws Exception {

		DriveVO drive2 = driveVO;

		log.info("driveVO : " + driveVO);

		AtchFileVO atchFileVO = new AtchFileVO();
		atchFileVO.setAtchFileExpln("drive");

		atchFileService.insert(atchFileVO);
		int atchFileId = atchFileVO.getAtchFileId();
		log.info("atchFileId : " + atchFileId);

		String result = "";

		Long sumSize = 0L;

		if (driveVO.getFileList() != null && !driveVO.getFileList().isEmpty()) {
			for (MultipartFile file : driveVO.getFileList()) {
				sumSize += file.getSize();
			}
		}

		driveVO = service.sizeCheck(driveVO);

		log.info("size : " + driveVO);
		log.info("size : " + (sumSize / 1024L));
		log.info("size : " + (driveVO.getChSize() < (sumSize / 1024L)));

		if ((driveVO.getChSize() < (sumSize / 1024L))) {
			return driveVO.getChSize() + "";
		} else {

			if (drive2.getFileList() != null && !drive2.getFileList().isEmpty()) {
				for (MultipartFile file : drive2.getFileList()) {

					if (!file.isEmpty()) {
						try {
							AtchFileDetailVO atchFileDetailVO = new AtchFileDetailVO();
							// 파일 저장
							String savedPath = uploadFile(file.getOriginalFilename(), file.getBytes());

							// AtchFileDetailVO 객체 생성 및 속성 설정
							atchFileDetailVO.setAtchFileId(atchFileId); // 받아온 ID 설정
							atchFileDetailVO.setAtchFilePath(savedPath);
							atchFileDetailVO.setAtchFileOrgnlNm(file.getOriginalFilename());
							atchFileDetailVO.setAtchFileSize((Long) file.getSize());
							atchFileDetailVO.setAtchFileExtn(getFileExtension(file.getOriginalFilename()));
							atchFileDetailVO.setAtchFileSaveNm(savedPath.substring(savedPath.lastIndexOf("/") + 1));

							// DB에 파일 상세 정보 저장
							atchFileService.insertDetail(atchFileDetailVO);
							drive2.setCldFileNo(atchFileDetailVO.getAtchDetailFileId());
						} catch (Exception e) {
							log.error("저장 오류: {}", e.getMessage());

						}
					}

					int cnt = service.uploadFile(drive2);

					if (cnt > 0) {
						result = "success";
					} else {
						result = "false";
						break;
					}
				}
			}

			return result;
		}
	}

}
