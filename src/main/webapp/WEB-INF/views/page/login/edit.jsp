<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ page session="false"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="_csrf" content="${csrfToken}"/>
<title>Insert title here</title>
	<!-- SweetAlert2 CSS & JS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"></script>
</head>
<body>
<div class="card auth-card mb-0 mx-3">
	<div class="card-body">
		<a href="${contextPath }/main/" class="text-nowrap logo-img text-center d-flex align-items-center justify-content-center mb-5 w-100">
			<img src="${contextPath }/resources/assets/images/logos/logo2.png" class="light-logo" alt="Logo-Dark" style="object-fit: cover; width: 100%; height: 100%;"/> 
			<img src="${contextPath }/resources/assets/images/logos/logo2.png" class="dark-logo" alt="Logo-light" style="object-fit: cover; width: 100%; height: 100%;"/>
		</a>

		
			
	
	</div>
</div>
</body>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>

	<!-- map api -->
	<script type="text/javascript" src="//dapi.kakao.com/v2/maps/sdk.js?appkey=feb44c6aa0a3993eae2f9d646aa6b6f1&libraries=services"></script>
	<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>

<script type="text/javascript">


</script>
</html>