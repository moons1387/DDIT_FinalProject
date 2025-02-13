var pjtListScope;

// 차트 색상
const barBGColors = [  
  "rgba(255,0,0,0.3)",    // 빨강
  "rgba(0,255,0,0.3)",    // 초록
  "rgba(0,0,255,0.3)",    // 파랑
  "rgba(255,255,0,0.3)",  // 노랑
  "rgba(0,255,255,0.3)",  // 청록
  "rgba(255,0,255,0.3)",  // 자홍
  "rgba(128,0,0,0.3)",    // 진한 빨강
  "rgba(0,128,0,0.3)",    // 진한 초록
  "rgba(0,0,128,0.3)",    // 진한 파랑
  "rgba(128,128,0,0.3)",  // 진한 노랑
  "rgba(0,128,128,0.3)",  // 진한 청록
  "rgba(128,0,128,0.3)",  // 진한 자홍
  "rgba(0,0,0,0.3)"       // 검정
  ]
const barBDColors = [ 
  "rgb(255,0,0)",
  "rgb(0,255,0)",
  "rgb(0,0,255)",
  "rgb(255,255,0)",
  "rgb(0,255,255)",
  "rgb(255,0,255)",
  "rgb(128,0,0)",
  "rgb(0,128,0)",
  "rgb(0,0,128)",
  "rgb(128,128,0)",
  "rgb(0,128,128)",
  "rgb(128,0,128)",
  "rgb(0,0,0)"
]

// 메뉴 히스토리
let crumble;

// 프로젝트 세부 검색 분기
let searchDetailFlag = false;

// 프로젝트 세부 분기
let flagProjectDetail = false;

// 프로젝트 번호
var pdnpt;

// 뒤로가기용 html;
var previous_html;

// 프로젝트 첨부파일
var pjtFiles = [];

// 버튼이 있다면 버튼요소를 담는다.
let myPjtMainBtn = document.querySelector('#myPjtMainBtn') == null ? null : document.querySelector('#myPjtMainBtn');
// 버튼이 있다면 버튼 요소를 담는다.
let pjtInsertBtn = document.querySelector('#pjtInsert') == null ? null : document.querySelector('#pjtInsert');
// 버튼이 있다면 버튼 요소를 담는다.
let pjtProgressBtn = document.querySelector('#pjtProgress') == null ? null : document.querySelector('#pjtProgress');
// 버튼이 있다면 버튼 요소를 담는다.
let pjtCompleteBtn = document.querySelector('#pjtComplete') == null ? null : document.querySelector('#pjtComplete');
// 버튼이 있다면 버튼 요소를 담는다.
let pjtAbortBtn = document.querySelector('#pjtAbort') == null ? null : document.querySelector('#pjtAbort');

// 프로젝트 페이지를 출력하는 함수를 호출함
myPjtMainBtn.addEventListener('click', () => {
  myPjtMainCallback();
});

const myPjtMainCallback = async () => {
  cur_page = 1;
  max_row = 10;
  // 프로젝트 페이지를 출력함
  pjtMainPageRender('프로젝트 목록');
  MAIN_CONTENTS.querySelector('#tapName').innerText = '프로젝트 목록';
  // 파라미터값에 따라 리스트를 받아옴
  let res = await listGetter(null, null, null, max_row, cur_page);
  // 리스트를 출력하는 함수에 받아온 리스트를 파라미터로 넘김
  pjtListRender(res, 'main');
}

// 진행중인 프로젝트를 조회하는 함수를 호출
pjtProgressBtn.addEventListener('click', async () => {
  pjtProgressCallback();
});

// 진행중인 프로젝트를 조회함
const pjtProgressCallback = async () => {
  cur_page = 1;
  max_row = 10;
  // 프로젝트 기본페이지를 렌더링함
  pjtMainPageRender('진행 프로젝트 목록');
  MAIN_CONTENTS.querySelector('#tapName').innerText = '진행 프로젝트 목록';
  // 리스트를 요청함
  let res = await listGetter(null, null, 'PJST00', max_row, cur_page);
  // 받은 결과를 리스트 렌더로 넘김
  pjtListRender(res, 'progress');
}

// 중단된 프로젝트를 조회하는 함수를 호출
pjtAbortBtn.addEventListener('click', async () => {
  pjtAbortCallback();
});
// 중단된 프로젝트를 조회함
const pjtAbortCallback = async () => {
  cur_page = 1;
  max_row = 10;
  pjtMainPageRender('중단 프로젝트 목록');
  MAIN_CONTENTS.querySelector('#tapName').innerText = '중단 프로젝트 목록';
  let res = await listGetter(null, null, 'PJST01', max_row, cur_page);
  pjtListRender(res, 'abort');
}
// 완료된 프로젝트를 조회하는 함수를 호출
pjtCompleteBtn.addEventListener('click', async () => {
  pjtCompleteCallback();
});
// 완료된 프로젝트를 조회함
const pjtCompleteCallback = async () => {
  cur_page = 1;
  max_row = 10;
  pjtMainPageRender('완료 프로젝트 목록');
  MAIN_CONTENTS.querySelector('#tapName').innerText = '완료 프로젝트 목록';
  let res = await listGetter(null, null, 'PJST02', max_row, cur_page);
  pjtListRender(res, 'complete');
}

// 프로젝트를 등록함
pjtInsertBtn.addEventListener('click', async () => {

  cur_page = 1;
  searchScope= 'projectDocSearch';
  // 등록페이지를 렌더링함
  pjtInsertPageRender();
  MAIN_CONTENTS.querySelector('#tapName').innerText = '프로젝트 등록';
  // let res = await docListGetter();
});

// 프로젝트 등록시 필요한 근거문서를 요청해 리턴함
const projectDocListGetter = async (curPage, searchWord) => {
  let data = {
    synerhub1: MEM_NO,
    synerhub2: synerhubch,
    rowCnt: 10,
    page: curPage,
    searchTitle: searchWord
  }

  let res = await axios.post('/synerhub/project/dataforinsert', data, axiosHeaderJson);
  return res;
}

