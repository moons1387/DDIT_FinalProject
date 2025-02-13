// A 는 channelNo

var tempTd;

const channelTreeSetter = async (A) => {
  let chData = await getChData(A);
  axios.get('/synerhub/channel/memberthreadlist/' + A, { headers: { [header]: token, "Content-Type": "application/json" }, })
    .then(res => {
      let thLength = res.data.thList.length;
      let treeHtml = `
      <div class="mb-3 overflow-hidden position-relative">
        <div class="px-3">
        <h4 id="current_menu" class="fs-6 mb-0">멤버규칙</h4>
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0">
              <li class="breadcrumb-item">멤버규칙 설정</li>
            </ol>
          </nav>
        </div>
      </div>
      <div class="col bg-white card" >
        <div class="card-head text-center" style="align:center;">
          <h2 class="mt-5">채널 구성원의 역할을 설정해주세요</h2>
        </div>
        <div class="d-flex justify-content-end" id="divSaveButton">
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-2" id="selector" style="overflow:scroll; height:70vh;">
              <div id="seletorBlocker">`;
      res.data.memList.forEach(mem => {

        treeHtml += `
                <div>
                  <div class="card text-center bg-white card-hover rounded-4" role="alert">
                    <div class="p-2 d-block mt-3">`;
        if (mem.memNo == chData.num) {
          treeHtml += `
                      <div class="position-absolute top-0 end-0">
                        <span class="mb-1 badge text-bg-success">채널장</span>
                      </div>`;
        }
        treeHtml += `
                      <img src="#" width="75" class="rounded-circle img-fluid">
                      <h5 class="card-title mt-3">${mem.memName}</h5>
                      <a onclick="getMemName('${mem.memNo}', '${mem.memName}')" class="btn btn-secondary  d-block w-100">Select</a>
                    </div>
                  </div>
                </div>`;
      });
      treeHtml += `
              </div>
            </div>
            <div class="col text-center align-items-stretch" style="height:70vh; overflow:scroll;">
              <div style="">
                <table id="memRoleTable" class="table table-stripe table-hover" style="white-space:nowrap; text-align:center;">
                  <thead>
                    <tr>
                      <th>
                        구분
                      </th>`;

      res.data.thList.forEach(th => {
        treeHtml += `
                      <th scope="col" data-thno="${th.thNo}">
                        ${th.thTtl}
                      </th>`;
      });
      treeHtml += `
                    </tr>
                  </thead>
                  <tbody id="roleTableBody">
                    <tr id="roleTableAddBtn" onclick="addRowRoleTable(${thLength + 1})">
                      <td colspan="${thLength + 1}">
                        <i class="ti ti-plus fs-7 text"></i>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
      MAIN_CONTENTS.innerHTML = treeHtml;
      let saveButton = document.createElement('button')
      saveButton.className = "btn btn-rounded btn-outline-success me-5";
      saveButton.innerHTML = '<iconify-icon icon="solar:diskette-broken"></iconify-icon> 설정완료';
      saveButton.addEventListener('click', saveButtonClick);
      MAIN_CONTENTS.querySelector('#divSaveButton').appendChild(saveButton);

      if (res.data.memRoleList) {
        roleTableRender(thLength + 1, res.data.memRoleList, res.data.memList);
      }

    });
}

const roleTableRender = (no, roleList, memList) => {
  let table = MAIN_CONTENTS.querySelector('#memRoleTable');
  let thead = table.querySelector('thead');
  let tbody = table.querySelector('tbody');
  if (roleList) {
    let lastTr = MAIN_CONTENTS.querySelector('#roleTableAddBtn');
    roleList = JSON.parse(roleList);
    console.log(roleList);
    console.log(memList);
    for (key in roleList) {
      console.log(key, roleList[key]);
      let tr = document.createElement('tr');
      for (let i = 0; i < no; i++) {
        let td = document.createElement('td');
        addTdRoldName(tr, td, i);
        tr.appendChild(td);
      }
      tr.childNodes[0].innerText = roleList[key];
      lastTr.parentNode.insertBefore(tr, lastTr);
    }
    memList.forEach(mem => {
      let y = mem.chRole;
      let x;
      let ths = thead.querySelectorAll('th');
      ths.forEach((th, idx) => {
        if(mem.chMemThNm == th.innerText) {
          x = idx;
        }
      });

      if(x != null) {
        let td = tbody.childNodes[y+1].childNodes[x];
        td.className = "position-relative";
        td.setAttribute('data-a', mem.memNo);
        td.innerText += mem.memName;
        let delButton = document.createElement('div');
        delButton.className = "position-absolute top-0 end-0";
        delButton.innerHTML = '<iconify-icon icon="solar:close-circle-broken" width="1.4em" height="1.4em" style="color: #ff0000"></iconify-icon>';
        td.appendChild(delButton);
        
        delButton.addEventListener('click', function () {
          memRoleRemove(this);
        });
      }

    });
  } else {
    return;
  }
}

const addRowRoleTable = (no) => {
  let lastTr = MAIN_CONTENTS.querySelector('#roleTableAddBtn');

  // tr요소를 만든다.
  let tr = document.createElement('tr');

  // td요소를 만든다.
  for (let i = 0; i < no; i++) {
    let td = document.createElement('td');
    addTdRoldName(tr, td, i);
    tr.appendChild(td);
  }
  lastTr.parentNode.insertBefore(tr, lastTr);

}

const getChData = async (no) => {
  let res = await axios.get('/synerhub/channel/chdata/' + no, { headers: { [header]: token, "Content-Type": "application/json" }, })
  return res.data;
}

const getMemName = (A, B) => {
  tempTd = { A: A, B: B };
}

const saveButtonClick = () => {
  let table = MAIN_CONTENTS.querySelector('#memRoleTable');
  let theadThs = table.querySelector('thead').querySelectorAll('th');
  let tbodyTrs = table.querySelector('tbody').querySelectorAll('tr');

  let chrole = [];

  tbodyTrs.forEach(tr => {
    let role;
    tr.querySelectorAll('td').forEach((td, idx) => {

      if (idx == 0) {
        role = td.innerText;
      } else {
        if (td.innerText) {
          let value = {
            'thread': theadThs[idx].innerText,
            'roleName': role,
            'role': td.dataset.role,
            'manager': 'N'
          }
          let memRoleData = {
            'member': td.dataset.a,
            'value': value
          }

          chrole.push(memRoleData);

        }
      }

    });

  });
  let chRole = JSON.stringify(chrole);
  let data = {
    chRole: chRole,
    chNo: synerhubch
  }
  axios.post('/synerhub/channel/updatechrole/', data, { headers: { [header]: token, "Content-Type": "application/json" }, })
    .then(res => {
      console.log(res.data);
    })
}

const addTdRoldName = (tr, td, i) => {
  let trCnt;
  if (i == 0) {
    // 첫번째 td요소에 swal기능과 axios를 연결해 채널의 멤버 규칙 리스트를 업로드 한다.
    td.addEventListener('click', function () {
      Swal.fire({
        title: "스레드에서 사용하는 호칭을 입력해주세요",
        input: "text",
        inputAttributes: {
          autocapitalize: "off"
        },
        showCancelButton: true,
        confirmButtonText: "입력",
        cancelButtonText: "취소",
        showLoaderOnConfirm: true,
        preConfirm: async (text) => {
          this.innerText = text;
          let memRoleList = {};
          let table = MAIN_CONTENTS.querySelector('#memRoleTable');
          let tbodyTrs = table.querySelector('tbody').querySelectorAll('tr');
          tbodyTrs.forEach((tr, idx) => {
            // role목록을 만든다.
            if (idx != tbodyTrs.length - 1) {
              memRoleList[idx] = tr.childNodes[0].innerText;
            }
          });
          let data = {
            chNo: synerhubch,
            memRoleList: JSON.stringify(memRoleList)
          }
          console.log(data);
          try {
            await axios.post('/synerhub/channel/updatechrolelist', data, { headers: { [header]: token, "Content-Type": "application/json" }, })
          } catch {
            Swal.fire("입력 실패");
          }
        },
        allowOutsideClick: () => !Swal.isLoading()
      });
    });
    // 요소에 좌표 데이터를 입력한다.
    trCnt = MAIN_CONTENTS.querySelector('#roleTableBody').querySelectorAll('tr').length;
    td.innerText = trCnt - 1;
    tr.setAttribute('data-role', trCnt - 1);
  } else {
    trCnt = MAIN_CONTENTS.querySelector('#roleTableBody').querySelectorAll('tr').length;
    td.setAttribute('data-role', trCnt - 1);
    td.setAttribute('data-y', i);
    td.setAttribute('data-thno', i);
    td.addEventListener('click', function () {
      if (this.innerText) {
        return;
      }
      if (tempTd) {
        let table = MAIN_CONTENTS.querySelector('#memRoleTable');
        let theadThs = table.querySelector('thead').querySelectorAll('th');
        let tbodyTrs = table.querySelector('tbody').querySelectorAll('tr');
        this.className = "position-relative";
        let data = {
          chNo: synerhubch,
          chMemThNm: theadThs[this.dataset.y].innerText,
          chMemThNo: theadThs[this.dataset.y].dataset.thno,
          chRoleNm: tbodyTrs[this.dataset.role].childNodes[0].innerText,
          chRole: td.dataset.role,
          memNo: tempTd.A
        }
        axios.post('/synerhub/channel/updatechmemrolr', data, { headers: { [header]: token, "Content-Type": "application/json" }, })
          .then(res => {
            if (res.data == "Y") {
              this.setAttribute('data-a', tempTd.A);
              this.innerText += tempTd.B;
              let delButton = document.createElement('div');
              delButton.className = "position-absolute top-0 end-0";
              delButton.innerHTML = '<iconify-icon icon="solar:close-circle-broken" width="1.4em" height="1.4em" style="color: #ff0000"></iconify-icon>';
              this.appendChild(delButton);

              delButton.addEventListener('click', function () {
                memRoleRemove(this);
              });
              tempTd = null;
            } else {
              Swal.fire('입력 실패');
            }
          });
      }
    });
  }
}

const memRoleRemove = (div) => {
  console.log(div);
  div.parentElement.className = "";
  div.parentElement.removeAttribute('data-a');
  div.parentElement.innerHTML = "";
}