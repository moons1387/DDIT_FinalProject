<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ page session="false"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Face Capture</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
    
    <link rel="stylesheet" href="${contextPath }/resources/assets/css/styles.css" />
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script defer src="${pageContext.request.contextPath}/resources/assets/js/face-api.min.js"></script>
    <script defer src="${pageContext.request.contextPath}/resources/assets/static/script.js"></script>
<style>
    body {
    margin: 0;
    padding: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    overflow: hidden; /* 스크롤바 제거 */
}

video, canvas {
    position: absolute;
}
     
#downloadButton {
    position: fixed;
    left: 50%;
    bottom: 3%; /* 버튼을 아래에서 5% 위치에 고정 */
    transform: translateX(-50%);
    color: white;
    border: none;
    cursor: pointer;
    z-index: 10; /* 버튼이 다른 요소 위에 오도록 설정 */
    font-size: 1.5rem; /* 버튼 크기 설정 */
}
  
#recIndicator {
    position: fixed; 
    top: 8%; /* 창의 위쪽에서 10% 위치에 고정 */
    left: 50%;
    transform: translateX(-50%);
    color: white; /* 텍스트 색상 설정 */
    font-size: 1.5rem; /* 텍스트 크기 설정 */
    z-index: 10; /* 텍스트가 다른 요소 위에 오도록 설정 */
}
     
 </style> 
</head> 
<body>
	<input type="hidden" value="${host}" id="host"/>   
    <p id="recIndicator">
        <i class="ti ti-player-record-filled" style="color: red"></i>
    	REC</p>
    <video id="video" width="720" height="560" autoplay muted></video>
    <button id="downloadButton" class="btn btn-dark mt-3 mb-3">
        <i class="ti ti-camera fs-9"></i>
    </button>
    <canvas id="canvas" style="display:none;"></canvas> <!-- 캔버스를 추가 -->
</body>
<script type="text/javascript">
var host = $("#host").val();
console.log(host);
</script>
</html>
