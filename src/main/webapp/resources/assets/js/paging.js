// 페이지 선택후 로드한다.
const page_load = async function (e) {

  // console.log("page load! :",e.dataset.page);
  // 이전, 다음에 페이지 이동기능을 추가함
  if (e.dataset.page == '+') {
    cur_page++;
  } else if (e.dataset.page == '-') {
    cur_page--;
  } else {
    cur_page = e.dataset.page
  }
  // 검색할 범위를 설정함
  if (searchScope == 'projectDetail') {
    listProjectDetail(pdnpt, cur_page, max_row, null, searchWord);
  } else if (searchScope == 'project') {
    listProject(cur_page, max_row, searchWord);
  } else if (searchScope == 'document') {
    listDocument(cur_page, max_row, searchWord, '결재 완료 문서');
  } else if (searchScope == 'documentApproval') {
    listDocumentApproval(cur_page, max_row, searchWord, '결재할 문서');
  } else if (searchScope == 'documentCurrent') {
    listDocumentCurrent(cur_page, max_row, searchWord, '작성한 문서');
  } else if (searchScope == 'documentRejected') {
    stat = 'DCST04';
    listDocumentByStat(cur_page, max_row, searchWord, '반려된 문서');
  } else if (searchScope == 'documentReturned') {
    stat = 'DCST02'
    listDocumentByStat(cur_page, max_row, searchWord, '회수한 문서');
  } else if (searchScope == 'projectDocSearch') {
    let res = await projectDocListGetter(cur_page, searchWord);
    projectDocListRender(res.data);
  } else if (searchScope == 'faceChat') {
    listFaceChatRoom(cur_page, max_row, searchWord);
  }
}


// 페이징처리 함수(선택된 페이지, 총 페이지)
// "이전", "다음" 문자열이있는 <a> 요소에 dataset을 설정하여 이전 혹은 다음페이지로 넘어갈 수 있음
const paginator = (page, total_page) => {
  let pjt_pagination = `
    <nav aria-label="Page navigation example">
      <ul id="page_nav" class="pagination justify-content-end" style="margin-top: 1rem">
        <li class="page-item"  style="cursor: pointer">
          <a class="page-link" data-page="-" onclick="page_load(this)">이전</a>
        </li>`;

  // 5개단위로 페이지를 선택할 수 있음 
  // ex) 13페이지인 경우 1 ~ 5, 6 ~ 10, 11 ~ 13
  let step = Math.floor((page - 1) / 5);
  for (let i = (step * 5) + 1; i <= (step * 5) + 5; i++) {
    if (i > total_page) {
      break;
    }
    pjt_pagination += `
    <li class="page-item"  style="cursor: pointer">
    <a class="page-link" data-page="${i}" onclick="page_load(this)">${i}</a>
    </li>`;
  }

  pjt_pagination += `
        <li class="page-item"  style="cursor: pointer">
         <a class="page-link" data-page="+" onclick="page_load(this)" >다음</a>
        </li>
      </ul>
    </nav>`;

  MAIN_CONTENTS.querySelector('#div-pagenation').innerHTML = pjt_pagination;
  let a_page = MAIN_CONTENTS.querySelector('#page_nav').querySelectorAll('a');
  // 선택 불가 옵션 추가
  if (total_page == 0) {
    a_page.forEach(a => a.classList.add('disabled'));
  } else {
    a_page.forEach((a) => {
      if (a.dataset.page == page) {
        a.classList.add('disabled');
      }
      if (a.dataset.page == '-' && page == 1) {
        a.classList.add('disabled');
      }
      if (a.dataset.page == '+' && page == total_page) {
        a.classList.add('disabled');
      }
    });
  }
}

