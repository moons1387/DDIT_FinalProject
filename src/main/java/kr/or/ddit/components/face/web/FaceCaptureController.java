package kr.or.ddit.components.face.web;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.or.ddit.vo.ImageRequest;

@Controller
public class FaceCaptureController {

    @PostMapping("/saveImage")
    @ResponseBody
    public String saveImage(@RequestBody ImageRequest imageData) {
        String filePath = "E:/team1/profile" + imageData.getFileName();
//        String filePath = "C:/Team01/profile" + imageData.getFileName();
        try (FileOutputStream fos = new FileOutputStream(new File(filePath))) {
            byte[] imageBytes = java.util.Base64.getDecoder().decode(imageData.getFileData());
            fos.write(imageBytes);
            return "Image saved successfully";
        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to save image";
        }
    }
}

