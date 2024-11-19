function faqopen() { 
console.log("faq");
        var html = "";
        html += `<!-- 여기서 부터 -->
	  <div class="mb-3 overflow-hidden position-relative">
	    <div class="px-3">
	      <h4 class="fs-6 mb-0">FAQ</h4>
	      <nav aria-label="breadcrumb">
	        <ol class="breadcrumb mb-0">
	          <li class="breadcrumb-item">
	            <a href="../horizontal/index.html">Home</a>
	          </li>
	          <li class="breadcrumb-item" aria-current="page">FAQ</li>
	        </ol>
	      </nav>
	    </div>
	  </div>
	  
	  
	  
	  <div class="row justify-content-center">
	    <div class="col-lg-8">
	
	      <div class="text-center mb-7">
	        <h3 class="fw-semibold">자주 묻는 질문</h3>
	        <div style="margin-top: 50px;">
	
	
	
	          <ul class="nav nav-pills nav-fill" role="tablist">
	            <!-- 탭1 버튼 -->
	            <li class="nav-item" role="presentation">
	              <a class="nav-link" data-bs-toggle="tab" href="#navpill-111" role="tab" aria-selected="false" tabindex="-1">
	                <span>Tab 1</span>
	              </a>
	            </li>
	            <!-- 탭1 버튼 끝 -->
	            <!-- 탭2 버튼 -->
	            <li class="nav-item" role="presentation">
	              <a class="nav-link active" data-bs-toggle="tab" href="#navpill-222" role="tab" aria-selected="true">
	                <span>Tab 2</span>
	              </a>
	            </li>
	            <!-- 탭2 버튼 끝 -->
	            <!-- 탭3 버튼 -->
	            <li class="nav-item" role="presentation">
	              <a class="nav-link" data-bs-toggle="tab" href="#navpill-333" role="tab" aria-selected="false" tabindex="-1">
	                <span>Tab 3</span>
	              </a>
	            </li>
	            <!-- 탭3 버튼 끝 -->
	          </ul>
	          <div class="tab-content mt-2">
	            <!-- 탭1 -->
	            <div class="tab-pane p-3" id="navpill-111" role="tabpanel">
	              <div class="accordion accordion-flush mb-5 card position-relative overflow-hidden" id="accordionFlushExample">
	                
	                <!-- list1 -->
	                <div class="accordion-item">
	                  <h2 class="accordion-header" id="flush-headingOne">
	                    <button class="accordion-button collapsed fs-4 fw-semibold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
	                      question1
	                    </button>
	                  </h2>
	                  <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
	                    <div class="accordion-body fw-normal">
	                      answer1
	                    </div>
	                  </div>
	                </div>
	                <!-- list1 끝 -->
	                <!-- list2 -->
	                <div class="accordion-item">
	                  <h2 class="accordion-header" id="flush-headingTwo">
	                    <button class="accordion-button collapsed fs-4 fw-semibold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
	                      question2
	                    </button>
	                  </h2>
	                  <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
	                    <div class="accordion-body fw-normal">
	                      answer2
	                    </div>
	                  </div>
	                </div>
	                <!-- list2 끝 -->
	                <div class="accordion-item">
                      <h2 class="accordion-header" id="flush-headingThree">
                        <button class="accordion-button collapsed fs-4 fw-semibold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                          Why should I buy admin templates from Wrappixel?
                        </button>
                      </h2>
                      <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body fw-normal">
                          Wrappixel offers high-quality templates that are easy to use and fully customizable. With over
                          101,801
                          happy customers & trusted by 10,000+ Companies. Wrappixel is recognized as the leading online
                          source
                          for buying admin templates.
                        </div>
                      </div>
                    </div>
                    <div class="accordion-item">
                      <h2 class="accordion-header" id="flush-headingfour">
                        <button class="accordion-button collapsed fs-4 fw-semibold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsefour" aria-expanded="false" aria-controls="flush-collapsefour">
                          Do Wrappixel offers a money back guarantee?
                        </button>
                      </h2>
                      <div id="flush-collapsefour" class="accordion-collapse collapse" aria-labelledby="flush-headingfour" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body fw-normal">
                          There is no money back guarantee in most companies, but if you are unhappy with our product,
                          Wrappixel
                          gives you a 100% money back guarantee.
                        </div>
                      </div>
                    </div>
	                
	              </div>
	            </div>
	            <!-- 탭1 끝 -->
	
	            <!-- 탭2 -->
	            <div class="tab-pane p-3 active show" id="navpill-222" role="tabpanel">
	              <div class="accordion accordion-flush mb-5 card position-relative overflow-hidden" id="accordionFlushExample">
	                <div class="accordion-item">
	                  <h2 class="accordion-header" id="flush-headingOne">
	                    <button class="accordion-button collapsed fs-4 fw-semibold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
	                      What should an admin dashboard template include?
	                    </button>
	                  </h2>
	                  <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
	                    <div class="accordion-body fw-normal">
	                      Admin Dashboard is the backend interface of a website or an application that helps to manage the
	                      website's overall content and settings. It is widely used by the site owners to keep track of
	                      their website,
	                      make changes to their content, and more.
	                    </div>
	                  </div>
	                </div>
	                <div class="accordion-item">
	                  <h2 class="accordion-header" id="flush-headingTwo">
	                    <button class="accordion-button collapsed fs-4 fw-semibold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
	                      What should an admin dashboard template include?
	                    </button>
	                  </h2>
	                  <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
	                    <div class="accordion-body fw-normal">
	                      Admin dashboard template should include user & SEO friendly design with a variety of components
	                      and
	                      application designs to help create your own web application with ease. This could include
	                      customization
	                      options, technical support and about 6 months of future updates.
	                    </div>
	                  </div>
	                </div>
	                <div class="accordion-item">
	                  <h2 class="accordion-header" id="flush-headingThree">
	                    <button class="accordion-button collapsed fs-4 fw-semibold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
	                      Why should I buy admin templates from Wrappixel?
	                    </button>
	                  </h2>
	                  <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
	                    <div class="accordion-body fw-normal">
	                      Wrappixel offers high-quality templates that are easy to use and fully customizable. With over
	                      101,801
	                      happy customers & trusted by 10,000+ Companies. Wrappixel is recognized as the leading online
	                      source
	                      for buying admin templates.
	                    </div>
	                  </div>
	                </div>
	                <div class="accordion-item">
	                  <h2 class="accordion-header" id="flush-headingfour">
	                    <button class="accordion-button collapsed fs-4 fw-semibold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsefour" aria-expanded="false" aria-controls="flush-collapsefour">
	                      Do Wrappixel offers a money back guarantee?
	                    </button>
	                  </h2>
	                  <div id="flush-collapsefour" class="accordion-collapse collapse" aria-labelledby="flush-headingfour" data-bs-parent="#accordionFlushExample">
	                    <div class="accordion-body fw-normal">
	                      There is no money back guarantee in most companies, but if you are unhappy with our product,
	                      Wrappixel
	                      gives you a 100% money back guarantee.
	                    </div>
	                  </div>
	                </div>
	              </div>
	            </div>
	            <!-- 탭2 끝 -->
	
	            <!-- 탭3 -->
	            <div class="tab-pane p-3" id="navpill-333" role="tabpanel">
	              <div class="accordion accordion-flush mb-5 card position-relative overflow-hidden" id="accordionFlushExample">
	                <div class="accordion-item">
	                  <h2 class="accordion-header" id="flush-headingOne">
	                    <button class="accordion-button collapsed fs-4 fw-semibold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
	                      Why should I buy admin templates from Wrappixel?
	                    </button>
	                  </h2>
	                  <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
	                    <div class="accordion-body fw-normal">
	                      Admin Dashboard is the backend interface of a website or an application that helps to manage the
	                      website's overall content and settings. It is widely used by the site owners to keep track of
	                      their website,
	                      make changes to their content, and more.
	                    </div>
	                  </div>
	                </div>
	                <div class="accordion-item">
	                  <h2 class="accordion-header" id="flush-headingTwo">
	                    <button class="accordion-button collapsed fs-4 fw-semibold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
	                      What should an admin dashboard template include?
	                    </button>
	                  </h2>
	                  <div id="flush-collapseTwo" class="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
	                    <div class="accordion-body fw-normal">
	                      Admin dashboard template should include user & SEO friendly design with a variety of components
	                      and
	                      application designs to help create your own web application with ease. This could include
	                      customization
	                      options, technical support and about 6 months of future updates.
	                    </div>
	                  </div>
	                </div>
	                <div class="accordion-item">
	                  <h2 class="accordion-header" id="flush-headingThree">
	                    <button class="accordion-button collapsed fs-4 fw-semibold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
	                      Why should I buy admin templates from Wrappixel?
	                    </button>
	                  </h2>
	                  <div id="flush-collapseThree" class="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
	                    <div class="accordion-body fw-normal">
	                      Wrappixel offers high-quality templates that are easy to use and fully customizable. With over
	                      101,801
	                      happy customers & trusted by 10,000+ Companies. Wrappixel is recognized as the leading online
	                      source
	                      for buying admin templates.
	                    </div>
	                  </div>
	                </div>
	                <div class="accordion-item">
	                  <h2 class="accordion-header" id="flush-headingfour">
	                    <button class="accordion-button collapsed fs-4 fw-semibold shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapsefour" aria-expanded="false" aria-controls="flush-collapsefour">
	                      Do Wrappixel offers a money back guarantee?
	                    </button>
	                  </h2>
	                  <div id="flush-collapsefour" class="accordion-collapse collapse" aria-labelledby="flush-headingfour" data-bs-parent="#accordionFlushExample">
	                    <div class="accordion-body fw-normal">
	                      There is no money back guarantee in most companies, but if you are unhappy with our product,
	                      Wrappixel
	                      gives you a 100% money back guarantee.
	                    </div>
	                  </div>
	                </div>
	              </div>
	            </div>
	            <!-- 탭3 끝 -->
	          </div>
	
	
	
	        </div>
	      </div>
	      
	    </div>
	  </div>
	
	
	
	  <!-- 여기는 주석 해도 ㄱㅊ -->
	  <div class="card bg-primary-subtle rounded-2">
	    <div class="card-body text-center">
	      <div class="d-flex align-items-center justify-content-center mb-4 pt-8">
	        <a href="javascript:void(0)">
	          <img src="../resources/assets/images/profile/user-3.jpg" class="rounded-circle me-n2 card-hover border border-2 border-white" width="44" height="44">
	        </a>
	        <a href="javascript:void(0)">
	          <img src="../resources/assets/images/profile/user-2.jpg" class="rounded-circle me-n2 card-hover border border-2 border-white" width="44" height="44">
	        </a>
	        <a href="javascript:void(0)">
	          <img src="../resources/assets/images/profile/user-4.jpg" class="rounded-circle me-n2 card-hover border border-2 border-white" width="44" height="44">
	        </a>
	      </div>
	      <h3 class="fw-semibold">Still have questions</h3>
	      <p class="fw-normal mb-4 fs-4">Can't find the answer your're looking for ? Please chat to our friendly
	        team.</p>
	        <a href="javascript:void(0)" class="btn btn-primary mb-8">Chat with us</a>
	      </div>
	  </div>
	  <!-- 여기는 주석 해도 ㄱㅊ 끝 -->
	  
	<!-- 여기까지 -->`
	
	$("#main_contents").html("");
    $("#main_contents").html(html);
	
}