package kr.or.ddit.components.drive.service;

import java.util.List;

import kr.or.ddit.components.channel.vo.ChannelMemberVO;
import kr.or.ddit.components.drive.vo.DriveVO;
import kr.or.ddit.components.file.vo.AtchFileDetailVO;

public interface IDriveMapper {

	public List<ChannelMemberVO> getChList(ChannelMemberVO channelMemberVO);

	public List<ChannelMemberVO> getThList(ChannelMemberVO channelMemberVO);

	public List<AtchFileDetailVO> getFileList(ChannelMemberVO channelMemberVO);

	public int deletFile(DriveVO driveVO);

	public int updateFile(DriveVO driveVO);

	public int uploadFile(DriveVO driveVO);

	public DriveVO sizeCheck(DriveVO driveVO);

	public DriveVO sizeMyCheck(DriveVO driveVO);

	public DriveVO getChDriveSize(DriveVO driveVO);

	public DriveVO getThDriveSize(DriveVO driveVO);

	public DriveVO getTotalSizeToCh(int chNo);

	public DriveVO getTotalSizeToTh(int thNo);

}
