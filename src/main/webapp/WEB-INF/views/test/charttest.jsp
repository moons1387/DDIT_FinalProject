<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
	<h1>chartTest</h1>

	<canvas id="myChart"></canvas>

	<div id="chart"></div>

	<!-- 	<input type="text" id="categories" placeholder="categories"> -->
	<!-- 	<input type="text" id="name" placeholder="name"> -->
	<!-- 	<input type="text" id="data" placeholder="data"> -->

	<!-- 	<button id="addData">addData</button> -->
	<!-- 	<button id="destroy">destroy()</button> -->
	<!-- 	<button id="json">json</button> -->
	<!-- 	<button id="currData">currData</button> -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.7.7/axios.min.js" integrity="sha512-DdX/YwF5e41Ok+AI81HI8f5/5UsoxCVT9GKYZRIzpLxb8Twz4ZwPPX+jQMwMhNQ9b5+zDEefc+dcvQoPWGNZ3g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
	<script type="text/javascript">
		const ctx = document.getElementById('myChart');

		window.onload = () => {
			axios.post('')
		}
		
		let data = {
				type : 'bar',
				data : {
					labels : [ 'Red', 'Blue', 'Yellow', 'Green', 'Purple',
							'Orange' ],
					datasets : [ {
						label : '# of Votes',
						data : [ 12, 19, 3, 5, 2, 3 ],
						borderWidth : 1
					} ]
				},
				options : {
					scales : {
						y : {
							beginAtZero : true
						}
					}
				}
			};
		
		new Chart(ctx, data);

		// 	const destroy = document.querySelector('#destroy');
		// 	const JB = document.querySelector('#json');
		// 	const addData = document.querySelector('#addData');

		// 	addData.addEventListener('click', () => {

		// 		let cat = document.querySelectorAll('input')[0];
		// 		let name = document.querySelectorAll('input')[1];
		// 		let data = document.querySelectorAll('input')[2];

		// 		chart.addData([1000], cat.value);

		// 	});

		// 	const currData = document.querySelector('#currData');

		// 	destroy.addEventListener('click', () => {
		// 		chart.destroy();
		// 	});

		// 	const Chart = toastui.Chart;

		// 	const el = document.getElementById('chart');
		// 	let data = {
		// 	  categories: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		// 	  series: [
		// 	    {
		// 	      name: 'Budget',
		// 	      data: [5000, 3000, 5000, 7000, 6000, 4000, 10000],
		// 	    },
		// 	    {
		// 	      name: 'Income',
		// 	      data: [8000, 4000, 7000, 2000, 6000, 3000, 5000],
		// 	    },
		// 	    {
		// 	      name: 'Outcome',
		// 	      data: [3000, 2000, 4000, 6000, 1000, 2000, 3000],
		// 	    },
		// 	  ],
		// 	};
		// 	const options = {
		// 	  chart: { width: 700, height: 400 },
		// 	};

		// 	const chart = Chart.barChart({ el, data, options });
		// 	// const chart = new BarChart({ el, data, options }); // 두 번째 방법

		// 	JB.addEventListener('click', () => {
		// 		let json_data = JSON.stringify(data);
		// 		console.log(data.categories);
		// 		console.log(json_data);
		// 	});
	</script>
