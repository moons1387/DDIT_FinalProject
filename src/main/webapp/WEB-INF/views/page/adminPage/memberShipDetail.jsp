<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.css">
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11.4.10/dist/sweetalert2.min.js"></script>

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
								<li class="breadcrumb-item" aria-current="page">멤버십 관리</li>
							</ol>
						</nav>
					</div>
				</div>
				
				
				<!-- 고객센터 관리 모달창 -->
								<div class="modal fade" id="vertical-center-modal" tabindex="-1" aria-labelledby="vertical-center-modal" aria-hidden="true">
			                      <div class="modal-dialog modal-lg modal-dialog-centered">
			                        <div class="modal-content text-center"> <!-- text-center 클래스 추가 -->
			                          <div class="modal-header text-center d-flex align-items-center justify-content-center"> <!-- justify-content-center 추가 -->
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
			                                      <div class="card bg-danger-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;"> <!-- margin: auto 추가 -->
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
			                                      <div class="card bg-success-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;"> <!-- margin: auto 추가 -->
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
			                                      <div class="card bg-primary-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;"> <!-- margin: auto 추가 -->
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
			                          <div class="modal-footer justify-content-center"> <!-- justify-content-center 추가 -->
			                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
			                              Close
			                            </button>
			                          </div>
			                        </div>
			                      </div>
			                    </div>
			                    <!-- 고객센터 관리 모달창 끝 -->
				

				<div class="card">
					<div class="card-body">
						<div class="pb-2 d-md-flex align-items-center">
							<h3>멤버십 관리</h3>
							<div class="btn-group mb-2 ms-auto" role="group" aria-label="Basic example">
								<div class="btn-group" role="group"> 
									<button id="btnGroupDrop1" type="button" class="btn bg-primary-subtle text-primary dropdown-toggle rounded-end" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">추가</button>
									<div class="dropdown-menu" aria-labelledby="btnGroupDrop1" onclick="dropDownBtn()">
										<a class="dropdown-item" id="addInputBtn" href="javascript:void(0)">상세 설명 추가</a> <a class="dropdown-item" id="addCheckboxBtn" href="javascript:void(0)">체크 박스</a>
									</div>
								</div>
								<button type="button" id="ModifyBtn" class="btn bg-success-subtle text-success" onclick="memShipModify()">수정</button>
								<button type="button" id="cancelBtn" class="btn bg-danger-subtle text-danger" onclick="memShipDel()" disabled>삭제</button>
							</div>
						</div>
						<div class="table-responsive pb-4" data-simplebar>
							<table id="all-student" class="table table-striped text-nowrap align-middle table-bordered border">
								<thead>
									<tr>
										<th class="text-center" style="width: 40px;"><input type="checkbox" class="form-check-input primary" id="contact-check-all" /></th>
										<th class="text-center" style="width: 100px;"></th>
										<c:forEach var="res" items="${planDetail }">
											<th class="text-center" style="width: 300px;">${res.planNm }</th>
										</c:forEach>
									</tr>
								</thead>
								<tbody class="border-top">
									<tr>
										<td class="text-center" style="width: 40px;"></td>
										<td class="text-center" style="height: 240px;">
											<div class="d-flex align-items-center justify-content-center">
												<div>
													<h6 class="mb-1">등급</h6>
												</div>
											</div>
										</td>
										<c:forEach var="res" items="${planDetail }">
											<td class="text-center" style="width: 300px;"><img src="${contextPath}${res.url}" alt="spike-img" class="img-fluid" width="200" height="200"></td>
										</c:forEach>
									</tr>

									<tr id="planTr" class="table-primary">
										<td class="text-center" style="width: 40px;"><input type="checkbox" class="form-check-input primary" id="PriceChange" /></td>
										<td>
											<div class="d-flex align-items-center justify-content-center">
												<div>
													<h6 class="mb-1">가격</h6>
												</div>
											</div>
										</td>
										<c:forEach var="res" items="${planDetail }">
											<td class="text-center" rowspan="1" style="width: 300px;" id="${res.planNm }Prc">
												<p class="fs-3 mb-0">
													<input type="hidden" id="hidden" value="${res.planPrc }" /> <strong>${res.planWPrc }</strong>
												</p>
											</td>
										</c:forEach>
									</tr>

									<tr class="table-primary">
										<td class="text-center" style="width: 40px;"><input type="checkbox" class="form-check-input primary" id="SizeChange" /></td>
										<td>
											<div class="d-flex align-items-center justify-content-center">
												<div>
													<h6 class="mb-1" id="PlanCateInput">용량</h6>
												</div>
											</div>
										</td>
										<c:forEach var="res" items="${planDetail }">
											<td class="text-center" rowspan="1" style="width: 300px;" id="${res.planNm }Size"><c:if test="${res.planTotSz >= 1099511627776 }">
													<c:set var="price" value="${res.planTotSz / 1099511627776}" />
													<strong>${price }TB</strong>
												</c:if> <c:if test="${res.planTotSz < 1099511627776 }">
													<c:set var="price" value="${res.planTotSz * 1000 / 1099511627776}" />
													<strong>${price }GB</strong>
												</c:if></td>
										</c:forEach>
									</tr>

									<tr id="memNoTr" class="table-primary">
										<td class="text-center" style="width: 40px;"><input type="checkbox" class="form-check-input primary" id="MemNoChange" /></td>
										<td>
											<div class="d-flex align-items-center justify-content-center">
												<div>
													<h6 class="mb-1" id="PlanCateInput">멤버수</h6>
												</div>
											</div>
										</td>
										<c:forEach var="res" items="${planDetail }">
											<td class="text-center" rowspan="1" style="width: 300px;" id="${res.planNm }memNo"><strong>${res.planMaxMem }명</strong></td>
										</c:forEach>
									</tr>

									<c:forEach var="cateNm" items="${planCateNm }" varStatus="i">
										<tr data-memberShip-no="${i.index }" id="MemberShipContents_${i.index }">
											<td class="text-center" style="width: 40px;"><input type="checkbox" class="form-check-input primary" id="contact-check" /></td>
											<td>
												<div class="d-flex align-items-center justify-content-center">
													<div>
														<h6 class="mb-1">${cateNm.planCateNm }</h6>
													</div>
												</div>
											</td>
											<c:forEach var="res" items="${planExpList }">
												<c:if test="${cateNm.planCateNm eq res.planCateNm }">
													<c:if test="${res.planIntr == null }">
														<c:if test="${res.planUse eq 'false' }">
															<td class="text-center" rowspan="1" style="width: 300px;" id="MemberShipChkBox"><span> <i class="ti ti-x text-danger fs-7"></i>
															</span> <input type="hidden" value="${res.planIntrNo }" id="hidden" /></td>
														</c:if>
														<c:if test="${res.planUse eq 'true' }">
															<td class="text-center" rowspan="1" style="width: 300px;" id="MemberShipChkBoxChecked"><span> <i class="ti ti-check text-success fs-7"></i>
															</span> <input type="hidden" value="${res.planIntrNo }" id="hidden" /></td>
														</c:if>
													</c:if>
													<c:if test="${res.planIntr != null }">
														<td class="text-center" rowspan="1" style="width: 300px;">
															<p class="fs-3 mb-0">
																<input type="hidden" value="${res.planIntrNo }" id="hidden" />
																<c:if test="${res.planIntr eq '∞명'}">
																	<strong id="MemberShipInputText" style="font-size: 15px">${res.planIntr }</strong>
																</c:if>
																<c:if test="${res.planIntr ne '∞명'}">
																	<strong id="MemberShipInputText">${res.planIntr }</strong>
																</c:if>
															</p>
														</td>
													</c:if>
												</c:if>
											</c:forEach>
										</tr>
									</c:forEach>
								</tbody>
							</table>
						</div>
						<div class="mb-3 me-3" style="text-align: right; display: none;" id="AdminMemberShipBtn">
							<button class="justify-content-center btn mb-1 btn-primary me-3" onclick="MemberShipInsert()" id="submitBtn">저장</button>
							<button class="justify-content-center btn me-3 mb-1 bg-danger-subtle text-danger" id="backBtn">취소</button> 
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script>
	function dropDownBtn() {
		$('#AdminMemberShipBtn').css('display', 'block');
		$('#all-student').find('input[id="contact-check"]').attr('disabled', 'true');  
		$('#PriceChange').attr('disabled', 'true');  
		$('#SizeChange').attr('disabled', 'true');  
		$('#MemNoChange').attr('disabled', 'true');  
	}

	$(document).ready(function () {
		// 체크박스 상태에 따라 삭제 버튼 활성화/비활성화
		$("input[type='checkbox']").change(function () {
			const anyChecked = $("input[type='checkbox']:not(#contact-check-all):checked").length > 0;
			$("#cancelBtn").prop("disabled", !anyChecked);
		});

		// 전체 선택 체크박스 기능
		$("#contact-check-all").change(function () {
			const isChecked = $(this).is(":checked");
			$("input[id='contact-check']").prop("checked", isChecked);
			$("#cancelBtn").prop("disabled", !isChecked); // 전체 선택 시 삭제 버튼 활성화
		});

		$("#addInputBtn").click(function () {
			const newRow = `<tr>
          <td class="text-center" style="width: 40px;">
            <input type="checkbox" class="form-check-input primary" id="contact-check" />
          </td>
          <td>
            <div class="d-flex align-items-center justify-content-center">
              <div>
                <input type="text" class="form-control" id="PlanExpCateInput">
              </div>
             </div>
          </td>
          <td class="text-center" style="width: 300px;">
            <input type="text" class="form-control" id="BzInput">
          </td>
          <td class="text-center" style="width: 300px;">
            <input type="text" class="form-control" id="SvInput">
          </td>
          <td class="text-center" style="width: 300px;">
            <input type="text" class="form-control" id="GdInput">
          </td>
        </tr>`;
			$("#all-student tbody").append(newRow);
		});

		$("#addCheckboxBtn").click(function () {
			const newRow = `
        <tr>
          <td class="text-center" style="width: 40px;">
            <input type="checkbox" class="form-check-input primary" id="contact-check" />
          </td>
          <td>
            <div class="d-flex align-items-center justify-content-center">
              <div>
                <input type="text" class="form-control" id="PlanExpCateInput">
              </div>
            </div>
          </td>
          <td class="text-center" style="width: 300px;">
            <input class="form-check-input success" type="checkbox" id="BzCheck">
          </td>
          <td class="text-center" style="width: 300px;">
            <input class="form-check-input success" type="checkbox" id="SvCheck">
          </td>
          <td class="text-center" style="width: 300px;">
            <input class="form-check-input success" type="checkbox" id="GdCheck"> 
          </td>
        </tr>
      `;
			$("#all-student tbody").append(newRow);
		});
		
		$(document).find("#backBtn").click(function () {
			location.href = "/synerhub/admin/membership";
		});
	});
	 
	