// 프로젝트 등록 페이지를 출력함
// pjt(프로젝트) 파라미터가 있다면 수정 페이지
const pjtInsertPageRender = async (pjt) => {
  let data = {
    synerhub1: MEM_NO,
    synerhub2: synerhubch,
    rowCnt: max_row,
    page: cur_page
  }

  let date = new Date();

  let pjtNo
  if(pjt) {
    pjtNo = pjt.pjtNo;
  }

  const res = await projectDocListGetter(1);

  const total = res.data.total;
  const myInfo = res.data.channelMemberVO;
  const docData = res.data;
  // pjtMainPage란 id를 가진 요소가 없다면 해당 요소를 출력함
  if (!MAIN_CONTENTS.querySelector('#pjtMainPage')) {
    let pageHTML = `      
    <div class="mb-3 overflow-hidden position-relative">
      <div class="px-3">
        <h4 id="current_menu" class="fs-6 mb-0">프로젝트</h4>
        <nav aria-label="breadcrumb">
          <ol id="crumbList" class="breadcrumb mb-0">
            <li class="breadcrumb-item">채널 홈</li>
            <li class="breadcrumb-item">프로젝트</li>
            <li class="breadcrumb-item">프로젝트 등록</li>
          </ol>
        </nav>
      </div>
    </div>
    <div class="container">
      <div class="card" style="height: auto; padding: 0;">
        <div id="pjtMenuBar" class="card-body" style="margin: 0; padding: 0;">
        </div>
      </div>
      <div id="pjtMainPage">
      </div>
    </div>
    `;
    MAIN_CONTENTS.innerHTML = pageHTML;
  }
  // 등록을 위한 페이지 HTML
  let insertPageHTML = `
      <div id="pjtContainer">
        <div>
          <div class="card col">
            <div class="card-body">
              <div class="justify-content-between align-items-center">
                <div class="d-flex align-items-center justify-content-between mb-3">
                  <hr/>
                  <h3>프로젝트 등록</h3>
                  <hr/>
                  <div class="ms-auto flex-shrink-0">
                  </div>
                </div>
                <div class="card w-100">
                  <div class="card-body d-grid gap-3 text-center">
                    <div class="form-group">
                      <div class="form-floating">
              `;
  // pjt파라미터를 받았다면 수정을 위한 내용을 입력
  if (pjt) {
    insertPageHTML += `<input type="text" id="pjtTtl" value="${pjt.pjtTtl}" class="form-control doc-insert">`;
  } else {
    insertPageHTML += `<input type="text" id="pjtTtl" class="form-control doc-insert">`;
  }
  insertPageHTML += ` 
                      <label for="pjtTtl">제목</label>
                      </div>
                    </div>
                      <div class="row">    
                        <div class="col-3" style="margin-left: 18px">
                          <table id="tableWriter" class="table table-bordered table-light h-100 d-inline-block align-middle text-nowrap mb-0 col">
                            <tr>
                              <th colspan="2">작성자 정보</th>
                            </tr>
                            <tr>
                              <th class="w-30">스레드</th>
                              <td class="w-70">${myInfo.chMemThNm}</td>
                            </tr>
                              <th>직급</th>
                              <td>${myInfo.chRoleNm}</td>
                            </tr>
                              <th>등록자</th>
                              <td>${myInfo.chMemNm}</td>
                            </tr>
                            <tr>
                              <th>작성일</th>
                              <td>${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}</td>
                            </tr>
                          </table>
                        </div>
                        <div class="col-6 d-flex flex-row-reverse" style="margin-left: -40px;">
                          <table style="width:100%" id="tableDocument" class="table table-bordered table-light h-100 d-inline-block align-middle text-nowrap mb-0 col-12">
                            <tr>
                              <th class="col-12" colspan="2">문서 정보</th>
                            </tr>
                            <tr>
                              <th>문서 제목</th>
                              <td class="w-100"> </td>
                            <tr>
                              <th>결재자</th>
                              <td> </td>
                            </tr>
                            </tr>
                              <th>직급</th>
                              <td> </td>
                            </tr>
                            <tr>
                              <th>등록일</th>
                              <td> </td>
                            </tr>
                          </table>
                          <input type="hidden" id="document"/>
                        </div>
                        <div class="col-3">
                          <table class="table table-bordered table-light text-center h-100">
                            <tr style="height:46.4px">
                              <th>
                                참여자 정보
                              </th>
                            </tr>
                            <tr>
                              <th>
                                <ol id="projectMemberList">
                                </ol>
                              </th>
                            </tr>
                          </table>
                        </div>
                        <div class="col-3 mt-3">
                        </div>
                        <div class="col-6 d-flex justify-content-center mt-3">
                          <button type="button" class="btn bg-primary-subtle text-dark" data-bs-toggle="modal" data-bs-target="#with-grid-modal" style="margin-right: 35px">
                              근거문서 등록
                          </button>
                        </div>
                        <div class="col-3 d-flex justify-content-center mt-3">
                          <button type="button" class="btn bg-success-subtle text-dark" data-bs-toggle="modal" data-bs-target="#with-grid-modal2" style="margin-right: 40px" id="projectPayment">
                              참여자 등록
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="card-body d-grid gap-3">
                      <div>
                        내용
                      </div>
                      <div id="pjtEditor" class="form-group">
                      </div>
                      <div class="form-group mt-3">
                        파일 선택
                        <input class="form-control mt-3" type="file" id="formFileMultiple" multiple="">        
                      </div>
                      <div class="d-flex justify-content-end" id="divForBtns">

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

	        <!-- 근거문서 선택 모달 창 -->
	        <div class="modal fade" id="with-grid-modal" tabindex="-1" aria-labelledby="scroll-long-inner-modal" aria-hidden="true">
	          <div class="modal-dialog modal-dialog-scrollable modal-lg">
	            <div class="modal-content">
	              <div class="modal-header d-flex align-items-center">
	                <h4 class="modal-title" id="myLargeModalLabel">
	                  	근거문서 선택
	                </h4>
	                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	              </div>
	              <div class="modal-body">
	                <div class="container-fluid">
	                  <div class="row justify-content-center">
	                    <div class="col">
	                      <div class="mb-3 d-flex justify-content-end">
                          <div class="input-group" style="height: 40px; width: 330px;">
                              <input type="text" id="docTitleSearch" class="form-control" placeholder="문서 제목 검색..." style="height: 100%;" />
                              <button id="docTitleSearchBtn" class="btn bg-info-subtle text-info d-flex align-items-center" type="submit" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px; height: 100%;">
                                  <i class="ti ti-search fs-6"></i>
                              </button>
                          </div>
	                      </div>
	                    </div>
	                  </div>
	                  <div class="d-flex pt-3 justify-content-center">
                      <div class="col" style="width: 100%; height:50vh;">
                        <div class="tab-content" id="nav-tabContent" style="height: 100%;">
                          <table class="table table-bordered table-hover">
                            <thead class="table-primary" style="display:table; width:100%;">
                            <tr>
                                <th class="text-center">
                                      문서 제목
                                </th>
                                <th class="text-center" style="width:130px;">
                                      작성자
                                </th>
                                <th class="text-center" style="width:130px;">
                                      결재자
                                </th>
                                <th class="text-center" style="width:130px;">
                                      등록일
                                </th>
                            </tr>
                            </thead>
                            <tbody style="display:block; max-height:400px; overflow-y:scroll;" id="docSelector">
                            </tbody>
                          </table>
                          <div id="div-pagenation">
                          </div>
                          <div class="d-flex justify-content-center">
                            <button id="endDocList" type="button" class="btn bg-primary-subtle text-primary me-2 waves-effect text-start" data-bs-dismiss="modal">
                                확인
                            </button>
                            <button type="button" class="btn bg-danger-subtle text-danger  waves-effect text-start" data-bs-dismiss="modal">
                                취소
                            </button>
                          </div>
                        </div>
                        <div class="modal-footer justify-content-center">
                        </div>
                      </div>
	                  </div>
	                </div>
	              </div>
	            </div>
	          </div>
	        </div>
	        <!-- 근거문서 선택 모달 창 끝 -->

 	        <!-- 프로젝트 참가인원 선택 모달 창 -->
	        <div class="modal fade" id="with-grid-modal2" tabindex="-1" aria-labelledby="scroll-long-inner-modal" aria-hidden="true">
	          <div class="modal-dialog modal-dialog-scrollable modal-xl">
	            <div class="modal-content">
	              <div class="modal-header d-flex align-items-center">
	                <h4 class="modal-title" id="myLargeModalLabel">
	                  	프로젝트 멤버 선택
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
                                <div class="col-md-4 col-12 mb-4 mb-md-0" style="overflow-y: auto">
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
	                            <label class="form-label">프로젝트 참여 인원</label>
	                            <div class="btn-group" role="group" style="margin: 0;">
	                                <button type="button" class="btn bg-primary-subtle btn-sm text-primary" style="margin-right: -1px;">
	                                    <i class="ti ti-caret-down"></i>
	                                </button>
	                                <button type="button" class="btn bg-primary-subtle btn-sm text-primary">
	                                    <i class="ti ti-caret-up"></i>
	                                </button>
	                            </div>
	                        </div>
	                        <select multiple class="form-control" id="selectedMember" style="height: 365px;">



	                        </select>
	                      </div>
	                    </div>
	                  </div>
	
	                </div>
	              </div>
	
	              <div class="modal-footer justify-content-center">
                  <button id="selectComplete" type="button" class="btn bg-primary-subtle text-primary  waves-effect text-start me-2" data-bs-dismiss="modal">
                      확인
                  </button>
	                <button type="button" class="btn bg-danger-subtle text-danger  waves-effect text-start" data-bs-dismiss="modal">
	                  	취소
	                </button>
	              </div>
	            </div>
	          </div>
	        </div>
	        <!-- 프로젝트 참가인원 선택 모달 창 끝 -->
  `;

  MAIN_CONTENTS.querySelector('#pjtMainPage').innerHTML = insertPageHTML;
  let total_page = Math.ceil(total / 15);
  paginator(cur_page, total_page);
  // 검색기의 범위를 프로젝트 근거문서로 설정함
  searchScope = 'projectDocSearch';
  // 프로젝트 근거문서를 출력함
  projectDocListRender(docData);

  // 검색기의 event파라미터(key)를 받아오기 위해 무명함수로 작성함
  MAIN_CONTENTS.querySelector('#docTitleSearch').addEventListener('keyup', async function(key){
    if(key.keycode == '13'){
      cur_page = 1;
      // 근거문서를 요청해 결과를 받음
      let res = await projectDocListGetter(cur_page, this.value);
      let docData = res.data;
      // 해당 결과를 출력함
      projectDocListRender(docData);
    }
  });

  // 문서 제목을 검색함
  MAIN_CONTENTS.querySelector('#docTitleSearchBtn').addEventListener('click',async function(){
    cur_page = 1;
    // 검색된 결과를 받음
    let res = await projectDocListGetter(cur_page, MAIN_CONTENTS.querySelector('#docTitleSearch').value);
    let docData = res.data;
    // 결과를 출력함
    projectDocListRender(docData);
  });

  // Toast Editor
  let el = MAIN_CONTENTS.querySelector('#pjtEditor');
  if (pjt) {
    let content = await pjt.pjtConts;
    editor = new Editor({
      el: el,
      height: '500px',
      initialEditType: 'markdown',
      previewStyle: 'tab',
      initialValue: content,
      hooks: {
        // 이미지는 서버에 저장 후 경로를 받아 출력함
        addImageBlobHook: async (blob, imgLoader) => {
          let formData = new FormData();
          formData.append('fileList', blob);
          formData.append('folderName', 'pjtContsImg/' + synerhubch);
          let res = await axios.post('/synerhub/fileio/uploadeditor', formData, axiosHeaderFile)
          imgLoader(res.data, 'IMG');
        }
      }
    });
  } else {
    editor = new Editor({
      el: el,
      height: '500px',
      initialEditType: 'WISIWYG',
      previewStyle: 'tab',
      hooks: {
        addImageBlobHook: async (blob, imgLoader) => {
          let formData = new FormData();
          formData.append('fileList', blob);
          formData.append('folderName', 'pjtContsImg/' + synerhubch);
          let res = await axios.post('/synerhub/fileio/uploadeditor', formData, axiosHeaderFile)
          imgLoader(res.data, 'IMG');
        }
      }
    });
  }
  editor.getMarkdown();

  // 하위업무 관련 맴버 목록을 받아오는 함수를 호출
  let listRes = await projectSubworkMemberList();
  // 맴버를 select요소에 출력함
  listRes.data.forEach(mem => {
    $("select[id=thMemSelect]").append(`<option value="${mem.memNo}"><p id="chRoleNm">${mem.chRoleNm}</p>&emsp;<p id="chMemNm">${mem.chMemNm}</p>&emsp;<p id="chMemThNm">${mem.chMemThNm}</p></option>`);
  })

  // 문서의 결재선 선택과 동일한 로직
  var multiSelectoptionsValue = [];

  $(document).on("dblclick", "#thMemSelect option", function() {
    $("#inMem").click();
  }); 

  $(document).on("dblclick", "#selectedMember option", function() {
    $("#outMem").click();
  }); 

  $("#inMem").on("click", function () {
    let options = $("select[id=thMemSelect] option:selected")

    for (let i = 0; i < options.length; i++) {
      let val = options.eq(i).val();
      listRes.data.forEach(mem => {
        if (mem.memNo == val && multiSelectoptionsValue.indexOf(val) < 0) {
          $("select[id=selectedMember]").append(`<option value="${mem.memNo}"><p id="chRoleNm">${mem.chRoleNm}</p>&emsp;<p id="chMemNm">${mem.chMemNm}</p>&emsp;<p id="chMemThNm">${mem.chMemThNm}</p></option>`);
          multiSelectoptionsValue.push(val);
        }
      });
    }
  });

  $("#outMem").on("click", function () {
    let options = $("select[id=selectedMember] option:selected")

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
  });

  // 선택이 완료된 맴버를 프로젝트 페이지에 출력함
  MAIN_CONTENTS.querySelector('#selectComplete').addEventListener('click', () => {
    let options = MAIN_CONTENTS.querySelector('#selectedMember').querySelectorAll('option');
    options.forEach(option => {
      let ps = option.querySelectorAll('p');
      let li = document.createElement('li');
      let icon = document.createElement('iconify-icon')
      // dataset에 필요한 정보를 입력함
      li.setAttribute('data-memno', option.value);
      li.setAttribute('data-chrolenm', ps[0].innerText);
      li.setAttribute('data-chmemnm', ps[1].innerText);
      li.setAttribute('data-chmemthnm', ps[2].innerText);
      li.innerText = `${ps[2].innerText} ${ps[1].innerText}(${ps[0].innerText})`;

      icon.setAttribute('icon', "akar-icons:cross");
      icon.style.color = "#ff0000";
      icon.style.cursor = "pointer";
      // x 아이콘을 클릭하면 맴버가 빠짐
      icon.addEventListener('click', function () {
        li.remove();
      });

      li.appendChild(icon);

      MAIN_CONTENTS.querySelector('#projectMemberList').appendChild(li);

    });
  });

  let inputFile = MAIN_CONTENTS.querySelector('#formFileMultiple')
  // 첨부파일이 등록되면 파일배열에 추가함
  inputFile.addEventListener('change', (event) => {
    pjtFiles = [];
    let getFiles = event.target.files;
    // foreach를 사용하기 위해 Array로 event속 객체를 배열로 취급함
    Array.from(getFiles).forEach((file) => {
      pjtFiles.push(file);
    });
  });

  let insertBtn = document.createElement('button');
  let cancelBtn = document.createElement('button');
//  let tempBtn = document.querySelector('button');

  insertBtn.className = "btn bg-primary-subtle text-primary  waves-effect text-start";
  insertBtn.innerText = "등록";
  // 등록버튼을 눌러 프로젝트를 등록함
  insertBtn.addEventListener('click', async () => {
    let data = {
      chNo:synerhubch,
      thNo:synerhubth,
      pjtMngr:MEM_NO,
      pjtMngrNm:MAIN_CONTENTS.querySelector('#tableWriter').querySelectorAll('td')[2].innerText
    };

    let pgVO = {
      groupMngr: data.Mngr
    }

    data['pgVO'] = pgVO;

    let pjtTtl = MAIN_CONTENTS.querySelector('#pjtTtl');
    let pjtDoc = MAIN_CONTENTS.querySelector('#tableDocument');
    let pjtMem = MAIN_CONTENTS.querySelector('#projectMemberList').querySelectorAll('li');

    // 요청 전 유효성 검사
    if (!pjtTtl.value) {
      Swal.fire('제목을 입력하세요.');
      pjtTtl.focus();
    } else {
      data['pjtNm'] = pjtTtl.value;
    }
    // 근거문서를 선택하지 않으면 프로젝트 등록이 불가능함
    if(!pjtDoc.dataset.docno > 0) {
      Swal.fire('근거문서를 선택하세요.');
    } else {
      data['docNo'] = pjtDoc.dataset.docno;
    }
    // 참여자를 선택하지 않으면 프로젝트 등록이 불가능함
    if(!pjtMem.length) {
      Swal.fire('프로젝트 참여자를 선택하세요.');
    } else {
      let pgmList = [];
      pjtMem.forEach(li => {
        let mem = {
          memNo: li.dataset.memno,
          chMemNm: li.dataset.chmemnm,
          chRoleNm: li.dataset.chrolenm,
          chMemThNm: li.dataset.chmemthnm
        }
        pgmList.push(mem);
      });
      data['pgmList'] = pgmList;
    }

    if (editor.getHTML() === '<p><br></p>') {
      editor.focus();
      Swal.fire('내용을 입력하세요.');
      return;
    } else {
      data['conts'] = editor.getMarkdown();
    }

    let res;
    // 첨부파일은 먼저 서버에 등록한 후 키값을 받음
    if (pjtFiles.length != 0) {
      let formData = new FormData();
      pjtFiles.forEach(file => formData.append('fileList', file))
      formData.append('folderName', 'pjt');
      res = await axios.post('/synerhub/fileio/upload', formData, axiosHeaderFile);
    }
    // 수정일 경우 pjtNo를 data에 추가함
    data['pjtNo'] = pjtNo == null ? null : pjtNo;
    // 키값을 받았다면 data에 추가함
    if(res) {
      data['atchFileId'] = res.data;
    }

    // 프로젝트를 등록한 후 해당 프로젝트의 키값을 받음
    res = await axios.post('/synerhub/project/insert', data, axiosHeaderJson);

    let newPjtData = {
      // 키값을 새 data 객체에 담음
      synerhub1: res.data,
      synerhub2: synerhubch,
      rowCnt: 10,
      page: 1
    }

    if(res){
      // 새 data 객체를 파라미터로 넘겨 세부페이지를 출력함
      projectDetailPageRender(newPjtData, 'onGoing');
    } else {
      Swal.fire('에러. 잠시후에 다시 시도하세요');
    }
  });

  cancelBtn.className = "btn bg-danger-subtle text-danger ms-3  waves-effect text-start";
  cancelBtn.innerText = "취소";
  // 취소버튼을 누르면 목록으로 돌아감
  cancelBtn.addEventListener('click', () => {
    pjtMainPageRender('프로젝트 목록');
    let res = listGetter(searchWord, null, stat, max_row, cur_page);
    pjtListRender(res.data);
  });

//  tempBtn.className = "btn bg-save-subtle text-dark  waves-effect text-start";
//  tempBtn.innerText = "임시저장";
//  tempBtn.addEventListener('click', () => {
//    console.log('temp');
//  });

  let divForBtns = MAIN_CONTENTS.querySelector('#divForBtns');
  // 버튼 요소들을 출력함
  divForBtns.appendChild(insertBtn);
  divForBtns.appendChild(cancelBtn);

}

