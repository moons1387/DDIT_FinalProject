<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags"
	prefix="sec"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
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
                                <li class="breadcrumb-item">
                                    <a href="../main/index.html">Home</a>
                                </li>
                                <li class="breadcrumb-item" aria-current="page">공지사항</li>
                            </ol>
                        </nav>
                    </div>
                </div>

                <div class="card">
                    <div class="card-body">
                        <div class="mb-4" role="tablist">
                            <h3>공지사항 상세보기</h3>
                        </div>
                        <div class="card">
                            <div class="card-body border-bottom">
                                <div class="d-flex align-items-center gap-6 flex-wrap" id="detail">
                                	<img src="${contextPath}/resources/assets/images/logos/logo5.png" alt="spike-img" class="rounded-circle" width="40" height="40">
                                    <h6 class="mb-0">${notice.ntcWtrDisplay}</h6>
                                </div>
                                <div class="card-body p-4">
                                    <div class="table-responsive mb-4 border rounded-1">
                                        <table class="table text-nowrap mb-0 align-middle">
                                            <thead class="text-dark fs-4">
                                                <tr>
                                                    <th>
                                                        <div class="d-flex justify-content-between align-items-center">
                                                            <h4 class="fs-4 fw-semibold mb-0">
                                                                <strong>${notice.ntcTtl}</strong>
                                                            </h4>
                                                            <p class="text-muted mb-0" style="margin-left: 20px; line-height: 1.5;">
                                                                <fmt:formatDate value="${notice.ntcRgdt}" pattern="yyyy-MM-dd"/>
                                                            </p>
                                                        </div>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr style="height: 10em;"> 
                                                    <td>
                                                        <div class="d-flex align-items-center">
                                                            <div class="ms-3">
                                                                <p class="fw-normal" style="line-height: 1.5; white-space: pre-line; margin: 0;" class="clickable-text">
                                                                    ${notice.ntcConts}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>					                    
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="d-flex justify-content-end">
                                        <div class="ms-auto d-flex align-items-center gap-2">
                                            <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" 
                                               href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="수정" id="updateBtn">
                                                <i class="ti ti-edit fs-7 me-1"></i>
                                            </a>
                                            <button type="button" class="btn text-dark bg-hover-primary d-flex align-items-center justify-content-center p-2 fs-4" 
                                                    data-bs-toggle="tooltip" data-bs-target="tooltip" data-bs-title="삭제" id="deleteBtn">
                                                <i class="ti ti-trash fs-7 me-1"></i>
                                            </button>
                                            <a class="text-dark bg-hover-primary d-flex align-items-center justify-content-center bg-transparent p-2 fs-4 rounded-circle" 
                                               href="javascript:void(0)" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="목록" id="listBtn">
                                                <i class="ti ti-arrow-back-up fs-7 me-1"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <form action="${contextPath}/admin/noticeDelete" method="post" id="detForm">
                    <input type="hidden" name="ntcNo" value="${notice.ntcNo}">
                    <sec:csrfInput />
                </form>
            </div>
        </div>
    </div>
</div>
<script	src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script>
	$(function() {
		var updBtn = $("#updateBtn");
		var delBtn = $("#deleteBtn");
		var listBtn = $("#listBtn");
		var detForm = $("#detForm");

		listBtn.on("click", function() {
			location.href = "/synerhub/admin/notice";
		});

		delBtn.on("click", function() {
		    swal.fire({
		        title: '삭제하시겠습니까?',
		        icon: 'warning',
		        showCancelButton: true,
		        confirmButtonText: '삭제',
		        cancelButtonText: '취소'
		    }).then((result) => {
	        	if (result.isConfirmed) {
		            detForm.submit();
		        }
		    });
		});

		updBtn.on("click", function() {
			location.href = "/synerhub/admin/noticeUpdate?ntcNo=${notice.ntcNo}";
		});
	});
</script>
