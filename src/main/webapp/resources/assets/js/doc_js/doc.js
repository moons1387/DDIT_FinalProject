// 문서관련 버튼 요소 선언
let docMineBtn;
let docInsertBtn;
let docCurrentBtn;
let docApprovalBtn;
let docCancledBtn;
let docReturnedBtn;
let docRejectedBtn;
let myDocMainBtn;
let docCompleteBtn;

// 검색 범위 설정
let flagDocSearch = false;
let flagDocCurSearch = false;
let flagDocApprovalSearch = false;
let flagDocCancledSearch = false;
let flagDocReturnedSearch = false;
let flagDocRejectedSearch = false;

var docNo;
var docFiles = [];
const Editor = toastui.Editor;
var editor;
var viewer;

// 문서 리스트 가져오기 버튼
docMineBtn = document.querySelector('#docMine') == null ? null : document.querySelector('#docMine');
// 문서 등록 버튼
docInsertBtn = document.querySelector('#docInsert') == null ? null : document.querySelector('#docInsert');
// 문서 결재 현황 리스트 가져오기 버튼
docCurrentBtn = document.querySelector('#docCurrent') == null ? null : document.querySelector('#docCurrent');
// 문서 결재함 리스트 가져오기 버튼
docApprovalBtn = document.querySelector('#docApproval') == null ? null : document.querySelector('#docApproval');
// 문서 결재완료함 리스트 가져오기 버튼
docCompleteBtn = document.querySelector('#docComplete') == null ? null : document.querySelector('#docComplete');
// 내 문서 메인 버튼 리스트 가져오기 버튼
myDocMainBtn = document.querySelector('#myDocMainBtn') == null ? null : document.querySelector('#myDocMainBtn');
// 회수 문서 리스트 가져오기 버튼
docReturnedBtn = document.querySelector('#docReturned') == null ? null : document.querySelector('#docReturned');
// 반려 문서 리스트 가져오기 버튼
docRejectedBtn = document.querySelector('#docRejected') == null ? null : document.querySelector('#docRejected');
// 체널 문서 리스트 기져오기 버튼
// docChListBtn = document.querySelector('#docChList') == null ? null : document.querySelector('#docChList');


// 버튼 배열
const buttons = [docMineBtn, docInsertBtn, docCurrentBtn, docApprovalBtn, docReturnedBtn, docRejectedBtn];

// 클릭 이벤트 리스너 추가
buttons.forEach(button => {
  if (button) {
    button.addEventListener('click', () => {
      // 모든 버튼에서 active 클래스 제거
      buttons.forEach(btn => {
        if (btn) {
          btn.classList.remove('active');
        }
      });
      // 클릭한 버튼에 active 클래스 추가
      button.classList.add('active');
    });
  }
});

// docChListBtn.addEventListener('click', async () => {
//   if (synerhubch == null) {
//     swal.fire("채널을 먼저 입장해주세요!");
//   } else {
//     await docChMainPageRender();
//   }
// });

// 문서관련 메인페이지를 렌더링하기 위한 이벤트를 부여
myDocMainBtn.addEventListener('click', async () => {
  // 채널을 입장하지 않았다면 접근 거부
  if (synerhubch == null) {
    swal.fire("채널을 먼저 입장해주세요!");
  } else {
    await docMyMainPageRender();
  }
});

// 반려 문서함버튼 클릭 이벤트를 부여
docRejectedBtn.addEventListener('click', () => {
  docRejectedCallback();
});

// 반려 문서함을 렌더링하기 위한 함수
const docRejectedCallback = () => {
  // 검색범위, 검색어, 문서상태코드 및 페이징처리를 위한 초기값을 설정한다.
  flagDocRejectedSearch = true;
  searchScope = 'documentRejected';
  searchWord = null;
  cur_page = 1;
  max_row = 10;
  stat = 'DCST04';
  listDocumentByStat(cur_page, max_row, null, '반려된 문서');

}

// 문서 등록 버튼에 이벤트를 부여함
docInsertBtn.addEventListener('click', async () => {
  await docInsertRenderCallback();
});

const docInsertRenderCallback = async () => {
  await docInsertFormRender();
}

// docCancledBtn.addEventListener('click', () => {
//   flagDocCancledSearch = true;
//   searchScope = 'documentCancled';
//   searchWord = null;
//   cur_page = 1;
//   max_row = 10;
//   stat = 'DCST03'
//   listDocumentByStat(cur_page, max_row);
// });

docReturnedBtn.addEventListener('click', () => {
  docReturnedCallback();
});
const docReturnedCallback = () => {
  flagDocCancledSearch = true;
  searchScope = 'documentReturned';
  searchWord = null;
  cur_page = 1;
  max_row = 10;
  stat = 'DCST02'
  listDocumentByStat(cur_page, max_row, null, '회수한 문서');
}

docApprovalBtn.addEventListener('click', () => {
  docApprovalCallback();
});
const docApprovalCallback = () => {
  flagDocApprovalSearch = true;
  serachScope = 'documentApproval';
  searchWord = null;
  cur_page = 1;
  max_row = 10;
  stat = 'DCST00';
  listDocumentApproval(cur_page, max_row, null, '결재할 문서');
}

docCurrentBtn.addEventListener('click', () => {
  docCurrentCallback();
});
const docCurrentCallback = () => {
  flagDocCurSearch = true;
  searchScope = 'documentCurrent';
  searchWord = null;
  cur_page = 1;
  max_row = 10;
  stat = 'DCST00';
  listDocumentCurrent(cur_page, max_row, null, '작성한 문서');
}

docMineBtn.addEventListener('click', () => {
  docMineCallback();
});
const docMineCallback = () => {
  console.log('callback');
}


docMineBtn.addEventListener('click', () => {
  docCompleteCallback();
});
const docCompleteCallback = () => {
  flagDocSearch = true;
  searchScope = 'document';
  searchWord = null;
  cur_page = 1;
  max_row = 10;
  stat = 'DCST00';
  listDocumentComplete(cur_page, max_row, null, '결재 완료 문서');
}

docCompleteBtn.addEventListener('click', () => {
  docCompleteCallback()
});

var flagDocInsertAutographSelect = false;