// 검색기능을 활성화함
const searchActivate = () => {
  if (!inputSearch) {
    inputSearch = MAIN_CONTENTS.querySelector('#searchWord');

    inputSearch.addEventListener('keyup', function (key) {
      if (key.keyCode == 13) {
        cur_page = 1;
        // 검색어가 있는지 확인함
        if (inputSearch.value) {
          // SQL Developer에 사용될 와일드카드 문자열을 추가함
          searchWord = '%' + inputSearch.value + '%'
          if (searchScope == 'projectDetail') {
            listProjectDetail(pdnpt, cur_page, max_row, null, searchWord);
          } else if (searchScope == 'project') {
            listProject(cur_page, max_row, searchWord, '결재 완료 문서');
          } else if (searchScope == 'document') {
            listDocument(cur_page, max_row, searchWord);
          } else if (searchScope == 'documentApproval') {
            listDocumentApproval(cur_page, max_row, searchWord, '결재할 문서');
          } else if (searchScope == 'documentCurrent') {
            listDocumentCurrent(cur_page, max_row, searchWord, '작성한 문서');
          } else if (searchScope == 'documentRejected') {
            stat = 'DCST04';
            listDocumentByStat(cur_page, max_row, searchWord, '반려된 문서');
          } else if (searchScope == 'documentReturned') {
            stat = 'DCST02'
            listDocumentByStat(cur_page, max_row, searchWord, '회수한 문서');
          } else if (searchScope == 'faceChat') {
            listFaceChatRoom(cur_page, max_row, searchWord);
          }
        } else {
          searchWord = null;
          if (searchScope == 'projectDetail') {
            listProjectDetail(pdnpt, cur_page, max_row);
          } else if (searchScope == 'project') {
            listProject(cur_page, max_row);
          } else if (searchScope == 'document') {
            listDocument(cur_page, max_row, null, '결재 완료 문서');
          } else if (searchScope == 'documentApproval') {
            listDocumentApproval(cur_page, max_row, null, '결재할 문서');
          } else if (searchScope == 'documentCurrent') {
            listDocumentCurrent(cur_page, max_row, null, '작성한 문서');
          }  else if (searchScope == 'documentRejected') {
            stat = 'DCST04';
            listDocumentByStat(cur_page, max_row, null, '반려된 문서');
          } else if (searchScope == 'documentReturned') {
            stat = 'DCST02'
            listDocumentByStat(cur_page, max_row, null, '회수한 문서');
          } else if (searchScope == 'faceChat') {
            listFaceChatRoom(cur_page, max_row, null);
          }
        }
      }
    });
  }
}

// 한페이지에 표시할 최대 자료갯수를 선택하는 셀렉터를 활성화함
// 검색어 그리고 문서의 상태를 반영함
const rowBtnActivate = () => {

  if (!row_btn) {
    row_btn = MAIN_CONTENTS.querySelector('#row-max');

    row_btn.addEventListener('change', function () {
      max_row = this.options[this.selectedIndex].value;
      cur_page = 1;
      // 검색어가 있는지 확인함
      if (inputSearch.value) {
        searchWord = '%' + inputSearch.value + '%'
        if (searchScope == 'projectDetail') {
          listProjectDetail(pdnpt, cur_page, max_row, null, searchWord);
        } else if (searchScope == 'project') {
          listProject(cur_page, max_row, searchWord);
        } else if (searchScope == 'document') {
          listDocument(cur_page, max_row, searchWord, '결재 완료 문서');
        } else if (searchScope == 'documentApproval') {
          listDocumentApproval(cur_page, max_row, searchWord, '결재할 문서');
        } else if (searchScope == 'documentCurrent') {
          listDocumentCurrent(cur_page, max_row, searchWord, '작성한 문서');
        } else if (searchScope == 'documentRejected') {
          stat = 'DCST04';
          listDocumentByStat(cur_page, max_row, searchWord, '반려된 문서');
        } else if (searchScope == 'documentReturned') {
          stat = 'DCST02'
          listDocumentByStat(cur_page, max_row, searchWord, '회수한 문서');
        } else if (searchScope == 'faceChat') {
          listFaceChatRoom();
        }
      } else {
        searchWord = null;
        if (searchScope == 'projectDetail') {
          listProjectDetail(pdnpt, cur_page, max_row);
        } else if (searchScope == 'project') {
          listProject(cur_page, max_row);
        } else if (searchScope == 'document') {
          listDocument(cur_page, max_row, null, '결재 완료 문서');
        } else if (searchScope == 'documentApproval') {
          listDocumentApproval(cur_page, max_row, null, '결재할 문서');
        } else if (searchScope == 'documentCurrent') {
          listDocumentCurrent(cur_page, max_row, null, '작성한 문서');
        }  else if (searchScope == 'documentRejected') {
          stat = 'DCST04';
          listDocumentByStat(cur_page, max_row, null, '반려된 문서');
        } else if (searchScope == 'documentReturned') {
          stat = 'DCST02'
          listDocumentByStat(cur_page, max_row, null, '회수한 문서');
        } else if (searchScope == 'faceChat') {
          listFaceChatRoom();
        }
      }
    });
  }
}


// 검색기의 옵션을 선택한다.(제목과 담당자)
const searchSelecting = sel => {
  if (sel == 'title') {
    searchTitleFlag = true;
    MAIN_CONTENTS.querySelector('#search-icon').innerHTML = `제목`;
  } else if (sel == 'name') {
    searchTitleFlag = false;
    MAIN_CONTENTS.querySelector('#search-icon').innerHTML = `이름`;
  }
}