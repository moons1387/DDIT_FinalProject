var schdl_cd = 0;		// 개인 OR 조직 일정 구분 코드
var calId = null;		// 일정 번호 변수 선언
var calfnc = null;

// 전체,조직,개인 일정 별 구분 코드 지정
$("#allcal").on("click", function () {
	schdl_cd = 0;
})

$("#privatecal").on("click", function () {
	schdl_cd = "SCHST001";
});

$("#companycal").on("click", function () {
	schdl_cd = "SCHST002";
	if (synerhubth == null) {
		swal.fire("스레드 입장후 들어와주세요");
	}
});

$("#chcal").on("click", function () {
	schdl_cd = "SCHST003";
});

// 사이드바 클릭시 
function CalendarList() {
	if (synerhubch == null) {
		swal.fire("채널 입장후 들어와주세요");
	}
	else {
		MAIN_CONTENTS.innerHTML = `
		<div class="mb-3 overflow-hidden position-relative">
			<div class="px-3">
				<h4 class="fs-6 mb-0">일정</h4>
				<nav aria-label="breadcrumb">
					<ol class="breadcrumb mb-0">
						<li class="breadcrumb-item">
							<a href="/synerhub/main">Home</a>
						</li>
						<li class="breadcrumb-item" aria-current="page">일정</li>
					</ol>
				</nav>
			</div>
		</div>
		<div class="card">
			<div class="card-body calender-sidebar app-calendar">
				<div id="calendar"></div>
			</div>
		</div>

		<div class="calmodal" id="calmodal" tabindex="-1" style="display: none">
			<div class="modal-dialog modal-xl" style="margin-left: 500px; margin-top: 150px;">
				<div class="modal-content">
					<div class="calmodalbody p-4" id="calmodalbody">
						<div style="float: right" id="deleteBtnPlace"></div>
						<div class="text-center text-dark">
							<i class="ti ti-calendar-month fs-7"></i>
							<h3 class="mt-2">일정 등록</h3>
							<hr />
							<div class="container-fluid">
								<div class="row mt-3">
									<div class="form-group d-inline-flex text-nowrap col">
										<label for="startDate" class="form-label col-sm-3 col-form-label">시작 날짜</label>
										<input type="date" class="form-control me-1" id="startDate" />
										<input type="time" class="form-control" id="startTime" />
									</div>
								</div>
								<div class="row mt-3">
									<div class="form-group d-inline-flex text-nowrap col">
										<label for="endDate" class="form-label col-sm-3 col-form-label">종료 날짜</label>
										<input type="date" class="form-control me-1" id="endDate" />
										<input type="time" class="form-control" id="endTime" />
									</div>
								</div>
								<div class="row mt-4">
									<div class="form-group d-inline-flex text-nowrap col" id="threadNm"></div>
									<div class="row mt-4">
										<div class="form-group d-inline-flex text-nowrap col">
											<label for="colorchk" class="form-label col-sm-2 col-form-label" id="colorSpace">컬러</label>
											<input type="color" class="form-control form-control-color" id="colorchk" />
											<label for="gubun" class="form-label col-sm-3 col-form-label">구분</label>
											<select class="form-select" id="gubun">
												<option value="SCHST001">개인 일정</option>
												<option value="SCHST002">스레드 일정</option>
												<option value="SCHST003">채널 일정</option>
											</select>
										</div>
									</div>
									<div class="mt-4">
										<div class="form-group d-flex text-nowrap">
											<label for="schedule" class="form-label col-sm-3 col-form-label">일정 제목</label>
											<input type="text" class="form-control" id="schedule" style="width: 100%;" />
										</div>
									</div>
									<div class="mt-3">
										<div class="form-group d-flex text-nowrap">
											<label for="scheduleContent" class="form-label col-sm-3 col-form-label">일정 내용</label>
											<textarea class="form-control" id="scheduleContent" style="width: 100%; height: 150px;"></textarea>
										</div>
									</div>
									<div class="mt-3">
										<div class="form-group d-inline-flex" id="alldayPlace">
											<i class="ti ti-clock fs-6"></i>
											<label class="form-check-label ms-2 me-2" for="allday">하루 종일</label>
											<input class="form-check-input" type="checkbox" id="allday" />
										</div>
									</div>
								</div>
								<div class="mt-4 text-center" id="calBtnSpace"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>`;

		// db에서 데이터 받아오기
		var data = {
			memNo: MEM_NO,
			thNo: synerhubth,
			schdlCd: schdl_cd,
			chNo: synerhubch
		};

		$.ajax({
			url: "/synerhub/calendar/form",
			type: "post",
			beforeSend: function (xhr) {		// 데이터 전송 전 헤더에 csrf값 설정
				xhr.setRequestHeader(header, token);
			},
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			success: function (res) {
				for (var i = 0, result = []; i < res.length; i++) {
					result.push({
						start: res[i].strtDt,
						end: res[i].endDt,
						allDay: res[i].allDay,
						title: res[i].schdlTtl,
						color: res[i].color,
						startStr: res[i].schdlNo,
						recurringDef: res[i].memNo
					});
				}
				//일정들 달력에 출력
				calendar(result);
			}
		})
	}
}

