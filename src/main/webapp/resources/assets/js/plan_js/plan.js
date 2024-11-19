var calNumberId = 0;
function planPage() {
  let hostIndex = location.href.indexOf(location.host) + location.host.length;
  let contextPath = location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));
  MAIN_CONTENTS.innerHTML = `  
  <div class="mb-3 overflow-hidden position-relative">
    <div class="px-3">
      <h4 class="fs-6 mb-0">멤버십</h4>
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-0">
          <li class="breadcrumb-item">
            <a href="../main/index.html">Home</a>
          </li>
          <li class="breadcrumb-item" aria-current="page">멤버십</li>
        </ol>
      </nav>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-lg-6 text-center">
      <h1 class="fw-bolder mb-6 fs-10 lh-base"><font style="color: #0085DB;">시너브</font>의 모든 것을 즐기세요 ! </h1>
    </div>
  </div>
  <div class="d-flex align-items-center justify-content-center my-7">
  </div>
  <div class="row">


    <div class="col-sm-6 col-lg-4" id="bzplan">
      <div class="card">
        <div class="card-body pt-6" id="bzplan1">
        <div class="d-flex">
          <p class="fw-bolder text-uppercase fs-2 d-block mt-1 mb-3" id="BronzeplanNm"></p>
          <div class="ms-auto">
            <p class="badge fw-bolder py-1 bg-primary-subtle text-primary text-uppercase fs-2 rounded-3">CHEAP</p>
          </div>
        </div>
          <div class="my-4">
            <img id="bronzeImg" src="${contextPath}/resources/assets/images/backgrounds/bronze.png" alt="spike-img"
              class="img-fluid" width="100" height="100">
          </div>
          <div class="d-flex mb-3">
            <h5 class="fw-bolder fs-6 mb-0">₩</h5>
            <h2 class="fw-bolder fs-12 ms-2 mb-0" id="BronzeplanPrc"></h2>
            <p class="ms-2 fs-4 d-flex align-items-center">/월</p>
          </div>
          <ul class="list-unstyled mb-7" id="BzplanIntr"></ul>
          <button class="btn btn-primary fw-bolder py-6 w-100 text-capitalize" onclick="buyBtn($(this).text())">브론즈 구매</button>
        </div>
      </div>
    </div>


    <div class="col-sm-6 col-lg-4">
      <div class="card">
        <div class="card-body pt-6">
        <div class="d-flex">
          <p class="fw-bolder text-uppercase fs-2 d-block mt-1 mb-3" id="SilverplanNm"></p>
          <div class="ms-auto">
            <p class="badge fw-bolder py-1 bg-success-subtle text-success text-uppercase fs-2 rounded-3">POPULAR</p>
          </div>
        </div>
          <div class="my-4">
            <img id="silverImg" src="${contextPath}/resources/assets/images/backgrounds/silver.png" alt="spike-img"
              class="img-fluid" width="100" height="100" />
          </div>
          <div class="d-flex mb-3">
            <h5 class="fw-bolder fs-6 mb-0">₩</h5>
            <h2 class="fw-bolder fs-12 ms-2 mb-0" id="SilverplanPrc"></h2>
            <p class="ms-2 fs-4 d-flex align-items-center">/월</p>
          </div>
          <ul class="list-unstyled mb-7" id="SvplanIntr"></ul>

          <button class="btn btn-primary fw-bolder py-6 w-100 text-capitalize" id="buyBtn" onclick="buyBtn($(this).text())">실버 구매</button>
          <button class="btn mb-1 btn-danger text-white px-4 fs-4 mb-2 w-100 text-capitalize" id="deletebutton">해지하기</button> 
          <button class="btn btn-primary fw-bolder py-6 w-100 text-capitalize" id="updatebutton" style="display: inline-block; text-align: center">변경하기</button>
        </div>
      </div>
    </div>

    <div class="col-sm-6 col-lg-4" id="gdplan">
      <div class="card">
        <div class="card-body pt-6">
        <div class="d-flex">
          <p class="fw-bolder text-uppercase fs-2 d-block mt-1 mb-3" id="GoldplanNm"></p>
          <div class="ms-auto">
            <p class="badge fw-bolder py-1 bg-danger-subtle text-danger text-uppercase fs-2 rounded-3">BEST</p>
          </div>
        </div>
          <div class="my-4">
            <img id="goldImg" src="${contextPath}/resources/assets/images/backgrounds/gold.png" alt="spike-img"
              class="img-fluid" width="100" height="100">
          </div>
          <div class="d-flex mb-3">
            <h5 class="fw-bolder fs-6 mb-0">₩</h5>
            <h2 class="fw-bolder fs-12 ms-2 mb-0" id="GoldplanPrc"></h2>
            <p class="ms-2 fs-4 d-flex align-items-center">/월</p>
          </div>
          <ul class="list-unstyled mb-7" id="GdplanIntr"></ul>
          <button class="btn btn-primary fw-bolder py-6 w-100 text-capitalize" onclick="buyBtn($(this).text())">골드 구매</button>
        </div>
      </div>
    </div>
  </div>`;

  let chNo = {
    chNo: synerhubch
  }

  $.ajax({
    url: "/synerhub/plan/from",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: JSON.stringify(chNo),
    contentType: "application/json; charset=utf-8",
    success: function (res) {
      res.map(function (v, i) {
        if (res.length == 1) {
          $(document).find("#bzplan").css("visibility", "hidden");      //브론즈 숨기기
          $(document).find("#gdplan").css("visibility", "hidden");      //골드 숨기기
          $(document).find("#buyBtn").css("display", "none");          //chooseSilver 버튼 숨기기

          $(document).find("#plansymbol").html("사용중").attr("class", "badge fw-bolder py-1 bg-danger-subtle text-danger text-uppercase rounded-3").css("display", "none");

          var img = `${contextPath}/resources/assets/images/backgrounds/`;
          if (res[i].planNo == 1)
            img += "bronze.png";
          else if (res[i].planNo == 2)
            img += "silver.png";
          else if (res[i].planNo == 3)
            img += "gold.png";

          $(document).find("#silverImg").attr("src", img);
          $(document).find("#SilverplanNm").text(res[i].planNm);
          $(document).find("#SilverplanPrc").text(res[i].formattedPlanPrc);
          $("#SvplanIntr").html("");
          for (let j = 0; j < res[i].expList.length; j++) {
            if (res[i].expList[j].planIntr == null) {
              if (res[i].expList[j].planUse == "true") {
                $(document).find("#SvplanIntr").append(`
                  <li class="d-flex align-items-center gap-2 py-2">
                    <i class="ti ti-check text-primary fs-4"></i>
                    <span class="text-dark">${res[i].expList[j].planCateNm}</span>
                   </li>`);
              } else {
                $(document).find("#SvplanIntr").append(`
                    <li class="d-flex align-items-center gap-2 py-2">
                      <i class="ti ti-check fs-4"></i>
                      <span class="text-dark">${res[i].expList[j].planCateNm}</span>
                     </li>`);
              }
            } else {
              $(document).find("#SvplanIntr").append(`
                  <li class="d-flex align-items-center gap-2 py-2">
                    <i class="ti ti-check text-primary fs-4"></i>
                    <span class="text-dark">${res[i].expList[j].planCateNm} : ${res[i].expList[j].planIntr}</span>
                  </li>`);
            }
          }
        } else {
          $(document).find("#updatebutton").css("display", "none");
          $(document).find("#deletebutton").css("display", "none");

          if (i == 0) {
            //멤버십:Brozen
            $(document).find("#BronzeplanNm").text(res[i].planNm);    //멤버십명
            $(document).find("#BronzeplanPrc").text(res[i].formattedPlanPrc); //멤버십가격
          } else if (i == 1) {
            //멤버십명:Silver
            $(document).find("#SilverplanNm").text(res[i].planNm);
            $(document).find("#SilverplanPrc").text(res[i].formattedPlanPrc);
          } else if (i == 2) {
            //멤버십명:gold
            $(document).find("#GoldplanNm").text(res[i].planNm);
            $(document).find("#GoldplanPrc").text(res[i].formattedPlanPrc);
          }
          //멤버십설명
          for (let j = 0; j < res[i].expList.length; j++) {
            if (i == 0) {
              if (res[i].expList[j].planIntr == null) {
                if (res[i].expList[j].planUse == "true") {
                  $(document).find("#BzplanIntr").append(`
                  <li class="d-flex align-items-center gap-2 py-2">
                    <i class="ti ti-check text-primary fs-4"></i>
                    <span class="text-dark">${res[i].expList[j].planCateNm}</span>
                   </li>`);
                } else {
                  $(document).find("#BzplanIntr").append(`
                    <li class="d-flex align-items-center gap-2 py-2">
                      <i class="ti ti-check fs-4"></i>
                      <span class="text-dark">${res[i].expList[j].planCateNm}</span>
                     </li>`);
                }
              } else {
                $(document).find("#BzplanIntr").append(`
                  <li class="d-flex align-items-center gap-2 py-2">
                    <i class="ti ti-check text-primary fs-4"></i>
                    <span class="text-dark">${res[i].expList[j].planCateNm} : ${res[i].expList[j].planIntr}</span>
                  </li>`);
              }
            }
            else if (i == 1) {
              if (res[i].expList[j].planIntr == null) {
                if (res[i].expList[j].planUse == "true") {
                  $(document).find("#SvplanIntr").append(`
                  <li class="d-flex align-items-center gap-2 py-2">
                    <i class="ti ti-check text-primary fs-4"></i>
                    <span class="text-dark">${res[i].expList[j].planCateNm}</span>
                   </li>`);
                } else {
                  $(document).find("#SvplanIntr").append(`
                    <li class="d-flex align-items-center gap-2 py-2">
                      <i class="ti ti-check fs-4"></i>
                      <span class="text-dark">${res[i].expList[j].planCateNm}</span>
                     </li>`);
                }
              } else {
                $(document).find("#SvplanIntr").append(`
                  <li class="d-flex align-items-center gap-2 py-2">
                    <i class="ti ti-check text-primary fs-4"></i>
                    <span class="text-dark">${res[i].expList[j].planCateNm} : ${res[i].expList[j].planIntr}</span>
                  </li>`);
              }
            }
            else if (i == 2) {
              if (res[i].expList[j].planIntr == null) {
                if (res[i].expList[j].planUse == "true") {
                  $(document).find("#GdplanIntr").append(`
                  <li class="d-flex align-items-center gap-2 py-2">
                    <i class="ti ti-check text-primary fs-4"></i>
                    <span class="text-dark">${res[i].expList[j].planCateNm}</span>
                   </li>`);
                } else {
                  $(document).find("#GdplanIntr").append(`
                    <li class="d-flex align-items-center gap-2 py-2">
                      <i class="ti ti-check fs-4"></i>
                      <span class="text-dark">${res[i].expList[j].planCateNm}</span>
                     </li>`);
                }
              } else {
                $(document).find("#GdplanIntr").append(`
                  <li class="d-flex align-items-center gap-2 py-2">
                    <i class="ti ti-check text-primary fs-4"></i>
                    <span class="text-dark">${res[i].expList[j].planCateNm} : ${res[i].expList[j].planIntr}</span>
                  </li>`);
              }
            }
          }
        }
      });
    }
  });
};

