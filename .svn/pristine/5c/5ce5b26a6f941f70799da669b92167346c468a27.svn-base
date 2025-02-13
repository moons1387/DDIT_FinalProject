var isMemberSelected = false;
var selectedMemberId = null; // 선택된 사용자의 ID 저장
$(document).on('click', '#declaration', function () {
   isMemberSelected = false;
   selectedMemberId = null;
   let html = `
      <div class="modal fade declaration-modal" id="reportModal" tabindex="-1" aria-labelledby="reportModalLabel" aria-hidden="true">
         <div class="modal-dialog" style="width: 45%;">
               <div class="modal-content">
                     <div class="modal-header">
                           <h1 class="card-title mt-3 mb-0" style="color: black; font-size: 1.5rem; flex-grow: 1; text-align: center;">신고 접수</h1>
                           <button type="button" class="btn-close" id="closeButton" data-bs-dismiss="modal" aria-label="Close"></button>
                     </div>
                     <div class="modal-body" id="memberSearchBox">
                           <div class="mb-4 row align-items-center"> 
                                 <h5 class="fs-4 fw-semibold mb-3">사용자 검색</h5>
                                 <div class="input-group">
                                       <input type="text" class="form-control" id="searchForm" />
                                       <button class="btn bg-primary-subtle text-primary" id="searchButton" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
                                             <i class="ti ti-search fs-6"></i>
                                       </button>
                                 </div>
                           </div>
                           <!-- 사용자 목록 출력 -->
                           <div class="mb-1 row align-items-center" style="max-height: 300px; overflow-y: auto;">
                              <table class="table align-middle text-nowrap" id="memList">
                                 <thead class="text-dark fs-4">
                                    <tr>
                                       <th class="text-center" colspan="2">검색된 사용자</th>
                                    </tr>
                                 </thead>
                                 <tbody id="delmemSearchBody">
                                    <tr>
                                       <td class="text-center" colspan="2">신고할 대상을 검색해주세요</td>
                                    </tr>
                                 </tbody>
                              </table>
                           </div>
                           <div class="card-body mt-4">
                                 <h5 class="fs-4 fw-semibold mt-3 mb-3">신고 사유</h5>
                                 <div class="mb-4 row align-items-center">
                                       <div class="col-sm-12">
                                             <select class="form-select" id="reportReasonSelect">
                                                   <option selected="">선택</option>
                                                   <option value="1">스팸 및 홍보</option>
                                                   <option value="2">욕설 및 부적절한 언어</option>
                                                   <option value="3">음란물</option>
                                                   <option value="4">허위 정보</option>
                                                   <option value="5">불법 정보</option>
                                                   <option value="6">기타</option>
                                             </select>   
                                       </div>
                                 </div>
                                 <div class="mb-3 row align-items-center" id="etc" style="display: none;">
                                       <div class="col-sm-12">
                                             <textarea class="form-control p-7" id="reportReason" cols="20" rows="3"></textarea>
                                       </div>
                                 </div>
                           </div>
                           <form action="/declaration/register" method="post" class="mt-3" enctype="multipart/form-data">
                                 <input class="form-control" type="file" id="dclrFormFile">
                                 <div id="uploadedList"></div>
                           </form>
                           <div class="row mt-3">
                                 <div class="d-flex mb-3 align-items-center gap-6" style="justify-content: center;">
                                       <button class="btn btn-primary" id="submitReport">신고</button>    
                                       <button class="btn bg-danger-subtle text-danger" id="backButton" data-bs-dismiss="modal">취소</button>
                                 </div>
                           </div>
                     </div>
               </div>
         </div>
      </div>`;

   $("#modalArea").html(html);
   $("#modalArea").find("#reportModal").modal("show");

   // enter키 이벤트
   $(document).on('keydown', '.declaration-modal .form-control', function (event) {
      var searchQuery = $('#searchForm').val();
      if (event.keyCode == 13) {
         if (!searchQuery) {
            Swal.fire({
               icon: 'warning',
               title: '입력 오류',
               text: '이름을 입력하세요.',
               confirmButtonText: '확인'
            });
         } else {
            $('#searchButton').click();
         }
         event.preventDefault(); // Enter 키로 인한 폼 제출 방지
      }
   });
});

