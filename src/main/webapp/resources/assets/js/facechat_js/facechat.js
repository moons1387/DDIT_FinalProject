let faceChatListBtn; 

faceChatListBtn = document.querySelector('#faceChatList');

faceChatListBtn.addEventListener('click', () => {
  // 채널 미선택시 페이지 로드를 거부함
  if(!synerhubch) {
    Swal.fire('채널을 선택 후 입장해주세요');
    return;
  }
  searchScope = 'faceChat';
  cur_page = 1;
  max_row = 10;
  faceChatMainPageRender();
});

// 화상채팅 메인페이지를 출력함
const faceChatMainPageRender = async () => {
  let data = {
    synerhub1 : MEM_NO,
    synerhub2 : synerhubch,
    synerhub3 : synerhubth,
    rowCnt : max_row,
    page : cur_page
  }

  // 해당 채널에서 생성한 화상채팅방 목록을 조회함
  let res = await axios.post('/synerhub/facechat/list', data, axiosHeaderJson);

  let listHTML = `
            <div class="mb-3 overflow-hidden position-relative">
              <div class="px-3">
                <h4 class="fs-6 mb-0">화상채팅</h4>
                <nav aria-label="breadcrumb">
                  <ol class="breadcrumb mb-0">
                    <li class="breadcrumb-item">
                      <a>Home</a>
                    </li>
                    <li class="breadcrumb-item" aria-current="page">화상채팅</li>
                  </ol>
                </nav>
              </div>
            </div>
            <div class="col-12">
              <div class="card mb-0">
                <div class="card-body">
                  <div class="d-md-flex justify-content-between mb-9">
                    <div class="mb-9 mb-md-0">
                      <div style="display: flex;">
                        <h3 id="faceChatBoard">${synerhubChTtl}</h3>
                      </div>
                      <p class="card-subtitle mb-0"></p>
                    </div>
                    <div class="d-flex align-items-center">
                        <div class="row">
                          <div class="col-3">
                            <input type="text" class="form-control" name="inputRoomTitle" id="inputRoomTitle" placeholder="방 제목"/>
                          </div>
                          <div class="col-3">
                            <input type="text" class="form-control" name="inputRoomPass" id="inputRoomPass" placeholder="비밀번호"/>
                          </div>
                          <div class="col-3">
                            <select class="form-select" id="endDate">
                              <option value="1" selected>1시간</option>
                              <option value="2">2시간</option>
                              <option value="3">3시간</option>
                              <option value="4">4시간</option>
                              <option value="5">5시간</option>
                              <option value="6">6시간</option>
                              <option value="7">7시간</option>
                              <option value="8">8시간</option>
                              <option value="9">9시간</option>
                              <option value="10">10시간</option>
                              <option value="11">11시간</option>
                              <option value="12">12시간</option>
                            </select>
                          </div>
                          <div class="col-3">
                            <button id="createRoom" type="button" class="justify-content-center btn mb-1 bg-primary-subtle text-dark">
                              <i class="ti ti-video fs-6 me-2"></i>방 생성
                            </button>
                          </div>
                        </div>
                    </div>
                  </div>
                  <div class="table-responsive overflow-x-auto latest-reviews-table" style="margin-top: 30px;">
                    <table class="table align-middle text-nowrap">
                      <thead class="table-primary table-hover text-dark fs-4">
                        <tr>
                          <th scope="col-1"></th>
                          <th scope="col-5">회의방 제목</th>
                          <th scope="col-1">채널/스레드</th>
                          <th scope="col-2" class="text-center">개설자</th> 
                          <th scope="col-2" class="text-center">생성일</th>
                          <th scope="col-1" class="text-center">비공개</th>
                        </tr>
                      </thead>
                    <tbody id="faceChatRoomList">

                    </tbody>
                  </table>
                </div>
                <div class="text-center" id="div-pagenation">
                </div>
              </div>
            </div>
          </div>
  `;
  MAIN_CONTENTS.innerHTML = listHTML;
  // 페이징처리
  total_page = Math.ceil(res.data.total/max_row);
  paginator(cur_page, total_page);

  let tbody = MAIN_CONTENTS.querySelector('#faceChatRoomList');

  // 채팅방 목록과 목록을 출력할 요소를 렌더함수에 파라미터로 넣어 호출한다.
  roomListRender(res.data, tbody);

  let createRoomBtn = MAIN_CONTENTS.querySelector('#createRoom');

  // 방 생성함수를 호출한다.
  createRoomBtn.addEventListener('click', async () => {
    createFaceChatRoom();
  });

}