let m = 0;
let alertTimer = null;
let myWindow = null;


function buyBtn(e) {
  if (synerhubch == null) {
    swal.fire("채널 입장후 멤버십을 결제 해주세요")
  } else {
    let hostIndex = location.href.indexOf(location.host) + location.host.length;
    let contextPath = location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));
    let plan = e.trim().split(" ")[0];
    let name = "";
    if(plan == "브론즈") name = "BRONZE";
    if(plan == "실버") name = "SILVER";
    if(plan == "골드") name = "GOLD";
    
    let data = {
      itemName: name,
      memNo: MEM_NO,
      chNo: synerhubch
    }
    $.ajax({
      url: "/synerhub/plan/pay/ready",
      type: "post",
      beforeSend: function (xhr) {
        xhr.setRequestHeader(header, token);
      },
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function (res) {
        myWindow = window.open(res.url, "a", "width=500, height=500, left=600, top=300");
        setTimeout(function () {
          myWindow.close();
        }, 180000);

        let cnt = {
          cnt: res.cnt,
          chNo: synerhubch
        };

        payInterval = setInterval(function () {
          m += 1;
          // m초 후 행동 정지
          if (m >= 180) {
            clearInterval(payInterval);
            return;
          }
          $.ajax({
            url: "/synerhub/plan/datacheck",
            type: "post",
            beforeSend: function (xhr) {
              xhr.setRequestHeader(header, token);
            },
            data: JSON.stringify(cnt),
            contentType: "application/json; charset=utf-8",
            success: function (result) {
              for (let k = 0; k < result.length; k++) {
              
              	swal.fire("멤버십 결제되였습니다");
                // 값 하나일떄
                if (result.length == 1) {
                  $(document).find("#bzplan").css("visibility", "hidden");
                  $(document).find("#gdplan").css("visibility", "hidden");
                  $(document).find("#plansymbol").html("사용중").attr("class", "badge fw-bolder py-1 bg-danger-subtle text-danger text-uppercase rounded-3").css("display", "none");

                  $(document).find("#updatebutton").css("display", "block");
                  $(document).find("#deletebutton").css("display", "block");
                  $(document).find("#buyBtn").css("display", "none");
                  $(document).find("#plansymbol").html("사용중").attr("class", "badge fw-bolder py-1 bg-danger-subtle text-danger text-uppercase rounded-3").css("text-align", "center");

                  var img = `${contextPath}/resources/assets/images/backgrounds/`;
                  if (result[k].planNo == 1)
                    img += "bronze.png";
                  else if (result[k].planNo == 2)
                    img += "silver.png";
                  else if (result[k].planNo == 3)
                    img += "gold.png";

                  $(document).find("#silverImg").attr("src", img);
                  $(document).find("#SilverplanNm").text(result[k].planNm);
                  $(document).find("#SilverplanPrc").text(result[k].formattedPlanPrc);
                  $("#SvplanIntr").html("")
                  for (let q = 0; q < result[k].expList.length; q++) {
                    if (result[k].expList[q].planIntr == null) {
                      if (result[k].expList[q].planUse == "true") {
                        $(document).find("#SvplanIntr").append(`
                        <li class="d-flex align-items-center gap-2 py-2">
                          <i class="ti ti-check text-primary fs-4"></i>
                          <span class="text-dark">${result[k].expList[q].planCateNm}</span>
                         </li>`);
                      } else {
                        $(document).find("#SvplanIntr").append(`
                          <li class="d-flex align-items-center gap-2 py-2">
                            <i class="ti ti-check fs-4"></i>
                            <span class="text-dark">${result[k].expList[q].planCateNm}</span>
                           </li>`);
                      }
                    } else {
                      $(document).find("#SvplanIntr").append(`
                        <li class="d-flex align-items-center gap-2 py-2">
                          <i class="ti ti-check text-primary fs-4"></i>
                          <span class="text-dark">${result[k].expList[q].planCateNm} : ${result[k].expList[q].planIntr}</span>
                        </li>`);
                    }
                  }
                  $(document).find("#SilverBtn").text("Choose " + result[k].planNm);
                  clearInterval(payInterval);
                }
              }
            }
          });
        }, 1000);
      }
    });
  }
};