// 프로젝트에 추가할 근거문서를 출력함
const projectDocListRender = (docData) => {
  MAIN_CONTENTS.querySelector('#docSelector').innerHTML = "";

  let docList = docData.list;
  // 파라미터로 받은 근거문서들을 표 형태로 만들고 dataset 속성에 필요 정보를 저장함
  docList.forEach(doc => {
    let tr = document.createElement('tr');
    tr.setAttribute('data-no', doc.docNo);
    tr.setAttribute('data-ttl', doc.docTtl);
    tr.setAttribute('data-memnm', doc.aplnMemNm);
    tr.setAttribute('data-memrole', doc.chRoleNm);
    tr.setAttribute('data-rgdt', doc.docRgdt.substring(0, 10));
    tr.setAttribute('data-docno', doc.docNo);
    tr.setAttribute('data-bs-dismiss', 'modal');
    tr.style.display = "table";
    tr.style.width = "100%";
    tr.style.cursor = "ponter;"

    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');

    td1.innerText = doc.docTtl;
    td2.style.width = "130px";
    td2.className = "text-center";
    td2.innerText = doc.chMemNm;
    td3.style.width = "130px";
    td3.className = "text-center";
    td3.innerText = doc.aplnMemNm;
    td4.style.width = "118px";
    td4.className = "text-center";
    td4.innerText = doc.docRgdt.substring(0, 10);

    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    tr.appendChild(td4);

    // tr요소를 클릭하면 해당 요소의 dataset을 조회하여 근거문서를 선택함
    tr.addEventListener('click', function () {
      let table = MAIN_CONTENTS.querySelector('#tableDocument');
      let tds = table.querySelectorAll('td');
      tds[0].innerText = this.dataset.ttl;
      tds[1].innerText = this.dataset.memnm;
      tds[2].innerText = this.dataset.memrole;
      tds[3].innerText = this.dataset.rgdt;
      table.setAttribute('data-docno', this.dataset.docno);
    });

    MAIN_CONTENTS.querySelector('#docSelector').appendChild(tr);
  });
  // 근거문서는 15개 단위로 페이징
  total_page = Math.ceil(docData.total/15);
  paginator(cur_page, total_page);
}

// 프로젝트에 선택할 참가자 목록을 리턴함
const projectSubworkMemberList = async () => {

  let data = {
    chNo: synerhubch,
    thNo: synerhubth,
    memNo: MEM_NO
  }

  let res = await axios.post('/synerhub/document/autographerlist', data, { headers: { [header]: token, "Content-Type": "application/json" } })
  return res;

}

