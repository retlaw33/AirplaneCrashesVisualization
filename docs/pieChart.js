function GeneratePieChart()
{
	console.log("0");
	
	var svg = d3.select("#pieChartPlaceHolder").append("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    radius = Math.min(width, height) / 2,
    g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

	var color = d3.scale.ordinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
	
	var pie = d3.layout.pie()
		.sort(null)
		.value(function(d) { return d.population; });

	var path = d3.svg.arc()
		.outerRadius(radius - 10)
		.innerRadius(0);

	var label = d3.svg.arc()
		.outerRadius(radius - 40)
		.innerRadius(radius - 40);
		
	console.log("1");

	d3.csv("data/PieChartData.csv", function(d) {
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
}
