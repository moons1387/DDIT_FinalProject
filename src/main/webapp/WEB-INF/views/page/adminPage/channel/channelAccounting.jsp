<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="card mh-100">
    <div class="card-body mh-100">
        <div class="d-md-flex justify-content-between mb-9">
            <div class="mb-9 mb-md-0">
                <div style="display: flex;">
                    <h3>채널 통계</h3>
                </div>
            </div>
        </div>
        
        <!-- 고객센터 관리 모달창 -->
								<div class="modal fade" id="vertical-center-modal" tabindex="-1" aria-labelledby="vertical-center-modal" aria-hidden="true">
			                      <div class="modal-dialog modal-lg modal-dialog-centered">
			                        <div class="modal-content text-center"> <!-- text-center 클래스 추가 -->
			                          <div class="modal-header text-center d-flex align-items-center justify-content-center"> <!-- justify-content-center 추가 -->
			                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
			                          </div>
			                          <div class="modal-body">
			                            <div class="mb-5">
			                              <h3>고객센터 관리</h3>
			                            </div>
			
			                            <div class="row">
			                              <div class="col-md-4">
			                                <div class="card hover-img" style="cursor: pointer">
			                                  <div class="card-body p-4">
			                                  	<a href="${contextPath }/admin/notice">
			                                    <div class="align-items-center">
			                                      <div class="card bg-danger-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;"> <!-- margin: auto 추가 -->
			                                        <iconify-icon icon="mage:megaphone-a-fill" style="color: #ff6e6e; font-size: 5rem;"></iconify-icon>
			                                      </div>
			                                      <h6 class="mt-3 fs-4">공지사항</h6>
			                                    </div>
			                                    </a>
			                                  </div>
			                                </div>
			                              </div>
			                              <div class="col-md-4">
			                              	<a href="${contextPath}/admin/faq" style="text-decoration: none; color: inherit;">
			                                <div class="card hover-img" style="cursor: pointer">
			                                  <div class="card-body p-4">
			                                    <div class="align-items-center">
			                                      <div class="card bg-success-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;"> <!-- margin: auto 추가 -->
			                                        <iconify-icon icon="flat-color-icons:faq" style="font-size: 5rem;"></iconify-icon>
			                                      </div>
			                                      <h6 class="mt-3 fs-4">FAQ</h6>
			                                    </div>
			                                  </div>
			                                </div>
			                                </a>
			                              </div>
			                              <div class="col-md-4">
			                              	<a href="${contextPath}/admin/qna" style="text-decoration: none; color: inherit;">
			                                <div class="card hover-img" style="cursor: pointer">
			                                  <div class="card-body p-4">
			                                    <div class="align-items-center">
			                                      <div class="card bg-primary-subtle d-flex align-items-center justify-content-center" style="width: 130px; height: 130px; border-radius: 15px; margin: auto;"> <!-- margin: auto 추가 -->
			                                        <iconify-icon icon="fluent-color:chat-bubbles-question-16" style="font-size: 5.5rem;"></iconify-icon>
			                                      </div>
			                                      <h6 class="mt-3 fs-4">Q&A</h6>
			                                    </div>
			                                  </div>
			                                </div>
			                                </a>
			                              </div>
			                            </div>
			
			                          </div>
			                          <div class="modal-footer justify-content-center"> <!-- justify-content-center 추가 -->
			                            <button type="button" class="btn btn-light" data-bs-dismiss="modal">
			                              Close
			                            </button>
			                          </div>
			                        </div>
			                      </div>
			                    </div>
			                    <!-- 고객센터 관리 모달창 끝 -->

		<div class="row">
	        <div class="d-flex justify-content-begin">
	            <div class="d-inline-flex">
	                <div class="input-group mb-3">
	                    <input type="text" class="form-control" placeholder="채널명을 입력하세요" aria-label="" aria-describedby="basic-addon1">
	                    <button class="btn bg-info-subtle text-info d-flex align-items-center" type="button" style="border-top-right-radius: 10px; border-bottom-right-radius: 10px;">
	                        <i class="ti ti-search fs-6"></i>
	                    </button>
	                </div>
	            </div>
	        </div>
	        
       		<div class="col-7">
	
		        <div class="table-responsive border rounded-4 mb-7">
	            	<table class="table mb-0 table-hover">
		                <thead class="table-primary table-striped ext-nowrap align-middle">
		                    <tr>
		                        <th>채널명</th>
		                        <th>채널 코드</th>
		                        <th>채널 가입자</th>
		                        <th>현재 접속자</th>
		                        <th>드라이브 용량</th>
		                    </tr>
		                </thead>
		                <tbody id="channelList">
		                    <tr>
		                        <td class="align-middle">TEST7013</td>
		                        <td class="align-middle">#1234</td>
		                        <td>51명</td>
		                        <td class="align-middle">30명</td>
		                        <td class="align-middle">15TB/30TB</td>
		                    </tr>
		                </tbody>
		            </table>
		        </div>
	        </div>
	        <div class="col-5 justify-content">

	            <!-- 통계 그래프 -->
	            <div class="card position-relative overflow-hidden">
								<canvas id="myChart"></canvas>
	            </div>
	            <!-- 통계 그래프 끝 -->
	
	            <!-- 총 계 -->
	            <div class="card position-relative overflow-hidden" id="divCountingTable">
	            </div>
	            <!-- 총 계 끝 -->
	        </div>
		</div>
    </div>