// 프로젝트 메인페이지를 출력함
const pjtMainPageRender = (tabName) => {
  // 메인페이지 기본 툴 HTML
  if (!MAIN_CONTENTS.querySelector('#pjtMainPage')) {
    let pageHTML = `      
        <div class="mb-3 overflow-hidden position-relative">
          <div class="px-3">
            <h4 id="current_menu" class="fs-6 mb-0">프로젝트</h4>
            <nav aria-label="breadcrumb">
              <ol id="crumbList" class="breadcrumb mb-0">
                <li class="breadcrumb-item">채널 홈</li>
                <li class="breadcrumb-item">프로젝트</li>
              </ol>
            </nav>
          </div>
        </div>
        <div class="container">
          <div class="card" style="height: auto; padding: 0;">
            <div id="pjtMenuBar" class="card-body" style="margin: 0; padding: 0;">
            </div>
          </div>
          <div id="pjtMainPage">
          </div>
        </div>
    `;
    MAIN_CONTENTS.innerHTML = pageHTML;
  }

  let tablePageHTML = `
          <div id="pjtContainer">
          	<div>
	            <div class="card col">
                <div class="card-body">
                  <div class="justify-content-between align-items-center">
                    <div class="row">
                      <div class="col-6">
                        <h3 id="tapName">${tabName}</h3>
                      </div>
                      <div class="col-3 h-2">
                        <table class="table-primary" id="pjtHeadTable" class="table">
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
	              <div class="card-body pt-0 pb-0 overflow-auto">
	                <table class="table table-bordered table-hover">
	                  <thead class="table-primary" id="pjtHead">
	                  </thead>
	                  <tbody id="pjtBody">
	                  </tbody>
	                </table>
	              </div>
                <div class="card-body">
                  <div class="d-flex align-items-center justify-content-end py-1">
                    <p class="mb-0 fs-2">페이지당 자료수:</p>
                    <select id="row-max" class="form-select w-auto ms-0 ms-sm-2 me-8 me-sm-4 py-1 pe-7 ps-2 border-0" aria-label="Default select example">
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                    </select>
                    <div id="div-pagenation">
                    </div>
                  </div>
                </div>
	            </div>
            </div>
          </div>
  `;

  MAIN_CONTENTS.querySelector('#pjtMainPage').innerHTML = tablePageHTML;
  // 프로젝트 메인페이지 네비게이션 바를 출력함
  if (!MAIN_CONTENTS.querySelector('#pjtInsertTab')) {
    let navbar = document.createElement('nav');
    let conFluid = document.createElement('div');
    let menuPjtMainPageBtn = document.createElement('a');
    menuPjtMainPageBtn.addEventListener('click', () => {
      myPjtMainCallback();
    });
    menuPjtMainPageBtn.className = "navbar-brand btn bg-primary-subtle text-primary";
    menuPjtMainPageBtn.innerText = "프로젝트";
    let collapseDiv = document.createElement('div');
    let ul = `
    <ul class="nav nav-underline" id="myTab" role="tablist">
    <li class="nav-item me-2">
          <a class="nav-link" id="pjtInsertTab" data-bs-toggle="tab" href="#pjtInsert" role="tab" aria-controls="pjtInsert" onclick="pjtInsertPageRender()">
              <span>프로젝트 등록</span>
          </a>
      </li>
      <li class="nav-item me-2">
          <a class="nav-link" id="pjtProgressTab" data-bs-toggle="tab" href="#pjtProgress" role="tab" aria-controls="pjtProgress" onclick="pjtProgressCallback()">
              <span>진행 프로젝트</span>
          </a>
      </li>
      <li class="nav-item me-2">
          <a class="nav-link" id="pjtCompleteTab" data-bs-toggle="tab" href="#pjtComplete" role="tab" aria-controls="pjtComplete" onclick="pjtCompleteCallback()">
              <span>완료 프로젝트</span>
          </a>
      </li>
      <li class="nav-item me-2">
          <a class="nav-link" id="pjtAbortTab" data-bs-toggle="tab" href="#pjtAbort" role="tab" aria-controls="pjtAbort" onclick="pjtAbortCallback()">
              <span>중단 프로젝트</span>
          </a>
      </li>
    </ul>
    `;
    navbar.className = "navbar navbar-expand-lg";
    conFluid.className = "container-fluid";
    collapseDiv.className = "collapse navbar-collapse";

    collapseDiv.innerHTML = ul;
    conFluid.appendChild(menuPjtMainPageBtn);
    conFluid.appendChild(collapseDiv);
    navbar.appendChild(conFluid);

    MAIN_CONTENTS.querySelector('#pjtMenuBar').appendChild(navbar);
  }
};

// 프로젝트의 상태에 따른 목록을 출력
const pjtListRender = (res, sort) => {
  let sortWord;
  if (sort == 'main') {
    sortWord = '';
  } else if (sort == 'progress') {
    pjtListScope = 'progress';
    sortWord = '진행 중인';
  } else if (sort == 'abort') {
    pjtListScope = 'abort';
    sortWord = '중단된';
  } else if (sort == 'complete') {
    pjtListScope = 'complete';
    sortWord = '종료된';
  }
  const list = res.data.list;
  const total = res.data.total;
  let maker;
  if (list.pjtMngr == MEM_NO) {
    maker = true;
  }
  pjtHeadTableHTML = `
              <tr>
                <th class="col">
                  ${sortWord} 프로젝트
                </th>
                <th class="col">
                  총 건수 : ${total}
                </th>
              </tr>
  `;

  theadHTML = `
              <tr class="text-center">
                <th>
                  NO
                </th>
                <th>
                  프로젝트
                </th>
                <th>
                  담당자
                </th>
                <th>
                  등록일
                </th>
                <th class="text-center">
                  상태
                </th>
                <th class="text-center">
                  진행도
                </th>
              </tr>
  `;

  let tbodyHTML = ``;
  if (list != 0) {
    list.forEach(pjt => {
      
      let pjtSort;
      let pjtSortKr;
      // 프로젝트의 상태코드를 통해 진행상태를 출력함
      if(pjt.pjtStat == 'PJST00') {
        pjtSortKr = `진행중`;
        pjtSort = 'onGoing'
      } else if (pjt.pjtStat == 'PJST01') {
        pjtSortKr = `중단`;
        pjtSort = 'stopped'
      } else if (pjt.pjtStat == 'PJST02') {
        pjtSortKr = `완료`;
        pjtSort = 'completed'
      }

      tbodyHTML += `
              <tr onclick="listProjectDetail('${pjt.pjtNo}', '1', ${max_row}, '${pjt.pjtNm}', '${pjtSort}')">
                <td class="text-center" >
                  ${pjt.rnum}
                </td>
                <td>
                  ${pjt.pjtNm}
                </td>
                <td class="text-center" >
                  ${pjt.chMemNm}
                </td>
                <td class="text-center">
                  ${pjt.pjtRgdt.substring(0, 10)}
                </td class="text-center">
                <td>
                  ${pjtSortKr}
                </td>
                <td class="text-center">
                  ${pjt.prgrs}
                </td>
              </tr>
      `;
    });
  } else {
    tbodyHTML += `
    <tr>
      <td class="text-center" colspan="7">
        자료가 없습니다.
      </td>
    </tr>
    `;
  }

  MAIN_CONTENTS.querySelector('#pjtHeadTable').innerHTML = pjtHeadTableHTML;
  MAIN_CONTENTS.querySelector('#pjtHead').innerHTML = theadHTML;
  MAIN_CONTENTS.querySelector('#pjtBody').innerHTML = tbodyHTML;

}

// 프로젝트 목록을 파라미터에 맞추어 요청하고 데이터를 받아 리턴함
const listGetter = async (searchWord, searchTitle, stat, rowCnt, page) => {
  let data = {
    synerhub1: synerhubch,
    synerhub2: MEM_NO,
    searchWord: searchWord,
    searchTitle: searchTitle,
    stat: stat,
    rowCnt: rowCnt,
    page: page
  };

  let res = await axios.post('/synerhub/project/list', data, axiosHeaderJson);

  let total_page = Math.ceil(res.data.total / res.data.rowCnt);
  // 페이지네이터를 출력함
  paginator(cur_page, total_page);
  // 결과를 리턴함
  return res;
}

const creat_project = () => {
}
const creat_project_detail = () => {
}

// 프로젝트의 진행상황 변경을함
const status_project = (pjtNo, sort) => {
  // sort(문자열)와 pjtNo(프로젝트 키값)로 요청주소가 바뀜
  let url = '/synerhub/project/' + sort + '/' + pjtNo;

  let buttons = MAIN_CONTENTS.querySelectorAll('button');

  let trs = MAIN_CONTENTS.querySelectorAll('tr');

  let title = '';
  let text = '';
  let confirmButtonText = '';
  let confirmTitle = '';
  let confirmText = '';

  if (sort.indexOf('go') != -1) {
    title = '진행';
    text = '진행시키겠습니까?';
    confirmButtonText = '진행';
    confirmTitle = '진행';
    confirmText = '상태를 진행으로 변경하였습니다.';
  } else if (sort.indexOf('stop') != -1) {
    title = '중단';
    text = '중지시키겠습니까?';
    confirmButtonText = '중지';
    confirmTitle = '중단';
    confirmText = '상태를 중단으로 변경하였습니다.';
  } else if (sort.indexOf('terminate') != -1) {
    title = '완료';
    text = '완료시키겠습니까?';
    confirmButtonText = '완료';
    confirmTitle = '완료';
    confirmText = '상태를 완료로 변경하였습니다.';
  }

  Swal.fire({
    title: title,
    text: text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: confirmButtonText,
    cancelButtonText: "취소"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: confirmTitle,
        text: confirmText,
        icon: "success"
      });
      // get방식으로 쿼리스트링에 키값을 서버로 보냄
      axios.get(url)
        .then(res => {
          Swal.fire('변경이 완료되었습니다.');
          buttons[0].style.display = 'none';
          buttons[1].style.display = 'none';
          buttons[2].style.display = 'none';
          trs.forEach((tr, idx) => {
            if(idx != 0) {
              tr.removeAttribute('onclick');
              tr.style.cursor = "";
            }
          });
        })
        .catch(xhr => {
          Swal.fire('에러. 잠시후 다시 시도하세요.')
        })
    }
  });
}


// 프로젝트 목록을 생성한다.(현제 페이지, 목록 갯 수, 검색어)
// const listProject = (page, rowCnt, searchWord) => {

//   if (!synerhubch) {
//     return;
//   }

//   let data = {
//     synerhub1: MEM_NO,
//     synerhub2: synerhubch,
//     page: page,
//     rowCnt: rowCnt,
//   }

//   if (searchWord) {
//     if (searchTitleFlag) {
//       data.searchTitle = searchWord;
//     } else {
//       data.searchName = searchWord;
//     }
//   }

//   if (crumble) {
//     crumble = null;
//   }

//   listTableCreator();

//   MAIN_CONTENTS.querySelector('#current_menu').innerText = '프로젝트';
//   MAIN_CONTENTS.querySelector('.breadcrumb-item').innerText = '프로젝트 목록';