//멤버십 구매후 해지버튼
$(document).on("click", "#deletebutton", function () {
  // 모달 HTML 생성
  var html = `
  <div class="modal fade" id="plan_delete_modal" tabindex="-1" aria-labelledby="vertical-center-modal" aria-hidden="true">
    <div class="modal-dialog modal-md" id="deleteModal">
      <div class="modal-content modal-filled bg-danger-subtle">
        <div class="modal-body p-4">
          <div class="text-center text-danger">
            <i class="ti ti-exclamation-circle fs-12"></i>
            <h4 class="mt-2" style="color: gray;">잠시만요!</h4>
            <p class="mt-3" style="color: black;">
              <strong>정말 멤버십을 해지하시겠어요?<br/>업그레이드 되는 다양한 혜택들을 누려보세요!</strong>
            </p>
              <input type="button" value="해지하기" class="btn btn-warning my-2 mb-1 px-4 fs-4" data-bs-toggle="modal" data-bs-target="#samedata-modal" data-bs-whatever="@mdo"/>
            </div>
          </div>
        </div>
      </div>
  </div>
  
  
  <div class="modal fade" id="samedata-modal" tabindex="-1" aria-labelledby="exampleModalLabel1">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header d-flex justify-content-between align-items-center w-100">
          <div class="text-center w-100">
            <h3 class="modal-title" id="exampleModalLabel1">
              	멤버십 해지
            </h3>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="mb-3 text-center">
              <h5 style="color: #666666">더 좋은 서비스를 위해 해지 사유를 선택해주세요.</h5>
            </div>
            <div class="mb-3 mt-4"> 
              <label for="message-text" class="mb-1" style="color: black;">해지 사유</label>
              <div class="ms-auto mt-3 mt-md-0">
                <select class="form-select bg-transparent border" id="choose">
                  <option selected disabled>선택</option>
                  <option value="서비스 이용이 복잡하고 어려워서">서비스 이용이 복잡하고 어려워서</option>
                  <option value="이용 가격이 비싸서">이용 가격이 비싸서</option>
                  <option value="서비스 장애나 에러가 많아서">서비스 장애나 에러가 많아서</option>
                  <option value="타 서비스를 이용하려고">타 서비스를 이용하려고</option>
                </select>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer justify-content-center">
          <input type="button" value="해지" type="button" class= "btn btn-danger" data-bs-dismiss="modal" onclick="MemberShipconfirmDelete()"/>
            <input type="button" class="btn bg-warning-subtle text-warning me-3" data-bs-dismiss="modal" id="backPlan" value="취소"/>
        </div>
      </div>
    </div>
  </div>
  </div>`;

  // 모달 HTML을 body에 추가
  $("body").append(html);
  $("body").find("#plan_delete_modal").modal("show");
});

