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
								<li class="breadcrumb-item"><a href="../main/index.html">서비스 관리</a></li>
								<li class="breadcrumb-item" aria-current="page">Users</li>
							</ol>
						</nav>
					</div>
				</div>
				<!-- start Default Size Light Table -->
				<div class="card">
					<div class="card-body">
						<div class="d-md-flex justify-content-between mb-9">
							<div class="mb-9 mb-md-0">
								<div style="display: flex;">
									<h3>사용자 관리</h3>
								</div>
							</div>
						</div>


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

						<c:set value="${list}" var="dclrList" />
						<c:set var="pageSize" value="10" />
						<!-- 페이지 당 게시글 수 설정 -->
						<c:set var="currentPage" value="${param.currentPage != null ? param.currentPage : 1}" />
						<!-- 현재 페이지 가져오기 -->
						<!-- 시작 인덱스 계산 부분 수정 -->
						<c:set var="startIndex" value="${(currentPage - 1) * pageSize + 1}" />
						<!-- 시작 인덱스 계산 -->
						<form class="input-group input-group-sm" id="searchForm" style="width: 470px;" action="${contextPath}/admin/users" method="get">
							<div class="mb-3 me-2">
								<input type="hidden" name="currentPage" id="currentPage" value="${currentPage }">
							</div>
						</form>

						<div class="table-responsive border rounded-4">
							<table class="table text-nowrap customize-table mb-0 align-middle">
								<thead class="text-dark fs-4">
									<tr>
										<th class="text-center">
											<h6 class="fs-4 fw-semibold mb-0">NO</h6>
										</th>
										<th>
											<h6 class="fs-4 fw-semibold mb-0 ms-3">사용자명</h6>
										</th>
										<th>
											<h6 class="fs-4 fw-semibold mb-0 text-center">가입 채널 수</h6>
										</th>
										<th>
											<h6 class="fs-4 fw-semibold mb-0">회원 가입일</h6>
										</th>
										<th>
											<h6 class="fs-4 fw-semibold mb-0">최근 접속일</h6>
										</th>
										<th class="text-center">
											<h6 class="fs-4 fw-semibold mb-0">블랙 리스트</h6>
										</th>
										<th class="text-center"></th>
									</tr>
								</thead>
								<c:choose>
									<c:when test="${empty list}">
										<tr>
											<td colspan="8" class="text-center">조회하신 게시글이 존재하지 않습니다</td>
										</tr>
									</c:when>
									<c:otherwise>
										<tbody>
											<c:forEach var="memberVO" items="${list}" varStatus="status">
												<tr>
													<td class="text-center">
														<h6 class="fs-4 fw-semibold mb-0">${memberVO.rnum }</h6>
													</td>
													<td>
														<div class="d-flex align-items-center ms-4">
															<img src="${contextPath }${memberVO.memPrflimg}" class="rounded-circle" width="40" height="40" />
															<div class="ms-3">
																<h6 class="fs-4 fw-semibold mb-0">${memberVO.memName}</h6>
																<span class="fw-normal">${memberVO.memEmail}</span>
															</div>
														</div>
													</td>
													<td class="text-center">
														<p class="mb-0 fw-normal fs-4">${memberVO.channelCount}</p>
													</td>
													<td>
														<div class="d-flex align-items-center">
															<p class="mb-0 fw-normal fs-4">${memberVO.memRgdtString}</p>
														</div>
													</td>
													<c:if test="${memberVO.chCnntdt eq null}">
														<td>
															<div class="d-flex align-items-center">
																<p class="mb-0 fw-normal fs-4">&ensp;&ensp;&ensp;&ensp;&ensp;-</p>
															</div>
														</td>
													</c:if>
													<c:if test="${memberVO.chCnntdt ne null}">
														<td>
															<div class="d-flex align-items-center">
																<p class="mb-0 fw-normal fs-4">${memberVO.chCnntdt}</p>
															</div>
														</td>
													</c:if>
													<td class="text-center"><c:if test="${memberVO.memStatus != 1}">
															<span>-</span>
														</c:if> <c:if test="${memberVO.memStatus == 1}">
															<span class="badge bg-danger-subtle text-danger">블랙리스트</span>
														</c:if></td>
													<td><a href="${contextPath }/admin/users/detail?memNo=${memberVO.memNo}" class="link-primary" data-bs-toggle="tooltip" data-bs-placement="top" title="View Details"> <i class="ti ti-eye fs-7"></i>
													</a></td>
												</tr>
											</c:forEach>
										</tbody>
									</c:otherwise>
								</c:choose>
							</table>
						</div>
						<div class="text-center mt-3" id="pagingArea">${pagingVO.pagingHTML }</div>
					</div>
				</div>
				<!-- end Default Size Light Table -->


			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
$(function(){
    var searchForm = $("#searchForm");       // 검색 및 페이징 처리 위한 Form
    var pagingArea = $("#pagingArea");       // 페이징 처리 위한 div
    
    pagingArea.on("click", "a", function(event){
       event.preventDefault();
       $(this).data("page");
       var currentPage = $(this).data("page");
       searchForm.find("#currentPage").val(currentPage);
       searchForm.submit();
    });
 }); 
</script>