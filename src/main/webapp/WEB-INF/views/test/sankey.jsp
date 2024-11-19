<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
</head>
<body>
	<h1>sankey</h1>
	<div id="svg-sankey" style="display: flex; justify-content: center"></div>

	<script src="https://cdn.jsdelivr.net/npm/apexsankey"></script>
	<script type="text/javascript">
		const data = {
			nodes : [ {
				id : 'Oil',
				title : 'Oil',
			}, {
				id : 'Natural Gas',
				title : 'Natural Gas',
			}, {
				id : 'Coal',
				title : 'Coal',
			}, {
				id : 'Fossil Fuels',
				title : 'Fossil Fuels',
			}, {
				id : 'Electricity',
				title : 'Electricity',
			}, {
				id : 'Energy',
				title : 'Energy',
			}, ],
			edges : [ {
				source : 'Oil',
				target : 'Fossil Fuels',
				value : 15,
			}, {
				source : 'Natural Gas',
				target : 'Fossil Fuels',
				value : 20,
			}, {
				source : 'Coal',
				target : 'Fossil Fuels',
				value : 25,
			}, {
				source : 'Coal',
				target : 'Electricity',
				value : 25,
			}, {
				source : 'Fossil Fuels',
				target : 'Energy',
				value : 60,
			}, {
				source : 'Electricity',
				target : 'Energy',
				value : 25,
			}, ],
		};
		const graphOptions = {
			nodeWidth : 20,
			fontFamily : 'Quicksand, sans-serif',
			fontWeight : 600,
			height : 600,
		};
		const s = new ApexSankey(document.getElementById('svg-sankey'),
				graphOptions);
		s.render(data);
	</script>
</body>
</html>