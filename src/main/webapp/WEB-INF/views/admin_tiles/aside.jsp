<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />
<!-- Sidebar Start -->
<aside class="left-sidebar with-vertical">
	<!-- ---------------------------------- -->
	<!-- Start Vertical Layout Sidebar -->
	<!-- ---------------------------------- -->
	<div class="brand-logo d-flex align-items-center justify-content-between">
		<a href="${contextPath }/admin/home" class="text-nowrap logo-img"> <img src="${contextPath }/resources/assets/images/logos/logo2.png" class="dark-logo" alt="Logo-Dark" style="object-fit: cover; width: 100%; height: 100%;"/>
		</a> <a href="javascript:void(0)" class="sidebartoggler ms-auto text-decoration-none fs-5 d-block d-xl-none"> <i class="ti ti-x"></i>
		</a>
	</div>

	<div class="scroll-sidebar left" data-simplebar>
		<!-- Sidebar navigation-->
		<nav class="sidebar-nav">
			<ul id="sidebarnav" class="mb-0">

				<!-- ============================= -->
				<!-- Home -->
				<!-- ============================= -->


				<a style="display: none;" href="" id="get-url" aria-expanded="false"> </a>
  

				<!-- ============================= -->
				<!-- Apps -->
				<!-- ============================= -->
				<li class="nav-small-cap"><iconify-icon icon="solar:menu-dots-bold-duotone" class="nav-small-cap-icon fs-5"></iconify-icon> <span class="hide-menu">관리자 메뉴</span></li>   
				<li class="sidebar-item"><a class="sidebar-link danger-hover-bg" href="${contextPath }/admin/home" aria-expanded="false"> <span class="aside-icon p-2 bg-danger-subtle rounded-1"> <i class="ti ti-chalkboard fs-6"></i>
					</span> <span class="hide-menu ps-1">관리자 대시보드</span>
				</a>
				</li>
				<li class="sidebar-item"><a class="sidebar-link warning-hover-bg" href="${contextPath}/admin/management" aria-expanded="false"> <span class="aside-icon p-2 bg-warning-subtle rounded-1"> <iconify-icon icon="mdi:account-supervisor-circle" class="fs-6"></iconify-icon></span> 
				<span class="hide-menu ps-1">관리자 관리</span>
				</a>
				<li class="sidebar-item"><a class="sidebar-link has-arrow indigo-hover-bg" href="javascript:void(0)" aria-expanded="false"> <span class="aside-icon p-2 bg-indigo-subtle rounded-1"> <iconify-icon icon="solar:pie-chart-3-line-duotone" class="fs-6"></iconify-icon>
					</span> <span class="hide-menu ps-1">서비스 관리</span>
				</a>
					<ul aria-expanded="false" class="collapse first-level"> 
						<li class="sidebar-item"><a href="${contextPath }/admin/channel" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu">채널 관리</span>
						</a></li>
						<li class="sidebar-item"><a href="${contextPath }/admin/membership" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu">멤버십 관리</span>
						</a></li>
						<li class="sidebar-item"><a href="${contextPath }/admin/users" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu">사용자 관리</span>
						</a></li>
						<li class="sidebar-item"><a href="${contextPath }/admin/dclrList" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu">신고 접수 관리</span>
						</a></li>
						<li class="sidebar-item"><a href="${contextPath }/admin/paymentList" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu">매출 관리</span>
						</a></li>
						<li class="sidebar-item">
			                <a href="#!" class="sidebar-link" data-bs-toggle="collapse" data-bs-target="#customer-support-menu" aria-expanded="false">
			                    <span class="sidebar-icon"></span>
			                    <span class="hide-menu">고객센터 관리</span>
			                </a>
			                <ul id="customer-support-menu" aria-expanded="false" class="collapse first-level">
			                    <li style="padding-left: 50px;"><a href="${contextPath }/admin/notice" class="sidebar-link"><i class="ti ti-point me-3"></i>공지사항 관리</a></li>
			                    <li style="padding-left: 50px;"><a href="${contextPath }/admin/faq" class="sidebar-link"><i class="ti ti-point me-3"></i>FAQ 관리</a></li>
			                    <li style="padding-left: 50px;"><a href="${contextPath }/admin/qna" class="sidebar-link"><i class="ti ti-point me-3"></i>Q&A 관리</a></li>
			                    <!-- 추가 항목을 여기에 추가할 수 있습니다 -->
			                </ul>
			            </li>
					</ul></li>
			</ul>
		</nav>
		<!-- End Sidebar navigation -->
	</div>

	<div class="fixed-profile mx-3 mt-3">
		<div class="card bg-primary-subtle mb-0 shadow-none">
			<div class="card-body p-4">
				<div class="d-flex align-items-center justify-content-between gap-3">
					<div class="d-flex align-items-center gap-3">
						<img src="${contextPath }<sec:authentication property="principal.member.memPrflimg"/>" width="45" height="45" class="img-fluid rounded-circle" alt="spike-img" />
						<div>
							<h5 class="mb-1" style="font-size: 90%">
								<sec:authentication property="principal.member.memName" />
							</h5>
							<p class="mb-0" style="font-size: 90%">Admin</p>
						</div>
					</div>
					<form action="/synerhub/logout" method="post" id="logoutFormAside">
						<a onclick="logoutBtn()" class="position-relative" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Logout" style="cursor: pointer"> <iconify-icon icon="solar:logout-line-duotone" class="fs-8"></iconify-icon>
						</a> 
						<sec:csrfInput />
					</form>
				</div>
			</div>
		</div>
	</div>

	<!-- ---------------------------------- -->
	<!-- Start Vertical Layout Sidebar -->
	<!-- ---------------------------------- -->