//   MAIN_CONTENTS.querySelector('thead').innerHTML = `
//                   <tr>
//                     <th scope="col">프로젝트</th>
//                     <th scope="col">담당자</th>
//                     <th scope="col">프로젝트 기안문</th>
//                     <th scope="col">시작일</th>
//                     <th scope="col">예상종료일</th>
//                     <th scope="col">종료일</th>
//                     <th scope="col">상태</th>
//                     <th scope="col">진행도</th>
//                     <th scope="col"></th>
//                   </tr>`;
//   axios.post('/synerhub/project/list', data, axiosHeaderJson)
//     .then(res => {
//       let total_page = Math.ceil(res.data.total / res.data.rowCnt);
//       let pjt_list = "";
//       if (res.data.list <= 0) {
//         pjt_list += `
//         <tr>
//           <td scope="row" class="text-center" colspan="9">배정된 프로젝트가 없습니다</td>
//         </tr>`;
//       } else {
//         res.data.list.forEach((pjt) => {
//           let strtDt = pjt.strtDt.substring(0, 10);
//           let estEndDt = pjt.estDtEnd.substring(0, 10);
//           let endDt = pjt.endDt == null ? '-' : pjt.endDt.substring(0, 10);
//           pjt_list += `
//                     <tr>
//                       <td scope="row"><a class="" onclick="listProjectDetail('${pjt.pjtNo}', '1', ${max_row}, '${pjt.pjtNm}')">
//                         ${pjt.pjtNm}</a>
//                       </td>
//                       <td scope="row"><a class="">
//                         ${pjt.mngrNm}</a>
//                       </td>
//                       <td scope="row"><a class="">
//                         ${pjt.docTtl}</a>
//                       </td>
//                       <td scope="row">
//                         ${strtDt}
//                       </td>
//                       <td scope="row">
//                         ${estEndDt}
//                       </td>
//                       <td scope="row">
//                         ${endDt}
//                       </td>
//                       <td scope="row">`;
//           if (pjt.pjtStat == "PJST00") {
//             pjt_list += `<span class="mb-1 badge text-bg-info">진행중</span>`;
//           } else if (pjt.pjtStat == "PJST01") {
//             pjt_list += `<span class="mb-1 badge text-bg-danger">중단</span>`;
//           } else {
//             pjt_list += `<span class="mb-1 badge text-bg-dark">종료</span>`;
//           }
//           pjt_list += `
//                       </td>
//                       <td scope="row">
//                         퍼센
//                       </td>`;
//           if (pjt.pjtMngr == MEM_NO) {

//             pjt_list += `<td>`;
//             if (pjt.pjtStat == "PJST00") {
//               pjt_list += `
//                       <div class="dropdown dropstart" id="projectStat${pjt.pjtNo}" onclick="projectToggle('projectStat${pjt.pjtNo}')">
//                         <a href="javascript:void(0)" class="text-muted" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
//                           <i class="ti ti-dots-vertical fs-5"></i>
//                         </a>
//                         <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="">
//                           <li>
//                             <a class="dropdown-item d-flex align-items-center gap-3" onclick="status_project(${pjt.pjtNo}, 'stop')">
//                               <i class="fs-4 ti ti-edit"></i>중단
//                             </a>
//                           </li>
//                           <li>
//                             <a class="dropdown-item d-flex align-items-center gap-3" onclick="status_project(${pjt.pjtNo}, 'terminate')">
//                               <i class="fs-4 ti ti-trash"></i>종료
//                             </a>
//                           </li>
//                         </ul>
//                       </div>`;
//             } else if (pjt.pjtStat == "PJST01") {
//               pjt_list += `
//                       <div class="dropdown dropstart" id="projectStat${pjt.pjtNo}" onclick="projectToggle('projectStat${pjt.pjtNo}')">
//                         <a href="javascript:void(0)" class="text-muted" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
//                           <i class="ti ti-dots-vertical fs-5"></i>
//                         </a>
//                         <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="">
//                           <li>
//                             <a class="dropdown-item d-flex align-items-center gap-3" onclick="status_project(${pjt.pjtNo},'go')">
//                               <i class="fs-4 ti ti-edit"></i>진행
//                             </a>
//                             <a class="dropdown-item d-flex align-items-center gap-3" onclick="status_project(${pjt.pjtNo}, 'terminate')">
//                               <i class="fs-4 ti ti-trash"></i>종료
//                             </a>     
//                           </li>
//                         </ul>
//                       </div>`;
//             } else {
//               pjt_list += `
//                       <div class="dropdown dropstart" id="projectStat${pjt.pjtNo}" onclick="projectToggle('projectStat${pjt.pjtNo}')">
//                         <a href="javascript:void(0)" class="text-muted" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
//                           <i class="ti ti-dots-vertical fs-5"></i>
//                         </a>
//                         <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="">
//                           <li>
//                             <a class="dropdown-item d-flex align-items-center gap-3" onclick="status_project(${pjt.pjtNo},'go')">
//                               <i class="fs-4 ti ti-edit"></i>진행
//                             </a>
//                           </li>
//                         </ul>
//                       </div>`;
//             }
//             pjt_list += `
//                       </td>`;
//           }
//           pjt_list += `</tr>`;
//         });
//       }
//       paginator(cur_page, total_page);

//       MAIN_CONTENTS.querySelector('#list_body').innerHTML = pjt_list;

//     });

// }

var pjtDtlNo;
var pdsMemNo;
var pdsMemNo2;
var labels = [];
var isPjtGoing;
var isPjtMember;
var isPjtMngr;