// 사용자 검색 이벤트
$(document).on('click', '#searchButton', function () {
   var searchQuery = $('#searchForm').val().trim();

   // console.log('searchQuery : ', searchQuery);

   if (!searchQuery) {
      Swal.fire({
         icon: 'warning',
         title: '입력 오류',
         text: '이름을 입력하세요.',
         confirmButtonText: '확인'
      });
      return;
   }

   var data = {
      memNo: MEM_NO,
      memName: searchQuery
   };

   $.ajax({
      url: '/synerhub/declaration/memberSearch',
      type: 'post',
      beforeSend: function (xhr) {
         xhr.setRequestHeader(header, token);
      },
      contentType: "application/json; charset=utf-8",
      data: JSON.stringify(data),
      success: function (memberList) {
         var memberRows = '';

         if (memberList.length == 0) {
            memberRows = `<tr>
                              <td class="text-center" colspan="2">존재하지 않는 사용자입니다</td>
                           </tr>`;
         } else {
            memberList.forEach(function (member) {
               memberRows += `
                              <tr id="clickMember">
                                 <td class="text-center" style="width:100px; height: 100px;"><img id="dclMemImg" no="${member.memNo}" src="/synerhub${member.memPrflimg}" style="width: 100%; height: 100%; object-fit: cover;"></td>
                                 <td  class="text-center" style="width: 100% - 100px"> 이름 : <span id="dclMemName">${member.memName}</span><br> 아이디 : <span id="dclMemId">${member.memId}</span></td>
                              </tr>`;
            });
         }
         $('#delmemSearchBody').empty();
         $('#delmemSearchBody').html(memberRows);
      },
   });
});

// 신고대상 클릭 이벤트
$(document).on('click', '#clickMember', function () {
   if (isMemberSelected) return; // 이미 선택된 경우 이벤트 종료

   selectedMemberId = $(this).find('#dclMemId').text();
   const selectedMemberName = $(this).find('#dclMemName').text(); // 클릭한 이름 텍스트 추출
   const memberPfImg = $(this).find('#dclMemImg').attr('src'); // 해당 이미지 URL 추출
   const memberNo = $(this).find('#dclMemImg').attr('no'); // 해당 memNo 추출

   Swal.fire({
      title: selectedMemberName,
      text: "신고 대상자가 맞습니까?",
      imageUrl: memberPfImg,
      imageAlt: selectedMemberName + "의 프로필 이미지",
      showCancelButton: true,
      confirmButtonText: '네',
      cancelButtonText: '아니요'
   }).then((result) => {
      if (result.isConfirmed) {
         isMemberSelected = true; // 선택 상태 변경

         // 선택된 사용자만 표시 (추가된 부분)
         $('#delmemSearchBody').html(`
				<tr id="clickMember">
               <td class="text-center" style="width:100px; height: 100px;"><img id="dclMemImg" no="${memberNo}" src="${memberPfImg}" style="width: 100%; height: 100%; object-fit: cover;"></td>
               <td  class="text-center" style="width: 100% - 100px"> 이름 : <span id="dclMemName">${selectedMemberName}</span><br> 아이디 : <span id="dclMemId">${selectedMemberId}</span></td>
            </tr>`);

         // 선택된 회원의 이름으로 검색
         // $('#searchForm').val(selectedMember); // 검색 입력 필드에 이름 설정
         // $('#searchButton').click(); // 검색 버튼 클릭

         // 검색창 비활성화
         // $('#searchForm').prop('disabled', true); // 검색 입력 필드 비활성화
         // $('#searchButton').prop('disabled', true); // 검색 버튼 비활성화
      }
   });
});

// #clickMember에 마우스 올렸을 때 
$(document).on('mouseover', '#clickMember', function () {
   $(this).css({
      'box-shadow': '0 4px 15px rgba(0, 0, 0, 0.2)',
      'cursor': 'pointer'
   });
});

// #clickMember에 마우스 뗏을 때
$(document).on('mouseout', '#clickMember', function () {
   $(this).css('box-shadow', '');
});

