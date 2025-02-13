<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<%@ page session="false"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />
<div class="body-wrapper">
	<div class="container-fluid">
		<div class="row">
			<div id="main_contents">

				<div class="mb-3 overflow-hidden position-relative">
					<div class="px-3">
						<h4 class="fs-6 mb-0">관리자</h4>
						<nav aria-label="breadcrumb">
							<ol class="breadcrumb mb-0">
								<li class="breadcrumb-item"><a href="../main/index.html">관리자 관리</a></li>
								<li class="breadcrumb-item" aria-current="page">Management</li>
							</ol>
						</nav>
					</div>
				</div>
				<c:set value="${adminList }" var="adminList" />

				<!-- 관리자 프로필 변경 모달 -->
				<form action="${contextPath }/admin/update" method="post" class="ps-3 pr-3" id="adminUpdateForm" enctype="multipart/form-data">
					<input type="hidden" value="" id="memNo" name="memNo" />
					<div class="modal fade" id="editAdmin" tabindex="-1" aria-labelledby="createAdminLabel" aria-hidden="true">
						<div class="modal-dialog modal-md">
							<div class="modal-content">
								<div class="modal-header px-4 py-3 border-bottom">
									<h5 class="modal-title mb-0" id="createAdminLabel">관리자 프로필 수정</h5>
									<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div class="modal-body">
									<div class="d-flex justify-content-center border-bottom">
										<div class="p-2 d-block">
											<div class="mb-3">
												<strong style="font-weight: normal;">※ 이미지를 클릭하여 프로필 사진을 변경해주세요.</strong>
											</div>
											<div class="d-flex justify-content-center">
												<img src="${contextPath }/resources/assets/images/profile/user-5.jpg" id="adminPfImg" width="150" class="rounded-circle img-fluid" style="cursor: pointer;" />
											</div>
											<input class="form-control form-control-sm" id="imgFile" name="imgFile" type="file" style="display: none;">
											<h5 class="card-title text-center mt-1">관리자</h5>
											<div class="d-flex justify-content-center mb-2">
												<strong class="badge bg-primary-subtle text-primary" style="font-weight: normal;"> Admin </strong>
											</div>
										</div>
									</div>
									<div class="mt-4 mx-4">
										<div class="mb-4 row align-items-center">
											<label for="exampleInputTextName" class="form-label col-sm-3 col-form-label">이름</label>
											<div class="col-sm-9">
												<input type="text" class="form-control" id="memName" name="memName" placeholder="">
											</div>
										</div>
										<div class="mb-4 row align-items-center">
											<label for="exampleInputTextPh" class="form-label col-sm-3 col-form-label">전화번호</label>
											<div class="col-sm-9">
												<input type="text" class="form-control" id="memPh" name="memPh" placeholder="">
											</div>
										</div>
										<div class="mb-4 row align-items-center">
											<label for="exampleInputTextEmail" class="form-label col-sm-3 col-form-label">이메일</label>
											<div class="col-sm-9">
												<input type="text" class="form-control" id="memEmail" name="memEmail" placeholder="">
											</div>
										</div>
										<div class="mb-4 row align-items-center">
											<label for="exampleInputTextAddr" class="form-label col-sm-3 col-form-label">주소</label>
											<div class="col-sm-9">
												<input type="text" class="form-control" id="memAddr1" name="memAddr1" placeholder="">
											</div>
										</div>
										<div class="mb-2 row align-items-center">
											<label for="exampleInputTextAddr2" class="form-label col-sm-3 col-form-label">상세주소</label>
											<div class="col-sm-9">
												<input type="text" class="form-control" id="memAddr2" name="memAddr2" placeholder="">
											</div>
										</div>
									</div>
								</div>
								<div class="modal-footer justify-content-center">
									<div class="d-flex align-items-center gap-6">
										<button type="button" id="adminUpdateBtn" class="btn btn-primary">확인</button>
										<button class="btn bg-danger-subtle text-danger" data-bs-dismiss="modal">취소</button>
									</div>
								</div>
							</div>

						</div>
					</div>
					<sec:csrfInput />
				</form>
				<!-- 관리자 프로필 변경 모달 끝 -->

				<!-- 관리자 생성 모달 -->
				<div class="modal fade" id="createAdmin" tabindex="-1" aria-labelledby="createAdminLabel" aria-hidden="true">
					<div class="modal-dialog modal-dialog-centered modal-md">
						<div class="modal-content">
							<div class="modal-header px-4 py-3 border-bottom">
								<h5 class="modal-title mb-0" id="createAdminLabel">관리자 생성</h5>
								<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
							</div>
							<div class="modal-body p-4">
								<form action="#" class="ps-3 pr-3">
									<div class="mb-4 row align-items-center">
										<label for="exampleInputText4" class="form-label mb-4 col-sm-3 col-form-label">아이디</label>
										<div class="col-sm-9">
											<div class="input-group">
												<input type="text" class="form-control" id="exampleInputId" required="" placeholder="">
												<button id="checkBtn" class="btn bg-primary-subtle text-primary" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">중복 확인</button>
												<div class="valid-feedback">사용 가능한 아이디입니다.</div>
												<div class="invalid-feedback">사용 불가능한 아이디입니다.</div>
											</div>
										</div>
									</div>
									<div class="row align-items-center">
										<label for="exampleInputPassword" class="form-label col-sm-3 col-form-label">비밀번호</label>
										<div class="col-sm-9">
											<div class="input-group border rounded-1">
												<input type="password" class="form-control border-0" id=exampleInputPassword required="" placeholder="">
											</div>
										</div>
									</div>
								</form>
							</div>
							<div class="modal-footer justify-content-center">
								<div class="row">
									<div class="d-flex align-items-center gap-6">
										<button data-bs-dismiss="modal" id="createAdminBtn" type="button" class="btn btn-primary">확인</button>
										<button class="btn bg-danger-subtle text-danger" data-bs-dismiss="modal">취소</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<!-- 관리자 생성 모달 끝 -->

	<!-- 고객센터 관리 모달창 -->
	<div class="modal fade" id="vertical-center-modal" tabindex="-1" aria-labelledby="vertical-center-modal" aria-hidden="true">
		<div class="modal-dialog modal-lg modal-dialog-centered">
			<div class="modal-content text-center">
				<!-- text-center 클래스 추가 -->
				<div class="modal-header text-center d-flex align-items-center justify-content-center">
					<!-- justify-content-center 추가 -->
					<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body">
					<div class="mb-5">
						<h3>고객센터 관리</h3>
					</div>

					<div class="row">
						<div class="col-md-4">
							<div class="card hover-img" style="cursor: pointer">
								<div class="card-body p-4">
									<a href="${contextPath }/admin/notice">
										<div class="align-items-center">
											<div class="card bg-danger-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;">
												<!-- margin: auto 추가 -->
												<iconify-icon icon="mage:megaphone-a-fill" style="color: #ff6e6e; font-size: 5rem;"></iconify-icon>
											</div>
											<h6 class="mt-3 fs-4">공지사항</h6>
										</div>
									</a>
								</div>
							</div>
						</div>
						<div class="col-md-4">
							<a href="${contextPath}/admin/faq" style="text-decoration: none; color: inherit;">
								<div class="card hover-img" style="cursor: pointer">
									<div class="card-body p-4">
										<div class="align-items-center">
											<div class="card bg-success-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;">
												<!-- margin: auto 추가 -->
												<iconify-icon icon="flat-color-icons:faq" style="font-size: 5rem;"></iconify-icon>
											</div>
											<h6 class="mt-3 fs-4">FAQ</h6>
										</div>
									</div>
								</div>
							</a>
						</div>
						<div class="col-md-4">
							<a href="${contextPath}/admin/qna" style="text-decoration: none; color: inherit;">
								<div class="card hover-img" style="cursor: pointer">
									<div class="card-body p-4">
										<div class="align-items-center">
											<div class="card bg-primary-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;">
												<!-- margin: auto 추가 -->
												<iconify-icon icon="fluent-color:chat-bubbles-question-16" style="font-size: 5.5rem;"></iconify-icon>
											</div>
											<h6 class="mt-3 fs-4">Q&A</h6>
										</div>
									</div>
								</div>
							</a>
						</div>
					</div>

				</div>
				<div class="modal-footer justify-content-center">
					<!-- justify-content-center 추가 -->
					<button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>
	<!-- 고객센터 관리 모달창 끝 -->

	<div class="card overflow-hidden chat-application">
		<div class="d-flex align-items-center justify-content-between gap-6 m-3 d-lg-none">
			<button class="btn btn-primary d-flex" type="button" data-bs-toggle="offcanvas" data-bs-target="#chat-sidebar" aria-controls="chat-sidebar">
				<i class="ti ti-menu-2 fs-5"></i>
			</button>
			<form class="position-relative w-100">
				<input type="text" class="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search Contact"> <i class="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3"></i>
			</form>
		</div>
		<div class="d-flex w-100">
			<div class="left-part border-end w-20 flex-shrink-0 d-none d-lg-block">
				<div class="px-9 pt-4 pb-3">
					<button class="btn btn-primary fw-semibold py-8 w-100" data-bs-toggle="modal" data-bs-target="#createAdmin">
						<i class="ti ti-user-plus me-2 mb-2 fs-5"></i> 관리자 생성
					</button>
				</div>
				<ul class="list-group mh-n100" data-simplebar>
					<li class="list-group-item border-0 p-0 mx-9"><a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1" href="javascript:void(0)"> <i class="ti ti-inbox fs-5"></i>관리자 목록
					</a></li>
					<li class="list-group-item border-0 p-0 mx-9"><a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1" href="javascript:void(0)"> <i class="ti ti-star"></i>관리자 할당
					</a></li>
				</ul>
			</div>
			<div class="d-flex w-100">
				<div class="min-width-340">
					<div class="border-end user-chat-box h-100">
						<div class="px-4 pt-9 pb-6 d-none d-lg-block">
							<form class="position-relative">
								<input type="text" class="form-control search-chat py-2 ps-5" id="text-srh" placeholder="Search" /> <i class="ti ti-search position-absolute top-50 start-0 translate-middle-y fs-6 text-dark ms-3"></i>
							</form>
						</div>
						<div class="adminList app-chat"  style="overflow-y: scroll;">
							<ul class="chat-users mh-n100" data-simplebar>
								<c:forEach var="admin" items="${adminList }" varStatus="status">
									<li><a href="javascript:void(0)" class="px-4 py-3 bg-hover-light-black d-flex align-items-center chat-user" id="chat_user${admin.memNo }" data-user-id="${admin.memNo }"> <span class="position-relative"> <img src="${contextPath }${admin.memPrflimg}" alt="user-4" width="40" height="40" class="rounded-circle">
										</span>
											<div class="ms-6 d-inline-block w-75">
												<h6 class="mb-1 fw-semibold chat-title" data-username="${admin.memName }">${admin.memName }</h6>
												<span class="fs-2 text-body-color d-block">${admin.memEmail }</span>
											</div>
									</a></li>
								</c:forEach>
							</ul>
						</div>
					</div>
				</div>
				<div class="w-100">
					<div class="chat-container h-100 w-100">
						<div class="chat-box-inner-part h-100">
							<div class="chatting-box app-email-chatting-box">
								<div class="p-9 py-3 border-bottom chat-meta-user d-flex align-items-center justify-content-between">
									<h5 class="text-dark mb-0 fs-5">관리자 정보</h5>
									<ul class="list-unstyled mb-0 d-flex align-items-center">
										<li class="position-relative" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="수정"><a class="d-block text-dark px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5" href="javascript:void(0)" data-bs-toggle="modal" data-bs-target="#editAdmin"> <i class="ti ti-pencil"></i>
										</a></li>
										<li class="position-relative" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="삭제"><a class="text-dark px-2 fs-5 bg-hover-primary nav-icon-hover position-relative z-index-5" href="javascript:void(0)"> <i class="ti ti-trash"></i>
										</a></li>
									</ul>
								</div>
								<div class="position-relative overflow-hidden">
									<div class="position-relative">
										<div class="chat-box email-box mh-n100 p-9" data-simplebar="init">
											<c:forEach var="admin" items="${adminList }" varStatus="status">
												<c:choose>
													<c:when test="${status.index == 0}">
														<div class="chat-list chat active-chat" data-user-id="${admin.memNo }">
													</c:when>
													<c:otherwise>
														<div class="chat-list chat" data-user-id="${admin.memNo }">
													</c:otherwise>
												</c:choose>

												<div class="d-flex ms-4 mt-4">
													<div class="card col-6">
														<div class="card-body">
															<div class="d-flex justify-content-center mb-3">
																<img src="${contextPath }${admin.memPrflimg}" class="rounded-1" alt="spike-img" width="200" />
															</div>
															<div class="text-center">
																<h3 class="mb-2">${admin.memName}</h3>
																<strong class="badge bg-info-subtle text-info" style="font-weight: normal;">관리자</strong>
															</div>
														</div>
													</div>
													<div class="row ms-3 mt-1 mb-1">
														<div class="col-12 mb-7">
															<p class="mb-1 fs-2">아이디</p>
															<h6 class="fw-semibold mb-0">${admin.memId}</h6>
														</div>
														<div class="col-12 mb-7">
															<p class="mb-1 fs-2">전화번호</p>
															<h6 class="fw-semibold mb-0">${admin.memPh}</h6>
														</div>
														<div class="col-12 mb-7">
															<p class="mb-1 fs-2">이메일</p>
															<h6 class="fw-semibold mb-0">${admin.memEmail}</h6>
														</div>
														<div class="col-12 mb-7">
															<p class="mb-1 fs-2">주소</p>
															<h6 class="fw-semibold mb-0">${admin.memAddr1},&ensp;</h6>
															<h6 class="fw-semibold mb-0">${admin.memAddr2}</h6>
														</div>
														<div class="col-12 mb-7">
															<p class="mb-1 fs-2">가입일</p>
															<h6 class="fw-semibold mb-0">${admin.memRgdtString}</h6>
														</div>
													</div>
												</div>
										</div>
										</c:forEach>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="offcanvas offcanvas-start user-chat-box" tabindex="-1" id="chat-sidebar" aria-labelledby="offcanvasExampleLabel">
		<div class="offcanvas-header">
			<h5 class="offcanvas-title" id="offcanvasExampleLabel">Contact</h5>
			<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
		</div>
		<div class="px-9 pt-4 pb-3">
			<button class="btn btn-primary fw-semibold py-8 w-100">Add New Contact</button>
		</div>
		<ul class="list-group h-n150" data-simplebar>
			<li class="list-group-item border-0 p-0 mx-9"><a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1" href="javascript:void(0)"> <i class="ti ti-inbox fs-5"></i>All Contacts
			</a></li>
			<li class="list-group-item border-0 p-0 mx-9"><a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1" href="javascript:void(0)"> <i class="ti ti-star"></i>Starred
			</a></li>
			<li class="list-group-item border-0 p-0 mx-9"><a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1" href="javascript:void(0)"> <i class="ti ti-file-text fs-5"></i>Pening Approval
			</a></li>
			<li class="list-group-item border-0 p-0 mx-9"><a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1" href="javascript:void(0)"> <i class="ti ti-alert-circle"></i>Blocked
			</a></li>
			<li class="border-bottom my-3"></li>
			<li class="fw-semibold text-dark text-uppercase mx-9 my-2 px-3 fs-2">CATEGORIES</li>
			<li class="list-group-item border-0 p-0 mx-9"><a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1" href="javascript:void(0)"> <i class="ti ti-bookmark fs-5 text-primary"></i>Engineers
			</a></li>
			<li class="list-group-item border-0 p-0 mx-9"><a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1" href="javascript:void(0)"> <i class="ti ti-bookmark fs-5 text-warning"></i>Support Staff
			</a></li>
			<li class="list-group-item border-0 p-0 mx-9"><a class="d-flex align-items-center gap-6 list-group-item-action text-dark px-3 py-8 mb-1 rounded-1" href="javascript:void(0)"> <i class="ti ti-bookmark fs-5 text-success"></i>Sales Team
			</a></li>
		</ul>
	</div>