// 해지 버튼
function MemberShipconfirmDelete() {
  
  
  let hostIndex = location.href.indexOf(location.host) + location.host.length;
  let contextPath = location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));

  var selection = $("#choose").val();
  $('#al-danger-alert').modal('hide');

  if (selection == null) {
    swal.fire("사유를 선택해주세요");
  } else {
    Swal.fire({
      title: '정말로 해지하시겠습니까?',
      text: "이 작업은 되돌릴 수 없습니다.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '예',
      cancelButtonText: '아니요',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('멤버십 해지가 완료되었습니다!', '이용해주셔서 감사합니다!', 'success');
        let data = {
          chNo: synerhubch,
          cclRsn: selection,
          planNm: $("#SilverplanNm").text()
        };

        $.ajax({
          url: "/synerhub/plan/delete",
          type: "post",
          contentType: "application/json; charset=utf-8",
          data: JSON.stringify(data),
          beforeSend: function (xhr) {
            xhr.setRequestHeader(header, token);
          },
          success: function (res) {
            $(document).find("#bzplan").css("visibility", "visible");      //브론즈 숨기기
            $(document).find("#gdplan").css("visibility", "visible");      //골드 숨기기
            $(document).find("#updatebutton").css("display", "none");
            $(document).find("#deletebutton").css("display", "none");
            $(document).find("#BzplanIntr").html("");
            $(document).find("#SvplanIntr").html("");
            $(document).find("#GdplanIntr").html("");
            $(document).find("#buyBtn").css("display", "block");
            for (let i = 0; i < res.length; i++) {
              var img = `${contextPath}/resources/assets/images/backgrounds/silver.png`;
              $(document).find("#silverImg").attr("src", img);
              if (i == 0) {
                //멤버십:Brozen
                $(document).find("#BronzeplanNm").text(res[i].planNm);    //멤버십명
                $(document).find("#BronzeplanPrc").text(res[i].formattedPlanPrc); //멤버십가격
              } else if (i == 1) {
                //멤버십명:Silver
                $(document).find("#SilverplanNm").text(res[i].planNm);
                $(document).find("#SilverplanPrc").text(res[i].formattedPlanPrc);
              } else if (i == 2) {
                //멤버십명:gold
                $(document).find("#GoldplanNm").text(res[i].planNm);
                $(document).find("#GoldplanPrc").text(res[i].formattedPlanPrc);
              }
              //멤버십설명
              for (let j = 0; j < res[i].expList.length; j++) {
                // 브론즈
                if (i == 0) {
                  // 체크박스
                  if (res[i].expList[j].planIntr == null) {
                    if (res[i].expList[j].planUse == "true") {
                      $(document).find("#BzplanIntr").append(`
                    <li class="d-flex align-items-center gap-2 py-2">
                      <i class="ti ti-check text-primary fs-4"></i>
                      <span class="text-dark">${res[i].expList[j].planCateNm}</span>
                     </li>`);
                    } else {
                      $(document).find("#BzplanIntr").append(`
                      <li class="d-flex align-items-center gap-2 py-2">
                        <i class="ti ti-check fs-4"></i>
                        <span class="text-dark">${res[i].expList[j].planCateNm}</span>
                       </li>`);
                    }
                  } 
                  // 설명
                  else {
                    $(document).find("#BzplanIntr").append(`
                    <li class="d-flex align-items-center gap-2 py-2">
                      <i class="ti ti-check text-primary fs-4"></i>
                      <span class="text-dark">${res[i].expList[j].planCateNm} : ${res[i].expList[j].planIntr}</span>
                    </li>`);
                  }
                }
                else if (i == 1) {
                  if (res[i].expList[j].planIntr == null) {
                    if (res[i].expList[j].planUse == "true") {
                      $(document).find("#SvplanIntr").append(`
                    <li class="d-flex align-items-center gap-2 py-2">
                      <i class="ti ti-check text-primary fs-4"></i>
                      <span class="text-dark">${res[i].expList[j].planCateNm}</span>
                     </li>`);
                    } else {
                      $(document).find("#SvplanIntr").append(`
                      <li class="d-flex align-items-center gap-2 py-2">
                        <i class="ti ti-check fs-4"></i>
                        <span class="text-dark">${res[i].expList[j].planCateNm}</span>
                       </li>`);
                    }
                  } else {
                    $(document).find("#SvplanIntr").append(`
                    <li class="d-flex align-items-center gap-2 py-2">
                      <i class="ti ti-check text-primary fs-4"></i>
                      <span class="text-dark">${res[i].expList[j].planCateNm} : ${res[i].expList[j].planIntr}</span>
                    </li>`);
                  }
                }
                else if (i == 2) {
                  if (res[i].expList[j].planIntr == null) {
                    if (res[i].expList[j].planUse == "true") {
                      $(document).find("#GdplanIntr").append(`
                    <li class="d-flex align-items-center gap-2 py-2">
                      <i class="ti ti-check text-primary fs-4"></i>
                      <span class="text-dark">${res[i].expList[j].planCateNm}</span>
                     </li>`);
                    } else {
                      $(document).find("#GdplanIntr").append(`
                      <li class="d-flex align-items-center gap-2 py-2">
                        <i class="ti ti-check fs-4"></i>
                        <span class="text-dark">${res[i].expList[j].planCateNm}</span>
                       </li>`);
                    }
                  } else {
                    $(document).find("#GdplanIntr").append(`
                    <li class="d-flex align-items-center gap-2 py-2">
                      <i class="ti ti-check text-primary fs-4"></i>
                      <span class="text-dark">${res[i].expList[j].planCateNm} : ${res[i].expList[j].planIntr}</span>
                    </li>`);
                  }
                }
              }
            }
          }
        });
      }
    });
  }
};