// 신고 버튼 클릭 이벤트
$(document).on('click', '#submitReport', function () {
   // 선택된 회원 확인

   // console.log($('#clickMember td').attr('id'));
   if (!isMemberSelected) {
      Swal.fire({
         icon: 'warning',
         title: '입력 오류',
         text: '신고 대상을 선택하세요.',
         confirmButtonText: '확인'
      });
      return;
   }

   // 신고 사유 확인
   var reportReason = $('#reportReasonSelect').val();
   if (reportReason == "선택" || reportReason == "") {
      Swal.fire({
         icon: 'warning',
         title: '입력 오류',
         text: '신고 사유를 선택하세요.',
         confirmButtonText: '확인'
      });
      return;
   }

   // "기타" 선택 시 내용 입력 확인
   if (reportReason == "6") {
      var reportReasonText = $('#reportReason').val().trim();
      if (!reportReasonText) {
         Swal.fire({
            icon: 'warning',
            title: '입력 오류',
            text: '신고 사유를 입력하세요.',
            confirmButtonText: '확인'
         });
         return;
      }
   }

   // 데이터 준비
   let formData = new FormData();
   formData.append("dclrId", MEM_NO); // 신고 접수자
   formData.append("dclrSubId", $(document).find('#dclMemImg').attr("no")); // 신고 대상자 ID 추가
   formData.append("dclrSort", $("#reportReasonSelect").val());   // 신고 카테고리
   formData.append("dclrCn", $("#reportReason").val());   // 신고 내용

   // 파일 첨부
   let inputFile = $("#dclrFormFile")[0];
   if (inputFile.files.length > 0) {
      for (let i = 0; i < inputFile.files.length; i++) {
         formData.append("dclrFileList", inputFile.files[i]);
      }
   }

   $.ajax({
      url: '/synerhub/declaration/insert',
      type: 'post',
      processData: false, // jQuery가 데이터를 처리하지 않도록 설정
      contentType: false, // jQuery가 contentType을 설정하지 않도록 설정
      beforeSend: function (xhr) {
         xhr.setRequestHeader(header, token);
      },
      data: formData,
      success: function (res) {
         // console.log("응답 데이터:", res); // 서버 응답을 콘솔에 출력
         // alert("게시글이 등록되었습니다.");
         // $("#reportModal").trigger('click');

         Swal.fire({
            title: '신고가 완료되었습니다!',
            icon: 'success',
            confirmButtonText: '확인'
         }).then((result) => {
            if (result.isConfirmed) {
               const modal = $('#reportModal');
               if (modal.length) {
                  modal.modal('hide');
               }
            }
         });
      },
   })
});

// 이미지 변경 썸네일(이미지 저장x)
$(document).on("change", "#dclrFormFile", function () {
   let input = $(this);
   if (input[0].files && input[0].files[0]) {
      var reader = new FileReader();
      let html = "";

      reader.onload = function (e) {
         html = `
            <div class="me-1" style="position: relative; display: inline-block;">
                <a href="${e.target.result}" target="_blank"> 
                    <img src="${e.target.result}" style="width: 100px; height: 100px" />
                </a>
                <span style="position: absolute; top: 0; right: 0; background: white; cursor: pointer;">X</span>
            </div>
            `;
         $("#uploadedList").append(html);
      };
      reader.readAsDataURL(input[0].files[0]);
   } else {
      document.getElementById('uploadedList').src = "";
   }
});

// 이미지 제거
$(document).on('click', 'span', function () {
   $(this).parent("div").remove();
});

// 썸네일 이미지 클릭 이벤트 추가
$(document).on('click', '#imgThumbnail', function (event) {
   event.preventDefault(); // 기본 링크 클릭 동작 방지
   var imgUrl = $(this).parent('a').attr('href'); // 부모 링크의 href 속성 가져오기
   window.open(imgUrl, '_blank'); // 새 창에서 이미지 열기
});

// 임시 파일로 썸네일 이미지 만들기
function getThumbnailName(fileName) {
   var front = fileName.substr(0, 12);
   var end = fileName.substr(12);

   // console.log("front : " + front);
   // console.log("end : " + end);

   return front + "s_" + end;
}

// 원본파일명 가져오기
function getOriginalName(fileName) {
   if (checkImageType(fileName)) {
      return;
   }
   var idx = fileName.indexOf("_") + 1;

   return fileName.substr(idx);
}

// 이미지 타입 체크
function checkImageType(fileName) {
   var pattern = /jpg|gif|png|jepg/i;
   return fileName.match(pattern);
}

// 기타 선택시 사유 입력칸 활성화
$(document).on('click', '#reportReasonSelect', function () {
   $('#reportReasonSelect').change(function () {
      if ($(this).val() == '6') {
         $('#etc').show();
      } else {
         $('#etc').hide();
      }
   });
});