function memShipModify() {
		
		if ($("#all-student").find('input[type^="checkbox"]').is(':checked') == null || $("#all-student").find('input[type^="checkbox"]').is(':checked') == false) {
			swal.fire("선택해주세요")
		}
		else if ($("#PriceChange").is(':checked') == true) {
			let BzData = $("#BRONZEPrc").find("strong").html().trim();
			let SvData = $("#SILVERPrc").find("strong").html().trim();
			let GdData = $("#GOLDPrc").find("strong").html().trim();
			
			let BzNo = $("#planTr").find('td:eq(2) #hidden').val();
			let SvNo = $("#planTr").find('td:eq(3) #hidden').val(); 
			let GdNo = $("#planTr").find('td:eq(4) #hidden').val();
			
			$("#BRONZEPrc").html("<input type='text' class='form-control' id='BzInput' value='" + BzNo + "'>");
			$("#SILVERPrc").html("<input type='text' class='form-control' id='SvInput'  value='" + SvNo + "'>");
			$("#GOLDPrc").html("<input type='text' class='form-control' id='GdInput'  value='" + GdNo + "'>");

			$("#AdminMemberShipBtn").css("display", "block");
			$("#AdminMemberShipBtn").html(`
					<button class="justify-content-center btn mb-1 btn-success me-3" onclick="MemberShipInsert('update', 'price')" id="submitBtn">수정</button>
					<button class="justify-content-center btn me-3 mb-1 bg-danger-subtle text-danger" id="backBtn">취소</button>`);
		}
		else if ($("#SizeChange").is(':checked') == true) {
			let BzData = $("#BRONZESize").find("strong").html();
			let SvData = $("#SILVERSize").find("strong").html();
			let GdData = $("#GOLDSize").find("strong").html();
			
			if (BzData.indexOf("G") != "-1") {				// GB 일때
				BzData = BzData.split("G")[0] * 0.001;
			} else if (BzData.indexOf("G") == "-1") {		// TB 일때
				BzData = BzData.split("T")[0];
			}
			
			if (SvData.indexOf("G") != "-1") {
				SvData = SvData.split("G")[0] * 0.001;
			} else if (SvData.indexOf("G") == "-1") {
				SvData = SvData.split("T")[0];
			} 
			
			if (GdData.indexOf("G") != "-1") {
				GdData = GdData.split("G")[0] * 0.001;
			} else if (GdData.indexOf("G") == "-1") {
				GdData = GdData.split("T")[0];
			} 

			$("#BRONZESize").html("<input type='text' class='form-control' id='BzInput' value='" + BzData + "'>");
			$("#SILVERSize").html("<input type='text' class='form-control' id='SvInput'  value='" + SvData + "'>");
			$("#GOLDSize").html("<input type='text' class='form-control' id='GdInput'  value='" + GdData + "'>");

			$("#AdminMemberShipBtn").html(`
											<button class="justify-content-center btn mb-1 btn-success me-3" onclick="MemberShipInsert('update', 'size')" id="submitBtn">수정</button>
											<button class="justify-content-center btn me-3 mb-1 bg-danger-subtle text-danger" id="backBtn">취소</button>`);
			$("#AdminMemberShipBtn").css("display", "block");
		}
		else if($("#MemNoChange").is(':checked') == true) {
			let BzData = $("#BRONZEmemNo").find("strong").html().split("명")[0];
			let SvData = $("#SILVERmemNo").find("strong").html().split("명")[0];
			let GdData = $("#GOLDmemNo").find("strong").html().split("명")[0];
			
			$("#BRONZEmemNo").html("<input type='text' class='form-control' id='BzInput' value='" + BzData + "'>"); 
			$("#SILVERmemNo").html("<input type='text' class='form-control' id='SvInput'  value='" + SvData + "'>"); 
			$("#GOLDmemNo").html("<input type='text' class='form-control' id='GdInput'  value='" + GdData + "'>");

			$("#AdminMemberShipBtn").html(`
											<button class="justify-content-center btn mb-1 btn-success me-3" onclick="MemberShipInsert('update', 'memNo')" id="submitBtn">수정</button>
											<button class="justify-content-center btn me-3 mb-1 bg-danger-subtle text-danger" id="backBtn">취소</button>`);
			$("#AdminMemberShipBtn").css("display", "block");
		}
		else {
			$("#ModifyBtn").attr("disabled", "true");
			const memShipNo = [];
			$("#contact-check:checked").each(function () {
				memShipNo.push($(this).closest('tr').data('membershipNo'));
			});

			let BzData = $("#all-student").find('tr:eq(' + (memShipNo[0] + 5) + ') td:eq(2) #MemberShipInputText').html();
			let SvData = $("#all-student").find('tr:eq(' + (memShipNo[0] + 5) + ') td:eq(3) #MemberShipInputText').html();
			let GdData = $("#all-student").find('tr:eq(' + (memShipNo[0] + 5) + ') td:eq(4) #MemberShipInputText').html();
			let BzNo = $("#all-student").find('tr:eq(' + (memShipNo[0] + 5) + ') td:eq(2) #hidden').val();
			let SvNo = $("#all-student").find('tr:eq(' + (memShipNo[0] + 5) + ') td:eq(3) #hidden').val();
			let GdNo = $("#all-student").find('tr:eq(' + (memShipNo[0] + 5) + ') td:eq(4) #hidden').val();
			

			$("#MemberShipContents_" + memShipNo[0]).find('td:eq(2)').html('<input type="hidden" id="hidden" value="' + BzNo + '">');
			$("#MemberShipContents_" + memShipNo[0]).find('td:eq(3)').html('<input type="hidden" id="hidden" value="' + SvNo + '">');
			$("#MemberShipContents_" + memShipNo[0]).find('td:eq(4)').html('<input type="hidden" id="hidden" value="' + GdNo + '">'); 
			$("#MemberShipContents_" + memShipNo[0]).find("td[id='MemberShipChkBox']").append('<input class="form-check-input success" type="checkbox" id="MemberShipChkBox">');
			$("#MemberShipContents_" + memShipNo[0]).find("td[id='MemberShipChkBoxChecked']").append('<input class="form-check-input success" type="checkbox" id="MemberShipChkBox" checked>');
			$("#all-student").find('tr:eq(' + (memShipNo[0] + 5) + ') td:eq(2) #MemberShipInputText').html('<input class="form-control" type="text" id="BzInput" value="' + BzData + '">');
			$("#all-student").find('tr:eq(' + (memShipNo[0] + 5) + ') td:eq(3) #MemberShipInputText').html('<input class="form-control" type="text" id="SvInput" value="' + SvData + '">');
			$("#all-student").find('tr:eq(' + (memShipNo[0] + 5) + ') td:eq(4) #MemberShipInputText').html('<input class="form-control" type="text" id="GdInput" value="' + GdData + '">');

			$("#AdminMemberShipBtn").css("display", "block"); 
			$("#submitBtn").attr("onclick", "MemberShipInsert('update', " + memShipNo + ")")
			$("#submitBtn").attr("class", "justify-content-center btn mb-1 btn-success me-3");
			$("#submitBtn").html("수정");
		}
		
		$(document).find("#backBtn").click(function () {
			location.href = "/synerhub/admin/membership";
		});
	}

	function MemberShipInsert(type, memShipNo) {
		
		let BzCheck;
		let SvCheck;
		let GdCheck;
		let BzSize = 0;
		let SvSize = 0;
		let GdSize = 0;

		let planCateNm = $("#PlanExpCateInput").val();

		let BzNo = $("#all-student").find('tr:eq(' + (memShipNo + 5) + ') td:eq(2) #hidden').val();
		let SvNo = $("#all-student").find('tr:eq(' + (memShipNo + 5) + ') td:eq(3) #hidden').val();
		let GdNo = $("#all-student").find('tr:eq(' + (memShipNo + 5) + ') td:eq(4) #hidden').val();


		if (type == "update") {
			BzCheck = $("#all-student").find('tr:eq(' + (memShipNo + 5) + ') td:eq(2) #MemberShipChkBox').is(':checked');
			SvCheck = $("#all-student").find('tr:eq(' + (memShipNo + 5) + ') td:eq(3) #MemberShipChkBox').is(':checked');
			GdCheck = $("#all-student").find('tr:eq(' + (memShipNo + 5) + ') td:eq(4) #MemberShipChkBox').is(':checked');
		} else {
			BzCheck = $('#BzCheck').is(':checked');
			SvCheck = $('#SvCheck').is(':checked');
			GdCheck = $('#GdCheck').is(':checked');
		}
		
		
		let BzInput = $("#BzInput").val();
		let SvInput = $("#SvInput").val();
		let GdInput = $("#GdInput").val();
		
		if (memShipNo == "size") {
			planCateNm = "용량";
			BzSize = BzInput;
			SvSize = SvInput;
			GdSize = GdInput;
		}
		
		if (memShipNo == "price") {
			planCateNm = "가격";
		}
		
		if (memShipNo == "memNo") {
			planCateNm = "멤버수";
		}
		

		let data = {
			planCateNm: planCateNm,
			bzInput: BzInput,
			svInput: SvInput,
			gdInput: GdInput,
			bzCheck: BzCheck,
			svCheck: SvCheck,
			gdCheck: GdCheck,
			bzNo: BzNo,
			svNo: SvNo,
			gdNo: GdNo,
			bzSize : BzSize,
			svSize : SvSize,
			gdSize : GdSize
		}
	 
		
		$.ajax({
			url: "/synerhub/admin/planDetailInsert/" + type,
			type: "post",
			beforeSend: function (xhr) {
				xhr.setRequestHeader(header, token);
			},
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
			success: function (result) {
				if (type == "update") {
					swal.fire("수정 완료하였습니다.");
				}else {
					swal.fire("등록 완료하였습니다.");
				}
				setTimeout(function () { location.href = "/synerhub/admin/membership"; }, 1000);
			}
		});
	}

	

	function memShipDel() {
		
		if ($("#PriceChange").is(':checked') == true || $("#SizeChange").is(':checked') == true || $("#MemNoChange").is(':checked') == true){
			swal.fire("기본값은 삭제가 불가능합니다.")
		} else {
		Swal.fire({
			title: '정말로 삭제 하시겠습니까?',
			text: '다시 되돌릴 수 없습니다.',
			icon: 'warning',

			showCancelButton: true, // cancel버튼 보이기. 기본은 원래 없음
			confirmButtonText: '승인', // confirm 버튼 텍스트 지정
			cancelButtonText: '취소', // cancel 버튼 텍스트 지정
		}).then(result => {
			// 만약 Promise리턴을 받으면,
			if (result.isConfirmed) { // 만약 모달창에서 confirm 버튼을 눌렀다면

				Swal.fire('삭제 완료되었습니다.', '감사합니다~!', 'success');
				const memShipNo = [];
				$("#contact-check:checked").each(function () {
					memShipNo.push($(this).closest('tr').data('membershipNo'));
				});

				let BzNo = $("#all-student").find('tr:eq(' + (memShipNo[0] + 5) + ') td:eq(2) #hidden').val();
				let SvNo = $("#all-student").find('tr:eq(' + (memShipNo[0] + 5) + ') td:eq(3) #hidden').val();
				let GdNo = $("#all-student").find('tr:eq(' + (memShipNo[0] + 5) + ') td:eq(4) #hidden').val();


				let delData = {
					bzNo: BzNo,
					svNo: SvNo,
					gdNo: GdNo
				}

				$.ajax({
					url: "/synerhub/admin/planDetailDelete",
					type: "post",
					beforeSend: function (xhr) {
						xhr.setRequestHeader(header, token);
					},
					data: JSON.stringify(delData),
					contentType: "application/json; charset=utf-8",
					success: function (result) {
						setTimeout(function () { location.href = "/synerhub/admin/membership"; }, 1000);
					}
				});
			}
		});}
	}
</script>