// 방을 생성함
const createFaceChatRoom = async () => {

  let inputs = MAIN_CONTENTS.querySelectorAll('input');

  // 방 제목 입력 여부 체크
  if(!inputs[0].value) {
    Swal.fire('방제목을 입력하세요');
    inputs[0].focus();
    return;
  }
  let val = MAIN_CONTENTS.querySelector('#endDate > option:checked').value;

  let date = new Date();
  date.setHours(date.getHours() + parseInt(val));

  // DB에 저장할 종료시간을 '년/월/일 시:분:초' 문자열로 생성 
  const endTime = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

  let info = {
    memNo: MEM_NO,
    chNo: synerhubch,
    thNo: synerhubth,
    endTime: endTime
  }

  // 렌덤문자열을 추가해 방 제목이 겹칠 수 있도록 한다.
  let randomStr = Math.random().toString(36).substring(2, 12);

  let queryMap = {
    roomTitle: inputs[0].value + "," + randomStr,
    roomUrlId: inputs[0].value,
    maxJoinCount: 16,
    roomPasswd: inputs[1].value,
    // 종료시간을 gooroomee api에서 요구하는 양식에 맞춰 문자열을 잘라냄
    endDate: date.toString().substring(0, 25).concat(date.toString().substring(28, 33))
  }

  let map = {
    info:info,
    queryMap:queryMap
  }
  // console.log(map);
  // 서버에서 gooroomee 서버로부터 방생성응답을 받음
  let res = await axios.post('/synerhub/facechat/room', map, axiosHeaderJson);

  if(!res.data) {
    Swal.fire('이미 존재하는 방입니다.');
    return;
  }

  let tbody = MAIN_CONTENTS.querySelector('#faceChatRoomList');
  // status == 200 : 방이 생성됨
  if(res.status == '200') {
    let data = {
      synerhub1 : MEM_NO,
      synerhub2 : synerhubch,
      synerhub3 : synerhubth,
      rowCnt : max_row,
      page : 1
    }
    // 리스트를 다시 조회함
    res = await axios.post('/synerhub/facechat/list', data, axiosHeaderJson);
    // 방 목록을 출력함
    roomListRender(res.data, tbody);
  }

}

// 리스트 출력시 호출되는 함수
const roomAppender = (room, tbody) => {
  let tr = document.createElement('tr');
    tr.style.cursor = "pointer";
    tr.setAttribute('data-roomno', room.roomNo);
    tr.setAttribute('data-lock', room.roomPasswd);
    let roomTitle = room.roomTitle.split(',')[0]
    roomTitle = roomTitle.replace("%20", " ");
    roomTitle = roomTitle.replace("%3A", ":");
    roomTotle = roomTitle.replace("%2B", "+");

    let thTtl = room.thTtl == null ? '-' : room.thTtl;
    let lock = room.roomPasswd === "LOCK" ? '비공개' : '공개';
    tr.innerHTML = `
            <td></td>
            <td>${roomTitle}</td>
            <td>${room.chTtl}/${thTtl}</td>
            <td class="text-center">${room.memNm}</td>
            <td class="text-center">${room.startTime.substring(0, 10)}</td>
            <td class="text-center">${lock}</td>
    `;
    // 리스트 tr요소에 방을 들어갈 수 있는 이벤트를 추가함
    tr.addEventListener('click', function (){
      enterRoom(this.dataset.roomno, this.dataset.lock);
    });
    // 방정보가 있는 tr요소를 추가함
    tbody.appendChild(tr);
}

// 방 목록을 출력함
const roomListRender = (data, tbody) => {
  tbody.innerHTML = "";
  // 방이 없을 경우
  if(data.list.length == 0 ) {
    tbody.innerHTML = `
      <tr>
        <td colspan="6" class="text-center">채팅방이 없습니다.</td>
      </tr>`
  }
  // 있을 경우
  data.list.forEach(room => {
    // 방 을 추가하는 함수를 호출함
    roomAppender(room, tbody)
  });
  // 페이징처리
  paginator(cur_page, total_page);
}

// 입장하는 함수
const enterRoom = async (roomNo, lock) => {
  console.log(roomNo, lock);
  // 암호가 있는 방일 경우 
  if(lock == "LOCK") {
    let roomPasswd;
    // 비밀번호를 요구함
    await Swal.fire({
      title: "비밀번호를 입력하세요",
      input: "password",
      inputAttributes: {
        autocapitalize: "off"
      },
      showCancelButton: true,
      confirmButtonText: "Look up",
      showLoaderOnConfirm: true,
      preConfirm: pw => {
        roomPasswd = pw
      }
    });

    if(!roomPasswd) {
      return;
    }

    let data = {
      roomNo : roomNo,
      roomPasswd : roomPasswd
    }
    // 암호를 포함한 방을 검색하고 암호가 맞다면 해당 화상채팅방 주소를 받음
    let res = await axios.post('/synerhub/facechat/enter', data, axiosHeaderJson);

    // console.log(res.data);
    if(res.data) {
      // 새창에서 화상채팅방이 열림
      window.open(`http://biz.gooroomee.com/${res.data}`, "_blank", "width=800, height=800");
    } else {
      Swal.fire('비밀번호가 틀렸습니다.');
    }
  }
}

// 검색을 했을 경우 이 함수로 조회
const listFaceChatRoom = async (cur_page, max_row, searchWord) => {
  let data = {
    synerhub1 : MEM_NO,
    synerhub2 : synerhubch,
    synerhub3 : synerhubth,
    searchWord : searchWord,
    rowCnt : max_row,
    page : cur_page
  }

  let tbody = MAIN_CONTENTS.querySelector('#faceChatRoomList');

  res = await axios.post('/synerhub/facechat/list', data, axiosHeaderJson);
  roomListRender(res.data, tbody);

}