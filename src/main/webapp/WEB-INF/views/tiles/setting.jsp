<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script>
	function handleColorTheme(e) {
		document.documentElement.setAttribute("data-color-theme", e);
	}
</script>

<button
	class="btn btn-primary p-3 rounded-circle d-flex align-items-center justify-content-center customizer-btn"
	type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample"
	aria-controls="offcanvasExample">
	<i class="icon ti ti-settings fs-7"></i>
</button>

<div class="offcanvas customizer offcanvas-end" tabindex="-1" id="offcanvasExample"
	aria-labelledby="offcanvasExampleLabel">
	<div class="d-flex align-items-center justify-content-between p-3 border-bottom">
		<h4 class="offcanvas-title fw-semibold" id="offcanvasExampleLabel">설정</h4>
		<button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
	</div>
	<div class="offcanvas-body h-n80" data-simplebar>
		<h6 class="fw-semibold fs-4 mb-2">화면모드</h6>

		<div class="d-flex flex-row gap-3 customizer-box" role="group">
			<input type="radio" class="btn-check light-layout" name="theme-layout" id="light-layout"
				autocomplete="off" /> <label class="btn p-9 btn-outline-primary" for="light-layout"> <i
				class="icon ti ti-brightness-up fs-7 me-2"></i>라이트
			</label> <input type="radio" class="btn-check dark-layout" name="theme-layout" id="dark-layout"
				autocomplete="off" /> <label class="btn p-9 btn-outline-primary" for="dark-layout"> <i
				class="icon ti ti-moon fs-7 me-2"></i>다크
			</label>
		</div>

		<div style="display: none;">
			<h6 class="mt-5 fw-semibold fs-4 mb-2">메뉴바 좌우설정</h6>
			<div class="d-flex flex-row gap-3 customizer-box" role="group">
				<input type="radio" class="btn-check" name="direction-l" id="ltr-layout" autocomplete="off" /> <label
					class="btn p-9 btn-outline-primary" for="ltr-layout"> <i
					class="icon ti ti-text-direction-ltr fs-7 me-2"></i>왼쪽
				</label> <input type="radio" class="btn-check" name="direction-l" id="rtl-layout" autocomplete="off" />
				<label class="btn p-9 btn-outline-primary" for="rtl-layout"> <i
					class="icon ti ti-text-direction-rtl fs-7 me-2"></i>오른쪽
				</label>
			</div>
		</div>	
		<h6 class="mt-5 fw-semibold fs-4 mb-2">테마색상</h6>

		<div class="d-flex flex-row flex-wrap gap-3 customizer-box color-pallete" role="group">
			<input type="radio" class="btn-check" name="color-theme-layout" id="Blue_Theme"
				autocomplete="off" /> <label
				class="btn p-9 btn-outline-primary d-flex align-items-center justify-content-center"
				onclick="handleColorTheme('Blue_Theme')" for="Blue_Theme" data-bs-toggle="tooltip"
				data-bs-placement="top" data-bs-title="BLUE_THEME">
				<div class="color-box rounded-circle d-flex align-items-center justify-content-center skin-1">
					<i class="ti ti-check text-white d-flex icon fs-5"></i>
				</div>
			</label> <input type="radio" class="btn-check" name="color-theme-layout" id="Aqua_Theme"
				autocomplete="off" /> <label
				class="btn p-9 btn-outline-primary d-flex align-items-center justify-content-center"
				onclick="handleColorTheme('Aqua_Theme')" for="Aqua_Theme" data-bs-toggle="tooltip"
				data-bs-placement="top" data-bs-title="AQUA_THEME">
				<div class="color-box rounded-circle d-flex align-items-center justify-content-center skin-2">
					<i class="ti ti-check text-white d-flex icon fs-5"></i>
				</div>
			</label> <input type="radio" class="btn-check" name="color-theme-layout" id="Purple_Theme"
				autocomplete="off" /> <label
				class="btn p-9 btn-outline-primary d-flex align-items-center justify-content-center"
				onclick="handleColorTheme('Purple_Theme')" for="Purple_Theme" data-bs-toggle="tooltip"
				data-bs-placement="top" data-bs-title="PURPLE_THEME">
				<div class="color-box rounded-circle d-flex align-items-center justify-content-center skin-3">
					<i class="ti ti-check text-white d-flex icon fs-5"></i>
				</div>
			</label> <input type="radio" class="btn-check" name="color-theme-layout" id="green-theme-layout"
				autocomplete="off" /> <label
				class="btn p-9 btn-outline-primary d-flex align-items-center justify-content-center"
				onclick="handleColorTheme('Green_Theme')" for="green-theme-layout" data-bs-toggle="tooltip"
				data-bs-placement="top" data-bs-title="GREEN_THEME">
				<div class="color-box rounded-circle d-flex align-items-center justify-content-center skin-4">
					<i class="ti ti-check text-white d-flex icon fs-5"></i>
				</div>
			</label> <input type="radio" class="btn-check" name="color-theme-layout" id="cyan-theme-layout"
				autocomplete="off" /> <label
				class="btn p-9 btn-outline-primary d-flex align-items-center justify-content-center"
				onclick="handleColorTheme('Cyan_Theme')" for="cyan-theme-layout" data-bs-toggle="tooltip"
				data-bs-placement="top" data-bs-title="CYAN_THEME">
				<div class="color-box rounded-circle d-flex align-items-center justify-content-center skin-5">
					<i class="ti ti-check text-white d-flex icon fs-5"></i>
				</div>
			</label> <input type="radio" class="btn-check" name="color-theme-layout" id="orange-theme-layout"
				autocomplete="off" /> <label
				class="btn p-9 btn-outline-primary d-flex align-items-center justify-content-center"
				onclick="handleColorTheme('Orange_Theme')" for="orange-theme-layout" data-bs-toggle="tooltip"
				data-bs-placement="top" data-bs-title="ORANGE_THEME">
				<div class="color-box rounded-circle d-flex align-items-center justify-content-center skin-6">
					<i class="ti ti-check text-white d-flex icon fs-5"></i>
				</div>
			</label>
		</div>

		<h6 class="mt-5 fw-semibold fs-4 mb-2">메뉴바 타입</h6>
		<div class="d-flex flex-row gap-3 customizer-box" role="group">
			<div>
				<input type="radio" class="btn-check" name="page-layout" id="vertical-layout" autocomplete="off" />
				<label class="btn p-9 btn-outline-primary" for="vertical-layout"> <i
					class="icon ti ti-layout-sidebar-right fs-7 me-2"></i>세로형
				</label>
			</div>
			<div>
				<input type="radio" class="btn-check" name="page-layout" id="horizontal-layout"
					autocomplete="off" /> <label class="btn p-9 btn-outline-primary" for="horizontal-layout">
					<i class="icon ti ti-layout-navbar fs-7 me-2"></i>수평형
				</label>
			</div>
		</div>

		<h6 class="mt-5 fw-semibold fs-4 mb-2">글상자 옵션</h6>

		<div class="d-flex flex-row gap-3 customizer-box" role="group">
			<input type="radio" class="btn-check" name="layout" id="boxed-layout" autocomplete="off" /> <label
				class="btn p-9 btn-outline-primary" for="boxed-layout"> <i
				class="icon ti ti-layout-distribute-vertical fs-7 me-2"></i>내용맞춤
			</label> <input type="radio" class="btn-check" name="layout" id="full-layout" autocomplete="off" /> <label
				class="btn p-9 btn-outline-primary" for="full-layout"> <i
				class="icon ti ti-layout-distribute-horizontal fs-7 me-2"></i>창맞춤
			</label>
		</div>

		<h6 class="fw-semibold fs-4 mb-2 mt-5">메뉴바 설정</h6>
		<div class="d-flex flex-row gap-3 customizer-box" role="group">
			<a href="javascript:void(0)" class="fullsidebar"> <input type="radio" class="btn-check"
				name="sidebar-type" id="full-sidebar" autocomplete="off" /> <label
				class="btn p-9 btn-outline-primary" for="full-sidebar"> <i
					class="icon ti ti-layout-sidebar-right fs-7 me-2"></i>펼치기
			</label>
			</a>
			<div>
				<input type="radio" class="btn-check " name="sidebar-type" id="mini-sidebar" autocomplete="off" />
				<label class="btn p-9 btn-outline-primary" for="mini-sidebar"> <i
					class="icon ti ti-layout-sidebar fs-7 me-2"></i>접기
				</label>
			</div>
		</div>

		<h6 class="mt-5 fw-semibold fs-4 mb-2">Card With</h6>

		<div class="d-flex flex-row gap-3 customizer-box" role="group">
			<input type="radio" class="btn-check" name="card-layout" id="card-with-border" autocomplete="off" />
			<label class="btn p-9 btn-outline-primary" for="card-with-border"> <i
				class="icon ti ti-border-outer fs-7 me-2"></i>Border
			</label> <input type="radio" class="btn-check" name="card-layout" id="card-without-border"
				autocomplete="off" /> <label class="btn p-9 btn-outline-primary" for="card-without-border">
				<i class="icon ti ti-border-none fs-7 me-2"></i>Shadow
			</label>
		</div>
	</div>
</div>
<div class="dark-transparent sidebartoggler"></div>