// 문서 등록 양식을 렌더링함
// 문서를 수정하는 경우 파라미터값이 들어옴(문서객체, 문서상태코드)
const docInsertFormRender = async (doc, stat) => {
  // 날짜 연산을 위한 Date객체
  let date = new Date();

  // 문서를 수정하는 경우 결재선번호와 문서번호를 추출함
  let aplnNo = doc == null ? null : doc.aplnList[0].aplnNo;
  docNo = doc == null ? null : doc.docNo;

  let data = {
    chNo: synerhubch,
    thNo: synerhubth,
    memNo: MEM_NO
  }
  // axiosHeaderJson = { headers: { [header]: token, "Content-Type": "application/json" }, }
  // Spring Security를 적용하여 token을 header에 담아 요청을 하여야함
  // token은 mainTemplate에 meta로 선언되어있음
  let res = await axios.post('/synerhub/document/autographerlist', data, axiosHeaderJson)
  let myInfo;
  res.data.forEach(mem => {
    if (mem.memNo == MEM_NO) {
      myInfo = mem;
    }
  });
  // 등록양식 마크업 코드
  formHTML = `      
    <div class="card w-100">
      <div class="card-body d-grid gap-3 text-center">
        <div class="card-body">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <h3>전자문서 기안</h3>
          </div>
        </div>
        <div class="form-floating">
          <div class="form-floating">
  `;
  // doc이 존재한다면 수정을 위해 기존 문서 내용을 입력함
  if (doc) {
    formHTML += `<input type="text" id="docTtl" value="${doc.docTtl}" class="form-control doc-insert">`;
  } else {
    formHTML += `<input type="text" id="docTtl" class="form-control doc-insert">`;
  }
  formHTML += ` 
            <label for="docTtl">제목</label>
          </div>
        </div>
          <div class="row">
            <div class="col-sm-2 justify-content">
              <table id="tableWriter" class="table table-bordered table-light h-100 d-inline-block align-middle text-nowrap mb-0">
                <tr>
                <tr>
                <tr>
                  <th>소속</th>
                  <td>${myInfo.chMemThNm}</td>
                </tr>
                  <th>직급</th>
                  <td>${myInfo.chRoleNm}</td>
                </tr>
                  <th>기안자</th>
                  <td>${myInfo.chMemNm}</td>
                </tr>
                <tr>
                  <th>기안일</th>
                  <td>${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}</td>
                </tr>
              </table>
            </div>
            <div id="divAutographer" class="row col-sm-10 justify-content-end">
              <div id="myAutograph" data-aplnno="${aplnNo}" data-memnm="${myInfo.chMemNm}" data-memno="${MEM_NO}" class="col-sm-2 justify-content"> 
                <table id="tableAutographer" class="table table-bordered align-middle text-nowrap mb-0">
                  <tr class="col">
                    <th>${myInfo.chRoleNm}</th>
                  </tr>
                  <tr style="height:100px; cursor:pointer;" class="col">
                    <td data-bs-toggle="modal" data-bs-target="#with-grid-modal2" ><a id="autographPlaceHolder" style="cursor:pointer;">서명선택</a><img id="selectAutograph" class="img-fluid" src="" alt="" /></td>
                  </tr>
                  <tr class="col">
                    <td>${myInfo.chMemNm}</td>
                  </tr>
                </table>
              </div>
            </div>
          </div>
          
          
          
            <!-- 결재선용 모달 버튼 -->
	        <div class="col-md-12 d-flex justify-content-end align-items-center" style="position: relative; ">
              <button type="button" id="thButton2" class="btn bg-primary-subtle text-primary" data-bs-toggle="modal" data-bs-target="#with-grid-modal" style="margin-right: 27px">
                  결재선 등록
              </button>
          </div>

	        <!-- 결재선용 모달 창 -->
	        <div class="modal fade" id="with-grid-modal" tabindex="-1" aria-labelledby="scroll-long-inner-modal" aria-hidden="true">
	          <div class="modal-dialog modal-dialog-scrollable modal-xl">
	            <div class="modal-content">
	              <div class="modal-header d-flex align-items-center">
	                <h4 class="modal-title" id="myLargeModalLabel">
	                  	결재선 설정
	                </h4>
	                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	              </div>
	
	              <div class="modal-body">
	                <div class="container-fluid">
	
	                  <div class="row justify-content-center">
	                    <div class="col-md-7">
	                      <div class="mb-3 d-flex align-items-center">
	                          <div class="d-flex align-items-center">
	                              <div class="form-check py-1 me-4 mt-1">
	                                  <input type="radio" id="customRadio11" name="customRadio" class="form-check-input" />
	                                  <label class="form-check-label" for="customRadio11">이름, 아이디</label>
	                              </div>
	                              <div class="form-check py-1 me-4 mt-1">
	                                  <input type="radio" id="customRadio22" name="customRadio" class="form-check-input" />
	                                  <label class="form-check-label" for="customRadio22">스레드</label>
	                              </div>
	                          </div>
	                          <div class="input-group" style="height: 40px; width: 330px;">
	                              <input type="text" id="firstName" class="form-control" placeholder="검색..." style="height: 100%;" />
	                              <button class="btn bg-info-subtle text-info d-flex align-items-center" type="submit" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px; height: 100%;">
	                                  <i class="ti ti-search fs-6"></i>
	                              </button>
	                          </div>
	                      </div>
	                    </div>
	                  </div>
	                  <div class="d-flex pt-3 justify-content-center">
	                    <div class="col-md-6">
	                      <div class="mb-3">
	                        <div class="col-md-12">
	                          <div class="card">
	                            <div class="card-body d-flex gap-3" style="height: 395px;">
                                <div class="col-md-4 col-12 mb-4 mb-md-0">
                                  <div id="treeview1">
                                    
                                  </div>
                                </div>
	                            
	                              <div class="row mt-1" style="width: 100%;">
	                                <div class="col-12">
	                                  <div class="tab-content col-12" id="nav-tabContent" style="height: 100%;">
                                      <select class="form-select" multiple data-header="Select a condiment" id="thMemSelect" style="height: 100%; ">

                                      </select>
	                                  </div>
	                                </div>
	                              </div>
	                            </div>      
	                          </div>
	                        </div>
	                      </div>
	                    </div>
	
	                    <div class="ms-5" style="margin-right: 35px; margin-top: 160px;">
	                      <div class="row flex-column" style="width: 50px;">
	                         <button id="inMem" type="button" class="btn mb-1 btn-light text-dark rounded-circle round-40 btn-sm d-inline-flex align-items-center justify-content-center">
	                            <i class="fs-5 ti ti-chevron-right"></i>
	                        </button>
	                        <button id="outMem" type="button" class="btn mb-1 btn-light text-dark rounded-circle round-40 btn-sm d-inline-flex align-items-center justify-content-center">
	                            <i class="fs-5 ti ti-chevron-left"></i>
	                        </button>
	                      </div>
	                    </div>
	                    
	                    <div class="col-md-4">
	                      <div class="mb-5">
	                        <div class="d-flex justify-content-between align-items-center">
	                            <label class="form-label">신청 <span id="docCount"></span></label>
	                            <div class="btn-group" role="group" style="margin: 0;">
	                                <button type="button" class="btn bg-primary-subtle btn-sm text-primary" style="margin-right: -1px;">
	                                    <i class="ti ti-caret-down"></i>
	                                </button>
	                                <button type="button" class="btn bg-primary-subtle btn-sm text-primary">
	                                    <i class="ti ti-caret-up"></i>
	                                </button>
	                            </div>
	                        </div>
	                        <select multiple class="form-control" id="multiSelect" style="height: 365px;">



	                        </select>
	                      </div>
	                    </div>
	                  </div>
	
	                </div>
	              </div>
	
	              <div class="modal-footer justify-content-center">
                  <button id="endDocList" type="button" class="btn bg-primary-subtle text-primary  waves-effect text-start" data-bs-dismiss="modal">
                      확인
                  </button>
	                <button type="button" class="btn bg-danger-subtle text-danger  waves-effect text-start" data-bs-dismiss="modal">
	                  	취소
	                </button>
	              </div>
	            </div>
	          </div>
	        </div>
	        <!-- 결재선용 모달 창 끝 -->
	        
	        
	        
        </div>
        <div class="card-body d-grid gap-3">
          <div>
            내용
          </div>
          <div id="docEditor" class="form-group">
          </div>
          `;
  if (doc) {
    // 반려사유가 있다면 내용이 적힌 요소를 생성함
    if (doc.rjctRsn) {
      formHTML += `
          <h3>반려사유</h3>
          <div id="rejectRsn">
            ${doc.rjctRsn}
          </div>
          `;
    }
  }
  formHTML += `
          <div class="form-group mt-3">
            파일 선택
            <input class="form-control mt-3" type="file" id="formFileMultiple" multiple="">        
          </div>
          <div>

  

  `;
  if (doc) {
    formHTML += `
    <div id="fileList">
    `;
    // 파일이 있다면 파일 목록을 추가함
    if (doc.fileList) {
      doc.fileList.forEach(file => {
        formHTML += `
                <div>
                  <a src="">${file.atchFileOrgnlNm}(${(file.atchFileSize / (1024 * 1024)).toFixed(2)}MB)</a>
                </div>
        `;
      })
    }
    formHTML += `
            </div>
    `;
  } else {
    formHTML += `<div id="fileList"></div>`;
  }
  formHTML += `
          </div>
          <input type="hidden" value="${MEM_NO}" class="form-control" name="memp" placeholder="Name" disabled="">
          <div class="text-end" id="divInsertButtons">
          </div>
        </div>
      </div>
    </div>
    
    
        <!-- 모달2 창 -->
	        <div class="modal fade" id="with-grid-modal2" tabindex="-1" aria-labelledby="scroll-long-inner-modal" aria-hidden="true">
	          <div class="modal-dialog modal-dialog-scrollable modal-md">
	            <div class="modal-content">
	              <div class="modal-header d-flex align-items-center">
	                <h4 class="modal-title" id="myLargeModalLabel">
	                  	서명 선택
	                </h4>
	                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	              </div>
	              <div class="modal-body">
	                <div class="container-fluid">
	                  <div class="d-flex pt-3 justify-content-center">
                      <div class="col" style="width: 100%; height:50vh;">
                        <div class="tab-content" id="nav-tabContent2" style="height: 100%;">
                        </div>
                      </div>
	                  </div>
	                </div>
	              </div>
	              <div class="modal-footer justify-content-center">
                  <button id="endDocList" type="button" class="btn bg-primary-subtle text-primary  waves-effect text-start" data-bs-dismiss="modal">
                      확인
                  </button>
	                <button type="button" class="btn bg-danger-subtle text-danger  waves-effect text-start" data-bs-dismiss="modal">
	                  	취소
	                </button>
	              </div>
	            </div>
	          </div>
	        </div>
	        <!-- 모달2 창 끝 -->



    `;
  // 양식을 렌더링 함
  MAIN_CONTENTS.querySelector('#docMainPage').innerHTML = formHTML;

  let atgrphImgData = await axios.post('/synerhub/autograph/getautograph', { memNo: MEM_NO }, axiosHeaderJson);
  // 서명 사진 불러와 모달창에 넣기
  atgrphImgData.data.forEach(atgrph => {
    let div = document.createElement('div');
    div.className = "d-flex pt-3 justify-content-center";
    let a = document.createElement('a');
    let img = document.createElement('img');
    img.style = "width:200px";
    img.src = "/synerhub/upload/temp/autograph/" + MEM_NO + atgrph.src;
    a.appendChild(img);
    a.setAttribute("data-src", img.src);
    a.setAttribute("data-bs-toggle", 'modal');
    a.setAttribute("data-bs-target", '#with-grid-modal2');
    a.addEventListener('click', function () {
      let imgElement = MAIN_CONTENTS.querySelector(`#selectAutograph`);
      imgElement.src = this.dataset.src;
      imgElement.setAttribute('data-src', this.dataset.src);
      flagDocInsertAutographSelect = true;
      MAIN_CONTENTS.querySelector('#autographPlaceHolder').style.display = "none";
    });
    div.appendChild(a);
    MAIN_CONTENTS.querySelector('#nav-tabContent2').appendChild(div);
  });

  // 기본 결재리스트 만들기
  res.data.forEach(mem => {
    $("select[id=thMemSelect]").append(`<option value="${mem.memNo}"><p id="chRoleNm">${mem.chRoleNm}</p>&emsp;<p id="chMemNm">${mem.chMemNm}</p>&emsp;<p id="chMemThNm">${mem.chMemThNm}</p></option>`);
  })
  // 결재선에 선택된 요소들을 담는 변수
  var multiSelectoptionsValue = [];
  // 선택된 맴버를 담는 변수
  var multiInnerOptionsValue = [];
  // 더블클릭시 추가 또는 삭제 기능
  $(document).on("dblclick", "#thMemSelect option", function () {
    $("#inMem").click();
  });
  $(document).on("dblclick", "#multiSelect option", function () {
    $("#outMem").click();
  });
  // '>' 버튼을 눌러 선택된 맴버를 결재선에 추가함
  $("#inMem").on("click", function () {
    var options = $("select[id=thMemSelect] option:selected")
    for (let i = 0; i < options.length; i++) {
      let val = options.eq(i).val();
      res.data.forEach(mem => {
        if (mem.memNo == val && multiSelectoptionsValue.indexOf(val) < 0) {
          $("select[id=multiSelect]").append(`<option value="${mem.memNo}"><p id="chRoleNm">${mem.chRoleNm}</p>&emsp;<p id="chMemNm">${mem.chMemNm}</p>&emsp;<p id="chMemThNm">${mem.chMemThNm}</p></option>`);
          multiSelectoptionsValue.push(val);
        }
      })
    }
    $("#docCount").text(multiSelectoptionsValue.length);
  });
  // '<' 버튼을 눌러 선택된 맴버를 결재선에서 제거함
  $("#outMem").on("click", function () {
    var options = $("select[id=multiSelect] option:selected")
    for (let i = 0; i < options.length; i++) {
      let val = options.eq(i).val();
      for (let j = 0; j < multiSelectoptionsValue.length; j++) {
        if (multiSelectoptionsValue[j] == val) {
          multiSelectoptionsValue.splice(j, 1);
          i--;
        }
      }
    }
    options.remove();
    $("#docCount").text(multiSelectoptionsValue.length);
  })
  // 선택된 맴버를 저장
  $("#endDocList").on("click", function () {
    var memNos = $("select[id=multiSelect] option");

    // console.log(memNos.find("#chRoleNm"));

    // 선택된 맴버의 정보를 출력
    for (let i = 0; i < memNos.length; i++) {
      let memNo = memNos.eq(i).val();
      if (multiInnerOptionsValue.indexOf(memNo) < 0) {
        let nm = memNos.find("#chMemNm").eq(i).text();
        let roleNm = memNos.find("#chRoleNm").eq(i).text();
        let autographDiv = document.createElement('div');

        // 결재선 정보가 담길 요소를 생성함
        autographDiv.setAttribute('data-memno', memNo);
        autographDiv.setAttribute('data-memnm', nm);
        autographDiv.setAttribute('data-memrolenm', roleNm);
        autographDiv.className = "col-sm-2 justify-content position-relative delDoc";
        let table = `
          <table class="table table-bordered align-middle text-nowrap mb-0">
            <tr class="col">
              <th>${roleNm}</th>
            </tr>
            <tr style="height:100px;" class="col">
              <td></td>
            </tr>
            <tr class="col">
              <td>${nm}</td>
            </tr>
          </table>
          `;
        // 결재선 삭제버튼
        let delButton = document.createElement('div');
        delButton.className = "position-absolute top-0 end-0";
        delButton.innerHTML = '<iconify-icon icon="solar:close-circle-broken" width="1.4em" height="1.4em" style="color: #ff0000"></iconify-icon>';
        delButton.addEventListener('click', function () {
          let val = $(this).parents('.delDoc').attr('data-memno');
          // 삭제된 맴버는 배열에서 제거함
          for (let j = 0; j < multiInnerOptionsValue.length; j++) {
            if (multiInnerOptionsValue[j] == val) {
              multiInnerOptionsValue.splice(j, 1);
            }
          }
          // 해당 맴버의 결재선 요소 삭제
          autographDiv.remove();
        });
        autographDiv.innerHTML = table;
        autographDiv.appendChild(delButton);
        let divAutographer = MAIN_CONTENTS.querySelector('#divAutographer');
        divAutographer.insertAdjacentElement('beforeend', autographDiv);
        multiInnerOptionsValue.push(memNo);
      }

    }
  })


  // input파일 읽기
  let inputFile = MAIN_CONTENTS.querySelector('#formFileMultiple')
  inputFile.addEventListener('change', (event) => {
    docFiles = [];
    let getFiles = event.target.files;
    Array.from(getFiles).forEach((file) => {
      docFiles.push(file);
    })
  });

  // ToastEditor 적용하기 doc이 있다면 수정
  let el = MAIN_CONTENTS.querySelector('#docEditor');
  if (doc) {
    let content = await doc.docConts;
    // 에디터의 초기값을 설정
    editor = new Editor({
      el: el,
      height: '500px',
      initialEditType: 'markdown',
      previewStyle: 'tab',
      // 수정을 할 경우 이니셜밸류에 기존 내용을 마크다운으로 입력함 
      initialValue: content,
      hooks: {
        // 이미지 추가시 서버에 저장을 한 후 저장된 경로를 받아와 이미지를 표현함
        addImageBlobHook: async (blob, imgLoader) => {
          let formData = new FormData();
          formData.append('fileList', blob);
          formData.append('folderName', 'docContsImg/' + synerhubch);
          let res = await axios.post('/synerhub/fileio/uploadeditor', formData, axiosHeaderFile)
          imgLoader(res.data, 'IMG');
        }
      }
    });
  } else {
    // 에디터의 초기값을 설정
    editor = new Editor({
      el: el,
      height: '500px',
      initialEditType: 'WISIWIG',
      previewStyle: 'tab',
      hooks: {
        addImageBlobHook: async (blob, imgLoader) => {
          let formData = new FormData();
          formData.append('fileList', blob);
          formData.append('folderName', 'docContsImg/' + synerhubch);
          // 이미지 추가시 서버에 저장을 한 후 저장된 경로를 받아와 이미지를 표현함
          let res = await axios.post('/synerhub/fileio/uploadeditor', formData, axiosHeaderFile)
          imgLoader(res.data, 'IMG');
        }
      }
    });
  }
  editor.getMarkdown();

  // 문서 내 요소 만들기
  let div = document.createElement('div');
  div.className = "btn-group justfy-center-end";
  div.setAttribute("role", "group");

  // 결재선 드롭다운 버튼 만들기 
  let button = document.createElement('button');
  // button.innerHTML = '<i class="ti ti-plus fs-7 text"></i>';
  button.innerHTML = '<a>결재선 등록</a>';
  button.className = "btn bg-primary-subtle text-primary dropdown-toggle";
  button.setAttribute("data-bs-toggle", "dropdown");
  button.setAttribute("aria-haspopup", "true");
  button.setAttribute("aria-expanded", "false");

  let innerDiv = document.createElement('div');
  innerDiv.className = "dropdown-menu overflow-auto";
  innerDiv.style = "";

  // doc이 있다면 기존 결재선 불러오기
  if (doc) {
    doc.aplnList.forEach((apln, idx) => {
      if (idx != 0) {
        let autograph = apln.atgrphImg == null ? '-' : apln.atgrphImg;
        // 결재선 정보가 담길 요소를 생성
        let autographDiv = document.createElement('div');
        autographDiv.setAttribute('data-aplnno', apln.aplnNo);
        autographDiv.setAttribute('data-memno', apln.aplnMemNo);
        autographDiv.setAttribute('data-memnm', apln.aplnMemNm);
        autographDiv.setAttribute('data-memrolenm', apln.chRoleNm);
        autographDiv.className = "col-sm-2 justify-content position-relative";
        let table = `
        <table class="table table-bordered align-middle text-nowrap mb-0">
          <tr class="col">
            <th>${apln.chRoleNm}</th>
          </tr>
          <tr style="height:100px;" class="col">
            <td>${autograph}</td>
          </tr>
          <tr class="col">
            <td>${apln.aplnMemNm}</td>
          </tr>
        </table>
        `;
        // 결재선을 삭재하는 버튼을 생성
        let delButton = document.createElement('div');
        delButton.className = "position-absolute top-0 end-0";
        delButton.innerHTML = '<iconify-icon icon="solar:close-circle-broken" width="1.4em" height="1.4em" style="color: #ff0000"></iconify-icon>';
        delButton.addEventListener('click', function () {
          autographDiv.remove();
        });
        autographDiv.innerHTML = table;
        autographDiv.appendChild(delButton);
        let divAutographer = MAIN_CONTENTS.querySelector('#divAutographer');
        divAutographer.insertAdjacentElement('beforeend', autographDiv);
      }
    });
  }

  // 결재선 등록 요소 만들기
  // res.data.forEach(mem => {
  //   let a = document.createElement('a');
  //   a.innerText = `${mem.chMemNm}(${mem.chMemThNm}/${mem.chRoleNm})`;
  //   a.className = "dropdown-item";
  //   a.setAttribute('data-memrolenm', mem.chRoleNm);
  //   a.setAttribute('data-memnm', mem.chMemNm);
  //   a.setAttribute('data-memno', mem.memNo);

  //   a.addEventListener('click', function () {
  //     let nm = this.dataset.memnm;
  //     let roleNm = this.dataset.memrolenm;
  //     let memNo = this.dataset.memno;
  //     let autographDiv = document.createElement('div');
  //     autographDiv.setAttribute('data-memno', memNo);
  //     autographDiv.setAttribute('data-memnm', nm);
  //     autographDiv.setAttribute('data-memrolenm', roleNm);
  //     autographDiv.className = "col-sm-2 justify-content position-relative";
  //     let table = `
  //     <table class="table table-bordered align-middle text-nowrap mb-0">
  //       <tr class="col">
  //         <th>${roleNm}</th>
  //       </tr>
  //       <tr style="height:100px;" class="col">
  //         <td></td>
  //       </tr>
  //       <tr class="col">
  //         <td>${nm}</td>
  //       </tr>
  //     </table>
  //     `;
  //     let delButton = document.createElement('div');
  //     delButton.className = "position-absolute top-0 end-0";
  //     delButton.innerHTML = '<iconify-icon icon="solar:close-circle-broken" width="1.4em" height="1.4em" style="color: #ff0000"></iconify-icon>';
  //     delButton.addEventListener('click', function () {
  //       autographDiv.remove();
  //     });
  //     autographDiv.innerHTML = table;
  //     autographDiv.appendChild(delButton);
  //     let divAutographer = MAIN_CONTENTS.querySelector('#divAutographer');
  //     divAutographer.insertAdjacentElement('beforeend', autographDiv);
  //   });

  //   innerDiv.appendChild(a);

  // });


  // button.addEventListener('click', () => {
  //   if (button.getAttribute('aria-expanded') == 'false') {
  //     button.classList.add("show");
  //     innerDiv.classList.add("show");
  //     innerDiv.style = "position: absolute; height: 350px; scroll:auto; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 45px);"
  //     innerDiv.setAttribute('data-popper-placement', 'bottom-start');
  //   } else {
  //     button.classList.remove("show");
  //     innerDiv.classList.remove("show");
  //     innerDiv.style = ""
  //     innerDiv.removeAttribute('data-popper-placement');
  //   }
  // });

  // div.appendChild(button);
  // div.appendChild(innerDiv);



  // MAIN_CONTENTS.querySelector('#thButton').appendChild(div);

  // 문서 상신 또는 수정 관계에 따라 상신 버튼을 다르게 출력함
  let sendButton = document.createElement('button');
  sendButton.className = "btn bg-primary-subtle text-primary me-3";
  if (doc) {
    sendButton.innerText = "재상신";
  } else {
    sendButton.innerText = "상신";
  }

  // 상신버튼에 클릭 이벤트를 추가함
  sendButton.addEventListener('click', async () => {
    let img = MAIN_CONTENTS.querySelector('#selectAutograph');

    let data = {};
    // 채널문서일 경우 채널 키값만
    data.chNo = synerhubch;
    data.memNo = MEM_NO;
    // 스레드문서일 경우 채널과 스레드 키값 둘다 포함
    if (synerhubth) {
      data.thNo = synerhubth;
    }
    // 유효성 검사(제목, 서명, 결재선, 내용)
    let inputTitle = MAIN_CONTENTS.querySelector('#docTtl');
    // 제목이 없다면 제목input으로 커서를 옮기고 
    if (!inputTitle.value) {
      inputTitle.focus();
      Swal.fire('제목을 입력하세요.');
      return;
    } else {
      data.docTtl = inputTitle.value;
    }
    // 본인의 서명 이미지 선택
    if (!flagDocInsertAutographSelect) {
      Swal.fire('서명을 선택하세요.');
      return;
    }
    // 결재선이 없다면 알림이 뜸
    let divs = MAIN_CONTENTS.querySelector('#divAutographer').querySelectorAll('div');
    if (divs.length === 1) {
      Swal.fire('결재선을 선택해주세요.');
      return;
    }

    // 결재선의 맴버를 담을 배열
    let aplnList = [];
    divs.forEach(div => {
      let apln;

      // 문서 수정의 경우 결재선 키값을 조회
      if (div.dataset.aplnno) {
        // 필요한 내용을 dataset으로 꺼내옴
        apln = {
          'aplnMemNm': div.dataset.memnm,
          'aplnMemNo': parseInt(div.dataset.memno),
          'aplnNo': div.dataset.aplnno
        }
      // 문서 등록의 경우 멤버의 키값을 조회
      } else if (div.dataset.memno) {
        apln = {
          'aplnMemNm': div.dataset.memnm,
          'aplnMemNo': parseInt(div.dataset.memno)
        }
      }

      // 서명 이미지파일의 경로를 조회
      if (flagDocInsertAutographSelect) {
        apln.atgrphImg = img.dataset.src;
        flagDocInsertAutographSelect = false;
      }

      if (apln) {
        // 리스트에 담음
        aplnList.push(apln);
      }

    });
    // 서버로 보낼 데이터에 담음
    data.aplnList = aplnList;

    // 본문의 유효성 검사
    // 해당 문자열인 경우 내용이 없는것으로 간주함
    if (editor.getHTML() === '<p><br></p>') {
      // 에디터로 커서를 이동
      editor.focus();
      Swal.fire('내용을 입력하세요.');
      return;
    } else {
      // 있다면 마크다운 형식 문자열을 추출함
      data.docConts = editor.getMarkdown();
    }

    let res;

    // 첨부파일 목록의 길이로 첨부파일을 추출함
    if (docFiles.length != 0) {
      let formData = new FormData();
      docFiles.forEach(file => formData.append('fileList', file))
      formData.append('folderName', 'doc');
      // 파일을 먼저 비동기로 저장을 한 후 저장된 파일의 키값을 받아옴
      // header는 JSON을 사용하지 않고 바이너리를 사용함으로 컨텐츠타입을 명시하지 않음
      res = await axios.post('/synerhub/fileio/upload', formData, axiosHeaderFile);
    }

    // 파일의 키값을 data에 추가함
    data.docFileId = res == null ? null : res.data;
    // 수정의 경우 문서의 키값을 추가함
    data['docNo'] = docNo == null ? null : docNo;

    // 서버의 주소를 등록 또는 수정에 맞춰 변경함
    let url = '/synerhub/document/'
    if (doc) {
      url += 'update';
      docNo = null;
    } else {
      url += 'insert';
    }
    // 서버에서 받아온 해당 문서의 내용을 결과로 받아옴
    res = await axios.post(url, data, axiosHeaderJson)

    // 서명선택 플레그를 초기화함
    flagDocInsertAutographSelect = false;

    // 받아온 결과를 상세페이지 렌더로 넘겨줘 상세페이지가 바로 렌더링되게함
    docDetailPageRender(res.data);
  });

  // 취소버튼을 만들고 클릭시 메인페이지로 돌아감
  let cancleButton = document.createElement('button');
  cancleButton.className = "btn bg-warning-subtle text-warning"
  cancleButton.innerText = "취소"
  cancleButton.addEventListener('click', function () {
    docMyMainPageRender();
  });

  // 뒤로가기 버튼을 만들고 클릭시 이전 문서함으로 되돌아감
  let goBackButton = document.createElement('button');
  goBackButton.innerText = "목록"
  goBackButton.className = "btn btn-light text-dark"
  goBackButton.addEventListener('click', function () {
    // 이전에 있던 문서함 위치 체크
    if (stat == 'rejected') {
      docRejectedCallback();
    } else if (stat == 'returned') {
      docReturnedCallback();
    } else {
      docCurrentCallback();
    }
  });

  // 버튼을 추가해 화면에 표시함
  let divInsertButtons = MAIN_CONTENTS.querySelector('#divInsertButtons');
  divInsertButtons.appendChild(sendButton);
  divInsertButtons.appendChild(goBackButton);
}

