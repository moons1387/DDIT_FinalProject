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

var cur_page;
var max_row;

let ctx = document.querySelector('#myChart');

let divCountingTable = document.querySelector('#divCountingTable');

let statisticTbody = document.querySelector('#channelChartTbody')

let charter;

let data;

let numDatas;

let tbody = document.querySelector('#channelList');

let channelStatisticsBtn = document.querySelector('#channelStatisticsBtn');

channelStatisticsBtn.addEventListener('click', async () => {

	channelCreateStatisticsChartRender();

	cur_page = 1
	max_row = 20

	let data = {
		page: cur_page,
		rowCnt: max_row
	}

	let res = await axios.post('/synerhub/admin/channel/statisticslist', data, axiosHeaderJson);

	channelStatisticsRender(res.data)

});

const channelStatisticsRender = (page) => {

	console.log(page);

	let list = page.list
	
	list.forEach(ch => {
		let tr = document.createElement('tr');
		tr.innerHTML = `
			<tr data-chno="${ch.chNo}">
				<td class="align-center">${ch.chTtl}</td>
				<td class="align-center">${ch.chCode}</td>
				<td class="align-center">${ch.memCnt}</td>
				<td class="align-center">${ch.curMemCnt}</td>
				<td class="align-center">${ch.curVol}/${ch.maxVol}</td>
			</tr>
		`;
		statisticTbody.appendChild(tr);
	});

	let trs = statisticTbody.querySelectorAll('tr');

	trs.forEach(tr => {
		let tds = tr.childNodes;
		tds.forEach((td, idx) => {
			if (idx == 1) {
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




const channelChartAndTableRender = async () => {
	console.log("chart1");
	divCleaner();

	numDatas = await createData(12, 80);
	numDatas.sort((a, b) => a - b);

	let labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
	createTable(labels, numDatas, '명');

	const data = {
		labels: labels,
		datasets: [{
			label: '연중 채널인원',
			data: numDatas,
			fill: false,
			borderColor: barBGColors,
			tension: 0.1
		}]
	};

	charter = new Chart(ctx, {
		type: 'line',
		data: data
	});
}

const channelMemberChartAndTableRender = async () => {
	console.log("chart2");
	divCleaner();

	numDatas = await createData(12, 20, '-');

	let labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
	createTable(labels, numDatas, '명');

	const data = {
		labels: labels,
		datasets: [{
			label: '월별 인원 증가',
			data: numDatas,
			fill: false,
			backgroundColor: barBGColors,
			borderColor: barBDColors,
			tension: 0.1
		}]
	};

	charter = new Chart(ctx, {
		type: 'bar',
		data: data
	});
}

const currentMemberChartAndTableRender = async () => {
	console.log("chart3");
	divCleaner();

	numDatas1 = await createData(7, 10);
	numDatas2 = await createData(7, 50);

	let date = new Date();

	let labels = [];
	let cnt = 0;
	for (let i = 7; i > 0; i--) {
		cnt++;
		let A = date.getDate() - i;
		if (A <= 0) {
			cnt--;
			let date2 = new Date(date.getYear(), date.getMonth(), 0);
			A = date2.getDate - i + cnt;
		}
		A += "일";
		labels.push(A);
	}
	createTable(labels, numDatas1, '명');

	charter = new Chart(ctx, {
		data: {
			datasets: [{
				type: 'bar',
				label: '채널 일간 등록자',
				data: numDatas1,
				backgroundColor: barBGColors,
				borderColor: barBDColors
			}, {
				type: 'line',
				label: '채널 일간 접속자',
				data: numDatas2,
				borderColor: "rgba(0,0,0,0.3)"
			}],
			labels: labels
		}
	});
}

const dataStorageChartAndTableRender = async () => {
	console.log("chart4");
	divCleaner();

	numDatas = await createData(5, 1000);

	let labels = ['문서', '프로젝트', '비품', '클라우드', '남은용량'];
	createTable(labels, numDatas, 'GB');

	data = {
		labels: labels,
		datasets: [{
			label: '채널별 용량 사용비율',
			data: numDatas,
			backgroundColor: [  "rgba(255,0,0,0.3)",    // 진한 빨강
													"rgba(0,255,0,0.3)",    // 진한 초록
													"rgba(0,0,255,0.3)",    // 진한 파랑
													"rgba(255,255,0,0.3)",  // 진한 노랑
													"rgb(0,0,0, 0.4)"   		// 회색
			],
			hoverOffset: 4
		}]
	};

	charter = new Chart(ctx, {
		type: 'pie',
		data: data
	});
}

const channelCreateStatisticsChartRender = async () => {
	console.log("enterChart");
	divCleaner();

	numDatas = await createData(12, 10, '-');

	let labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월'];
	createTable(labels, numDatas, '개');

	data = {
		labels: labels,
		datasets: [{
			label: '월별 채널 증감',
			data: numDatas,
			backgroundColor: barBGColors,
			borderColor: barBDColors,
			hoverOffset: 4
		}]
	};

	charter = new Chart(ctx, {
		type: 'bar',
		data: data
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
					<td>${label}</td>
					<td>${numDatas[idx]}${sort}</td>
				</tr>
		`;
	});

	table.appendChild(thead);
	table.appendChild(tbody);
	divCountingTable.appendChild(table);
}

const createData = (length, size, minus) => {
	let data = [];
	for (let i = 0; i < length; i++) {
		data.push(Math.ceil(Math.random() * size))
	}

	if(minus) {
		data.forEach((num, idx) => {
			if(Math.random()*100 > 50) {
				num = num * -1;
				data.splice(idx, 1, num);
			}
		});
	}
	console.log(data);
	return data;
}

const divCleaner = () => {

	if (divCountingTable.childNodes[1]) {
		divCountingTable.childNodes[1].remove();
	}

	if (charter) {
		charter.destroy();
	}

}