// 달력 출력
function calendar(res) {
	// modal css
	var calmodal = $(document).find("#calmodal");

	calmodal.css("justifyContent", "center");
	calmodal.css("alignItems", "center");
	calmodal.css("position", "fixed");
	calmodal.css("top", "0");
	calmodal.css("left", "0");
	calmodal.css("width", "100%");
	calmodal.css("height", "100%");
	calmodal.css("backgroundColor", "rgba(0, 0, 0, 0.5)");
	calmodal.css("zIndex", "1000");

	// modalbody css
	var calmodalbody = $(document).find("#calmodalbody");

	calmodalbody.css("position", "fixed");
	calmodalbody.css("backgroundColor", "white");
	calmodalbody.css("padding", "20%");
	calmodalbody.css("boxShadow", "0 4px 20px rgba(0, 0, 0, 0.2)");
	calmodalbody.css("align", "center");
	calmodalbody.css("left", "50%");
	calmodalbody.css("top", "50%");
	calmodalbody.css("width", "30%");

	calmodalbody.css("transform", "translate(-50%, -50%)");


	// 변수들 선언
	var title = $(document).find("#schedule");					// 일정 등록 변수 선언
	var startDate = $(document).find("#startDate");				// 시작 날짜 변수 선언
	var startTime = $(document).find('#startTime');				// 시작 시간 변수 선언
	var endDate = $(document).find('#endDate');					// 종료 날짜 변수 선언
	var endTime = $(document).find('#endTime');					// 시작 시간 변수 선언
	var allday = $(document).find('#allday');					// 종일 버튼 변수 선언
	var colorchk = $(document).find("#colorchk");				// 색깔 버튼 변수 선언
	var scheduleConts = $(document).find("#scheduleContent");	// 일정 내용 버튼 선언

	var calEl = document.getElementById('calendar');	// 캘린더 출력 페이지
	calfnc = new FullCalendar.Calendar(calEl, {
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridDay,timeGridWeek,dayGridMonth,multiMonthYear'
		},
		// 연단위로 했을대 한줄에 2개씩
		multiMonthMaxColumns: 2,

		// 오른쪽 버튼 이름들
		buttonText: {
			today: '오늘',
			day: '일일 일정',
			week: '주 단위',
			month: '월 단위',
			year: '연 단위'
		},

		// 하루에 4개만 보이게
		views: {
			dayGridMonth: {
				dayMaxEventRows: 4
			},
		},

		// 일정 출력
		events: res,

		// 공휴일 빨간색으로 출력 (변경 또는 클릭 불가)
		googleCalendarApiKey: 'AIzaSyDcnW6WejpTOCffshGDDb4neIrXVUA1EAE',
		eventSources: [
			{
				googleCalendarId: 'ko.south_korea#holiday@group.v.calendar.google.com',
				backgroundColor: 'white',
				borderColor: 'white',
				textColor: 'red',
				editable: false,
			}
		],

		// 모달창 출력
		select: function (info) {
			$(document).find("#gubun").val("SCHST001");
			$(document).find("#deleteBtnPlace").css("display", "none");
			// 기본색 : 검정색
			if ($(document).find("#gubun").val() == "SCHST001") {
				colorchk.val("#212121");
				$(document).find("#gubun").attr("class", "form-select");
				colorchk.css("display", "block");
			} else {
				colorchk.css("display", "none");
			}

			$("#deletBtnPlace").css("display", "none");
			$("#threadNm").html("");
			$(document).find("#alldayPlace").html('<i class="ti ti-clock fs-6"></i><label class="form-check-label ms-2 me-2" for="allday">하루 종일</label><input class="form-check-input" type="checkbox" id="allday" />');
			$("#calmodal").find(".form-control").attr("disabled", false);

			colorchk.css("display", "block");
			$("#colorSpace").css("display", "block");

			// 내용 빈칸
			scheduleConts.val("");
			// 제목 빈칸
			title.val("");

			// 시간 입력칸들 출력
			$("input[type=time]").css("visibility", "visible");
			// 시작 날짜 입력
			startDate.val(dayFormat(info.start));
			// 부서 출력칸 없애기
			$(document).find("#threaNm").html("");

			// 주단위랑 월단위 입력으로 변경
			let check = info.endStr.split("T")[1];
			if (check) {														// 주단위로 입력시	(2024-09-12T09:00)
				endDate.val(info.endStr.split("T")[0]);
				endTime.val(check.substr(0, 5));
				startTime.val((info.startStr.split("T")[1]).substr(0, 5));	// T이후부터 5글자
			} else {															// 월단위로 입력시	(2024-09-12)
				startTime.val("09:00");
				endTime.val("10:00");
				// 입력시 다음날이 입력되어 전날로 입력
				let DayAgo = new Date((info.end).setDate((info.end).getDate() - 1));
				endDate.val(dayFormat(DayAgo));				// dayFormat(Date => String 변경 이벤트)
			}
			$("#calBtnSpace").html(
				`<button type="button" class="btn btn-primary me-2" data-bs-dismiss="modal" onclick="calUpBtn(0)"> 등록 </button>
				<button type="button" class="btn bg-warning-subtle text-warning" onclick='$(document).find("#calmodal").css("display", "none")'> 취소 </button>`);
			calmodal.css("display", "block");
		},

		// 일정 이동 기능
		eventDrop: function (event) {
			if (event.oldEvent._def.extendedProps.recurringDef != MEM_NO && event.oldEvent._def.extendedProps.recurringDef != null) {
				swal.fire("일정 변경 불가합니다");
				event.revert();
				return;
			}
			move(event.delta.days, event.oldEvent._def.extendedProps.startStr, "move", null);
		},

		//resize 기능
		eventResize: function (info) {
			if (info.oldEvent._def.extendedProps.recurringDef != MEM_NO && info.oldEvent._def.extendedProps.recurringDef != null) {
				swal.fire("일정 변경 불가합니다");
				info.revert();
				return;
			}
			move(info.endDelta.days, info.oldEvent._def.extendedProps.startStr, "resize", info.endDelta.milliseconds);
		},

		// 일정 클릭하여 수정 및 삭제
		eventClick: function (info) {
			allday.prop("checked", false);
			updateForm(info.event._def.extendedProps.startStr, info.event._def.extendedProps.recurringDef);		// 일정 수정 기능
			calId = info.event._def.defId; 																																		// 클릭한 일정 Id
			// 공휴일 클릭시 url이동 block
			info.jsEvent.cancelBubble = true;
			info.jsEvent.preventDefault();
		},
		droppable: true,		// 일정 변경 지원
		selectable: true, 		// 클릭 기능 활성화 
		nowIndicator: true,
		editable: true,
		displayEventTime: false,
	});
	calfnc.render();
}

