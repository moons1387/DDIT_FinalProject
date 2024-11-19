package kr.or.ddit.vo;

public class ImageRequest {
    private String fileName;
    private String fileData; // Base64 문자열
    private String fileSavePath;

    public void setFileSavePath(String fileSavePath) {
		this.fileSavePath = fileSavePath;
	}

	// Getters and Setters
    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFileData() {
        return fileData;
    }

    public void setFileData(String fileData) {
        this.fileData = fileData;
    }

	public String getFileSavePath() {
		return fileSavePath;
	}
}
