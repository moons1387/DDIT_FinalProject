const video = document.getElementById('video');

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('../resources/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('../resources/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('../resources/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('../resources/models')
]).then(startVideo);

function startVideo() {
    navigator.mediaDevices.getUserMedia({ video: {} })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
           
        });
}

let lastDetection;

video.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(video);
    document.body.append(canvas);
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions();
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        if (resizedDetections.length > 0) {
            lastDetection = resizedDetections[0].detection.box; 
        }
    }, 100);
});

const downloadButton = document.getElementById('downloadButton');
downloadButton.addEventListener('click', () => {
	
	captureFlag = true; 
	 
    if (lastDetection) {
        const { x, y, width, height } = lastDetection;
          
        // 30% 왼쪽으로 이동 및 60% 위쪽으로 이동
        const offsetX = width * 0.3; // 30% 왼쪽으로 이동
        const offsetY = height * 0.6; // 60% 위쪽으로 이동
        
        // 캡처할 크기를 1.2배로 설정
        const offWidth = width * 1.2; // 얼굴 너비 1.2배
        const offHeight = height * 1.2; // 얼굴 높이 1.2배

        captureFaceFromVideo(x - offsetX, y - offsetY, offWidth, offHeight);
        
        window.close();
        if(window.opener){
        	var host = $("#host").val();
			console.log(host);
			if(host != "http://localhost/synerhub/main/" && host != "http://localhost/synerhub/main") {
			   	window.opener.location.reload(); 
		    }
        }
    } else {
        alert("No face detected for capturing.");
    }
});
 
function captureFaceFromVideo(x, y, width, height) {
    const captureCanvas = document.createElement('canvas');
    captureCanvas.width = width;
    captureCanvas.height = height;
    const ctx = captureCanvas.getContext('2d');

    // 비디오에서 지정된 영역을 캡처
    ctx.drawImage(video, x, y, width, height, 0, 0, width, height);

    // 캡처한 이미지를 다운로드 및 로컬 스토리지에 저장
    const imageData = captureCanvas.toDataURL('image/jpg');
    saveImg(imageData, 'captured_face.jpg');

    // 로컬 스토리지에 이미지 데이터 저장
    localStorage.setItem('capturedImage', imageData);

    // 이전 페이지로 이동
    window.location.href = '/synerhub/login/signup_pf.do'; // 이전 페이지로 이동
}

const saveImg = async (uri, filename) => {
    const link = document.createElement('a');
    document.body.appendChild(link);
    link.href = uri;
    link.download = filename;
    link.click();
    document.body.removeChild(link);

    // 서버에 이미지 정보 전송
    const response = await fetch('http://localhost/login/uploadImage', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fileName: filename,
            fileSavePath: `E:/team1/profile/${filename}` // 경로 변경
        })
    });

    if (!response.ok) {
        console.error('Error uploading image:', response.statusText);
    } else {
        console.log('Image uploaded successfully.');
    }
};