// 완료된 문서를 조회함
const listDocumentComplete = (page, rowCnt, searchWord, tabName) => {

  // 요청시 필요한 데이터
  let data = {
    synerhub1: MEM_NO,
    synerhub2: synerhubch,
    synerhub3: synerhubth,
    page: page,
    rowCnt: rowCnt,
  }

  // 검색어가 있다면 요청데이터에 추가함
  if (searchWord) {
    if (searchTitleFlag) {
      data.searchTitle = searchWord;
    } else {
      data.searchName = searchWord;
    }
  }

  // 기본 테이블 생성함수 호출
  docListTableCreator(tabName);

  document.querySelector('#main_contents').querySelector('thead').innerHTML = `
  <tr>
    <th class="w-70 text-center" scope="col-8">문서 제목</th>
    <th class="w-10 text-center" scope="col-1">작성자</th>
    <th class="w-10 text-center" scope="col-2">등록일</th>
    <th class="w-10 text-center" scope="col-1">스레드</th>
  </tr>`;

  // 서버로 완료된 문서를 요청
  axios.post('/synerhub/document/completelist', data, axiosHeaderJson)
    .then(res => {
      let total_page = Math.ceil(res.data.total / res.data.rowCnt);
      let docListHTML = "";
      // 리스트가 없을 경우
      if (res.data.list <= 0) {
        docListHTML += `
        <tr class="text-center">
          <td scope="row" colspan="4">결재 완료된 문서가 존재하지 않습니다</td>
        </tr>`;
      } else {
        res.data.list.forEach((doc) => {
          let thread = doc.thTtl != null ? doc.thTtl : '-'
          let rgdt = doc.docRgdt.substring(0, 10);
          docListHTML += `
          <tr onclick="docDetail(${doc.docNo}, 'approved')">
            <td scope="row"><a class="" href="javascript:void(0)">
            ${doc.docTtl}</a>
            </td>
            <td scope="row"><a class="">
            ${doc.chMemNm}</a>
            </td>
            <td scope="row"><a class="">
            ${rgdt}</a>
            </td>
            <td scope="row">
            ${thread}
            </td>
          </tr>`;
        })
      };

      // 페이징 처리 후 자료로 페이지네이터를 출력한다.
      paginator(cur_page, total_page);

      MAIN_CONTENTS.querySelector('#list_body').innerHTML = docListHTML;

    });

}