$(document).on('click', '#backPlan', function () {
  var modal = $('#plan_delete_modal');
  modal.modal('hide'); // 모달을 닫는 방법
});

// 모달 외부 클릭 시 닫기
$(document).on('click', function (event) {
  var modal = $('#plan_delete_modal');
  modal.modal('hide'); // 모달을 닫는 방법
});


//멤버십 구매후 변경버튼   
$(document).on("click", "#updatebutton", function () {
  var html1 = `
  <div id="updateModal" class="modal" style="background-color: rgba(0, 0, 0, 0.7); text-align: center;">
    <div class="modal-content"
      style="display: flex; text-align: center; align-items: center; justify-content: center; width: 25%; height: 35%; margin: 35px auto;">
      <h3 class="modal-title" id="exampleModalLabel1">
        멤버십 변경하기
      </h3>
      <h5 class="fs-4 fw-semibold mt-3 mb-3">더 좋은 서비스를 만나보세요!</h5>
      <div class="mb-4 row align-items-center">
        <div class="col-sm-12">
          <select class="form-select" id="choose1" style="text-align: center;">
            <option selected disabled>멤버십 선택</option>
            <option value="1" id="op1">BRONZE</option>
            <option value="2" id="op2">SILVER</option>
            <option value="3" id="op3">GOLD</option>
          </select>
        </div>

        <div style="position: relative; top:60px;">
          <button class="btn btn-success me-2" id="confirmUpdate">변경</button>
          <button class="btn bg-warning-subtle text-warning" id="backPlan2">취소</button>
        </div>
      </div>
    </div>
  </div>`;

  
  $("body").append(html1);
  $("#updateModal").css("display", "block");
  let name = {
    chNo: synerhubch
  }
  $.ajax({
    url: "/synerhub/plan/optionChk",
    type: "post",
    beforeSend: function (xhr) {
      xhr.setRequestHeader(header, token);
    },
    data: JSON.stringify(name),
    contentType: "application/json; charset=utf-8",
    success: function (no) {
      calNumberId = no.planNo;
      $("#op" + no.planNo).css("display", "none");
      $("#confirmUpdate").attr("onclick", `confirmUpdate(${no.planNo})`)
    }
  });

});

