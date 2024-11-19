<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec" %>
<%@ page session="false"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<div class="auth-login-shape-box position-relative">
		<div class="d-flex align-items-center justify-content-center w-100 z-1 position-relative">
			<div class="card auth-card mt-6 mb-6 mx-3" style="width: 700px">
				<div class="card-body">
					<a href="${contextPath }/main/" class="text-nowrap logo-img text-center d-flex align-items-center justify-content-center mb-5 w-100">
						<img src="${contextPath }/resources/assets/images/logos/logo2.png" style="object-fit: cover; width: 100%; height: 100%;" class="light-logo" alt="Logo-Dark" /> 
						<img src="${contextPath }/resources/assets/images/logos/logo2.png" style="object-fit: cover; width: 100%; height: 100%;" class="dark-logo" alt="Logo-light" />
					</a>
					<div class="row">
						<form action="${contextPath}/login/signup_terms.do" method="post" id="termsForm">
							<div class="col-12">
				                <!-- start Person Info -->
				                <div class="card" style="display: flex;">
				                  <div class="card-header text-bg-primary d-flex align-items-center justify-content-between">
				                    <h4 class="mb-0 text-white">이용약관 동의</h4>
				                    <nav id="navbar-example2" class="navbar navbar-light px-3">
				                      <ul class="nav nav-pills">
				                        <li class="nav-item">
				                          <a class="nav-link" href="#one">
				                            <i class="ti ti-circle-number-1"></i> 
				                          </a>
				                        </li>
				                        <li class="nav-item">
				                          <a class="nav-link" href="#two">
				                            <i class="ti ti-circle-number-2"></i> 
				                          </a>
				                        </li>
				                        <li class="nav-item">
				                          <a class="nav-link" href="#three">
				                            <i class="ti ti-circle-number-3"></i> 
				                          </a>
				                        </li>
				                      </ul>
				                    </nav>
				                  </div>