// dayFormat(Date => String 변경 이벤트)
function dayFormat(DayAgo, type) {
	let year = DayAgo.getFullYear();
	let month = DayAgo.getMonth() + 1;
	let date = DayAgo.getDate();

	month = month < 10 ? '0' + month : month;
	date = date < 10 ? '0' + date : date;

	return year + "-" + month + "-" + date;
};

// esc시 클릭시
$(document).keydown(function (event) {
	if (event.keyCode == 27) {
		$(document).find("#calmodal").css("display", "none")
	}
})

// 일정 구분 변경시
$(document).on("change", "#gubun", function () {
	// 일정이 개인일시 색깔 선택 가능
	if (($(document).find("#gubun").val()) == "SCHST001") {
		$(document).find("#colorchk").css("display", "block");
		$(document).find("#colorSpace").css("display", "block");
	}
	else {
		$(document).find("#colorchk").css("display", "none");
		$(document).find("#colorSpace").css("display", "none");

		let memChk = {
			chNo: synerhubch,
			thNo: synerhubth,
			memNo: MEM_NO
		}
		$.ajax({
			url: "/synerhub/equipment/getChUser",
			type: "post",
			beforeSend: function (xhr) {
				xhr.setRequestHeader(header, token)
			},
			data: JSON.stringify(memChk),
			contentType: "application/json; charset=utf-8",
			success: function (result) {
				if ($(document).find("#gubun").val() == "SCHST003") {
					if (result.chPrp != "C") {
						swal.fire("채널장만 채널 일정 등록 가능합니다.");
						$(document).find("#gubun").val("SCHST001").prop("selected", true);
						$(document).find("#colorchk").css("display", "block");
						$(document).find("#colorSpace").css("display", "block");
					}
				} else if ($(document).find("#gubun").val() == "SCHST002") {
					if (result.chPrp == "A" || result.chPrp == "I") {
						swal.fire("채널장 또는 스레드장만 스레드 \n일정 등록 가능합니다.")
						$(document).find("#gubun").val("SCHST001").prop("selected", true);
						$(document).find("#colorchk").css("display", "block");
						$(document).find("#colorSpace").css("display", "block");
					}
				}

				if (($(document).find("#gubun").val()) == "SCHST002") {
					if (synerhubth == null) {
						swal.fire("스레드 입장후 스레드 일정 등록 가능합니다.");
						$(document).find("#calmodal").css("display", "none");
					}
				}
			}
		});
	}
});

