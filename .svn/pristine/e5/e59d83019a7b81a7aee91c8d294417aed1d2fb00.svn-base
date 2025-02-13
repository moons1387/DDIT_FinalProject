<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<%@ page session="false"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />
<div class="body-wrapper">
	<div class="container-fluid">
		<div class="row">
			<div id="main_contents">
				<c:set value="${member}" var="member" />


				<div class="mb-3 overflow-hidden position-relative">
					<div class="px-3">
						<h4 class="fs-6 mb-0">관리자</h4>
						<nav aria-label="breadcrumb">
							<ol class="breadcrumb mb-0">
								<li class="breadcrumb-item"><a href="../main/index.html">서비스 관리</a></li>
								<li class="breadcrumb-item" aria-current="page">Users</li>
							</ol>
						</nav>
					</div>
				</div>

				<div class="row">
					<div class="col-lg-4">
						<div class="card">
							<div class="card-body">
								<div class="text-center">
									<img src="${contextPath }${member.memPrflimg}" width="110" class="rounded-3 mb-3" alt="spike-img" />
									<h5 class="mb-1">${member.memName }</h5>
									<span class="badge bg-primary-subtle text-primary fw-light rounded-pill">Member</span>
								</div>

								<div class="hstack justify-content-center mt-3">
									<div class="d-flex align-items-center">
										<span class="bg-success-subtle p-6 rounded-3 round-50 hstack justify-content-center"> <i class="ti ti-brand-youtube text-success fs-7"></i>
										</span>

										<div class="ms-3">
											<p class="fw-normal text-dark fs-5 mb-0 mt-1">
												<strong>가입 채널 수</strong> 
											</p>
											<p class="mb-0 fs-3 text-center">${member.channelCount}</p>
										</div>
									</div>
								</div>

								<div class="mt-4">
									<div class="pb-1 mb-2 border-bottom">
										<h6>Details</h6>
									</div>

									<ul>
										<li class="py-2">
											<p class="fw-normal text-dark mb-0">
												<strong>아이디:</strong> <span class="fw-light ms-1">${member.memId}</span>
											</p>
										</li>

										<li class="py-2">
											<p class="fw-normal text-dark mb-0">
												<strong>이름:</strong> <span class="fw-light ms-1">${member.memName}</span>
											</p>
										</li>

										<li class="py-2">
											<p class="fw-normal text-dark mb-0">
												<strong>전화번호:</strong> <span class="fw-light ms-1">${member.memPh}</span>
											</p>
										</li>

										<li class="py-2">
											<p class="fw-normal text-dark mb-0">
												<strong>이메일:</strong> <span class="fw-light ms-1">${member.memEmail}</span>
											</p>
										</li>

										<li class="py-2">
											<p class="fw-normal text-dark mb-0">
												<strong>주소:</strong> <span class="fw-light ms-1">${member.memAddr1}</span>
											</p>
										</li>

										<li class="py-2">
											<p class="fw-normal text-dark mb-0">
												<strong>자기소개:</strong> <span class="fw-light ms-1">${member.memIntr }</span>
											</p>
										</li>
									</ul>

								</div>

							</div>
						</div>
					</div>

					<div class="col-lg-8">
						<div class="card">
							<div class="card-body">
								<div class="tab-content" id="myTabContent">
									<div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
										<div class="mb-4 border-bottom pb-3">
											<h4 class="card-title mb-0">가입 채널 목록</h4>
										</div>
										<div class="table-responsive overflow-x-auto">
											<table class="table align-middle text-nowrap">
												<thead>
													<tr>
														<th scope="col">NO</th>
														<th scope="col">멤버십</th>
														<th scope="col">가입 채널명</th>
														<th scope="col">채널 가입일</th>
														<th scope="col">채널 접속일</th>
													</tr>
												</thead>
												<tbody class="border-top" id="myChList">

												</tbody>
											</table>
											<div class="d-flex justify-content-end ms-auto">
												<a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Back" id="backBtn"> <i class="ti ti-arrow-forward-up fs-7 me-1"></i>
												</a>
											</div>
										</div>
									</div>


								</div>
							</div>
						</div>
					</div>
				</div>


			</div>
		</div>
	</div>
</div>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script type="text/javascript">
$(document).on('click', "#backBtn", function () {
	history.go(-1);
});

$(document).on("change", '.contact-chkbox', function () {
	// 체크된 체크박스가 하나라도 있으면 "탈퇴하기" 버튼 표시
	if ($('.contact-chkbox:checked').length > 0) {
		$('#leave').show();
	} else {
		$('#leave').hide();
	}
});

//"모두 선택" 체크박스의 변화 감지
$(document).on("change", '#ch-check-all', function () {
	var isChecked = $(this).is(':checked');
	// 모든 체크박스의 체크 상태 변경
	$('.contact-chkbox').prop('checked', isChecked).trigger('change');
});

header = $("meta[name='_csrf_header']").attr('content');
token = $("meta[name='_csrf']").attr('content');


let data = {
	memNo: ${member.memNo}
}

$.ajax({
	url: "/synerhub/profile/getChList",
	type: "post",
	beforeSend: function (xhr) {
		xhr.setRequestHeader(header, token)
	},
	data: JSON.stringify(data),
	contentType: "application/json; charset=utf-8",
	success: function (res) {
		var myChList = $(document).find("#myChList");
		myChList.html("");
		
		console.log(res);

		let html = '';
		
		if(res.length == 0){
			html += `<tr>
               			<td colspan="6" class="text-center">가입한 채널이 존재하지 않습니다</td>
                	</tr>`
		}
		else{
			for (var i = 0; i < res.length; i++) {
				html += "<tr>";
				html += "<td>";
				html += "<p class='fw-normal mb-0 fs-3 text-dark'>&nbsp;";
				html += `\${i+1}`;
				html += "</p>";
				html += "</td>";
				html += "<td>";
				html += "<div class='d-flex flex-column'>";
				if (res[i].planNo == 1 && res[i].planCcl == 1)
					html += "<img src='${contextPath}/resources/assets/images/backgrounds/bronze.png' class='rounded-circle' width='40' height='40' />";
				else if (res[i].planNo == 2 && res[i].planCcl == 1)
					html += "<img src='${contextPath}/resources/assets/images/backgrounds/silver.png' class='rounded-circle' width='40' height='40' />";
				else if (res[i].planNo == 3 && res[i].planCcl == 1)
					html += "<img src='${contextPath}/resources/assets/images/backgrounds/gold.png' class='rounded-circle' width='40' height='40' />";
				else
					html += "&emsp;-";
				html += "</div>";
				html += "</td>";
				html += "<td>";
				html += "<p class='text-dark mb-0 fw-normal'>";
				html += res[i].chTtl;
				html += "</p>";
				html += "</td>";
				html += "<td>";
				html += "<p class='text-dark mb-0 fw-normal'>";
				html += res[i].chRegdt;
				html += "</p>";
				html += "</td>";
				html += "<td>";
				html += "<p class='fw-normal mb-0 fs-3 text-dark'>";
				if(res[i].chCnntdt == null){
					html +="&ensp;&ensp;&ensp;&ensp;&ensp;-"; 
				}else{
					html += res[i].chCnntdt;
				}
				html += "</p>";
				html += "</td>";
				html += "</tr>";
			}
	 
		}
		myChList.html(html);
	}
})
</script>