// 등록한 문서중 결재중인 문서 목록을 출력함
const listDocumentCurrent = (page, rowCnt, searchWord, tabName) => {
  let data = {
    synerhub1: MEM_NO,
    synerhub2: synerhubch,
    synerhub3: synerhubth,
    page: page,
    rowCnt: rowCnt,
    stat: stat
  }

  if (searchWord) {
    if (searchTitleFlag) {
      data.searchTitle = searchWord;
    } else {
      data.searchName = searchWord;
    }
  }

  docListTableCreator(tabName);

  document.querySelector('#main_contents').querySelector('thead').innerHTML = `
  <tr>
    <th class="w-70 text-center" scope="col-8">문서 제목</th>
    <th class="w-15 text-center" scope="col-2">등록일</th>
    <th class="w-15 text-center" scope="col-2">첨부 파일</th>
  </tr>`;

  axios.post('/synerhub/document/currentlist', data, axiosHeaderJson)
    .then(res => {
      let total_page = Math.ceil(res.data.total / res.data.rowCnt);
      let docListHTML = "";
      if (res.data.list <= 0) {
        docListHTML += `
        <tr>
          <td scope="row" class="text-center" colspan="5">작성한 문서가 존재하지 않습니다</td>
        </tr>`;
      } else {
        res.data.list.forEach((doc) => {
          let rgdt = doc.docRgdt.substring(0, 10);
          let fileCnt = doc.fileCnt == null ? '-' : doc.fileCnt;
          docListHTML += `
          <tr onclick="docDetail(${doc.docNo}, 'current')">
            <td scope="row"><a class="" href="javascript:void(0)">
            ${doc.docTtl}</a>
            </td>
            <td scope="row"><a class="">
            ${rgdt}</a>
            </td>
            <td scope="row">
            ${fileCnt}
            </td>
          </tr>`;
        });
      }
      paginator(cur_page, total_page);

      document.querySelector('#main_contents').querySelector('#list_body').innerHTML = docListHTML;

    });
}