// 삭제 버튼 클릭시
function calDelBtn(schdlNo) {
	Swal.fire({
		title: '정말로 삭제 하시겠습니까?',
		text: '다시 되돌릴 수 없습니다. 신중하세요.',
		icon: 'warning',

		showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
		confirmButtonText: '승인', // confirm 버튼 텍스트 지정
		cancelButtonText: '취소', // cancel 버튼 텍스트 지정
	}).then(result => {
		// 만약 Promise리턴을 받으면,
		if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면
			$.ajax({
				url: "/synerhub/calendar/delete",
				type: "post",
				beforeSend: function (xhr) {
					xhr.setRequestHeader(header, token);
				},
				data: JSON.stringify({ schdlNo: schdlNo }),
				contentType: "application/json; charset=utf-8",
				success: function (res) {
					calfnc.getEvents().forEach(function (evt) {
						if (evt._def.defId == calId) evt.remove();
					});
					swal.fire("일정이 삭제되었습니다");
					$(document).find("#calmodal").css("display", "none")
				}
			});
		}
	});
}

// 시작 시간이 끝나는 시간보다 늦으면 변경
$(document).on("change", "#startTime", function () {
	let shour = $("#startTime").val().split(":")[0];
	let ehour = $("#endTime").val().split(":")[0];
	if (ehour < shour) {
		let eh = parseInt(shour) + 1 % 24;
		eh = eh < 10 ? '0' + eh : eh;
		$("#endTime").val(eh + ":00")
	}
})

// 끝나는 시간이 시작 시간보다 빠르면 변경
$(document).on("change", "#endTime", function () {
	let shour = $("#startTime").val().split(":")[0];
	let ehour = $("#endTime").val().split(":")[0];
	if (ehour < shour) {
		let sh = parseInt(ehour) - 1 % 24;
		sh = sh < 10 ? '0' + sh : sh;
		$("#startTime").val(sh + ":00")
	}
})

// 종일 버튼 클릭시 시간 입력칸 보이기 유무
$(document).on("change", "#allday", function () {
	if ($(this).is(":checked")) {
		$("input[type=time]").css("visibility", "hidden");
	}
	else {
		$("input[type=time]").css("visibility", "visible");
	}
});