</div>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
	// 이미지 클릭 시 파일 선택창 열기
	$("#adminPfImg").on("click", function() {
		$("#imgFile").click();
	});
	
	$("#imgFile").on("change",function(){
		var file = $("#imgFile")[0].files[0]; // 선택된 이미지 파일
		console.log(file);
		if (isImageFile(file)) { // 이미지 파일인지 확인
			var reader = new FileReader();
			reader.onload = function (e) {
				$("#adminPfImg").attr("src", e.target.result); // 새로운 이미지 URL로 변경
			};
			reader.readAsDataURL(file);
		}
	})

	let flag = false;

	$("#checkBtn").on("click", function() {
		flag = false;

		console.log($("#exampleInputId").val())

		let data = {
			memId : $("#exampleInputId").val()
		}

		$.ajax({
			url : "/synerhub/login/idCheck.do",
			type : "post",
			contentType : "application/json; charset=utf-8",
			data : JSON.stringify(data),
			beforeSend : function(xhr) {
				xhr.setRequestHeader(header, token);
			},
			success : function(res) {
				if (res == 'NOTEXIST') {
					$("#exampleInputId").attr("class",
							"form-control is-valid");
					flag = true;
				} else {
					$("#exampleInputId").attr("class",
							"form-control is-invalid");
					flag = false;
				}
			}
		})
	});
	
	$("#createAdminBtn").on("click", function() {
		if (!flag) {
			alert("아이디 중복체크를 해주세요")
			return;
		} else {
			let data = {
				memId : $("#exampleInputId").val(),
				memPw : $("#exampleInputPassword").val()

			}

			$.ajax({
				url : "/synerhub/login/signAdmin",
				type : "post",
				contentType : "application/json; charset=utf-8",
				data : JSON.stringify(data),
				beforeSend : function(xhr) {
					xhr.setRequestHeader(header, token);
				},
				success : function(res) {
					if (res == 'OK') {
						alert("관리자가 생성되었습니다");
					} else {
						alert("관리자 생성에 실패했습니다");
					}
				}
			})
		}
	})

	$("#adminUpdateBtn").on("click", function() {

		let memNo = $(".active-chat").attr("data-user-id");
		$("#memNo").val(memNo);
		let adminUpdateForm = $("#adminUpdateForm");

		adminUpdateForm.submit();
	})

	function isImageFile(file) {
		var ext = file.name.split(".").pop().toLowerCase(); // 파일명에서 확장자를 추출
		return ($.inArray(ext, [ "jpg", "jpeg", "png", "gif" ]) === -1) ? false
				: true
	}
</script>