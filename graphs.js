function GenerateBarGraph()
{

	var margin = {top: 20, right: 10, bottom: 100, left:60},
		width = 700 - margin.right - margin.left,
		height = 500 - margin.top - margin.bottom;


	var svg = d3.select("#barGraphPlaceHolder")
		.append("svg")
		  .attr ({
			"width": width + margin.right + margin.left,
			"height": height + margin.top + margin.bottom
		  })
		.append("g")
		  .attr("transform","translate(" + margin.left + "," + margin.right + ")");


	var xScale = d3.scale.ordinal()
		.rangeRoundBands([0,width], 0.2, 0.2);

	var yScale = d3.scale.linear()
		.range([height, 0]);

	var xAxis = d3.svg.axis()
		.scale(xScale)
		.orient("bottom");

	var yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");
		
	var bgType = [];
	var bgFatalities = [];

	d3.csv("data/CleanedAirplaneCrashes.csv", function(error,data) {
	  if(error) console.log("Error: data not loaded!");
	  
	  var format = d3.time.format("%d-%m-%y");
	  
	  data.forEach(function(d) {
		//console.log(format.parse(d.Date_Final));
		d.Date = format.parse(d.Date_Final);
		
		if (isNaN(d.Fatalities))
		{
			d.Fatalities = 0;
		}
		else
		{
			d.Fatalities = +d.Fatalities;
		}
		//console.log(d.Fatalities);
		
		if (+d.Fatalities > 300)
		{
			bgType.push(d.Type);
			bgFatalities.push(+d.Fatalities);
			
			console.log(d.Type + " | " + +d.Fatalities);
		}
		
		d.bgType = bgType;
		d.bgFatalities = bgFatalities;
	  });

	  // Specify the domains of the x and y scales
	  xScale.domain(bgType);
	  yScale.domain([0, d3.max(data, function(d) { return d.bgFatalities; } ) ]);
	  
	  svg.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		//.attr("height", 0)
		//.attr("y", height)
		.transition().duration(3000)
		.delay( function(d,i) { return i * 200; })
		// attributes can be also combined under one .attr
		.attr({
			"x": function(d) { return xScale(d.bgType); },
			"y": function(d) { return yScale(d.bgFatalities); },
			"width": xScale.rangeBand(),
			"height": function(d) { return  height - yScale(d.bgFatalities); }
		})
		.style("fill", function(d,i) { return 'rgb(20, 20, ' + ((i * 30) + 100) + ')'});

			svg.selectAll('text')
				.data(data)
				.enter()
				.append('text')

				.text(function(d){
					return d.bgFatalities;
				})
				.attr({
					"x": function(d){ return xScale(d.bgType) +  xScale.rangeBand()/2; },
					"y": function(d){ return yScale(d.bgFatalities)+ 12; },
					"font-family": 'sans-serif',
					"font-size": '13px',
					"font-weight": 'bold',
					"fill": 'white',
					"text-anchor": 'middle'
				});
				
		console.log("2");
				
		// Draw xAxis and position the label
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.selectAll("text")
			.attr("dx", "-.8em")
			.attr("dy", ".25em")
			.attr("transform", "rotate(-60)")
			.style("text-anchor", "end")
			.attr("font-size", "10px");

		// Draw yAxis and postion the label
		svg.append("g")
			.attr("class", "y axis")
			.call(yAxis)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("x", -height/2)
			.attr("dy", "-3em")
			.style("text-anchor", "middle")
			.text("Fatalities");
			
   });
}
