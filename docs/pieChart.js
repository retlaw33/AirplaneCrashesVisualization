function GeneratePieChart()
{
	var width = 300,
    height = 300,
    offset = 100,
    radius = Math.min(width, height) / 2;

	var color = d3v3.scale.ordinal()
		.range(["#82172B", "#006400"]);

	var arc = d3v3.svg.arc()
		.outerRadius(radius - 20)
		.innerRadius(radius - 40);

	// second arc for labels
	var arc2 = d3v3.svg.arc()
	  .outerRadius(radius)
	  .innerRadius(radius + 20);

	var pie = d3v3.layout.pie()
		.sort(null)
		.startAngle(1.1*Math.PI)
		.endAngle(3.1*Math.PI)
		.value(function(d) { return d.amount; });

	var data = [
	  {label: 'Deaths', amount: 113919},
	  {label: 'Survivors', amount: 47512}
	];

	var svg = d3v3.select("#pieChartPlaceHolder").append("svg")
		.attr("id", "chart")
		.attr("width", width + offset)
		.attr("height", height + offset)
		.attr('viewBox', '0 0 ' + width + offset + ''+ width + offset +'')
		.attr('perserveAspectRatio', 'xMinYMid')
	  .append("g")
		.attr("transform", "translate(" + (width+offset) / 2 + "," + (height + offset) / 2 + ")");

	  data.forEach(function(d) {
		d.amount = +d.amount;
	  });

	var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("class", "arc");

	g.append("path")
      .style("fill", function(d) { return color(d.data.label); })
      .transition().delay(function(d, i) { return i * 500; }).duration(2500)
      .attrTween('d', function(d) {
         var i = d3v3.interpolate(d.startAngle+0.1, d.endAngle);
         return function(t) {
           d.endAngle = i(t);
           return arc(d);
         };
      });

	g.append("text")
      .attr("transform", function(d) { return "translate(" + arc2.centroid(d) + ")"; })
      .attr("dy", ".35em")
      .attr("class", "d3v3-label")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.label; });

	var aspect = width / height,
		chart = $("#chart");
	$(window).on("resize", function() {
		var targetWidth = Math.min(width + offset, chart.parent().width());
		chart.attr("width", targetWidth);
		chart.attr("height", targetWidth / aspect);
	}).trigger('resize');
}

	/*	
	var data = [10, 20, 100];

	var width = 960,
		height = 500,
		radius = Math.min(width, height) / 2;

	var color = d3v3.scaleOrdinal()
		.range(["#98abc5", "#8a89a6", "#7b6888"]);

	console.log("1");
		
	var arc = d3v3.arc()
		.outerRadius(radius - 10)
		.innerRadius(0);

	var labelArc = d3v3.arc()
		.outerRadius(radius - 40)
		.innerRadius(radius - 40);

	var pie = d3v3.pie()
		.sort(null)
		.value(function(d) { return d; });
		
	console.log("2");

	var svg = d3v3.select("#pieChartPlaceHolder").append("svg")
		.attr("width", width)
		.attr("height", height)
	  .append("g")
		.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var g = svg.selectAll(".arc")
		  .data(pie(data))
		  .enter().append("g")
		  .attr("class", "arc");

	  g.append("path")
		  .attr("d", arc)
		  .style("fill", function(d) { return color(d.data); });

	  g.append("text")
		  .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
		  .attr("dy", ".35em")
		  .text(function(d) { return d.data; });
		  
	console.log("3");*/





		/*d3v3.csv("data/PieChartData.csv", function(d) {
	  d.population = +d.population;
	  console.log(+d.population);
	  return d;
	}, function(error, data) {
	  if (error) throw error;*/
	
	
	/*
	console.log("0");
	
	var svg = d3v3.select("#pieChartPlaceHolder").append("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var color = d3v3.scale.ordinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
	
	var pie = d3v3.layout.pie()
		.sort(null)
		.value(function(d) { return d.population; });

	var path = d3v3.svg.arc()
		.outerRadius(radius - 10)
		.innerRadius(0);

	var label = d3v3.svg.arc()
		.outerRadius(radius - 40)
		.innerRadius(radius - 40);
		
	console.log("1");

	d3v3.csv("data/PieChartData.csv", function(d) {
	  d.population = +d.population;
	  console.log(+d.population);
	  return d;
	}, function(error, data) {
	  if (error) throw error;

	  var arc = g.selectAll(".arc")
		.data(pie(data))
		.enter().append("g")
		  .attr("class", "arc");

	  arc.append("path")
		  .attr("d", path)
		  .attr("fill", function(d) { return color(d.data.age); });

	  arc.append("text")
		  .attr("transform", function(d) { return "translate(" + label.centroid(d) + ")"; })
		  .attr("dy", "0.35em")
		  .text(function(d) { return d.data.age; });
	});
	
	console.log("2");
	*/