// 수정 or 등록 클릭시
function calUpBtn(schdlNo) {
	// 시작과 끝나느 날짜가 다르면 무조건 allday(tt) = true
	if ($("#startDate").val() != $("#endDate").val()) {
		tt = true;
	}
	// 종일 버튼 클릭시 allday = true
	else {
		if ($("#allday").is(":checked")) {
			tt = true;
		}
		// 아니면 false
		else {
			tt = false;
		}
	}
	let thNo = synerhubth;
	let color = $(document).find("#colorchk").val();

	// 채널 일정이면 빨간색 AND 스레드 번호 무시
	if ($("#gubun").val() == "SCHST003") {
		color = "##542ab7";
		thNo = null;
	}

	// 개인 이면 스레드 번호 무시
	if ($("#gubun").val() == "SCHST001") {
		thNo = null;
	}

	if ($("#gubun").val() == "SCHST002") {
		thNo = synerhubth;
	}

	var calObject = {
		std: $("#startDate").val(),
		end: $("#endDate").val(),
		stt: $("#startTime").val(),
		endt: $("#endTime").val(),
		schdlTtl: $("#schedule").val(),
		schdlCd: $("#gubun").val(),
		schdlNo: schdlNo,
		memNo: MEM_NO,
		color: color,
		allDay: tt,
		schdlConts: $("#scheduleContent").val(),
		chNo: synerhubch,
		thNo: thNo
	}
	if ($("#schedule").val() == '') {
		swal.fire("일정 제목을 입력해주세요");
	} else if ($("#scheduleContent").val() == '') {
		swal.fire("일정 내용을 입력해주세요")
	}
	else {
		// 등록시
		if (schdlNo == 0) {
			$.ajax({
				url: "/synerhub/calendar/insert",
				type: "post",
				contentType: "application/json; charset=utf-8",
				beforeSend: function (xhr) {
					xhr.setRequestHeader(header, token);
				},
				data: JSON.stringify(calObject),
				success: function (res) {
					// 등록된 일정 페이지에 추가
					if (schdl_cd == $("#gubun").val() || schdl_cd == 0) {
						calfnc.addEvent({
							start: res.std,
							end: res.end,
							title: res.schdlTtl,
							color: res.color,
							allDay: tt,
							startStr: res.schdlNo
						});
					}
					swal.fire("일정 등록되었습니다.");
				}
			});
		}
		// 변경시
		else {
			$.ajax({
				url: "/synerhub/calendar/update",
				type: "post",
				contentType: "application/json; charset=utf-8",
				beforeSend: function (xhr) {
					xhr.setRequestHeader(header, token);
				},
				data: JSON.stringify(calObject),
				success: function (res) {
					swal.fire("일정 수정 완료했습니다.");
					// 원래 있던 일정 페이지에서만 제거
					calfnc.getEvents().forEach(function (evt) {
						if (evt._def.defId == calId) evt.remove();
					});
					if (schdl_cd == $("#gubun").val() || schdl_cd == 0) {
						// 수정된 일정 출력
						calfnc.addEvent({
							start: res.std,
							end: res.end,
							title: res.schdlTtl,
							color: res.color,
							allDay: tt,
							startStr: res.schdlNo
						});
					}
				}
			});
		}
		calmodal.style.display = "none";
		calfnc.render();
	}
};

// 일정 이동 기능
function move(event, date, state, mill) {
	var movedate = {
		event: event,
		schdlNo: date,
		state: state,
		mill: mill
	}
	$.ajax({
		url: "/synerhub/calendar/move",
		type: 'post',
		beforeSend: function (xhr) {		// 데이터 전송 전 헤더에 csrf값 설정
			xhr.setRequestHeader(header, token);
		},
		data: JSON.stringify(movedate),
		contentType: "application/json; charset=utf-8",
		success: function (res) {
			swal.fire("일정 변경되었습니다.");
		}
	})
}

