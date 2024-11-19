<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ page session="false"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
	
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/dist/tabler-icons.min.css" />
	
	<!-- SweetAlert2 CSS & JS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"></script>
   
    
</head>
<body>
	
<div class="mb-3 overflow-hidden position-relative">
  <div class="px-3">
    <h4 class="fs-6 mb-0">User Profile</h4>
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item">
          <a href="../horizontal/index.html">Home</a>
        </li>
        <li class="breadcrumb-item" aria-current="page">User Profile</li>
      </ol>
    </nav>
  </div>
</div>


<div class="d-flex justify-content-center">
  <div class="card auth-card mb-0 mx-3" style="width: 700px;">
    <div class="row">
      <div class="col-lg-12">
        <div class="card-body">
          
          <div class="hstack justify-content-between mb-4">
            <div class="d-flex align-items-center ms-2">
                <iconify-icon icon="material-symbols-light:card-membership-outline-rounded" width="3.5em" height="3.5em"></iconify-icon>
            </div>

            <div class="d-flex align-items-center">

              <div class="ms-3 me-2">
                <span class="badge bg-success-subtle text-success fw-semibold fs-2 gap-1 d-inline-flex align-items-center">
                  <iconify-icon icon="tabler:point-filled" width="1.5em" height="1.5em"  style="color: #00ff33"></iconify-icon></i>Active
                </span>
              </div>
            </div>
          </div>

          <div class="text-center">
            <img src="../assets/images/profile/user-2.jpg" width="150" class="rounded-3 mb-3" alt="" />
            <h4 class="mb-1">John Mednath</h4>
            <h4 class="mb-1 profile-name">
				<sec:authentication property="principal.member.memName"/>
			</h4>
            <span class="badge bg-primary-subtle text-primary fw-light rounded-pill">Teacher</span>
          </div>

          <div class="mt-5">
            <div class="pb-1 mb-2 border-bottom">
              <h5 class="ms-2">나의 프로필</h5>
            </div>

            <ul class="ms-2">
              <li class="py-2">
                <p class="fw-normal text-dark mb-0">
                  <strong>이름 :</strong> 
                  <span class="fw-light ms-1 profile-name">
                  	&ensp;
					<sec:authentication property="principal.member.memName"/>
                  </span>
<!--                   <span class="fw-light ms-1">&ensp;John Mednath</span> -->
                </p>
              </li>
              
              <li class="py-2">
                <p class="fw-normal text-dark mb-0 profile-phone">
                  <strong>전화번호 :</strong>
                  <span class="fw-light ms-1">
                  	&ensp;
					<sec:authentication property="principal.member.memPh"/>
                  </span>
<!--                   <span class="fw-light ms-1">&ensp;010-9988-1568</span> -->
                </p>
              </li>
              
              <li class="py-2">
                <p class="fw-normal text-dark mb-0 profile-memEmail">
                  <strong>이메일 :</strong>
                  <span class="fw-light ms-1">
                  	&ensp;
					<sec:authentication property="principal.member.memEmail"/>
                  </span>
<!--                   <span class="fw-light ms-1">&ensp;johnmednath@gmail.com</span> -->
                </p>
              </li>

              <li class="py-2">
                <p class="fw-normal text-dark mb-0 profile-memAddr">
                  <strong>주소 :</strong>
                  <span class="fw-light ms-1">
                  	&ensp;
					<sec:authentication property="principal.member.memAddr1"/>
					&nbsp;
					<sec:authentication property="principal.member.memAddr2"/>
                  </span>
<!--                   <span class="fw-light ms-1">&ensp;대전 중구 계룡로 846</span> -->
                </p>
              </li>

              <li class="py-2">
                <p class="fw-normal text-dark mb-0 profile-memIntr">
                  <strong>자기 소개 :</strong>
                  <span class="fw-light ms-1">
                  	&ensp;
					<sec:authentication property="principal.member.memIntr"/>
                  </span>
<!--                   <span class="fw-light ms-1">&ensp;안녕하세요. John Mednath 입니다.</span> -->
                </p>
              </li>
            </ul>
            
            <div class="row mt-4" style="justify-content: center;">
              <div class="col-sm-5">
                <button type="button" class="btn btn-danger w-100 justify-content-center d-flex align-items-center">
                  	취소
                </button>
              </div>
              <div class="col-sm-5">
                <button type="button" class="btn btn-primary w-100 justify-content-center me-2 d-flex align-items-center mb-3 mb-sm-0">
                  	수정
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>	
	




</body>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript">



</script>
</html>