// 프로젝트 세부 페이지를 출력함
const projectDetailPageRender = async (data, sort) => {
  isPjtMember = null;
  isPjtMngr = null;
  isPjtGoing = null;
  // 프로젝트 세부 내용을 요청함
  let res = await axios.post('/synerhub/project/details', data, axiosHeaderJson);

  isPjtGoing;
  // 프로젝트VO를 꺼냄
  let pjt = res.data.projectVO;
  // 프로젝트의 상태코드로 진행중인지 판별한다.
  if(pjt.pjtStat == "PJST00") {
    isPjtGoing = true;
  }
  // 세부페이지 HTML
  let detailPageHTML = "";
  detailPageHTML = `
      <div class="row">
        <div class="col-lg-4">
            <div class="card">
              <div class="card-body">
                <div>
                  <h3 id="projectTitle">${pjt.pjtNm}</h3>
                </div>
                <canvas class="text-center" id="chartForProject">
                  진행도 차트
                </canvas>
                <div class="mt-5">
                  <div class="pb-1 mb-2 border-bottom">
                      <h6>세부사항</h6>
                  </div>
                  <ul>
                    <li class="py-2">
                    프로젝트 참가자
                      <ol class="py-2 fw-normal text-dark mb-0">
                    `;
  pjt.pgmList.forEach((pgm, idx) => {
    if(pgm.memNo == MEM_NO) {
      isPjtMember = true;
      if(idx == 0) {
        isPjtMngr = true;
      } else {
        isPjtMngr = false;
      }
    } 
      detailPageHTML += `<li>${pgm.chMemNm}(${pgm.chRoleNm})</li>`;
  });
  detailPageHTML += `
                      </ol>
                    </li>
                    등록일  
                    <li class="py-2 text-black">
                      ${pjt.pjtRgdt.substring(0, 10)}
                    </li>
                    관련근거
                    <li class="py-2 text-black">
                      ${pjt.docTtl}
                    </li>
                    내용 
                    <li class="py-2">
                      <div id="viewer">
                      </div>
                    </li>
                  </ul>
                  <div class="d-flex justify-content-end" id="divUpdateBtn">
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="col-lg-8">
            <div class="card">
              <div class="card-body">
                  <div class="row mb-4 pb-2 align-items-center">
                  <div class="col-8">
                    <h4 class="card-title mb-0">프로젝트 세부업무 진행현황</h4>
                  </div>
                  <div class="col-4 d-flex justify-content-end" id="newSubWorkInsertBtn">
 
                  </div>
                  </div>
                  <div class="table-responsive overflow-x-auto">
                    <table class="table table-bordered table-hover align-middle text-nowrap">
                      <thead class="table-primary">
                        <tr>
                          <th scope="col-2" class="text-center">담당자</th>
                          <th scope="col-2" class="text-center">대리자</th>
                          <th scope="col-6" class="text-center">업무</th>
                          <th scope="col-2" class="text-center">진행도</th>
                        </tr>
                      </thead>
                      <tbody id="projectSubWorkTable" class="border-top">
  
                      </tbody>
                    </table>
                  </div>
                  <div class="row mb-4 pb-2 align-items-center">
                    <div id="div-pagenation" class="col-10">
                    </div>
                    <div class="col-2" id="goBackBtn">
                    </div>
                  </div>
              </div>
            </div>
        </div>
      </div>


      	        <!-- 모달 창 -->
	        <div class="modal fade" id="with-grid-modal" tabindex="-1" aria-labelledby="scroll-long-inner-modal" aria-hidden="true">
	          <div class="modal-dialog modal-dialog-scrollable modal-md">
	            <div class="modal-content">
	              <div class="modal-header d-flex align-items-center">
	                <h4 class="modal-title" id="myLargeModalLabel">
	                  	업무등록
	                </h4>
	                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	              </div>
	              <div class="modal-body" style="height:450px;">
	                <div class="container">
                    <div class="form-floating">
                      <div class="mb-4">
                        <label for="subWorkTtl" class="mb-1">세부 업무 제목</label>
                        <input class="form-control" type="text" id="subWorkTtl" placeholer="세부 업무 제목">
                      </div>
                    </div>
                    <div class="form-floating">
                      <div class="mb-4">
                        <label for="subWorkConts" class="mb-1">세부 업무 내용</label>
                        <textarea class="form-control" id="subWorkConts" placeholer="세부 업무 내용" style="height:200px;"></textarea>
                      </div>
                    </div>
                    <div>
                      <label class="mb-1">업무 대리자</label>
                      <select id="deputy" class="form-select">
                        <option value="-1" deputyOption selected>대리자를 선택하세요</option>
                      `;
  pjt.pgmList.forEach(pgm => {
    if(pgm.memNo != MEM_NO) {
      detailPageHTML += `
                       <option deputyOption value="${pgm.memNo}">${pgm.chMemNm}</option>
      `;
      }
  });
  detailPageHTML += `
                      </select>
                    </div>
	                </div>
	              </div>
	              <div class="modal-footer justify-content-center">
                  <button id="insertSubWorkBtn" data-pjtno="${res.data.projectVO.pjtNo}" type="button" class="btn bg-primary-subtle text-primary  waves-effect text-start" data-bs-dismiss="modal">
                      확인
                  </button>
	                <button type="button" class="btn bg-danger-subtle text-danger  waves-effect text-start" data-bs-dismiss="modal">
	                  	취소
	                </button>
	              </div>
	            </div>
	          </div>
	        </div>
	        <!-- 모달 창 끝 -->


        <!-- 모달2 창 -->
	        <div class="modal fade" id="with-grid-modal2" tabindex="-1" aria-labelledby="scroll-long-inner-modal" aria-hidden="true">
	          <div class="modal-dialog modal-dialog-scrollable modal-lg">
	            <div class="modal-content">
	              <div class="modal-header d-flex align-items-center">
	                <h4 class="modal-title" id="myLargeModalLabel">
	                  	진행현황 최신화
	                </h4>
	                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
	              </div>
                <div class="modal-body">
                  <div class="container">
                    <div class="row">
                      <div class="col-sm-12 col-lg-6">
                        <div class="form-group row">
                          <h5 id="subWorkTtl2" for="subWorkTtl2" class="mt-2">세부 업무 이름</h5>
                        </div>
                      </div>
                      <div class="col-sm-12 col-lg-6">
                        <div class="form-group mb-3 row">
                          <h5 for="inputText5" class="col-sm-3 text-end mt-2">진행도&ensp;:</h5>
                          <div class="col-sm-9">
                              <form class="d-flex align-items-center">
                                  <div class="input-group mb-3">
                                      <input id="inputPrgrs" type="text" class="form-control" placeholder="0 ~ 100" aria-label="" aria-describedby="basic-addon1" style="height: 41px;">
                                      <button id="updatePrgrs" class="btn bg-info-subtle text-info" type="button">저장</button>
                                  </div>
                              </form>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div id="subWorkNote">
                        세부업무 내용
                      </div>
                    </div>
                  </div>
                <div>
	              <div class="modal-body">
	                <div class="container">
                    <div class="form-floating">
                      <div style="height:450px;">
                        <div id="divTextarea">
                          
                        </div>
                      </div>
                    </div>
	                </div>
	              </div>
                <div class="modal-footer justify-content-center">
                  <div class="d-flex align-items-center" id="createTextarea">

                  </div>
                  <button data-pjtno="${res.data.projectVO.pjtNo}" type="button" class="btn bg-primary-subtle text-primary  waves-effect text-start" data-bs-dismiss="modal">
                      확인
                  </button>
                </div>
              </div>
            </div>
          </div>
	        <!-- 모달 창 끝 -->
  `;

  MAIN_CONTENTS.querySelector('#pjtMainPage').innerHTML = detailPageHTML;

  // 디테일페이지 로딩시 진행도차트를 생성한다.
  labels = [];
  pjt.pgmList.forEach(pgm => {
    labels.push(pgm.chMemNm);
  });
  let nums = await chartDataBuilder(res.data.map.dataList);  
  chartRender(nums, labels);
  // 진행도차트생성 끝

  // 세부업무목록을 출력함
  detailsSubWorkListRender(res.data.list);

  viewer = Editor.factory({
    el: MAIN_CONTENTS.querySelector('#viewer'),
    viewer: true,
    height: '500px',
    initialValue: pjt.conts
  });

  total_page = Math.ceil(res.data.total/10);

  paginator(cur_page, total_page);
  
  let insertSubWorkBtn = MAIN_CONTENTS.querySelector('#insertSubWorkBtn');
  // 세부업무를 추가하는 함수
  insertSubWorkBtn.addEventListener('click', async function() {
    // 세부업무등록에 필요한 자료를 담음
    // memNo = 업무담당, memNo2 = 업무대리인
    let data = {
      pjtNo:this.dataset.pjtno,
      pjtWrkNm: MAIN_CONTENTS.querySelector('#subWorkTtl').value,
      pjtNote: MAIN_CONTENTS.querySelector('#subWorkConts').value,
      memNo:MEM_NO,
      memNo2: MAIN_CONTENTS.querySelector('#deputy > option:checked').value
    }
    // 세부업무를 등록하고 해당 내용을 키값과 함께 받음
    let res = await axios.post('/synerhub/project/subworkinsert', data, axiosHeaderJson)
    // 결과를 받았다면 결과를 페이지에 출력함
    if(res.data) {
      let tr = document.createElement('tr');
      tr.style.cursor = "pointer";
      tr.setAttribute('data-pjtdtlno', res.data.pjtDtlNo);
      tr.setAttribute('data-memno', res.data.memNo);
      tr.setAttribute('data-memno2', res.data.memNo2);
      tr.setAttribute('data-bs-toggle', "modal");
      tr.setAttribute('data-bs-target', "#with-grid-modal2");
      tr.innerHTML = `<td class="text-center">${res.data.memNm}</td>
                      <td class="text-center">${res.data.memNm2 == null ? '없음' : res.data.memNm2 }</td>
                      <td>${res.data.pjtWrkNm}</td>
                      <td id="prgrs${res.data.pjtDtlNo}" class="text-center">${res.data.prgrs}%</td>`;
      // 출력된 요소를 클릭하면 세부업무의 진행도를 확인하는 창을 출력하는 함수 호출
      tr.addEventListener('click', async function() {
        pdsMemNo = this.dataset.memno;
        pdsMemNo2 = this.dataset.memno2;
        pjtDtlNo = this.dataset.pjtdtlno;
        let tr = this
        pdsRender(tr);
      });
      MAIN_CONTENTS.querySelector('#subWorkTtl').value = '';
      MAIN_CONTENTS.querySelector('#subWorkConts').value = '';
      MAIN_CONTENTS.querySelectorAll('[deputyOption]')[0].selected = true;
      MAIN_CONTENTS.querySelector('#projectSubWorkTable').insertBefore(tr, MAIN_CONTENTS.querySelector('#projectSubWorkTable').childNodes[0]);
    } else {
      Swal.fire('에러. 잠시후에 다시 시도해주세요.')
    }
      
  });

  let cancleBtn = document.createElement('button');
  cancleBtn.setAttribute('data-pjtno', pjt.pjtNo);
  cancleBtn.className = "btn bg-warning-subtle text-warning  waves-effect text-start ms-3";
  cancleBtn.innerText = "중단";

  let completeBtn = document.createElement('button');
  completeBtn.setAttribute('data-pjtno', pjt.pjtNo);
  completeBtn.className = "btn bg-success-subtle text-success  waves-effect text-start ms-3";
  completeBtn.innerText = "완료";

  let addTextareaBtn = document.createElement('button');
  // 취소버튼을 클릭하면 해당 프로젝트의 상태를 변경하는 함수를 호출
  cancleBtn.addEventListener('click', function() {
    status_project(this.dataset.pjtno, 'stop');
  });
  // 완료버튼을 클릭하면 해당 프로젝트의 상태를 변경하는 함수를 호출
  completeBtn.addEventListener('click', function() {
    status_project(this.dataset.pjtno, 'terminate');
  });

  addTextareaBtn.className = "btn bg-secondary-subtle text-secondary  waves-effect text-start";
  addTextareaBtn.innerText = "업무내용작성";
  addTextareaBtn.id = "addTextareaBtn";
  // 세부업무 진행현황을 작성하는 textarea요소를 생성함
  addTextareaBtn.addEventListener('click', function () {
    let div = document.createElement('div');
    div.className = "row";

    let div1 = document.createElement('div');
    div1.className = "col-10 py-2";
    let textarea = document.createElement('textarea');
    textarea.className = "form-control";
    textarea.style.cssText = "height:100px";
    div1.appendChild(textarea);
    

    let div2 = document.createElement('div');
    div2.className = "col-2 py-2 d-flex align-items-center";
    let button = document.createElement('button');
    button.className = "btn bg-secondary-subtle text-dark  waves-effect text-start";
    button.innerText = "등록";
    // textarea 내용을 등록 수정하는 버튼을 클릭하여 등록 또는 수정을 진행함
    button.addEventListener('click', async function(){
      if(this.innerText == "수정") {
        this.innerText = "등록";
        textarea.removeAttribute('disabled');
        return;
      }
      let data = {
        pdsNo:this.dataset.pdsno,
        pdsConts:textarea.value,
        pjtDtlNo:pjtDtlNo
      }
      // data를 서버에 저장함
      await uploadPds(data, this, textarea);
    });
    // 접근자가 업무담당 또는 대리인이라면 내용 등록 및 수정버튼이 활성화됨
    if(pdsMemNo == MEM_NO || pdsMemNo2 == MEM_NO){
      div2.appendChild(button);
      MAIN_CONTENTS.querySelector('#addTextareaBtn').style.display = "block";
      MAIN_CONTENTS.querySelector('#inputPrgrs').removeAttribute('disabled');
      MAIN_CONTENTS.querySelector('#updatePrgrs').removeAttribute('disabled');
    } else {
      textarea.setAttribute('disabled', 'disabled');
      MAIN_CONTENTS.querySelector('#addTextareaBtn').style.display = "none";
      MAIN_CONTENTS.querySelector('#inputPrgrs').setAttribute('disabled', 'disabled');
      MAIN_CONTENTS.querySelector('#updatePrgrs').setAttribute('disabled', 'disabled');
    }

    div.appendChild(div1);
    div.appendChild(div2);
    MAIN_CONTENTS.querySelector('#divTextarea').appendChild(div);

  });

  let goBackBtn = document.createElement('button');
  goBackBtn.className ="btn btn-light text-dark  waves-effect text-start";
  goBackBtn.innerText = "목록";
  // 목록버튼 클릭시 이전 목록으로 돌아감
  goBackBtn.addEventListener('click', () => {
    if(pjtListScope == 'progress') {
      pjtProgressCallback();
    } else if (pjtListScope == 'abort') {
      pjtAbortCallback();
    } else if (pjtListScope == 'complete') {
      pjtCompleteCallback();
    }
  });

  // 진행도를 업데이트함
  MAIN_CONTENTS.querySelector('#updatePrgrs').addEventListener('click', async () => {
    let prgrs = MAIN_CONTENTS.querySelector('#inputPrgrs');
    let regx = /^[0-9]{1,3}$/
    // 정규식으로 숫자인지 판별
    if(!regx.test(prgrs.value)) {
      return;
    } else {
      if(prgrs.value < 0 || prgrs.value > 100) {
        Swal.fire('0 ~ 100 사이 숫자를 입력하세요.')
        return;
      } else {
        
        let data = {
          pjtDtlNo: pjtDtlNo,
          prgrs:prgrs.value
        }
        // 진행도를 업데이트하고 갱신된 프로젝트의 진행도를 받음
        let res = await axios.post('/synerhub/project/updateprgrs', data, axiosHeaderJson);

        // 받은 진행도를 차트데이터생성 함수에 파라미터로 전달해 결과를 받음
        let chartData = await chartDataBuilder(res.data.dataList);
        MAIN_CONTENTS.querySelector(`#prgrs${pjtDtlNo}`).innerHTML = `${prgrs.value}%`
        prgrs.value = null;
        // 차트 출력함수에 차트데이터를 파라미터로 넘기고 그래프를 출력함
        chartRender(chartData, labels);

      }
    }

    data = {
      pjtDtlNo:pjtDtlNo,
      prgrs:prgrs
    }
  });

  let subWorkInsertBtn = document.createElement('button');
  subWorkInsertBtn.className = "btn bg-primary-subtle text-primary py-2 waves-effect text-start"
  // 업무등록 버튼 클릭시 모달창을 띄워 세부업무를 등록할 수 있음
  subWorkInsertBtn.innerText = "업무등록";
  subWorkInsertBtn.setAttribute('data-bs-toggle', "modal");
  subWorkInsertBtn.setAttribute('data-bs-target', "#with-grid-modal");
  // 프로젝트가 진행중인지 프로젝트에 참여하는지 프로젝트 담당자인지 여부를 판별해 버튼을 추가함 
  if(isPjtGoing) {
    // 프로젝트가 진행중이라면 세부업무작성 버튼 추가
    MAIN_CONTENTS.querySelector('#createTextarea').appendChild(addTextareaBtn);
    if(isPjtMember) {
      // 프로젝트 맴버라면 하위업무 등록버튼 추가
      MAIN_CONTENTS.querySelector('#newSubWorkInsertBtn').appendChild(subWorkInsertBtn);
    }
    if(isPjtMngr) {
      // 프로젝트 담당자라면 완료 그리고 중단 버튼 추가
      MAIN_CONTENTS.querySelector('#divUpdateBtn').appendChild(completeBtn);
      MAIN_CONTENTS.querySelector('#divUpdateBtn').appendChild(cancleBtn);
    }
  }
  // 이외 인물이라면 목록버튼 추가
  MAIN_CONTENTS.querySelector('#goBackBtn').appendChild(goBackBtn);
}