// 결재를 받은 문서를 출력함
const listDocumentApproval = (page, rowCnt, searchWord, tabName) => {

  let data = {
    synerhub1: MEM_NO,
    synerhub2: synerhubch,
    synerhub3: synerhubth,
    page: page,
    rowCnt: rowCnt,
    stat: stat
  }

  if (searchWord) {
    if (searchTitleFlag) {
      data.searchTitle = searchWord;
    } else {
      data.searchName = searchWord;
    }
  }

  docListTableCreator(tabName);

  document.querySelector('#main_contents').querySelector('thead').innerHTML = `
  <tr>
    <th class="w-70 text-center" scope="col-8">문서 제목</th>
    <th class="w-10 text-center" scope="col-1">기안자</th>
    <th class="w-10 text-center" scope="col-2">등록일</th>
    <th class="w-10 text-center" scope="col-1">첨부 파일</th>
  </tr>`;

  axios.post('/synerhub/document/currentapprovallist', data, axiosHeaderJson)
    .then(res => {
      let total_page = Math.ceil(res.data.total / res.data.rowCnt);
      let docListHTML = "";
      if (res.data.list <= 0) {
        docListHTML += `
        <tr>
          <td scope="row" class="text-center" colspan="4">결재할 문서가 없습니다.</td>
        </tr>`;
      } else {
        res.data.list.forEach((doc) => {
          let rgdt = doc.docRgdt.substring(0, 10);
          docListHTML += `
        <tr onclick="docDetail(${doc.docNo}, '${res.data.stat}')">
          <td scope="row"><a class="">
          ${doc.docTtl}</a>
          </td>
          <td scope="row"><a class="">
          ${doc.chMemNm}</a>
          </td>
          <td scope="row"><a class="">
          ${rgdt}</a>
          </td>
          <td scope="row"><a class="">
          ${doc.fileCnt}</a>
          </td>
        </tr>`;
        });
      }

      paginator(cur_page, total_page);

      document.querySelector('#main_contents').querySelector('#list_body').innerHTML = docListHTML;

    });


}

// 서버로 문서 내용을 요청하고 받아온 데이터를 문서 상세보기 페이지 렌더로 보냄
const docDetail = (A, stat) => {
  axios.get('/synerhub/document/detail/' + A, axiosHeaderJson)
    .then(res => {
      docDetailPageRender(res.data, stat)
    });
}

// 서버로 문서 내용을 요청하고 받아온 데이터를 문서 등록(수정) 페이지 렌더로 보냄
const docUpdate = (A, stat) => {
  axios.get('/synerhub/document/detail/' + A, axiosHeaderJson)
    .then(res => {
      docInsertFormRender(res.data, stat)
    });
}