// 멤버십 변경
function confirmUpdate(originalNo) {
  
  let hostIndex = location.href.indexOf(location.host) + location.host.length;
  let contextPath = location.href.substring(hostIndex, location.href.indexOf('/', hostIndex + 1));

  let selection2 = $("#choose1").val();

  Swal.fire({
    title: '정말로 변경하시겠습니까?',
    text: "멤버십변경시 되돌릴 수 없습니다.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: '변경',
    cancelButtonText: '뒤로가기',
  }).then((results) => {
    if (results.isConfirmed) {
	  
	  $("#op"+calNumberId).css("display", "block");
      let dong = {
        planNo: selection2,
        originalNo: originalNo,
        chNo: synerhubch,
        memNo: MEM_NO
      };

      $.ajax({
        url: "/synerhub/plan/update",
        type: "post",
        beforeSend: function (xhr) {
          xhr.setRequestHeader(header, token);
        },
        data: JSON.stringify(dong),
        contentType: "application/json; charset=utf-8",
        success: function (res1) {
          $(document).find(".modal").css("display", "none");
          myWindow = window.open(res1.url, "a", "width=500, height=500, left=600, top=300");
          setTimeout(function () {
            myWindow.close();
          }, 180000);

          let cnt = {
            cnt: res1.cnt,
            chNo: synerhubch
          };

          payUpdInterval = setInterval(function () {
            m += 1;

            // m초 후 행동 정지
            if (m >= 180) {
              clearInterval(payUpdInterval);
              return;
            }
            $.ajax({
              url: "/synerhub/plan/datacheck",
              type: "post",
              beforeSend: function (xhr) {
                xhr.setRequestHeader(header, token);
              },
              data: JSON.stringify(cnt),
              contentType: "application/json; charset=utf-8",
              success: function (result) {
              	swal.fire("멤버십 변경되였습니다");
                for (let k = 0; k < result.length; k++) {
                  // 값 하나일떄
                  $(document).find("#plansymbol").html("사용중").attr("class", "badge fw-bolder py-1 bg-danger-subtle text-danger text-uppercase rounded-3").css("text-align", "center");

                  $(document).find("#bzplan").css("visibility", "hidden");
                  $(document).find("#gdplan").css("visibility", "hidden");
                  $(document).find("#plansymbol").html("사용중").attr("class", "badge fw-bolder py-1 bg-danger-subtle text-danger text-uppercase rounded-3").css("display", "none");

                  $(document).find("#updatebutton").css("display", "block");
                  $(document).find("#deletebutton").css("display", "block");ㄴ
                  $(document).find("#buyBtn").css("display", "none");
                  $(document).find("#plansymbol").html("사용중").attr("class", "badge fw-bolder py-1 bg-danger-subtle text-danger text-uppercase rounded-3").css("text-align", "center");

                  var img = `${contextPath}/resources/assets/images/backgrounds/`;
                  if (result[k].planNo == 1)
                    img += "bronze.png";
                  else if (result[k].planNo == 2)
                    img += "silver.png";
                  else if (result[k].planNo == 3)
                    img += "gold.png";

                  $(document).find("#silverImg").attr("src", img);
                  $(document).find("#SilverplanNm").text(result[k].planNm);
                  $(document).find("#SilverplanPrc").text(result[k].formattedPlanPrc);
                  $("#SvplanIntr").html("");
                  for (let q = 0; q < result[k].expList.length; q++) {
                    if (result[k].expList[q].planIntr == null) {
                      if (result[k].expList[q].planUse == "true") {
                        $(document).find("#SvplanIntr").append(`
                        <li class="d-flex align-items-center gap-2 py-2">
                          <i class="ti ti-check text-primary fs-4"></i>
                          <span class="text-dark">${result[k].expList[q].planCateNm}</span>
                         </li>`);
                      } else {
                        $(document).find("#SvplanIntr").append(`
                          <li class="d-flex align-items-center gap-2 py-2">
                            <i class="ti ti-check fs-4"></i>
                            <span class="text-dark">${result[k].expList[q].planCateNm}</span>
                           </li>`);
                      }
                    } else {
                      $(document).find("#SvplanIntr").append(`
                        <li class="d-flex align-items-center gap-2 py-2">
                          <i class="ti ti-check text-primary fs-4"></i>
                          <span class="text-dark">${result[k].expList[q].planCateNm} : ${result[k].expList[q].planIntr}</span>
                        </li>`);
                    }
                  }
                  $(document).find("#SilverBtn").text("Choose " + result[k].planNm);
                  clearInterval(payUpdInterval);
                }
              }
            });
          }, 1000);
        }
      });
    }
  });
};

//취소 클릭시 뒤로가기
$(document).on('click', '#backPlan2', function () {
  $(document).find("#updateModal").css("display", "none")
});

// 모달 외부 클릭 시 모달 닫기
$(document).on("click", function (event) {
  const modal = $("#updateModal");
  if (modal.length && event.target == modal[0]) {
    $(modal).css("display", "none");
  }
});