</aside>
<!--  Sidebar End -->
<div class="page-wrapper">

	<aside class="left-sidebar with-horizontal">
		<!-- Sidebar scroll-->
		<div>
			<!-- Sidebar navigation-->
			<nav id="sidebarnavh" class="sidebar-nav scroll-sidebar container-fluid">
				<ul id="sidebarnav">
					<li class="sidebar-item"><a class="sidebar-link two-column has-arrow indigo-hover-bg" href="javascript:void(0)" aria-expanded="false"> <iconify-icon icon="solar:archive-broken" class="fs-6 aside-icon"></iconify-icon> <span class="hide-menu ps-1">관리자 관리</span>
					</a>
						<ul aria-expanded="false" class="collapse first-level">
							<li class="sidebar-item"><a href="#/main/app-calendar.html" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu">관리자 생성</span>
							</a></li>
							<li class="sidebar-item"><a href="#/main/app-kanban.html" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu">관리자 목록</span>
							</a></li>
						</ul></li>
					<!-- ============================= -->
					<!-- PAGES -->
					<!-- ============================= -->
					<li class="sidebar-item"><a class="sidebar-link two-column has-arrow primary-hover-bg" href="javascript:void(0)" aria-expanded="false"> <iconify-icon icon="solar:file-text-line-duotone" class="fs-6 aside-icon"></iconify-icon> <span class="hide-menu ps-1">서비스 관리</span>
					</a>
						<ul aria-expanded="false" class="collapse first-level">
							<!-- Teachers -->
							<li class="sidebar-item"><a href="#/main/all-teacher.html" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu text-truncate">채널 현황</span>
							</a></li>
							<li class="sidebar-item"><a href="#/main/teacher-details.html" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu text-truncate">멤버십 관리</span>
							</a></li>
							<!-- Exams -->
							<li class="sidebar-item"><a href="#/main/exam-schedule.html" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu text-truncate">사용자 관리</span>
							</a></li>
							<li class="sidebar-item"><a href="#/main/exam-result.html" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu text-truncate">신고 접수 관리</span>
							</a></li>
							<li class="sidebar-item"><a href="#/main/exam-result-details.html" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu text-truncate">통계 관리</span>
							</a></li>
							<li class="sidebar-item"><a href="#/main/all-student.html" class="sidebar-link"> <span class="sidebar-icon"></span> <span class="hide-menu text-truncate">고객센터 관리</span>
							</a></li>
						</ul></li>
				</ul>
			</nav>
		</div>
	</aside>
	<script type="text/javascript">
	function logoutBtn() {
		$("#logoutFormAside").submit();
	};
	</script>