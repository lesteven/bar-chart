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
	let max = d3.max(data.data)[1];
	let min = d3.min(data.data)[1];
	//console.log(max,min,data.data.length)
	let yScale = d3.scaleLinear()
		.domain([0,max])
		.range([0,450])

	let graph = d3.select("svg")
		.selectAll("rect")
		.data(data.data)//, function(d,i){/*console.log(d[1],i)*/;return d[1]})
		.enter()
		.append("rect")
			.attr("width", 2.5)
			.attr("height",function(d){return yScale(d[1]);})
			.attr("x",function(d,i){return i*2.5+80;})
			.attr("y",function(d){return 500 - yScale(d[1]);});
			//console.log(d3.max(data.data),data.data)


	let xScale = d3.scaleLinear()
		.domain([0,100])
		.range([0,800]);
	let xAxis = d3.axisBottom(xScale);
	graph.append("g")
		.call(xAxis);
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
      