// 일정 클릭시 수정 및 삭제
function updateForm(schdlNo, memschNo) {
	let data = {
		schdlNo: schdlNo
	};

	$.ajax({
		url: "/synerhub/calendar/updateForm",
		type: "post",
		beforeSend: function (xhr) {				// 데이터 전송 전 헤더에 csrf값 설정
			xhr.setRequestHeader(header, token);
		},
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
		success: function (res) {
			// 시작과 끝나는 날짜가 다르면 어차피 allday는 true라 종이 버튼 체크 유무 중요하지않음
			// 시작과 끝나는 날짜가 같고 allday가 true일때는 종일 버튼 클릭
			// 아닐시는 미클릭하여 일정 수정 모달창 출력
			if (res.std == res.end) {
				if (res.allDay == true) {
					$(document).find("#allday").prop('checked', true);
				}
			}

			// 조직일정이면 색깔칸 보여주고 아니면 히든
			if (res.schdlCd == 2) {
				$(document).find("#colorchk").css("display", "none");
			} else {
				$(document).find("#colorchk").css("display", "block");
			}
			$(document).find("#startDate").val(res.std);						// 시작 날짜 입력
			$(document).find("#startTime").val(res.stt);						// 시작 시간 입력
			$(document).find("#endDate").val(res.end);							// 끝나는 날짜 입력
			$(document).find("#endTime").val(res.endt);							// 끝나는 시간 입력
			$(document).find("#gubun").val(res.schdlCd);						// 구분 코드에 맞게 출력
			$(document).find("#schedule").val(res.schdlTtl);					// 일정 제목 출력
			$(document).find("#colorchk").val(res.color);						// 색깔 출력
			$(document).find("#scheduleContent").val(res.schdlConts);			// 일정 내용 출력
			$(document).find("#calmodal").css("display", "block");				// 모달 출력

			if (res.schdlCd == "SCHST001") {
				$(document).find("#threadNm").html("");
				$(document).find("#colorSpace").css("display", "block");
				$(document).find("#colorchk").css("display", "block");
				$(document).find("#gubun").attr("disabled", true);
				$(document).find("#gubun").attr("class", "form-control");
			}
			else if (res.schdlCd == "SCHST002") {
				$(document).find("#threadNm").html(`
					<label for="colorchk" class="form-label col-sm-3 col-form-label">스레드</label>
					<input type="text" class="form-control" style="color: ${res.color}; font-weight: bold" value="${res.thTtl}" disabled/>`);
				$(document).find("#colorSpace").css("display", "none");
				$(document).find("#colorchk").css("display", "none");
				$(document).find("#gubun").attr("disabled", true);
				$(document).find("#gubun").attr("class", "form-control");
			} else {
				$(document).find("#threadNm").html(`
						<label for="colorchk" class="form-label col-sm-3 col-form-label">채널</label>
						<input type="text" class="form-control" value="${res.chTtl}" style="color: #542ab7; font-weight: bold" disabled />`);
				$(document).find("#colorSpace").css("display", "none");
				$(document).find("#colorchk").css("display", "none");
				$(document).find("#gubun").attr("class", "form-control");
			}
			$("#calBtnSpace").html(`
				<button type="button" class="btn btn-success me-2" data-bs-dismiss="modal" onclick="calUpBtn(${res.schdlNo})"> 수정 </button>
				<button type="button" class="btn bg-warning-subtle text-warning" onclick='$(document).find("#calmodal").css("display", "none")'> 취소 </button>`);
			$("#deleteBtnPlace").html(`<i class="ti ti-trash fs-7 me-1" style="cursor: pointer" onclick="calDelBtn(${res.schdlNo})"></i>`);
			if (memschNo != MEM_NO && memschNo != null) {
				console.log(res.allDay);
				$("#calmodal").find(".form-control").attr("disabled", true);
				// $(document).find("#allday").attr('disabled', true);

				if (res.allDay) {
					$(document).find("#alldayPlace").html('<i class="ti ti-clock fs-6"></i><label class="form-check-label ms-2 me-2" for="allday">하루 종일</label><i class="ti ti-check text-success fs-7"></i>');
				} else {
					$(document).find("#alldayPlace").html('<i class="ti ti-clock fs-6"></i><label class="form-check-label ms-2 me-2" for="allday">하루 종일</label><i class="ti ti-x text-danger fs-7"></i>');
				}

				$("#calBtnSpace").html(`<button type="button" class="btn btn-warning" onclick='$(document).find("#calmodal").css("display", "none")'> 확인 </button>`);
				$("#deleteBtnPlace").css("display", "none");
			} else {
				$("#deleteBtnPlace").css("display", "block");
				$("#calmodal").find(".form-control").attr("disabled", false);
				$(document).find("#allday").attr('disabled', false);
				if (res.allDay) {
					$(document).find("#alldayPlace").html('<i class="ti ti-clock fs-6"></i><label class="form-check-label ms-2 me-2" for="allday">하루 종일</label><input class="form-check-input" type="checkbox" id="allday" checked />');
				} else {
					$(document).find("#alldayPlace").html('<i class="ti ti-clock fs-6"></i><label class="form-check-label ms-2 me-2" for="allday">하루 종일</label><input class="form-check-input" type="checkbox" id="allday" />');
				}
			}

			let memChk = {
				chNo: synerhubch,
				thNo: synerhubth,
				memNo: MEM_NO
			}
			$.ajax({
				url: "/synerhub/equipment/getChUser",
				type: "post",
				beforeSend: function (xhr) {
					xhr.setRequestHeader(header, token)
				},
				data: JSON.stringify(memChk),
				contentType: "application/json; charset=utf-8",
				success: function (result) {
					if (result.chPrp == "C") {
						$("#calmodal").find(".form-control").attr("disabled", false);
						$(document).find("#color").attr('disabled', true);
						$(document).find("#gubun").attr('disabled', true);
						$("#calBtnSpace").html(`
							<button type="button" class="btn btn-success me-2" data-bs-dismiss="modal" onclick="calUpBtn(${res.schdlNo})"> 수정 </button>
							<button type="button" class="btn bg-warning-subtle text-warning" onclick='$(document).find("#calmodal").css("display", "none")'> 취소 </button>`);
						$("#deleteBtnPlace").css("display", "block");
					}
				}
			});
		}
	})
}