var vDoc;
// 반려사유 버튼 클릭 플레그
var flagReject = false;
// 문서 상세보기 페이지를 출력함
const docDetailPageRender = async (doc, stat) => {

  let myApln;
  // 페이지 기본틀 HTML 문자열
  let docDetailHTML = `
    <div id="main_contents">      
      <div class="mb-3 overflow-hidden position-relative">
        <div class="px-3">
          <h4 id="current_menu" class="fs-6 mb-0">문서</h4>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">SynerHub</li>
              <li class="breadcrumb-item">결재 현황</li>
              <li class="breadcrumb-item">${doc.docTtl}</li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="card w-100">
        <div class="card-body d-grid gap-3 text-center">
          <div class="d-flex align-items-center justify-content-between mb-3">
            <hr>
            <h2 class="card-title mb-0 fs-6">${doc.docTtl}</h2>
            <hr>
            <div class="ms-auto flex-shrink-0">
            </div>
          </div>
            <div class="row">
              <div class="col-sm-2 justify-content">
                <table id="tableWriter" class="table table-bordered table-light h-100 d-inline-block align-middle text-nowrap mb-0">
                  <tbody>
                    <tr>
                      <th>소속</th>
                      <td>${doc.thTtl}</td>
                    </tr>
                    <tr>
                      <th>직급</th>
                      <td>${doc.chRoleNm}</td>
                    </tr>
                    <tr>
                      <th>기안자</th>
                      <td>${doc.chMemNm}</td>
                    </tr>
                    <tr>
                      <th>기안일</th>
                      <td>${doc.docRgdt.substring(0, 10)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div id="divAutographer" class="row col-sm-10 justify-content-end">`;
  // 결재선 정보를 추가함
  doc.aplnList.forEach(apln => {
    if (apln.aplnMemNo == MEM_NO) {
      myApln = apln;
    }
    docDetailHTML += `
                <div id="myAutograph" data-memnm="${apln.aplnMemNm}" data-memno="${apln.aplnMemNo}" class="col-sm-2 justify-content"> 
                  <table id="tableAutographer" class="table table-bordered align-middle text-nowrap mb-0">
                    <tbody>
                      <tr class="col">
                        <th>${apln.chRoleNm}</th>
                      </tr>
                      `;
    if (apln.aplnMemNo == MEM_NO) {
      docDetailHTML += `
                        <tr data-bs-toggle="modal" data-bs-target="#with-grid-modal" style="height:100px;" class="col">
                          <td height="0"><div style="height:100%"><img class="img-fluid" style="max-width:100%;" id="imgAutograph${apln.aplnMemNo}" src="${apln.atgrphImg}" alt="" /></div></td>
                        </tr>
                        `;
    } else {
      docDetailHTML += `
                        <tr style="height:100px;" class="col">
                          <td height="0"><div style="height:100%"><img class="img-fluid" style="max-width:100%;" src="${apln.atgrphImg}" alt="" /></div></td>
                        </tr>
                        `;
    }
    docDetailHTML += `
                      <tr class="col">
                        <td>${apln.aplnMemNm}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
    `;
  });
  docDetailHTML += `
              </div>
            </div>
          </div>
          <div class="card-body d-grid gap-3">
            <div id="viewer" >
              
            </div>
            <div class="form-group">
              파일
            </div>
            <div>
  `;
  // 문서의 첨부파일을 출력함
  if (doc.fileList) {
    doc.fileList.forEach(file => {
      docDetailHTML += `
                <div id="docFileList">
                  <a download href="/synerhub/upload/temp/doc${file.atchFilePath}">${file.atchFileOrgnlNm}(${(file.atchFileSize / (1024 * 1024)).toFixed(2)}MB)</a>
                </div>
      `;
    });
  } else {
    docDetailHTML += `
    <div id="docFileList">
      <a>파일 없음</a>
    </div>
  `;
  }

  docDetailHTML += `
              </div>
              <div class="form-floating" id="rejectReasonInput">
              </div>
              <input type="hidden" value="7009" class="form-control" name="memp" placeholder="Name" disabled="">
              <div class="text-end" id="divInsertButtons">
            </div>
          </div>
        </div>
        </div>
        `;
  MAIN_CONTENTS.querySelector('#docMainPage').innerHTML = docDetailHTML;

  // 결재 요청을 받았을 경우 서명 이미지 선택 모달을 추가함
  if (stat == 'toApprove') {

    MAIN_CONTENTS.querySelector('#docMainPage').innerHTML += `
	        <div class="modal fade" id="with-grid-modal" tabindex="-1" aria-labelledby="scroll-long-inner-modal" aria-hidden="true">
	          <div class="modal-dialog modal-dialog-scrollable modal-md">
	            <div class="modal-content">
	              <div class="modal-header d-flex align-items-center">
	                <h4 class="modal-title" id="myLargeModalLabel">
	                  	서명 선택
	                </h4>
	                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	              </div>
	              <div class="modal-body">
	                <div class="container-fluid">
	                  <div class="d-flex pt-3 justify-content-center">
                      <div class="col" style="width: 100%; height:50vh;">
                        <div class="tab-content" id="nav-tabContent" style="height: 100%;">
                        </div>
                      </div>
	                  </div>
	                </div>
	              </div>
	              <div class="modal-footer justify-content-center">
                  <button id="endDocList" type="button" class="btn bg-primary-subtle text-primary  waves-effect text-start" data-bs-dismiss="modal">
                      확인
                  </button>
	                <button type="button" class="btn bg-danger-subtle text-danger  waves-effect text-start" data-bs-dismiss="modal">
	                  	취소
	                </button>
	              </div>
	            </div>
	          </div>
	        </div>
    `;
    // 본인의 서명 이미지를 요청함
    let atgrphImgData = await axios.post('/synerhub/autograph/getautograph', { memNo: MEM_NO }, axiosHeaderJson);
    // 서명 이미지에 dataset에 필요 데이터를 입력함
    atgrphImgData.data.forEach(atgrph => {
      let div = document.createElement('div');
      div.className = "d-flex pt-3 justify-content-center";
      let a = document.createElement('a');
      let img = document.createElement('img');
      img.style = "width:200px";
      img.src = "/synerhub/upload/temp/autograph/" + MEM_NO + atgrph.src;
      a.appendChild(img);
      a.setAttribute("data-src", img.src);
      a.setAttribute("data-bs-toggle", 'modal');
      a.setAttribute("data-bs-target", '#with-grid-modal');
      // 이미지가 클릭될 때 이미지를 문서에 포함시킴
      a.addEventListener('click', function () {
        let imgElement = MAIN_CONTENTS.querySelector(`#imgAutograph${MEM_NO}`);
        imgElement.src = this.dataset.src;
        imgElement.setAttribute('data-src', this.dataset.src);
      });
      div.appendChild(a);
      MAIN_CONTENTS.querySelector('#nav-tabContent').appendChild(div);
    });
    
    // 서명 버튼으로도 서명 이미지를 선택할 수 있음
    let autopraphBtn = document.createElement('button');
    autopraphBtn.className = "btn bg-success-subtle text-success me-3";
    autopraphBtn.innerText = "서명";
    autopraphBtn.setAttribute("data-bs-toggle", 'modal');
    autopraphBtn.setAttribute("data-bs-target", '#with-grid-modal');
    
    // 결재버튼으로 요청받은 결재를 처리함
    let approveBtn = document.createElement('button');
    approveBtn.className = "btn bg-primary-subtle text-primary me-3";
    approveBtn.innerText = "결재";
    approveBtn.setAttribute('data-docno', doc.docNo);
    approveBtn.setAttribute('data-docaplnmemno', MEM_NO);
    approveBtn.addEventListener('click', async function () {
      let src = MAIN_CONTENTS.querySelector(`#imgAutograph${MEM_NO}`).dataset.src;
      // console.log(src);
      // 서명을 선택하지 않은 경우 리턴
      if (!src) {
        Swal.fire('서명을 선택해주세요.');
        return;
      }
      // 서버에서 결재 처리 결과 문자열을 받음
      let res = await docApprove(this.dataset.docno, this.dataset.docaplnmemno, src)
      // 처리가 되었다면 받은 결재함으로 이동함
      // 아닐 경우 해당페이지에 머무름
      if (res.data == 'Y') {
        Swal.fire('결재가 완료되었습니다.');
        docApprovalCallback();
      } else {
        Swal.fire('에러발생 잠시후 다시 시도해주세요.');
      }
    });
    // 반려사유버튼요소를 만듬
    let rejectBtn = document.createElement('button');
    rejectBtn.className = "btn bg-danger-subtle text-danger me-3";
    rejectBtn.innerHTML = "반려사유";
    rejectBtn.setAttribute('data-docno', doc.docNo);
    rejectBtn.setAttribute('data-aplnno', myApln.aplnNo);
    rejectBtn.setAttribute('data-docaplnmemno', MEM_NO);
    // 반려사유버튼을 클릭하면 반려사유를 적는 textarea요소를 만들어 출력함
    rejectBtn.addEventListener('click', function () {
      if (!flagReject) {
        let textarea = document.createElement('textarea');
        textarea.className = "form-control";
        textarea.id = "rejectReasonText";
        textarea.style.height = "200px";
        let label = document.createElement('label');
        label.setAttribute('for', 'rejectReasonText');
        label.innerText = "반려사유";
        let div = MAIN_CONTENTS.querySelector('#rejectReasonInput');
        div.appendChild(textarea);
        div.appendChild(label);
        // 반려사유 텍스트가 반려로 변경
        rejectBtn.innerText = "반려";
        // 버튼 클릭 플래그값을 true로 설정
        flagReject = true;
      } else {
        // 버튼 클릭 플래그가 true 라면 클릭 이벤트가 변경되어 실행
        rejectBtn.addEventListener('click', async function () {
          let rsn = MAIN_CONTENTS.querySelector('#rejectReasonText').value;
          // textarea 유효성 검사
          if (!rsn) {
            Swal.fire('반려사유를 작성해주세요.');
            return;
          }
          // 내용을 data 변수에 담음
          data = {
            docNo: this.dataset.docno,
            rjctRsn: rsn,
            aplnList: [apln = {
              aplnNo: this.dataset.aplnno,
              docNo: this.dataset.docno
            }]
          }
          // 서버로 data를 보내고 결과값을 받아옴
          let res = await axios.post('/synerhub/document/reject', data, axiosHeaderJson);
          // 결과값의 문자열을 비교해 처리상태를 출력함
          if (res.data == 'Y') {
            Swal.fire('반려하였습니다.');
            docApprovalCallback();
          } else {
            Swal.fire('에러. 잠시후에 다시 시도해주세요');
          }

          flagReject = false;
        });
      }

    });

    MAIN_CONTENTS.querySelector('#divInsertButtons').appendChild(approveBtn);
    MAIN_CONTENTS.querySelector('#divInsertButtons').appendChild(autopraphBtn);
    MAIN_CONTENTS.querySelector('#divInsertButtons').appendChild(rejectBtn);

  }
  // 문서의 상태를 확인해 버튼의 종류를 바꿔 출력함
  if (doc.docStat != 'DCST03') {
    if (doc.docWrtr === MEM_NO && stat != 'approved') {
      let returnButton = document.createElement('button');
      returnButton.innerText = "회수"
      returnButton.setAttribute('data-docno', doc.docNo);
      returnButton.className = "btn bg-warning-subtle text-warning me-3"
      // 회수를 위한 함수를 호출함
      returnButton.addEventListener('click', function () {
        docReturn(this.dataset.docno);
      });
      MAIN_CONTENTS.querySelector('#divInsertButtons').appendChild(returnButton);

      //   let downloadBtn = document.createElement('button');
      //   downloadBtn.innerText = "다운";
      //   downloadBtn.addEventListener('click', () => {
      //     let as = MAIN_CONTENTS.querySelector('#docFileList').querySelectorAll('a');
      //     as.forEach(async a => {
      //       await a.click();
      //     });
      //   });
      //   MAIN_CONTENTS.querySelector('#divInsertButtons').appendChild(downloadBtn);
    }

    let goBackButton = document.createElement('button');
    goBackButton.innerText = "목록"
    goBackButton.setAttribute('data-docno', doc.docNo);
    goBackButton.className = "btn btn-light text-dark"
    goBackButton.addEventListener('click', function () {
      if (stat == 'approved') {
        docCompleteCallback();
      } else if (stat == 'current') {
        docCurrentCallback();
      } else if (stat == 'toApprove') {
        docApprovalCallback();
      } else {
        docReturnedCallback();
      }
    });
    MAIN_CONTENTS.querySelector('#divInsertButtons').appendChild(goBackButton);

  }
  // Toast Editor로 내용을 출력함
  viewer = Editor.factory({
    el: MAIN_CONTENTS.querySelector('#viewer'),
    viewer: true,
    height: '500px',
    initialValue: doc.docConts
  });
}

