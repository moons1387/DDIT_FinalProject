<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page session="false"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />
<div class="row">
	<div id="main_contents">
		<div class="mb-3 overflow-hidden position-relative">
            <div class="px-3">
              <h4 class="fs-6 mb-0">SynerHUB</h4>
              <nav aria-label="breadcrumb">
                <ol class="breadcrumb mb-0">
                  <li class="breadcrumb-item">
                    <a href="../horizontal/index.html">Home</a>
                  </li>
                  <li class="breadcrumb-item" aria-current="page">Intro</li>
                </ol>
              </nav>
            </div>
          </div>

            <div class="col-md-12 col-lg-12" style="height: 80vh;">
              <div class="card blog blog-img-three position-relative overflow-hidden hover-img" style="height: 80vh;">
                <div class="card-body position-relative">
                  <div class="d-flex flex-column justify-content-between h-100">
                    <div class="d-flex align-items-center justify-content-center mt-4 mb-4">
                      <div class="position-relative" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Mollie Underwood">
                        <!-- <img src="../assets/images/profile/user-4.jpg" alt="spike-img" class="rounded-circle img-fluid" width="40" height="40"> -->
                      </div>
                      <h3 style="color: lightgray;" class="text-center mx-3 mt-3">
                        <font color="#0085DB">SynerHUB</font>에 오신 것을 환영합니다!
                      </h3>
                      <!-- <span class="badge text-bg-primary fs-2 fw-semibold">Gadget</span> -->
                    </div>
                    
					<div class="d-flex align-items-center justify-content-center mt-4" style="font-size: 8em; margin-left: 50px;">
                    </div>
                    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                      <div class="carousel-inner">
                        <div class="carousel-item active">
                          <h1 class="text-center mx-3">
                            	<font color="#FFFFFF">업무의 모든 것,</font><br/> 
                            <font color="#0085DB">시너브</font><font color="#FFFFFF">로 쉽고 빠르게</font>
                          </h1>
                        </div>
                        <div class="carousel-item">
                          <h1 class="text-center mx-3">
                           	 <font color="#FFFFFF">업무 관리부터</font><br/> 
                            	<font color="#FFFFFF">소통까지</font><font color="#0085DB"> 한 번에</font><font color="#FFFFFF">!</font>
                          </h1>
                        </div>  
                        <div class="carousel-item">
                          <h1 class="text-center mx-3">
                            	<font color="#FFFFFF">진짜</font> <font color="#0085DB">올인원</font><font color="#FFFFFF">,<br/>쉬운 업무 플랫폼</font>
                          </h1>
                        </div>
                      </div>
                      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                      </button>
                      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                      </button>
                    </div>

                    <div class="d-flex flex-column align-items-center">
                      <div style="width: 35%;">
                        <a href="javascript:void(0);" class="btn btn-light text-dark d-flex align-items-center justify-content-center" id="iconClick">
						  <font style="font-size: x-large;"><strong>채널 생성하기</strong></font>
						  <iconify-icon icon="line-md:arrow-right" style="font-size: 2em; margin-left: 10px;"></iconify-icon>
						</a>
                      </div>
                      <div class="d-flex align-items-center gap-4 mt-3 mb-3">
                        <div class="d-flex align-items-center gap-2 text-white fs-3 fw-normal mb-3">
                          <i class="ti ti-copyright fs-4"></i>
                          2024. SynerHUB All Rights Reserved. 
                        </div>
                      </div>
                      <div class="d-flex align-items-center justify-content-center mb-3" style="font-size: 8em; margin-left: 50px;">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
	</div>
</div>

