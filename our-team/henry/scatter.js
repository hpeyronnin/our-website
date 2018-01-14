//define variables

var margin = {top: 20, right: 20, bottom: 30, left: 40},
	width = 960 - margin.left - margin.right,
	height = 500 - margin.top - margin.bottom;

var x = d3.scale.linear()
	.range([0, width]);

var y = d3.scale.linear()
	.range([height, 0]);

var color = d3.scale.category10();

var xAxis = d3.svg.axis()
	.scale(x)
	.orient("bottom");

var yAxis = d3.svg.axis()
	.scale(y)
	.orient("left");

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
.append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")")

var formatter = d3.format(",.0f")

var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function(d) {
      return "<div><span>Country:</span> <span style='color:white'>" + d.Country + "</span></div>" + 
      "<div><span>Number without access:</span> <span style='color:white'>" + formatter(d.numnoccess) + "</span></div>";
    })

svg.call(tip);

//get data

d3.tsv("data2.tsv", function(error, data) {
	if (error) throw error;

	data.forEach(function(d) {
		d.access = +d.access;
		d.Score = +d.Score;
	});

	x.domain(d3.extent(data, function(d) { return d.access; })).nice();
	y.domain([0, 2.6])

//draw graph 

	svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
		.append("text")
			.attr("class", "label")
			.attr("x", width)
			.attr("y", -6)
			.style("text-anchor", "end")
			.text("Percentage of population with electricity");

	svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
		.append("text")
			.attr("class", "label")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("ClimateScope score");


//draw dots

	svg.selectAll(".dot")
			.data(data)
		.enter().append("circle")
			.attr("class", "dot")
			.attr("r", 5.5)
			.attr("cx", function(d) { return x(d.access); })
			.attr("cy", function(d) { return y(d.Score); })
			.style("fill", function(d) { return color(d.Region); })
      		.on('mouseover', tip.show)
      		.on('mouseout', tip.hide);


//draw legend

	var legend = svg.selectAll(".legend")
			.data(color.domain())
		.enter().append("g")
			.attr("class", "legend")
			.attr("transform", function(d, i) { return "translate(-850," + i * 20 + ")"; });

	legend.append("rect")
			.attr("x", width - 18)
			.attr("width", 18)
			.attr("height", 18)
			.style("fill", color);

	legend.append("text")
			.attr("x", width + 10)
			.attr("y", 9)
			.attr("dy", ".35em")
			.style("text-anchor", "front")
			.text(function(d) { return d; });

});