// 문서를 회수함
const docReturn = (docNo) => {
  
  // Sweet alert API를 활용함
  Swal.fire({
    title: "문서를 회수하시겠습니까?",
    text: "회수한 문서는 회수함에서 보실 수 있습니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "확인",
    cancelButtonText: "취소"
  }).then((result) => {
    if (result.isConfirmed) {
      // 확인 버튼을 누르면 서버로 요청이 감
      // 요청이 끝나면 처리 결과를 문자열로 받음
      axios.get('/synerhub/document/return/' + docNo, axiosHeaderJson)
        .then(res => {
          if (res.data = 'Y') {
            Swal.fire({
              title: "회수완료",
              text: "정상적으로 회수되었습니다.",
              icon: "success"
            });
            listDocumentCurrent(cur_page, max_row, searchWord);
          } else {
            Swal.fire({
              title: "회수실패",
              text: "회수작업에 실패하였습니다.",
              icon: "error"
            });
          }
        })
    }
  });



}

// 기안한 문서를 취소함
const docCancle = (docNo) => {

  Swal.fire({
    title: "기안을 취소 하시겠습니까?",
    text: "취소한 문서는 취소함에서 보실 수 있습니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "확인",
    cancelButtonText: "취소"
  }).then((result) => {
    if (result.isConfirmed) {
      axios.get('/synerhub/document/cancle/' + docNo, axiosHeaderJson)
        .then(res => {
          if (res.data = 'Y') {
            Swal.fire({
              title: "취소완료",
              text: "정상적으로 취소되었습니다.",
              icon: "success"
            });
            listDocumentCurrent(cur_page, max_row, searchWord);
          } else {
            Swal.fire({
              title: "취소실패",
              text: "취소작업에 실패하였습니다.",
              icon: "error"
            });
          }
        })
    }
  });

}

// 문서의 상태에 따라 리스트를 받아와 렌더된 리스트 페이지에 표 형태로 목록을 출력하는 함수
const listDocumentByStat = (page, rowCnt, searchWord, tabName) => {
  // data : 요청시 axios로 보낼 데이터
  let data = {
    synerhub1: MEM_NO,
    synerhub2: synerhubch,
    synerhub3: synerhubth,
    page: page,
    rowCnt: rowCnt,
    stat: stat
  }

  if (searchWord) {
    if (searchTitleFlag) {
      data.searchTitle = searchWord;
    } else {
      data.searchThread = searchWord;
    }
  }

  // 리스트가 들어갈 표를 렌더링함
  docListTableCreator(tabName);

  MAIN_CONTENTS.querySelector('#list_head').innerHTML = `
  <tr>
    <th class="w-70 text-center" scope="col-8">문서 제목</th>
    <th class="w-10 text-center" scope="col-2">등록일</th>
    <th class="w-10 text-center" scope="col-1">첨부 파일</th>
    <th class="w-10 text-center" scope="col-1">스레드</th>
  </tr>`;

  // axios로 받아온 데이터를 출력함
  axios.post('/synerhub/document/getdoclistbystat', data, axiosHeaderJson)
    .then(res => {

      total_page = Math.ceil(res.data.total / res.data.rowCnt);

      let listHTML = "";
      if (res.data.list <= 0) {
        listHTML += `
        <tr>
          <td scope="row" class="text-center" colspan="4">회수한 문서가 존재하지 않습니다</td>
        </tr>`;
      } else {

        res.data.list.forEach(doc => {
          let rgdt = doc.docRgdt.substring(0, 10);
          let thTtl = doc.thTtl != null ? doc.thTtl : '-';
          if (stat === 'DCST02') {
            listHTML += `
          <tr onclick="docUpdate(${doc.docNo})">
        `;
          } else if (stat === 'DCST03') {
            listHTML += `
          <tr onclick="docDetail(${doc.docNo})">
        `;
          }
          listHTML += `
          <td scope="row">
            <a class="">${doc.docTtl}</a>
          </td>
          <td scope="row">
            <a class="">${rgdt}</a>
          </td>
          <td scope="row">
            <a class="">${doc.fileCnt}개</a>
          </td>
          <td scope="row">
            <a class="">${thTtl}</a>
          </td>
        </tr>
      `;
        });
      }
      MAIN_CONTENTS.querySelector('#list_body').innerHTML = "";
      MAIN_CONTENTS.querySelector('#list_body').innerHTML = listHTML;
    });

  paginator(cur_page, total_page);

}

// 서명등록, 결재선 머지문 작성, 결재, 반려, 전결, 대결

const docApprove = async (A, B, C) => {

  let data = {
    docNo: A,
    aplnMemNo: B,
    atgrphImg: C
  }

  return await axios.post('/synerhub/document/approve', data, axiosHeaderJson);
}