<!-- 				                  <form> -->
				                    <div>
				                      <div class="card-body">
				                        <div class="col-lg-12 d-flex align-items-stretch">
				                          <!--  start Scrollspy in navbar -->
				                          <div class="card w-100">
				                            <div class="card-body">
				                              <h5 class="card-title"><i class="ti ti-circle-dot"></i>&nbsp;약관 동의</h5>
				                                <div class="position-relative mt-3 p-3 border overflow-auto" style="height: 200px" data-bs-target="#navbar-example2" data-bs-offset="0" tabindex="0">
				                                  <strong id="one">one</strong>
				                                  <p>
													여러분을 환영합니다.
													네이버 서비스 및 제품(이하 ‘서비스’)을 이용해 주셔서 감사합니다. 본 약관은 다양한 네이버 서비스의 이용과 관련하여 네이버 서비스를 제공하는 네이버 주식회사(이하 ‘네이버’)와 이를 이용하는 네이버 서비스 회원(이하 ‘회원’) 또는 비회원과의 관계를 설명하며, 아울러 여러분의 네이버 서비스 이용에 도움이 될 수 있는 유익한 정보를 포함하고 있습니다.
													네이버 서비스를 이용하시거나 네이버 서비스 회원으로 가입하실 경우 여러분은 본 약관 및 관련 운영 정책을 확인하거나 동의하게 되므로, 잠시 시간을 내시어 주의 깊게 살펴봐 주시기 바랍니다.
													다양한 네이버 서비스를 즐겨보세요.
													네이버는 www.naver.com을 비롯한 네이버 도메인의 웹사이트 및 응용프로그램(어플리케이션, 앱)을 통해 정보 검색, 다른 이용자와의 커뮤니케이션, 콘텐츠 제공, 상품 쇼핑 등 여러분의 생활에 편리함을 더할 수 있는 다양한 서비스를 제공하고 있습니다.
													여러분은 PC, 휴대폰 등 인터넷 이용이 가능한 각종 단말기를 통해 각양각색의 네이버 서비스를 자유롭게 이용하실 수 있으며, 개별 서비스들의 구체적인 내용은 각 서비스 상의 안내, 공지사항, 네이버 웹고객센터(이하 ‘고객센터’) 도움말 등에서 쉽게 확인하실 수 있습니다.
													네이버는 기본적으로 여러분 모두에게 동일한 내용의 서비스를 제공합니다. 다만, '청소년보호법' 등 관련 법령이나 기타 개별 서비스 제공에서의 특별한 필요에 의해서 연령 또는 일정한 등급을 기준으로 이용자를 구분하여 제공하는 서비스의 내용, 이용 시간, 이용 횟수 등을 다르게 하는 등 일부 이용을 제한하는 경우가 있습니다. 자세한 내용은 역시 각 서비스 상의 안내, 공지사항, 고객센터 도움말 등에서 확인하실 수 있습니다.
													네이버 서비스에는 기본적으로 본 약관이 적용됩니다만 네이버가 다양한 서비스를 제공하는 과정에서 부득이 본 약관 외 별도의 약관, 운영정책 등을 적용하는 경우(예, 네이버페이, V LIVE 등)가 있습니다. 그리고 네이버 계열사가 제공하는 특정 서비스의 경우에도(예, LINE, SNOW등) 해당 운영 회사가 정한 고유의 약관, 운영정책 등이 적용될 수 있습니다. 이러한 내용은 각각의 해당 서비스 초기 화면에서 확인해 주시기 바랍니다.
				                                  </p>
				                                </div>
				                                <div class="form-check form-check-inline mt-2">
				                                  <input class="form-check-input success" type="checkbox" id="check1" name="chk" value="option1">
				                                  <label class="form-check-label" for="success2-check">이용약관에 동의합니다.<font color="#4BD08B">(필수)</font></label>
				                                </div>
				                            </div>
				                            <div class="card-body">
				                              <h5 class="card-title"><i class="ti ti-circle-dot"></i>&nbsp;개인정보 수집 이용 조회 동의</h5>
				                                <div class="position-relative mt-3 p-3 border overflow-auto" style="height: 200px" data-bs-target="#navbar-example2" data-bs-offset="0" tabindex="0">
				                                  <strong id="two">two</strong>
				                                  <p>
									                                    개인정보보호법에 따라 네이버에 회원가입 신청하시는 분께 수집하는 개인정보의 항목, 개인정보의 수집 및 이용목적, 개인정보의 보유 및 이용기간, 동의 거부권 및 동의 거부 시 불이익에 관한 사항을 안내 드리오니 자세히 읽은 후 동의하여 주시기 바랍니다.
					
													1. 수집하는 개인정보
													이용자는 회원가입을 하지 않아도 정보 검색, 뉴스 보기 등 대부분의 네이버 서비스를 회원과 동일하게 이용할 수 있습니다. 이용자가 메일, 캘린더, 카페, 블로그 등과 같이 개인화 혹은 회원제 서비스를 이용하기 위해 회원가입을 할 경우, 네이버는 서비스 이용을 위해 필요한 최소한의 개인정보를 수집합니다.
													
													회원가입 시점에 네이버가 이용자로부터 수집하는 개인정보는 아래와 같습니다.
													- 회원 가입 시 필수항목으로 아이디, 비밀번호, 이름, 생년월일, 성별, 휴대전화번호를, 선택항목으로 본인확인 이메일주소를 수집합니다. 실명 인증된 아이디로 가입 시, 암호화된 동일인 식별정보(CI), 중복가입 확인정보(DI), 내외국인 정보를 함께 수집합니다. 만 14세 미만 아동의 경우, 법정대리인의 동의를 받고 있으며, 휴대전화번호 또는 아이핀 인증을 통해 법정대리인의 동의를 확인하고 있습니다. 이 과정에서 법정대리인의 정보(법정대리인의 이름, 중복가입확인정보(DI), 휴대전화번호(아이핀 인증인 경우 아이핀번호))를 추가로 수집합니다.
													- 비밀번호 없이 회원 가입 시에는 필수항목으로 아이디, 이름, 생년월일, 휴대전화번호를, 선택항목으로 비밀번호를 수집합니다.
													- 단체 회원가입 시 필수 항목으로 단체아이디, 비밀번호, 단체이름, 이메일주소, 휴대전화번호를, 선택항목으로 단체 대표자명을 수집합니다.
													서비스 이용 과정에서 이용자로부터 수집하는 개인정보는 아래와 같습니다.
													- 회원정보 또는 개별 서비스에서 프로필 정보(별명, 프로필 사진)를 설정할 수 있습니다. 회원정보에 별명을 입력하지 않은 경우에는 마스킹 처리된 아이디가 별명으로 자동 입력됩니다.
													- 네이버 내의 개별 서비스 이용, 이벤트 응모 및 경품 신청 과정에서 해당 서비스의 이용자에 한해 추가 개인정보 수집이 발생할 수 있습니다. 추가로 개인정보를 수집할 경우에는 해당 개인정보 수집 시점에서 이용자에게 ‘수집하는 개인정보 항목, 개인정보의 수집 및 이용목적, 개인정보의 보관기간’에 대해 안내 드리고 동의를 받습니다.
				                                  </p>
				                                </div>
				                                <div class="form-check form-check-inline mt-2">
				                                  <input class="form-check-input success" type="checkbox" id="check2" name="chk" value="option2">
				                                  <label class="form-check-label" for="success2-check">위와 같이 본인의 개인정보를 수집·이용하는 것에 동의합니다.<font color="#4BD08B">(필수)</font></label>
				                                </div>
				                            </div>
				                            <div class="card-body">
				                              <h5 class="card-title"><i class="ti ti-circle-dot"></i>&nbsp;정책정보 제공을 위한 수집 및 이용 동의</h5>
				                                <div class="position-relative mt-3 p-3 border overflow-auto" style="height: 200px" data-bs-target="#navbar-example2" data-bs-offset="0" tabindex="0">
				                                  <strong id="three">three</strong>
				                                  <p>
									                                    제 1 조 (목적)
													이 약관은 네이버 주식회사 (이하 “회사”)가 제공하는 위치기반서비스와 관련하여 회사와 개인위치정보주체와의 권리, 의무 및 책임사항, 기타 필요한 사항을 규정함을 목적으로 합니다.
													
													제 2 조 (약관 외 준칙)
													이 약관에 명시되지 않은 사항은 위치정보의 보호 및 이용 등에 관한 법률, 개인정보보호법, 정보통신망 이용촉진 및 정보보호 등에 관한 법률, 전기통신기본법, 전기통신사업법 등 관계법령과 회사의 이용약관 및 개인정보처리방침, 회사가 별도로 정한 지침 등에 의합니다.
													
													제 3 조 (서비스 내용 및 요금)
													① 회사는 위치정보사업자로부터 위치정보를 전달받아 아래와 같은 위치기반서비스를 제공합니다.
													
													1. GeoTagging 서비스: 게시물 또는 이용자가 저장하는 콘텐츠에 포함된 개인위치정보주체 또는 이동성 있는 기기의 위치정보가 게시물과 함께 저장됩니다. 저장된 위치정보는 별도의 활용없이 보관되거나, 또는 장소를 기반으로 콘텐츠를 분류하거나 검색할 수 있는 기능이 제공될 수도 있습니다.
													2. 위치정보를 활용한 검색결과 및 콘텐츠 제공 : 정보 검색을 요청하거나 개인위치정보주체 또는 이동성 있는 기기의 위치정보를 제공 시 본 위치정보를 이용한 검색결과, 주변결과(맛집, 주변업체, 교통수단 등), 번역결과를 제시합니다.
													3. 이용자 위치를 활용한 광고정보 제공: 검색결과 또는 기타 서비스 이용 과정에서 개인위치정보주체 또는 이동성 있는 기기의 위치를 이용하여 광고소재를 제시합니다.
													4. 이용자 보호 및 부정 이용 방지: 개인위치정보주체 또는 이동성 있는 기기의 위치를 이용하여 권한없는 자의 비정상적인 서비스 이용 시도 등을 차단합니다.
													5. 길 안내 등 생활편의 서비스 제공: 교통정보와 길 안내 등 최적의 경로를 지도로 제공하며, 주변 시설물 찾기, 뉴스/날씨 등 생활정보, 긴급구조 서비스, 주소 자동 입력 등 다양한 운전 및 생활 편의 서비스를 제공합니다.
													② 제1항 위치기반서비스의 이용요금은 무료입니다.
													제 4 조 (개인위치정보주체의 권리)
													① 개인위치정보주체는 개인위치정보 수집 범위 및 이용약관의 내용 중 일부 또는 개인위치정보의 이용ㆍ제공 목적, 제공받는 자의 범위 및 위치기반서비스의 일부에 대하여 동의를 유보할 수 있습니다.
													② 개인위치정보주체는 개인위치정보의 수집ㆍ이용ㆍ제공에 대한 동의의 전부 또는 일부를 철회할 수 있습니다.
													③ 개인위치정보주체는 언제든지 개인위치정보의 수집ㆍ이용ㆍ제공의 일시적인 중지를 요구할 수 있습니다. 이 경우 회사는 요구를 거절하지 아니하며, 이를 위한 기술적 수단을 갖추고 있습니다
													④ 개인위치정보주체는 회사에 대하여 아래 자료의 열람 또는 고지를 요구할 수 있고, 당해 자료에 오류가 있는 경우에는 그 정정을 요구할 수 있습니다. 이 경우 회사는 정당한 이유 없이 요구를 거절하지 아니합니다.
													
													1. 개인위치정보주체에 대한 위치정보 수집ㆍ이용ㆍ제공사실 확인자료
													2. 개인위치정보주체의 개인위치정보가 위치정보의 보호 및 이용 등에 관한 법률 또는 다른 법령의 규정에 의하여 제3자에게 제공된 이유 및 내용
													⑤ 회사는 개인위치정보주체가 동의의 전부 또는 일부를 철회한 경우에는 지체 없이 수집된 개인위치정보 및 위치정보 수집ㆍ이용ㆍ제공사실 확인자료를 파기합니다.단, 동의의 일부를 철회하는 경우에는 철회하는 부분의 개인위치정보 및 위치정보 수집ㆍ이용ㆍ제공사실 확인자료에 한합니다.
													⑥ 개인위치정보주체는 제1항 내지 제4항의 권리행사를 위하여 이 약관 제13조의 연락처를 이용하여 회사에 요구할 수 있습니다.
													제 5 조 (법정대리인의 권리)
													① 회사는 만 14세 미만 아동으로부터 개인위치정보를 수집ㆍ이용 또는 제공하고자 하는 경우에는 만 14세 미만 아동과 그 법정대리인의 동의를 받아야 합니다.
													② 법정대리인은 만 14세 미만 아동의 개인위치정보를 수집ㆍ이용ㆍ제공에 동의하는 경우 동의유보권, 동의철회권 및 일시중지권, 열람ㆍ고지요구권을 행사할 수 있습니다.
				                                  </p>
				                                </div>
				                                <div class="form-check form-check-inline mt-2">
				                                  <input class="form-check-input success" type="checkbox" id="check3" name="chk" value="option3">
				                                  <label class="form-check-label" for="success2-check">정책정보 제공을 위한 개인정보 수집·이용하는 것에 동의합니다.<font color="#4BD08B">(필수)</font></label>
				                                </div>
				                            </div>
				
				                          </div>
				                          <!--  end Scrollspy in navbar -->
				                        </div>
				                        <div class="d-flex justify-content-center mt-2">
										  <div class="form-check form-check-inline">
										    <input class="form-check-input success" type="checkbox" id="checkAll" name="checkAll" required="required">
										    <label class="form-check-label" for="checkAll">위 약관에 전체 동의합니다.</label>
										    <input type="hidden" name="memAgree" id="memAgree" value="N">
										  </div>
										</div>

				                        <!--/row-->
				                      </div>
				                    </div>
