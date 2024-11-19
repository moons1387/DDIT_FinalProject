package kr.or.ddit.components.declaration.web;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.UUID;

import javax.annotation.Resource;
import javax.imageio.ImageIO;

import org.imgscalr.Scalr;
import org.springframework.util.FileCopyUtils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class UploadFileUtiles {
	
	public static void makeThumbnail(String uploadPath, String savedPath, String savedName) throws Exception {
		// 썸네일 이미지를 만들기 위해 원본 이미지를 읽는다
//		log.info("uploadPath" + uploadPath);
		BufferedImage sourceImg = ImageIO.read(new File(uploadPath + savedPath, savedName));
		
		// 썸네일 이미지를 만들위 위한 설정
		// Method.AUTOMATIC : 최소 시간 내에 가장 잘보이는 이미지를 얻기 위한 사용 방식
		// Mode.FIT_TO_HEIGHT : 이미지 방향과 상관 없이 주어진 높이 내에서 가장 잘 맞는 이미질 ㅗ계산
		// targetSize : 값 100 정사각형 사이즈로 100x100
		BufferedImage destImg = Scalr.resize(sourceImg, Scalr.Method.AUTOMATIC, Scalr.Mode.FIT_TO_HEIGHT, 100);
		
		// 압로드 한 원본 이미지를 가지고 s_를 붙여서 임시 파일로 만들기위함
		String thumbnailName = uploadPath + savedPath + File.separator + "s_" + savedName;
		
		File newFile = new File(thumbnailName);
		String formatName = savedName.substring(savedName.lastIndexOf(".") + 1); // 확장자 추출
		
		ImageIO.write(destImg, formatName.toUpperCase(), newFile); // s_가 붙은 썸네일 이미지 생성
	}

	public static String calcPath(String uploadPath) {

		Calendar cal = Calendar.getInstance();
		String yearPath = File.separator + cal.get(Calendar.YEAR); // /2024

		// new DecimalFormat("00")는 달이 1월/2월 등 한자리 일때 앞을 0으로 채움 01월, 02월
		String monthPath = yearPath + File.separator + new DecimalFormat("00").format(cal.get(Calendar.MONTH) + 1);

		String datePath = monthPath + File.separator + new DecimalFormat("00").format(cal.get(Calendar.DATE));

		makeDir(uploadPath, yearPath, monthPath, datePath);

		return datePath;
	}

	// 가변인자 -> String...paths
	// 키워드 ... 을 사용
	// [사용법] 타입...변수명 형태로 사용가능
	// 순서대로 들어온 변수가 배열로 들어와 처리된다
	private static void makeDir(String uploadPath, String... paths) {

		// /2024/09/09 폴더 구조가 존재한다면 return
		// 만들려던 폴더구조가 없다면 만들어 리턴

		if (new File(paths[paths.length - 1]).exists()) {
			return;
		}

		for (String path : paths) {
			File dirPath = new File(uploadPath + path);

			if (!dirPath.exists()) {
				dirPath.mkdirs();
			}
		}
	}

}
