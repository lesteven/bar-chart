import * as d3 from 'd3';
require('./index.css');


function getData(){
	const dataLink =`https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json`;
	fetch(dataLink)
	.then(response=>response.json())
	.then(data=>{
		drawGraph(data);
	})
}

function drawGraph(data){
	//console.log('data.data',data.data)
	//variable holding svg attributes
	const margin ={top:50,bottom:75,left:50,right:50}
	const width = 950;
	const height = 550;
	const innerHeight = height - margin.top - margin.bottom;
	const innerWidth = width - margin.left - margin.right;

	//creates svg
	let svg = d3.select("body")
		.append("svg")
		.attr("width",width)
		.attr("height",height)
		.attr("class","graph")

	getDescription(data,svg);
	//scales height and width of bars
	let max = d3.max(data.data)[1];
	let min = d3.min(data.data)[1];

	let yScale = d3.scaleLinear()
		.domain([0,max])
		.range([innerHeight,0]);
	let xScale = d3.scaleBand()
		.range([0,innerWidth])
		.domain(data.data.map(function(d) {return d[0];} ));
	
	//parses date for x axis
	let parseTime = d3.timeParse("%Y-%m-%d");
	let xAxis = d3.scaleTime()
		.range([0,innerWidth])
		.domain(d3.extent(data.data.map(function(d){
			return parseTime(d[0])})));
	
	let g = svg.append("g")
		.attr("transform","translate("+margin.left +","+margin.top+")");
	//x-axis
	g.append("g")
		.attr("class","axis axis--x")
		.attr("transform","translate(0,"+innerHeight+")")
		.call(d3.axisBottom(xAxis)
			);
	//y-axis
	g.append("g")
		.attr("class","axis axis--y")
		.call(d3.axisLeft(yScale))
	//shows data on mousehover
	let div = d3.select("body").append("div")
		.attr("class","tooltip")
		.style("opacity",0);
	//
	
	const monthNames =["January","February","March","April","May",
						"June","July","August","September","October",
						"November","December"]
	//draws bars on graph
	g.selectAll(".bar")
		.data(data.data)
		.enter().append("rect")
			.attr("class","bar")
			.attr("width", xScale.bandwidth())
			.attr("height",function(d){return innerHeight-yScale(d[1]);})
			.attr("x",function(d,i){return xScale(d[0])})
			.attr("y",function(d){return yScale(d[1]);})
			.on("mouseover",function(d){
				div.transition()
					.duration(200)
					.style("opacity",.9)
					let date = parseTime(d[0])
				div.html(d[1]+" Billion "+"<br/>"+ monthNames[date.getMonth()]+
					" "+date.getFullYear())
					.style("left",(d3.event.pageX)+"px")
					.style("top",(d3.event.pageY-70)+"px")
				
			})
			.on("mouseout",function(d){
				div.transition()
					.duration(500)
					.style("opacity",0)
			})
			
}

function getDescription(data,svg){
	svg.append("text")
		.attr("class","title")
		.attr("x","35%")
		.attr("y","10%")
		.text(data.name.substr(0,22))
	svg.append("text")
		.attr("class","description")
		.attr("x","3%")
		.attr("y","98%")
		.text(data.description)
	svg.append("text")
		.attr("class","yAxis-des")
		.attr("transform","translate(65,220) rotate(-90)")
		.text(data.name.substr(0,22) + " USA")
}


getData();