// 메인페이지의 기본형태를 구현함 
// async await를 사용해 의도적으로 동기 처리함
const docMyMainPageRender = async () => {

  // synerhubch : 채널 번호
  // synerhubth : 스레드 번호
  let data = {
    synerhub1: MEM_NO,
    synerhub2: synerhubch,
    synerhub3: synerhubth
  };

  // 가독성을 높이기 위해 res에 데이터를 담아줌
  let res = await axios.post('/synerhub/document/main', data, axiosHeaderJson);
  // console.log(res.data);

  // 문서 목록별로 리스트를 분할
  let onGoingList = res.data.onGoingList;
  let toApproveList = res.data.toApproveList;
  let rejectedList = res.data.rejectedList;
  let returnedList = res.data.returnedList;

  // 문서함의 기본 틀이되는 마크업코드 
  pageHTML = `      
      <div class="mb-3 overflow-hidden position-relative">
        <div class="px-3">
          <h4 id="current_menu" class="fs-6 mb-0">전자결재</h4>
          <nav aria-label="breadcrumb">
            <ol id="crumbList" class="breadcrumb mb-0">
              <li class="breadcrumb-item">내 문서함</li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="container">
        <div class="card" style="height: auto; padding: 0;">
		  <div id="docMenuBar" class="card-body" style="margin: 0; padding: 0;">
		    <!-- 내용 추가 -->
		  </div>
		</div>

        <div id="docMainPage">
          <div class="row row-cols-1 gx-5 gy-5">
          	<div style="width : 50%">
	            <div class="card col">
	              <div class="card-head h-2">
	                <table class="table">
	                  <tr>
	                    <th class="col">
	                      결재할 문서
	                    </th>
	                    <th class="col">
	                      총 건수 : ${toApproveList.total}
	                    </th>
	                  </tr> 
	                </table>
	              </div>
	              <div class="card-body h-25 overflow-hidden">
	                <table class="table table-bordered table-hover" style="width: 100%; table-layout: auto; overflow: hidden;">
	                  <thead class="table-primary">
	                    <tr>
	                      <th> 
	                        결재 문서
	                      </th>
	                      <th class="text-center" style="width: 100px;">
	                        기안자
	                      </th>
	                      <th class="text-center" style="width: 130px;">
	                        등록일
	                      </th>
	                    </tr>
	                  </thead>
	                  <tbody id="toApproveList">
	                  </tbody>
	                </table>
	              </div>
	            </div>
            </div>
            <div style="width : 50%">
	            <div class="card col">
	              <div class="card-head h-2">
	                <table class="table">
	                  <tr>
	                    <th scope="col">
	                      결재 진행 현황
	                    </th>
	                    <th class="text-center" scope="col">
	                      총 건수 : ${onGoingList.total}
	                    </th>
	                  </tr>
	                </table>
	              </div>
	              <div class="card-body h-25">
	                <table class="table table-bordered table-hover">
	                  <thead class="table-primary">
	                    <tr>
	                      <th >
	                        결재 문서
	                      </th>
	                      <th class="text-center">
	                        현재 결재자
	                      </th>
	                      <th class="text-center">
	                        등록일
	                      </th>
	                    </tr>
	                  </thead>
	                  <tbody id="onGoingList">
	                  </tbody>
	                </table>
	              </div>
	            </div>
            </div>
            <div style="width : 50%">
	            <div class="card col">
	                <table class="table">
	                  <tr>
	                    <th class="col">
	                      반려된 문서
	                    </th>
	                    <th class="col">
	                      총 건수 : ${rejectedList.total}
	                    </th>
	                  </tr>
	                </table>
	              <div class="card-body h-25">
	                <table class="table table-bordered table-hover">
	                  <thead class="table-primary">
	                    <tr>
	                      <th>
	                        결재 문서
	                      </th>
	                      <th class="text-center">
	                        등록일
	                      </th>
	                    </tr>
	                  </thead>
	                  <tbody id="rejectedList">
	                  </tbody>
	                </table>
	              </div>
	            </div>
            </div>
            <div style="width : 50%">
	            <div class="card col">
	              <div class="card-head h-2">
	                <table class="table">
	                  <tr>
	                    <th class="col">
	                      회수한 문서
	                    </th>
	                    <th class="col">
	                      총 건수 : ${returnedList.total}
	                    </th>
	                  </tr>
	                </table>
	              </div>
	              <div class="card-body h-25">
	                <table class="table table-bordered table-hover">
	                  <thead class="table-primary">
	                    <tr>
	                      <th>
	                        결재 문서
	                      </th>
	                    </tr>
	                  </thead>
	                  <tbody id="returnedList">
	                  </tbody>
	                </table>
	              </div>
	            </div>
            </div>
          </div>
        </div>
      </div>
  `;

  // 마크업 코드 외 상호작용 할 요소들을 만듬
  // navbar는 문서목록 바로가기 네비게이션
  let navbar = document.createElement('nav');
  let conFluid = document.createElement('div');
  // 내 결재함 페이지 바로가기 버튼
  let menuDocMyMainPageBtn = document.createElement('a');
  menuDocMyMainPageBtn.addEventListener('click', () => {
    docMyMainPageRender();
  })
  menuDocMyMainPageBtn.className = "navbar-brand btn bg-primary-subtle text-primary";
  menuDocMyMainPageBtn.innerText = "내 결재함";
  let collapseDiv = document.createElement('div');
  // navbar에 들어갈 메뉴 목록
  let ul = `
  <ul class="nav nav-underline" id="myTab" role="tablist">
   <li class="nav-item me-2">
        <a class="nav-link" id="docInsert-tab" data-bs-toggle="tab" href="#docInsert" role="tab" aria-controls="docInsert" onclick="docInsertRenderCallback()">
            <span>문서 작성</span>
        </a>
    </li>
     <li class="nav-item me-2">
        <a class="nav-link" id="docApproval-tab" data-bs-toggle="tab" href="#docApproval" role="tab" aria-controls="docApproval" onclick="docApprovalCallback()">
            <span>결재할 문서</span>
        </a>
    </li>
    <li class="nav-item me-2">
        <a class="nav-link" id="docCurrent-tab" data-bs-toggle="tab" href="#docCurrent" role="tab" aria-controls="docCurrent" aria-expanded="true" onclick="docCurrentCallback()">
            <span>작성한 문서</span>
        </a>
    </li>
    <li class="nav-item me-2">
        <a class="nav-link" id="docRejected-tab" data-bs-toggle="tab" href="#docRejected" role="tab" aria-controls="docRejected" onclick="docRejectedCallback()">
            <span>반려된 문서</span>
        </a>
    </li>
    <li class="nav-item me-2">
        <a class="nav-link" id="docReturned-tab" data-bs-toggle="tab" href="#docReturned" role="tab" aria-controls="docReturned" onclick="docReturnedCallback()">
            <span>회수한 문서</span>
        </a>
    </li>
    <li class="nav-item me-2">
        <a class="nav-link" id="docComplete-tab" data-bs-toggle="tab" href="#docComplete" role="tab" aria-controls="docComplete" onclick="docCompleteCallback()">
            <span>결재 완료 문서</span>
        </a>
    </li>
  </ul>
  `;
  navbar.className = "navbar navbar-expand-lg";
  conFluid.className = "container-fluid";
  collapseDiv.className = "collapse navbar-collapse";

  collapseDiv.innerHTML = ul;
  conFluid.appendChild(menuDocMyMainPageBtn);
  conFluid.appendChild(collapseDiv);
  navbar.appendChild(conFluid);

  // MAIN_CONTENTS : 컨텐츠용 div
  // MAIN_CONTENTS div에 기본 페이지 요소를 렌더링함
  MAIN_CONTENTS.innerHTML = pageHTML;

  // 렌더링된 요소중 docMenuBar요소에 navbar요소 추가
  MAIN_CONTENTS.querySelector('#docMenuBar').appendChild(navbar);

  // 결재 진행중, 결재할 문서, 회수한 문서, 반려된 문서를 렌더링
  let onGoingListHTML = ``;
  if (onGoingList.list.length != 0) {
    onGoingList.list.forEach(doc => {
      onGoingListHTML += `
                        <tr onclick="docDetail(${doc.docNo})">
                          <td style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 250px;">
                            ${doc.docTtl}
                          </td>
                          <td class="text-center"> 
                            ${doc.aplnMemNm}
                          </td>
                          <td class="text-center">
                            ${doc.docRgdt.substring(0, 10)}
                          </td>  
                        </tr>  
      `;
    });
  } else {
    onGoingListHTML += `
    <tr>
      <td class="text-center" colspan="3">
        자료가 없습니다.
      </td>
    </tr>
`;
  }
  MAIN_CONTENTS.querySelector('#onGoingList').innerHTML = onGoingListHTML;

  let toApproveListHTML = ``;
  if (toApproveList.list.length != 0) {
    toApproveList.list.forEach(doc => {
      toApproveListHTML += `
                          <tr onclick="docDetail(${doc.docNo}, '${toApproveList.stat}')">
                            <td style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 250px;">
                              ${doc.docTtl}
                            </td>
                            <td class="text-center">
                              ${doc.chMemNm}
                            </td>
                            <td class="text-center">
                              ${doc.docRgdt.substring(0, 10)}
                            </td>
                          </tr>
      `;
    });
  } else {
    toApproveListHTML += `
        <tr>
          <td class="text-center" colspan="3">
            자료가 없습니다.
          </td>
        </tr>
    `;
  }
  MAIN_CONTENTS.querySelector('#toApproveList').innerHTML = toApproveListHTML;

  let returnedListHTML = ``;
  if (returnedList.list.length != 0) {
    returnedList.list.forEach(doc => {
      returnedListHTML += `
                          <tr onclick="docUpdate(${doc.docNo}, 'returned')">
                            <td style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 513px;">
                              ${doc.docTtl}
                            </td>
                          </tr>
      `;
    });
  } else {
    returnedListHTML += `
    <tr>
      <td class="text-center">
        자료가 없습니다.
      </td>
    </tr>
`;
  }
  MAIN_CONTENTS.querySelector('#returnedList').innerHTML = returnedListHTML;

  let rejectedListHTML = ``;
  if (rejectedList.list.length != 0) {
    rejectedList.list.forEach(doc => {
      rejectedListHTML += `
                          <tr onclick="docUpdate(${doc.docNo}, 'rejected')">
                            <td style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; max-width: 250px;">
                              ${doc.docTtl}
                            </td>
                            <td class="text-center">
                              ${doc.docRgdt.substring(0, 10)}
                            </td>
                          </tr>
      `;
    });
  } else {
    rejectedListHTML += `
    <tr>
      <td class="text-center" colspan="2">
        자료가 없습니다.
      </td>
    </tr>
`;
  }
  MAIN_CONTENTS.querySelector('#rejectedList').innerHTML = rejectedListHTML;
};

// const docReject = async (A, B) => {

// }

const docApproveAll = async (A, B) => {
  data = {
    memNo: MEM_NO
  }
  let res = await axios.post('/synerhub/autograph/getautograph', data, axiosHeaderJson)

}

// 문서 목록이 표시될 표를 만들어주는 함수 (tabName에는 어떤 문서함인지에 대한 문자열이 들어간다.)
const docListTableCreator = (tabName) => {

  if (!MAIN_CONTENTS.querySelector('.list-table')) {
    let list_table = `
      <div class="mb-3 overflow-hidden position-relative">
        <div class="px-3">
          <h4 id="current_menu" class="fs-6 mb-0"></h4>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item"></li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="list-table">
        <div class="card">
          <div class="card-body p-3">
            <div class="card-body">
              <div class="justify-content-between align-items-center">
                <div class="row">
                  <div class="col-6">
                    <h3 id="tabName">${tabName}</h3>
                  </div>
                  <div class="col-3 h-2">
                    <table id="pjtHeadTable" class="table">
                    </table>
                  </div>
                  <div class="col-3">
                    <div class="input-group" id="divSearchElement">
                      <button id="search-icon" onclick="buttonDropdown('divSearchElement')" class="btn bg-primary-subtle text-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        제목
                      </button>
                      <div class="dropdown-menu" style="">
                        <a class="dropdown-item" href="javascript:searchSelecting('title')">제목</a>
                        <a class="dropdown-item" href="javascript:searchSelecting('name')">이름</a>
                      </div>
                      <input type="text" id="searchWord" class="form-control" aria-label="Text input with dropdown button">
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="table-responsive border rounded">
              <table class="table align-middle table-hover text-nowrap mb-0">
                <thead class="table-primary" id="list_head">
                </thead>
                <tbody id="list_body">
                </tbody>
            </table>
          </div>
            <div class="d-flex align-items-center justify-content-end py-1" >
              <p class="mb-0 fs-2">페이지당 자료수:</p>
              <select id="row-max" class="form-select w-auto ms-0 ms-sm-2 me-8 me-sm-4 py-1 pe-7 ps-2 border-0" aria-label="Default select example"  style="cursor: pointer">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
              </select>
              <div id="div-pagenation" class="align-items-center">
              </div>
            </div>
        </div>
      </div>
    </div>`;
    MAIN_CONTENTS.querySelector('#docMainPage').innerHTML = list_table;
    searchActivate();
    rowBtnActivate();
  } else {
    MAIN_CONTENTS.querySelector('#tabName').innerText = tabName;
  }
}

const docChMainPageRender = async () => {
  let res = await axios.post('/synerhub/document/channelMain/' + synerhubch, axiosHeaderJson);

  console.log(res);

}