<!-- 				                  </form> -->
				                </div>
				                <!-- end Person Info -->
				              </div>

		                      <div class="form-actions">
		                        <div class="card-body border-top d-flex justify-content-center">
								 <button type="submit" class="btn bg-danger-subtle text-danger" style="padding-left: 60px; padding-right: 60px;">
								     취소
								 </button>
								  <button type="button" class="btn btn-primary ms-3" id="agreeBtn" disabled="disabled" style="padding-left: 70px; padding-right: 70px;">
								    다음
								  </button>
								</div>
		                      </div>
							<div class="d-flex justify-content-center align-items-center">
							    <p class="fs-4 mb-0 text-dark">이미 계정이 있으신가요?</p>
							    <a class="text-primary fw-medium ms-2" href="${contextPath}/login.do">로그인</a>
							</div>
						<sec:csrfInput/>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script type="text/javascript">
$(document).ready(function() {
	
    $('#checkAll').change(function() {	// 전체 체크박스가 변경되었을 때 이벤트 처리
        const isChecked = $(this).is(':checked');	 // 전체 체크박스의 체크 상태 가져오기
        $('#check1, #check2, #check3').prop('checked', isChecked);	// 개별 체크박스의 체크 상태를 전체 체크박스의 상태에 맞게 설정
        $('.form-check-input.success').each(function(index) {	 // 모든 체크박스의 상태에 따라 링크에 active 클래스 추가/제거
            if (this.checked) {
                $('.nav-link').eq(index).addClass('active');	// 체크된 경우 active 클래스 추가
            } else {
                $('.nav-link').eq(index).removeClass('active');	// 체크 해제된 경우 active 클래스 제거
            }
        });
        $('#agreeBtn').prop('disabled', !isChecked);	// 전체 체크박스 상태에 따라 agreeBtn 버튼 활성화
        $('#memAgree').val(this.checked ? 'Y' : 'N');
    });

    $('.form-check-input.success').change(function() {	// 개별 체크박스의 상태가 변경될 때 이벤트 처리
        const index = $('.form-check-input.success').index(this);	// 현재 체크박스의 인덱스 가져오기

        if (this.checked) {
            $('.nav-link').eq(index).addClass('active');	// 체크박스가 체크된 경우 active 클래스 추가
        } else {
            $('.nav-link').eq(index).removeClass('active');	// 체크박스가 체크 해제된 경우 active 클래스 제거
        }

        // 개별 체크박스가 모두 체크되었는지 확인
        const allChecked = $('#check1').is(':checked') && $('#check2').is(':checked') && $('#check3').is(':checked');
        $('#checkAll').prop('checked', allChecked);		// 모두 체크된 경우 전체 체크박스도 체크
        $('#agreeBtn').prop('disabled', !allChecked);	// 모든 체크박스가 체크되었을 때만 agreeBtn 버튼 활성화
    });
});

$(function(){
    var termsForm = $("#termsForm");
    var agreeBtn = $("#agreeBtn");

    agreeBtn.on("click", function(){
        var allChecked = $('#check1').is(':checked') && $('#check2').is(':checked') && $('#check3').is(':checked') && $('#checkAll').is(':checked');
        
        // 전체 체크박스가 체크되어 있지 않으면 경고 메시지 표시
        if (!allChecked) {
            alert("SynerHUB의 이용 약관에 동의해 주세요");
            return;
        }
        termsForm.submit(); 
    });
});

</script>

</html>