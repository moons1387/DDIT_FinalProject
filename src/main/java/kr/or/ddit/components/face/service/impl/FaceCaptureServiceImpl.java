package kr.or.ddit.components.face.service.impl;

import javax.inject.Inject;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

import kr.or.ddit.components.face.service.IFaceCaptureMapper;
import kr.or.ddit.components.face.service.IFaceCaptureService;
import kr.or.ddit.vo.FaceCapture;

@Primary
@Service
public class FaceCaptureServiceImpl implements IFaceCaptureService {

	@Inject
	private IFaceCaptureMapper mapper;
	
	@Override
	public void register(FaceCapture faceCapture) {
		mapper.register(faceCapture);
	}
}