</div>
<script>

let tbody = document.querySelector('#channelList');

window.onload = async () => {

	let res = await axios.get('/synerhub/admin/channel/list');

	res.data.forEach(channel => {
		let tr = document.createElement('tr');

		tr.innerHTML = `
			<tr>
					<td class="align-center">\${}</td>
					<td class="align-center">\${}</td>
					<td>51명</td>
					<td class="align-center">\${}</td>
					<td class="align-center">\${}</td>
			</tr>
		`;
	});

	let trs = tbody.querySelectorAll('tr');

	trs.forEach( tr => {
		let tds = tr.childNodes;
		tds.forEach((td, idx) => {
			if(idx == 1) {
				td.addEventListener('click', channelChartAndTableRender);
			} else if (idx == 3) {
				td.addEventListener('click', channelChartAndTableRender);
			} else if (idx == 5) {
				td.addEventListener('click', channelMemberChartAndTableRender);
			} else if (idx == 7) {
				td.addEventListener('click', currentMemberChartAndTableRender);
			} else if (idx == 9) {
				td.addEventListener('click', dataStorageChartAndTableRender);
			} 
		});
	});

}
let ctx = document.querySelector('#myChart');

let divCountingTable = document.querySelector('#divCountingTable');

let trs = document.querySelector('tbody').querySelectorAll('tr');

let charter;

let data;

let numDatas;

window.onload = () => {

}

const channelChartAndTableRender = async () => {

	divCleaner();

	numDatas = await createData(12, 80);
	numDatas.sort((a, b) => a - b);

	let labels = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
	createTable(labels, numDatas, '명');
	
	const data = {
		labels: labels,
		datasets: [{
			label: '연중 채널인원',
			data: numDatas,
			fill: false,
			borderColor: 'rgb(75, 192, 192)',
			tension: 0.1
		}]
	};

	charter = new Chart(ctx, {
			type: 'line',
			data : data
	});
}

const channelMemberChartAndTableRender = async () => {

	divCleaner();

	numDatas = await createData(12, 20);

	let labels = ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'];
	createTable(labels, numDatas, '명');
	
	const data = {
		labels: labels,
		datasets: [{
			label: '월별 인원 증가',
			data: numDatas,
			fill: false,
			borderColor: 'rgb(175, 92, 92)',
			tension: 0.1
		}]
	};

	charter = new Chart(ctx, {
			type: 'bar',
			data : data
	});
}

const currentMemberChartAndTableRender = async () => {

	divCleaner();
	
	numDatas1 = await createData(7, 10);
	numDatas2 = await createData(7, 50);
	
	let date = new Date();
	
	let labels = [];
	let cnt = 0;
	for(let i = 7; i > 0; i --) {
		cnt++;
		let A = date.getDate() - i;
		if(A <= 0) {
			cnt--;
			let date2 = new Date(date.getYear(), date.getMonth(), 0);
			A = date2.getDate - i + cnt;
		}
		A+="일";
		labels.push(A);
	}
	createTable(labels, numDatas1, '명');
	
	charter = new Chart(ctx, {
	    data: {
	        datasets: [{
	            type: 'bar',
	            label: '채널 일간 등록자',
	            data: numDatas1
	        }, {
	            type: 'line',
	            label: '채널 일간 접속자',
	            data: numDatas2,
	        }],
	        labels: labels
	    }
	});
}

const dataStorageChartAndTableRender = async () => {
	
	divCleaner();
	
	numDatas = await createData(4, 1000);

	let labels = ['문서', '프로젝트', '비품', '클라우드'];
	createTable(labels, numDatas, 'GB');
	
	data = {
	  labels: labels,
		  datasets: [{
		    label: '채널별 용량 사용비율',
		    data: numDatas,
		    backgroundColor: [
		      'rgb(255, 99, 132)',
		      'rgb(54, 162, 235)',
		      'rgb(255, 205, 86)',
		      'rgb(0, 100, 100)'
		    ],
		    hoverOffset: 4
		  }]
		};
	
	charter = new Chart(ctx, {
		type: 'pie',
		data : data
	});
}

const createTable = (labels, numDatas, sort) => {
	
	let table = document.createElement('table');
	table.className = "table table-bordered table-hover";
	let thead = document.createElement('thead');
	let tbody = document.createElement('tbody');
	
	thead.innerHTML = `
				<tr>
					<th>구분</th>
					<th>내역</th>
				</tr>
	`;
	labels.forEach((label, idx) => {
	tbody.innerHTML += `
				<tr>
					<td>\${label}</td>
					<td>\${numDatas[idx]}\${sort}</td>
				</tr>
		`;
	});
	
	table.appendChild(thead);
	table.appendChild(tbody);
	divCountingTable.appendChild(table);
}

const createData = (length, size) => {
	let data = [];
	for(let i = 0; i < length; i++) {
		data.push(Math.ceil(Math.random()*size))
	}
	
	return data;
}

const divCleaner = () => {

	if(divCountingTable.childNodes[1]) {
		divCountingTable.childNodes[1].remove();
	}
	
	if(charter) {
		charter.destroy();
	}

}
</script>