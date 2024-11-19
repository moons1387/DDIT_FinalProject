<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
   <%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
      <%@ page session="false" %>
         <c:set value="${pageContext.request.contextPath }" var="contextPath" />
         <div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
               <h4 class="fs-6 mb-0">관리자</h4>
               <nav aria-label="breadcrumb">
                  <ol class="breadcrumb mb-0">
                     <li class="breadcrumb-item">신고 접수 관리</li>
                     <li class="breadcrumb-item" aria-current="page">블랙리스트 현황</li>
                  </ol>
               </nav>
            </div>
         </div>

         <div class="card">
            <div class="card-body">
               <div class="d-md-flex justify-content-between mb-9">
                  <div class="mb-9 mb-md-0">
                     <div style="display: flex;">
                        <h3>블랙리스트 관리</h3>
                     </div>
                  </div>
               </div>

               <div class="d-flex justify-content-between mb-4">
               </div>

               <c:set value="${blackList}" var="blackList" />
               <c:set var="pageSize" value="10" />
               <!-- 페이지 당 게시글 수 설정 -->
               <c:set var="currentPage" value="${param.currentPage != null ? param.currentPage : 1}" />
               <!-- 현재 페이지 가져오기 -->
               <!-- 시작 인덱스 계산 부분 수정 -->
               <c:set var="startIndex" value="${(currentPage - 1) * pageSize + 1}" />
               <!-- 시작 인덱스 계산 -->
               <div class="d-flex justify-content-between">
                  <button type="button" class="btn btn-primary mb-3" id="dclrList">신고접수 관리</button>
                  <div class="mt-3">
                     총 블랙리스트 : <strong id="blackCount">${pagingVO.totalRecord }명</strong>
                  </div>
                  <div class="d-inline-flex">
                     <form class="input-group input-group-sm" id="searchForm" style="width: 340px;"
                        action="${contextPath}/admin/blackListManage" method="get">
                        <div class="mb-3 me-2">
                           <input type="hidden" name="currentPage" id="currentPage" value="${currentPage }">
                           <select class="form-select" id="blackSearch" name="searchType" style="height: 41.6px;">
                              <option value="writer" <c:if test="${searchType eq 'title'}">selected</c:if>>이름</option>
                           </select>
                        </div>
                        <div class="input-group mb-3" style="width: 70%;">
                           <input type="text" name="searchWord" value="${searchWord}" class="form-control"
                              placeholder="" aria-label="" aria-describedby="basic-addon1">
                           <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button"
                              style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
                              <i class="ti ti-search fs-6"></i>
                           </button>
                        </div>
                     </form>
                  </div>
               </div>

               <div class="table-responsive pb-4">
                  <table class="table table-bordered border table-striped align-middle">
                     <thead>
                        <tr>
                           <th scope="col" class="text-center">신고 대상자</th>
                           <th scope="col" class="text-center">신고 처리건수</th>
                           <th scope="col" class="text-center">신고 미처리건수</th>
                           <th scope="col" class="text-center">경고</th>
                           <th scope="col" class="text-center">경고 횟수</th>
                           <th scope="col" class="text-center">블랙 리스트</th>
                           <th scope="col" class="text-center">최근 접수일</th>
                           <th scope="col" class="text-center"></th>
                        </tr>
                     </thead>
                     <c:choose>
                        <c:when test="${empty blackList}">
                           <tr>
                              <td colspan="8" class="text-center">조회하신 게시글이 존재하지 않습니다</td>
                           </tr>
                        </c:when>
                        <c:otherwise>
                           <tbody>
                              <c:forEach var="AdminDeclarationVO" items="${blackList}">
                                 <tr>
                                    <td class="text-center">
                                       <div class="text-center">
                                          <img src="/synerhub${AdminDeclarationVO.dclrSubPrflimg }" width="45"
                                             class="rounded-circle" alt="spike-img" />
                                       </div>
                                       <div>
                                          <h6 class="mb-1">${AdminDeclarationVO.dclrSubName}</h6>
                                       </div>
                                    </td>
                                    <td class="text-center">${AdminDeclarationVO.dclrNmtm}</td>
                                    <td class="text-center">0</td>
                                    <td class="text-center">
                                       <button type="button" class="btn btn-warning" id="warnBtn"
                                          onclick="decreaseWarningCount(${AdminDeclarationVO.dclrSubId}, this, '${AdminDeclarationVO.dclrSubName}')">차감</button>
                                    </td>
                                    <td class="text-center warning-count"
                                       style="${AdminDeclarationVO.dclrWarnNmtm >= 10 ? 'color: red;' : ''}">
                                       ${AdminDeclarationVO.dclrWarnNmtm}</td>
                                    <td class="text-center">
                                       <button type="button" class="btn btn-danger blackBtn" id="cancelBtn"
                                          onclick="blackList('${AdminDeclarationVO.dclrSubNo}','delete', this)">해제</button>
                                    </td>
                                    <td class="text-center">${AdminDeclarationVO.dclrRcptYmd}</td>
                                    <td class="text-center">
                                       <a href="${contextPath}/admin/dclrDetail?dclrNo=${AdminDeclarationVO.dclrNo}"
                                          class="link-primary" data-bs-toggle="tooltip" data-bs-placement="top"
                                          title="View Details">
                                          <i class="ti ti-eye fs-7"></i>
                                       </a>
                                    </td>
                                 </tr>
                              </c:forEach>
                           </tbody>
                        </c:otherwise>
                     </c:choose>
                  </table>
               </div>
               <div class="text-center" id="pagingArea">
                  ${pagingVO.pagingHTML }
               </div>
            </div>
         </div>
         <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
         <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
         <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.all.min.js"></script>
         <script type="text/javascript">
            function blackList(memNo, type, button) {
               // 블랙리스트 해제 및 설정 버튼 클릭 시 확인 메시지 추가
               if (type == 'delete') {
                  Swal.fire({
                     title: '블랙리스트 해제',
                     text: '정말로 블랙리스트에서 해제하시겠습니까?',
                     icon: 'warning',
                     showCancelButton: true,
                     confirmButtonText: '예',
                     cancelButtonText: '아니요'
                  }).then((result) => {
                     if (result.isConfirmed) {
                        // '예'를 클릭했을 경우 AJAX 요청
                        let data = {
                           dclrSubNo: memNo,
                           blackType: type
                        };
                        $.ajax({
                           url: "/synerhub/admin/blackList",
                           type: "post",
                           beforeSend: function (xhr) {
                              xhr.setRequestHeader(header, token);
                           },
                           data: JSON.stringify(data),
                           contentType: "application/json; charset=utf-8",
                           success: function () {
                              // 해당 행 제거
                              $(button).closest('tr').remove();
                              Swal.fire('해제되었습니다!', '', 'success');
                           },
                           error: function () {
                              Swal.fire('해제에 실패했습니다.', '', 'error');
                           }
                        });
                     }
                  });
               } else {
                  Swal.fire({
                     title: '블랙리스트 설정',
                     text: '정말로 블랙리스트에 추가하시겠습니까?',
                     icon: 'warning',
                     showCancelButton: true,
                     confirmButtonText: '예',
                     cancelButtonText: '아니요'
                  }).then((result) => {
                     if (result.isConfirmed) {
                        // '예'를 클릭했을 경우 AJAX 요청
                        let data = {
                           dclrSubNo: memNo,
                           blackType: type
                        };
                        $.ajax({
                           url: "/synerhub/admin/blackList",
                           type: "post",
                           beforeSend: function (xhr) {
                              xhr.setRequestHeader(header, token);
                           },
                           data: JSON.stringify(data),
                           contentType: "application/json; charset=utf-8",
                           success: function () {
                              // 버튼 상태 변경
                              $(button).closest('tr').find('.blackBtn').attr("class", "btn btn-danger blackBtn");
                              $(button).closest('tr').find('.blackBtn').attr("onclick", "blackList('" + memNo + "','delete',this)");
                              $(button).closest('tr').find('.blackBtn').text("해제");
                              Swal.fire('설정되었습니다!', '', 'success');
                           },
                           error: function () {
                              Swal.fire('설정에 실패했습니다.', '', 'error');
                           }
                        });
                     }
                  });
               }
            }

            // 경고 차감 이벤트
            function decreaseWarningCount(dclrSubId, button, userName) {
               Swal.fire({
                  title: '경고 차감',
                  text: userName + '에게 경고를 차감하시겠습니까?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: '예',
                  cancelButtonText: '아니요'
               }).then((result) => {
                  if (result.isConfirmed) {
                     // '예'를 클릭했을 경우
                     $.ajax({
                        url: "/synerhub/admin/decreaseWarningCount/" + dclrSubId,
                        type: "post",
                        contentType: "application/json; charset=utf-8",
                        beforeSend: function (xhr) {
                           xhr.setRequestHeader(header, token);
                        },
                        success: function () {
                           // 현재 경고 횟수를 가져온 후 1 감소
                           const warningCell = $(button).closest('tr').find('.warning-count');
                           const currentCount = parseInt(warningCell.text(), 10); // 현재 경고 횟수 가져오기
                           const newCount = currentCount - 1; // 경고 횟수 1 감소

                           // 새로운 경고 횟수를 UI에 업데이트
                           warningCell.text(newCount);

                           // 경고 횟수가 10 이상일 경우 빨간색으로 변경
                           if (newCount >= 10) {
                              warningCell.css('color', 'red'); // 텍스트 색상 변경
                           } else {
                              warningCell.css('color', ''); // 기본 색상으로 복원
                           }
                           Swal.fire('경고가 차감되었습니다!', '', 'success');
                        },
                        error: function () {
                           Swal.fire('경고 차감에 실패했습니다.', '', 'error');
                        }
                     });
                  }
               });
            }

            $(document).on('click', "#dclrList", function () {
               location.href = "/synerhub/admin/dclrList";
            });

            $(function () {
               var searchForm = $("#searchForm");       // 검색 및 페이징 처리 위한 Form
               var pagingArea = $("#pagingArea");       // 페이징 처리 위한 div

               pagingArea.on("click", "a", function (event) {
                  event.preventDefault();
                  $(this).data("page");
                  var currentPage = $(this).data("page");
                  searchForm.find("#currentPage").val(currentPage);
                  searchForm.submit();
               });
            }); 
         </script>