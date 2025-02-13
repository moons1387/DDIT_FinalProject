<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://www.springframework.org/security/tags" prefix="sec"%>
<c:set value="${pageContext.request.contextPath }" var="contextPath" />
          <!--  Header Start -->
          <header class="topbar sticky-top">
            <div class="with-vertical">
              <!-- ---------------------------------- -->
              <!-- Start Vertical Layout Header -->
              <!-- ---------------------------------- -->
              <nav class="navbar navbar-expand-lg p-0">
                <ul class="navbar-nav">
                  <li class="nav-item nav-icon-hover-bg rounded-circle">
                    <a class="nav-link sidebartoggler" id="headerCollapse" href="javascript:void(0)">
                      <iconify-icon icon="solar:list-bold-duotone" class="fs-7"></iconify-icon>
                    </a>
                  </li>
                </ul>

                <ul class="navbar-nav quick-links d-none d-lg-flex align-items-center">
                  <!-- ------------------------------- -->
                  <!-- start apps Dropdown -->
                  <!-- ------------------------------- -->
                  <!-- end apps Dropdown -->
                  <!-- ------------------------------- -->
                </ul>

                <div class="d-block d-lg-none py-3">
                  <img src="${contextPath}/resources/assets/images/logos/logo2.png" class="dark-logo" alt="Logo-Dark" style="object-fit: cover; width: 100%; height: 100%;"/>
                </div>


                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                  <div class="d-flex align-items-center justify-content-between">
                    <a href="javascript:void(0)" class="nav-link d-flex d-lg-none align-items-center justify-content-center" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobilenavbar" aria-controls="offcanvasWithBothOptions">
                      <div class="nav-icon-hover-bg rounded-circle ">
                        <i class="ti ti-align-justified fs-7"></i>
                      </div>
                    </a>
                    <ul class="navbar-nav flex-row ms-auto align-items-center justify-content-center">
                      <li class="nav-icon-hover-bg rounded-circle">
					    <button class="nav-link position-relative" type="button" data-bs-toggle="modal" data-bs-target="#vertical-center-modal" id="drop2" aria-expanded="false" style="margin-top: 5px;">
					    	<iconify-icon icon="mdi:customer-service" class="fs-8"></iconify-icon>
						</button>   
					  </li>    

        

                      <!-- ------------------------------- -->
                      <!-- start profile Dropdown -->
                      <!-- ------------------------------- -->
                      <li class="nav-item dropdown">
                        <a class="nav-link position-relative ms-6" href="javascript:void(0)" id="drop1" aria-expanded="false">
                          <div class="d-flex align-items-center flex-shrink-0">
                            <div class="user-profile me-sm-3 me-2">
                              <img src="${contextPath}<sec:authentication property="principal.member.memPrflimg"/>" width="40" class="rounded-circle" alt="spike-img">
                            </div>
                            <span class="d-sm-none d-block"><iconify-icon icon="solar:alt-arrow-down-line-duotone"></iconify-icon></span>

                            <div class="d-none d-sm-block">
                              <h6 class="fs-4 mb-1 profile-name">
                                <sec:authentication property="principal.member.memName" />
                              </h6>
                              <p class="fs-3 lh-base mb-0 profile-subtext">
                                Admin
                              </p>
                            </div>
                          </div>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </nav>
              <!-- ---------------------------------- -->
              <!-- End Vertical Layout Header -->
              <!-- ---------------------------------- -->

              <!-- ------------------------------- -->
              <!-- apps Dropdown in Small screen -->
              <!-- ------------------------------- -->
              <!--  Mobilenavbar -->
              <div class="offcanvas offcanvas-start dropdown-menu-nav-offcanvas" data-bs-scroll="true" tabindex="-1" id="mobilenavbar" aria-labelledby="offcanvasWithBothOptionsLabel">
                <nav class="sidebar-nav scroll-sidebar">
                  <div class="offcanvas-header justify-content-between">
                    <img src="${contextPath}/resources/assets/images/logos/favicon.png" alt="spike-img" class="img-fluid" />
                    <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                  </div>
                  <div class="offcanvas-body h-n80" data-simplebar>
                    <ul id="sidebarnav">
                      <li class="sidebar-item">
                        <a class="sidebar-link gap-2 has-arrow" href="javascript:void(0)" aria-expanded="false">
                          <iconify-icon icon="solar:list-bold-duotone" class="fs-7"></iconify-icon>
                          <span class="hide-menu">Apps</span>
                        </a>
                        <ul aria-expanded="false" class="collapse first-level my-3">
                          <li class="sidebar-item py-2">
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                <img src="${contextPath}/resources/assets/images/svgs/icon-dd-chat.svg" alt="spike-img" class="img-fluid" width="24" height="24" />
                              </div>
                              <div>
                                <h6 class="mb-1 bg-hover-primary">Chat Application</h6>
                                <span class="fs-2 d-block fw-normal text-muted">New messages arrived</span>
                              </div>
                            </a>
                          </li>
                          <li class="sidebar-item py-2">
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                <img src="${contextPath}/resources/assets/images/svgs/icon-dd-invoice.svg" alt="spike-img" class="img-fluid" width="24" height="24" />
                              </div>
                              <div>
                                <h6 class="mb-1 bg-hover-primary">Invoice App</h6>
                                <span class="fs-2 d-block fw-normal text-muted">Get latest invoice</span>
                              </div>
                            </a>
                          </li>
                          <li class="sidebar-item py-2">
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                <img src="${contextPath}/resources/assets/images/svgs/icon-dd-mobile.svg" alt="spike-img" class="img-fluid" width="24" height="24" />
                              </div>
                              <div>
                                <h6 class="mb-1 bg-hover-primary">Contact Application</h6>
                                <span class="fs-2 d-block fw-normal text-muted">2 Unsaved Contacts</span>
                              </div>
                            </a>
                          </li>
                          <li class="sidebar-item py-2">
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                <img src="${contextPath}/resources/assets/images/svgs/icon-dd-message-box.svg" alt="spike-img" class="img-fluid" width="24" height="24" />
                              </div>
                              <div>
                                <h6 class="mb-1 bg-hover-primary">Email App</h6>
                                <span class="fs-2 d-block fw-normal text-muted">Get new emails</span>
                              </div>
                            </a>
                          </li>
                          <li class="sidebar-item py-2">
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                <img src="${contextPath}/resources/assets/images/svgs/icon-dd-cart.svg" alt="spike-img" class="img-fluid" width="24" height="24" />
                              </div>
                              <div>
                                <h6 class="mb-1 bg-hover-primary">User Profile</h6>
                                <span class="fs-2 d-block fw-normal text-muted">learn more information</span>
                              </div>
                            </a>
                          </li>
                          <li class="sidebar-item py-2">
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                <img src="${contextPath}/resources/assets/images/svgs/icon-dd-date.svg" alt="spike-img" class="img-fluid" width="24" height="24" />
                              </div>
                              <div>
                                <h6 class="mb-1 bg-hover-primary">Calendar App</h6>
                                <span class="fs-2 d-block fw-normal text-muted">Get dates</span>
                              </div>
                            </a>
                          </li>
                          <li class="sidebar-item py-2">
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                <img src="${contextPath}/resources/assets/images/svgs/icon-dd-lifebuoy.svg" alt="spike-img" class="img-fluid" width="24" height="24" />
                              </div>
                              <div>
                                <h6 class="mb-1 bg-hover-primary">Contact List Table</h6>
                                <span class="fs-2 d-block fw-normal text-muted">Add new contact</span>
                              </div>
                            </a>
                          </li>
                          <li class="sidebar-item py-2">
                            <a href="javascript:void(0)" class="d-flex align-items-center">
                              <div class="text-bg-light rounded-1 me-3 p-6 d-flex align-items-center justify-content-center">
                                <img src="${contextPath}/resources/assets/images/svgs/icon-dd-application.svg" alt="spike-img" class="img-fluid" width="24" height="24" />
                              </div>
                              <div>
                                <h6 class="mb-1 bg-hover-primary">Notes Application</h6>
                                <span class="fs-2 d-block fw-normal text-muted">To-do and Daily tasks</span>
                              </div>
                            </a>
                          </li>
                          <ul class="px-8 mt-6 mb-4">
                            <li class="sidebar-item mb-3">
                              <h5 class="fs-5 fw-semibold">Quick Links</h5>
                            </li>
                            <li class="sidebar-item py-2">
                              <a class="fw-semibold text-dark" href="javascript:void(0)">Pricing Page</a>
                            </li>
                            <li class="sidebar-item py-2">
                              <a class="fw-semibold text-dark" href="javascript:void(0)">Authentication Design</a>
                            </li>
                            <li class="sidebar-item py-2">
                              <a class="fw-semibold text-dark" href="javascript:void(0)">Register Now</a>
                            </li>
                            <li class="sidebar-item py-2">
                              <a class="fw-semibold text-dark" href="javascript:void(0)">404 Error Page</a>
                            </li>
                            <li class="sidebar-item py-2">
                              <a class="fw-semibold text-dark" href="javascript:void(0)">Notes App</a>
                            </li>
                            <li class="sidebar-item py-2">
                              <a class="fw-semibold text-dark" href="javascript:void(0)">User Application</a>
                            </li>
                            <li class="sidebar-item py-2">
                              <a class="fw-semibold text-dark" href="javascript:void(0)">Account Settings</a>
                            </li>
                          </ul>
                        </ul>
                      </li>
                      <li class="sidebar-item">
                        <a class="sidebar-link gap-2" href="javascript:void(0)" aria-expanded="false">
                          <iconify-icon icon="solar:chat-round-unread-line-duotone" class="fs-6 text-dark"></iconify-icon>
                          <span class="hide-menu">Chat</span>
                        </a>
                      </li>
                      <li class="sidebar-item">
                        <a class="sidebar-link gap-2" href="javascript:void(0)" aria-expanded="false">
                          <iconify-icon icon="solar:calendar-add-line-duotone" class="fs-6 text-dark"></iconify-icon>
                          <span class="hide-menu">Calendar</span>
                        </a>
                      </li>
                      <li class="sidebar-item">
                        <a class="sidebar-link gap-2" href="javascript:void(0)" aria-expanded="false">
                          <iconify-icon icon="solar:mailbox-line-duotone" class="fs-6 text-dark"></iconify-icon>
                          <span class="hide-menu">Email</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </nav>
              </div>
            </div>
            <div class="app-header with-horizontal">
              <nav class="navbar navbar-expand-xl container-fluid p-0">
                <ul class="navbar-nav">
                  <li class="nav-item d-none d-xl-block">
                    <a href="./main/index.html" class="text-nowrap nav-link">
                      <img src="${contextPath}/resources/assets/images/logos/logo-light.svg" class="dark-logo" width="180" alt="spike-img" />
                      <img src="${contextPath}/resources/assets/images/logos/logo-dark.svg" class="light-logo" width="180" alt="spike-img" />
                    </a>
                  </li>
                </ul>
                <a class="navbar-toggler p-0 border-0" href="javascript:void(0)" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="p-2">
                    <i class="ti ti-dots fs-7"></i>
                  </span>
                </a>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                  <div class="d-flex align-items-center justify-content-between">
                    <a href="javascript:void(0)" class="nav-link d-flex d-lg-none align-items-center justify-content-center" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobilenavbar" aria-controls="offcanvasWithBothOptions">
                      <div class="nav-icon-hover-bg rounded-circle ">
                        <i class="ti ti-align-justified fs-7"></i>
                      </div>
                    </a>
                    <ul class="navbar-nav flex-row ms-auto align-items-center justify-content-center">
                      <li class="nav-item dropdown nav-icon-hover-bg rounded-circle d-flex d-lg-none">
                        <a class="nav-link position-relative" href="javascript:void(0)" id="drop3" aria-expanded="false">
                          <iconify-icon icon="solar:magnifer-linear" class="fs-7 text-dark"></iconify-icon>
                        </a>
                      </li>

                      <li class="nav-item nav-icon-hover-bg rounded-circle">
                        <a class="nav-link sun light-layout" href="javascript:void(0)">
                          <iconify-icon icon="solar:sun-2-line-duotone" class="sun fs-6"></iconify-icon>
                        </a>
                      </li>


                      <!-- ------------------------------- -->
                      <!-- start profile Dropdown -->
                      <!-- ------------------------------- -->
                      <li class="nav-item dropdown">
                        <a class="nav-link position-relative ms-6" href="javascript:void(0)" id="drop1" aria-expanded="false">
                          <div class="d-flex align-items-center flex-shrink-0">
                            <div class="user-profile me-sm-3 me-2">
                              <img src="${contextPath}/resources/assets/images/profile/user-1.jpg" width="40" class="rounded-circle" alt="spike-img">
                            </div>
                            <span class="d-sm-none d-block"><iconify-icon icon="solar:alt-arrow-down-line-duotone"></iconify-icon></span>

                            <div class="d-none d-sm-block">
                              <h6 class="fs-4 mb-1 profile-name">
                                Mike Nielsen
                              </h6>
                              <p class="fs-3 lh-base mb-0 profile-subtext">
                                Admin
                              </p>
                            </div>
                          </div>
                        </a>
                      </li> 
                      <!-- ------------------------------- -->
                      <!-- end profile Dropdown -->
                      <!-- ------------------------------- -->
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </header>
          <!--  Header End -->