// 세부업무 목록을 출력함
const detailsSubWorkListRender = (list) => {
  // 목록이 없을경우
  if(list.length == 0) {
    let tr = document.createElement('tr');
    let td = document.createElement('td');
    td.className = "text-center";
    td.setAttribute('colspan', '4')
    if(isPjtMember) {
      // 프로젝트 참가자라면 업무등록을 유도함
      td.innerText = "새로운 하위업무를 등록해주세요."
    } else {
      td.innerText = "자료가 없습니다."
    }
    tr.appendChild(td);
    MAIN_CONTENTS.querySelector('#projectSubWorkTable').appendChild(tr);
    return;
  }
  // 세부업무 목록을 출력하고 dataset에 필요정보를 저장함
  list.forEach(e => {
    let tr = document.createElement('tr');
    tr.style.cursor = "pointer";
    tr.setAttribute('data-pjtdtlno', e.pjtDtlNo);
    tr.setAttribute('data-memno', e.memNo);
    tr.setAttribute('data-memno2', e.memNo2);
    tr.setAttribute('data-bs-toggle', "modal");
    tr.setAttribute('data-bs-target', "#with-grid-modal2");
    tr.innerHTML = `<td class="text-center">${e.memNm}</td>
                    <td class="text-center">${e.memNm2 == null ? '없음' : e.memNm2}</td>
                    <td>${e.pjtWrkNm}</td>
                    <td id="prgrs${e.pjtDtlNo}" class="text-center">${e.prgrs}%</td>`;
    // 세무업무 tr요소를 클릭시 모달창에 세부업무 진행현황을 출력하는 함수를 호출
    // this를 사용하기 위해 무명함수를 사용
    tr.addEventListener('click', async function() {
      pdsMemNo = this.dataset.memno;
      pdsMemNo2 = this.dataset.memno2;
      pjtDtlNo = this.dataset.pjtdtlno;
      let tr = this
      // tr요소를 파라미터로 넘김
      pdsRender(tr);
    });
    MAIN_CONTENTS.querySelector('#projectSubWorkTable').appendChild(tr);
  });
}

// 모달창에 세부업무 진행현황을 출력함
const pdsRender = async (tr) => {
  pjtDtlNo = tr.dataset.pjtdtlno;
  // 프로젝트 세부업무 키값으로 해당 내용을 받음
  let res = await axios.get('/synerhub/project/getsubworklist/' + tr.dataset.pjtdtlno, axiosHeaderJson);
  // console.log(res);

  MAIN_CONTENTS.querySelector('#subWorkTtl2').innerText = res.data.pjtWrkNm;
  MAIN_CONTENTS.querySelector('#subWorkNote').innerText = res.data.pjtNote;
  let divTextarea = MAIN_CONTENTS.querySelector('#divTextarea');
  divTextarea.innerHTML = '';
  // 저장된 진행현황이 있다면
  if(res.data.pdsList.length) {
    // 내용을 textarea에 disable속성을 추가해 출력함
    res.data.pdsList.forEach(pds => {
      let div = document.createElement('div');
      div.className = "row";
      let div1 = document.createElement('div');
      div1.className = "col-10 py-2";
      let textarea = document.createElement('textarea');
      textarea.className = "form-control";
      textarea.setAttribute('disabled', 'disabled');
      textarea.style.cssText = "height:100px";
      textarea.value = pds.pdsConts;
      div1.appendChild(textarea);

      // 수정을 위한 버튼을 추가함
      let div2 = document.createElement('div');
      div2.className = "col-2 py-2 d-flex align-items-center";
      let button = document.createElement('button');
      button.setAttribute('data-pdsno', pds.pdsNo);
      button.className = "btn bg-secondary-subtle text-secondary  waves-effect text-start";
      button.innerText = "수정";

      // 수정버튼을 클릭하면 disable속성을 제거하고 등록으로 버튼이 변경됨
      button.addEventListener('click', async function() {
        if(this.innerText == "수정") {
          this.innerText = "등록";
          textarea.removeAttribute('disabled');
          return;
        }
        let data = {
          pdsNo:this.dataset.pdsno,
          pdsConts:textarea.value,
          pjtDtlNo:pjtDtlNo
        }
        // 등록버튼을 누르면 내용수정을 요청하는 함수를 호출하여 ((키값, 내용, 키값), 버튼, 요소) 파라미터를 넘김
        await uploadPds(data, this, textarea);
      });

      // 담당자 그리고 대리자라면 수정이 가능함
      if(pdsMemNo == MEM_NO || pdsMemNo2 == MEM_NO){
        div2.appendChild(button);
        MAIN_CONTENTS.querySelector('#addTextareaBtn').style.display = "block";
        MAIN_CONTENTS.querySelector('#inputPrgrs').removeAttribute('disabled');
        MAIN_CONTENTS.querySelector('#updatePrgrs').removeAttribute('disabled');
      } else {
        textarea.setAttribute('disabled', 'disabled');
        MAIN_CONTENTS.querySelector('#addTextareaBtn').style.display = "none";
        MAIN_CONTENTS.querySelector('#inputPrgrs').setAttribute('disabled', 'disabled');
        MAIN_CONTENTS.querySelector('#updatePrgrs').setAttribute('disabled', 'disabled');
      }

      div.appendChild(div1);
      div.appendChild(div2);
      divTextarea.appendChild(div);
    });
  } else {
    // 진행현황이 없다면
    let div = document.createElement('div');
    div.className = "row";

    let div1 = document.createElement('div');
    div1.className = "col-10 py-2";
    // 빈 textarea를 추가함
    let textarea = document.createElement('textarea');
    textarea.className = "form-control";
    textarea.style.cssText = "height:100px";
    div1.appendChild(textarea);


    let div2 = document.createElement('div');
    div2.className = "col-2 py-2 d-flex align-items-center";
    let button = document.createElement('button');
    button.setAttribute('data-pjtdtlno', tr.dataset.pjtdtlno);
    button.className = "btn bg-secondary-subtle text-secondary  waves-effect text-start";
    button.innerText = "등록";
    // 등록버튼으로 작업내역을 저장함
    button.addEventListener('click', async function(){
      if(this.innerText == "수정") {
        this.innerText = "등록";
        textarea.removeAttribute('disabled');
        return;
      }
      let data = {
        pdsNo:this.dataset.pdsno,
        pdsConts:textarea.value,
        pjtDtlNo:pjtDtlNo
      }
      await uploadPds(data, this, textarea);
  
    });

    // 담당자 그리고 대리자라면 수정이 가능함
    if(pdsMemNo == MEM_NO || pdsMemNo2 == MEM_NO){
      div2.appendChild(button);
      MAIN_CONTENTS.querySelector('#addTextareaBtn').style.display = "block";
      MAIN_CONTENTS.querySelector('#inputPrgrs').removeAttribute('disabled');
      MAIN_CONTENTS.querySelector('#updatePrgrs').removeAttribute('disabled');
    } else {
      textarea.setAttribute('disabled', 'disabled');
      MAIN_CONTENTS.querySelector('#addTextareaBtn').style.display = "none";
      MAIN_CONTENTS.querySelector('#inputPrgrs').setAttribute('disabled', 'disabled');
      MAIN_CONTENTS.querySelector('#updatePrgrs').setAttribute('disabled', 'disabled');
    }
  
  div.appendChild(div1);
  div.appendChild(div2);
    divTextarea.appendChild(div);
  }
}

// 작업내역을 등록 또는 수정함
const uploadPds = async (data, btn, textarea) => {
  // merge문을 사용해 하나의 주소로 등록과 수정이 가능함
  let res = await axios.post('/synerhub/project/uploadpds', data, axiosHeaderJson);

  if(res.status == '200') {
    // 등록버튼이었을 경우 
    if(btn.innerText == "등록") {
      // 키값을 dataset에 저장함
      btn.setAttribute('data-pdsno', res.data.pdsNo);
      // 수정버튼으로 변경함
      btn.innerText = "수정";
      // disabled 속성을 다시 추가함
      textarea.setAttribute('disabled', 'disabled');

    // 수정이었을 경우 
    } else if(btn.innerText == "수정"){
      // 등록버튼으로 변경함
      btn.innerText = "등록";
      // disabled 속성을 제거함
      textarea.removeAttribute('disabled');
      return;
    }
  } else {
    Swal.fire('에러, 잠시후에 다시 시도해주세요.')
  }
}

