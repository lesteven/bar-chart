import * as d3 from 'd3';
require('./index.css');


function getData(){
	let data = undefined;
	const dataLink =`https://raw.githubusercontent.com/
	FreeCodeCamp/ProjectReferenceData/master/GDP-data.json`;
	fetch(dataLink)
	.then(response=>response.json())
	.then(json=>{
		data = json;
		//console.log(data.data);
		drawGraph(data);
	})
}

function drawGraph(data){
	//variable holding svg attributes
	const margin ={top:50,bottom:50,left:50,right:50}
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
	
	//scales height and width of bars
	let max = d3.max(data.data)[1];

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

	//draws bars on graph
	g.selectAll(".bar")
		.data(data.data)
		.enter().append("rect")
			.attr("class","bar")
			.attr("width", xScale.bandwidth())
			.attr("height",function(d){return innerHeight-yScale(d[1]);})
			.attr("x",function(d,i){return xScale(d[0])})
			.attr("y",function(d){return yScale(d[1]);});
}


getData();

/*

let data2 = [10, 15, 25, 120, 500, 980, 1200];

let yScale = d3.scaleLinear()
	.domain([10,1200])
	.range([0,500]);
      
  d3.select("svg")
    .selectAll("rect")
    .data(data2)
    .enter()
    .append("rect")
      .attr("width", 30)
      .attr("height", function(d) { return yScale(d); })
      .attr("x", function(d, i) { return i * 30; })
      .attr("y", function(d) { return 550 - yScale(d);})
      .style("fill", "blue")
	  .style("stroke", "black")
	  .style("stroke-width", "1px")
	  .style("opacity", .25);
	  */
      