const applyRes = (res, btn, textarea) => {
  console.log(res, btn, textarea);



}

// const subWorkListRender = (list) => {
//   let tbody = MAIN_CONTENTS.querySelector('#projectSubWorkTable');
//   if(list.length) {
//     list.forEach(subWork => {
      
//     });
//   } else {
//     let tr = document.createElement('tr');
//     let td = document.createElement('td');
//     td.innerText = "자료가 없습니다. 업무등록 버튼으로 업무를 등록해주세요"
//   }
// }

var charter;

// 받은 데이터를 차트용 데이터로 변환한다.
const chartDataBuilder = async (dataList) => {

  let nums = [];
  let isExist;
  // 맴버로 레이블을 만듬
  labels.forEach(mem => {
    isExist = false;
    // 맴버 이름을 비교해 레이블과 진행도의 인덱스를 일치시킴
    dataList.forEach(data => {
      if(mem == data.memNm) {
        isExist = true;
        nums.push(data.prgrs.slice(0, -1));
      }
    });
    if(!isExist) {
      isExist = false;
      nums.push(0);
    }
  });
  // console.log(labels);
  // console.log(nums);

  return nums;
}

// 받은 차트용 데이터를 출력함
const chartRender = async (datas, labels) => {

  // 기존차트가 있다면 지움
  if(charter) {
    charter.destroy();
  }
  // 차트를 출력할 요소
  let ctx = MAIN_CONTENTS.querySelector('#chartForProject');
  // 차트 설정을 위한 데이터 설정
	const data = {
		labels: labels,
		datasets: [{
			label: '세부업무 진행도',
			data: datas,
			fill: false,
      backgroundColor: barBGColors,
			borderColor: barBDColors,
			tension: 0.1
		}]
	};
  // chart.js API를 사용하여 출력
	charter = new Chart(ctx, {
			type: 'bar',
			data : data
	});

}

// const getProjectChartData = () => {
//   console.log('chart data for project');
// }

// const getSubWordChartData = () => {
//   console.log('chart data for subwork');
// }

// const chartCleaner = () => {
//   console.log('chart clean');
// }

const createData = async (length, size) => {
	let data = [];
	for(let i = 0; i < length; i++) {
		data.push(Math.ceil(Math.random()*size))
	}
	return data;
}

// 세부목록을 불러온다.
const listProjectDetail = (pjtNo, page, rowCnt, pjtNm, searchWord) => {
  pdnpt = pjtNo
  flagProjectDetail = true;
  searchScope = 'projectDetail';
  searchWord = null;

  let data = {
    synerhub1: pdnpt,
    synerhub2: synerhubch,
    page: page,
    rowCnt: rowCnt,
  }

  if (searchWord) {
    if (searchTitleFlag) {
      data.searchTitle = searchWord;
    } else {
      data.searchName = searchWord;
    }
  }
  // 받은 세부목록 데이터를 출력함
  projectDetailPageRender(data);
}

// const projectToggle = (A) => {
//   let element = MAIN_CONTENTS.querySelector('#' + A);
//   if (element.childNodes[1].getAttribute('aria-expanded') == 'true') {
//     element.childNodes[3].style.cssText = "";
//     element.childNodes[3].removeAttribute('data-popper-placement')
//     element.childNodes[1].setAttribute('aria-expanded', false)
//   } else {
//     element.childNodes[3].style.cssText = "position: absolute; inset: 0px 0px auto auto; margin: 0px; transform: translate(-37px, 2px);";
//     element.childNodes[3].setAttribute('data-popper-placement', 'left-start')
//     element.childNodes[1].setAttribute('aria-expanded', true)
//   }
//   element.childNodes[1].classList.toggle('show');
//   element.childNodes[3].classList.toggle('show');
// }

// const buttonDropdown = (A) => {
//   let element = MAIN_CONTENTS.querySelector('#' + A);
//   if (element.childNodes[1].getAttribute('aria-expanded') == 'true') {
//     element.childNodes[3].style.cssText = "";
//     element.childNodes[3].removeAttribute('data-popper-placement')
//     element.childNodes[1].setAttribute('aria-expanded', false)
//   } else {
//     element.childNodes[3].style.cssText = "position: absolute; inset: 0px auto auto 0px; margin: 0px; transform: translate(0px, 45px);";
//     element.childNodes[3].setAttribute('data-popper-placement', 'left-start')
//     element.childNodes[1].setAttribute('aria-expanded', true)
//   }
//   element.childNodes[1].classList.toggle('show');
//   element.childNodes[3].classList.toggle('show');
// }

// 테이블이 들어갈 카드 만들기
// const listTableCreator = () => {
//   if (!MAIN_CONTENTS.querySelector('.list-table')) {
//     let list_table = `
//       <div class="mb-3 overflow-hidden position-relative">
//         <div class="px-3">
//           <h4 id="current_menu" class="fs-6 mb-0"></h4>
//           <nav aria-label="breadcrumb">
//             <ol class="breadcrumb mb-0">
//               <li class="breadcrumb-item"></li>
//             </ol>
//           </nav>
//         </div>
//       </div>
//       <div class="list-table">
//         <div class="card">
//           <div class="card-body p-3">
//             <div class="d-flex justify-content-between align-items-center gap-6 mb-9 col-3">
//               <div class="input-group mb-2" id="divSearchElement">
//                 <button id="search-icon" onclick="buttonDropdown('divSearchElement')" class="btn bg-primary-subtle text-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                   제목
//                 </button>
//                 <div class="dropdown-menu" style="">
//                   <a class="dropdown-item" href="javascript:searchSelecting('title')">제목</a>
//                   <a class="dropdown-item" href="javascript:searchSelecting('name')">이름</a>
//                 </div>
//                 <input type="text" id="searchWord" class="form-control" aria-label="Text input with dropdown button">
//               </div>
//             </div>
//             <div class="table-responsive border rounded">
//               <table class="table align-middle table-hover text-nowrap mb-0">
//                 <thead class="table-primary" id="list_head">
//                 </thead>
//                 <tbody id="list_body">
//               </tbody>
//             </table>
//             </div>
//             <div class="d-flex align-items-center justify-content-end py-1">
//               <p class="mb-0 fs-2">페이지당 자료수:</p>
//               <select id="row-max" class="form-select w-auto ms-0 ms-sm-2 me-8 me-sm-4 py-1 pe-7 ps-2 border-0" aria-label="Default select example">
//                 <option value="10">10</option>
//                 <option value="25">25</option>
//                 <option value="50">50</option>
//               </select>
//               <div id="div-pagenation">
//               </div>
//             </div>
//         </div>
//       </div>
//     </div>`;
//     MAIN_CONTENTS.innerHTML = list_table;
//     searchActivate();
//     rowBtnActivate();
//   }
// }

// 체널 보드에 출력할 프로젝트 정보를 받는 함수
const chProjectInfoGetter = async (page) => {
  let data = {
    chNo: synerhubch,
    thNo: synerhubth,
    page: page
  }

  let res = await axios.post('/synerhub/project/chprojectinfo/', data, axiosHeaderJson);
  total_page = Math.ceil(res.data.total/4);
  // 받은 정보를 출력하는 함수에 파라미터로 넘김
  chDashboardProjectInfoRender(res.data.list);
}

// 리스트를 출력하는 함수
const chDashboardProjectInfoRender = (list) => {

  let div = MAIN_CONTENTS.querySelector('#divPjtInfoList');
  div.innerHTML = "";
  let table = document.createElement('table');
  table.className = "table table-hover table-bordered mt-4 mb-0"
  // 프로젝트 목록이 없다면
  if(list.length == 0) {
    MAIN_CONTENTS.querySelector('#pjtInfoPrev').style.display = 'none';
    MAIN_CONTENTS.querySelector('#pjtInfoNext').style.display = 'none';
    let h3 = document.createElement('h5');
    h3.style.cursor = "ponter";
    h3.className = "position-absolute top-50 start-50 translate-middle text-center w-100";
    h3.innerText = '진행 중인 프로젝트가 없습니다.\n새 프로젝트를 등록해보세요!';
    div.style.cursor = "pointer";
    // div 클릭시 프로젝트 등록페이지를 출력함
    div.addEventListener('click', () => {
      myPjtMainCallback();
      pjtInsertPageRender();
    });
    div.appendChild(h3);
    return;
  }
  // 있다면 프로젝트를 4개 단위로 페이징처리하여 출력함
  list.forEach(pjt => {
    let tbody = document.createElement('tbody');
    let tr = document.createElement('tr');
    tr.innerHTML = `
      <td class="py-1" style="width: 80%;">
        <div>
          <p class="mb-0">${pjt.pjtNm}</p>
        </div>
        <div>
          <div class="progress" style="height: 14px;">
            <div class="progress-bar prrogress-height progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="${pjt.prgrs}" aria-valuemin="0" aria-valuemax="100" style="width: ${pjt.prgrs}%; height: 14px;">
              ${pjt.prgrs}%
            </div>
          </div>
        </div>
      </td>
      <td class="text-center">
        상세보기
      </td>
    `;

    tr.style.height = "30px";
    tr.className = "py-1";
    tr.style.cursor = "pointer";
    tbody.appendChild(tr);
    table.appendChild(tbody);
    tr.setAttribute('data-pjtno', pjt.pjtNo);
    // tr요소 클릭시 해당 프로젝트 세부페이지로 넘어감
    tr.addEventListener('click', function () {
      let data = {
        synerhub1: this.dataset.pjtno,
        synerhub2: synerhubch,
        rowCnt: 10,
        page: 1
      }
      pjtMainPageRender('main');
      projectDetailPageRender(data);
    });
  });
  div.appendChild(table);

}

const setAttributes = (el, attrs) => {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

// 프로젝트 이전 페이지 출력
const pjtInfoPrev = () => {
  if(cur_page == 1) {
    Swal.fire('첫 페이지 입니다.');
    return;
  }
  cur_page--;
  chProjectInfoGetter(cur_page);
}

// 프로젝트 다음 페이지 출력
const pjtInfoNext = () => {
  if(cur_page == total_page) {
    Swal.fire('마지막 페이지 입니다.');
    return;
  }
  cur_page++;
  chProjectInfoGetter(cur_page);
}