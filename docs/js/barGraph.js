function GenerateBarGraph()
{
		var margin = {top: 20, right: 10, bottom: 100, left:60},
		width = 700 - margin.right - margin.left,
		height = 500 - margin.top - margin.bottom;

	var svg = d3v3.select("#barGraphPlaceHolder")
		.append("svg")
		  .attr ({
			"width": width + margin.right + margin.left,
			"height": height + margin.top + margin.bottom
		  })
		.append("g")
		  .attr("transform","translate(" + margin.left + "," + margin.right + ")");


	var xScale = d3v3.scale.ordinal()
		.rangeRoundBands([0,width], 0.2, 0.2);

	var yScale = d3v3.scale.linear()
		.range([height, 0]);

	var xAxis = d3v3.svg.axis()
		.scale(xScale)
		.orient("bottom");

	var yAxis = d3v3.svg.axis()
		.scale(yScale)
		.orient("left");

	d3v3.csv("data/BarGraphData.csv", function(error,data) {
	  if(error) console.log("Error: data not loaded!");
	  data.forEach(function(d) {
		d.Name = d.Name;
		//console.log(d.Name);
		d.Date = d.Date;
		//console.log(d.Date);
		d.Time = d.Time;
		//console.log(d.Time);
		d.Location = d.Location;
		//console.log(d.Location);
		d.Operator = d.Operator;
		//console.log(d.Operator);
		d.Flight = d.Flight;
		//console.log(d.Flight);
		d.Route = d.Route;
		//console.log(d.Route);
		d.Type = d.Type;
		//console.log(d.Type);
		d.Aboard = +d.Aboard;
		//console.log(d.Aboard);
		d.Fatalities = +d.Fatalities;
		//console.log(d.Fatalities);
		d.Ground = +d.Ground;
		//console.log(d.Ground);
		d.Deaths = +d.Deaths;
		//console.log(d.Deaths);
		d.Summary = d.Summary;
		//console.log(d.Summary);
	  });

	  // sort the gdp values
	  data.sort(function(a,b) {
		return b.Deaths - a.Deaths;
	  });

	  // Specify the domains of the x and y scales
	  xScale.domain(data.map(function(d) { return d.Name; }) );
	  yScale.domain([0, d3v3.max(data, function(d) { return d.Deaths; } ) ]);

	  var div = d3v3.select("body").append("div")	
		.attr("class", "tooltip")				
		.style("opacity", 0);
	  
	  svg.selectAll('rect')
		.data(data)
		.enter()
		.append('rect')
		.on({
          "mouseover": function(d) { 
		  div.transition()		
                .duration(200)		
                .style("opacity", .9);	
          div.html("Click me!")	
                .style("left", (d3v3.event.pageX) + "px")		
                .style("top", (d3v3.event.pageY - 28) + "px");	 },
          "mouseout":  function(d) { div.transition()		
                .duration(500)		
                .style("opacity", 0); }, 
		"click": function(d) { 
				alert("Name: " + d.Name + '\n'
					 +"Date: " + d.Date + '\n'
					 +"Time: " + d.Time + '\n'
					 +"Location: " + d.Location + '\n'
					 +"Operator: " + d.Operator + '\n'
			    	 +"Route: " + d.Route + '\n'
		  			 +"Type: " + d.Type + '\n'
					 +"Aboard: " + d.Aboard + '\n'
				  	 +"Fatalities: " + d.Fatalities + '\n'
				 	 +"Ground: " + d.Ground + '\n'
					 +"Deaths: " + d.Deaths + '\n'
					 +"Summary: " + d.Summary);
				 } }) 
		.attr("height", 0)
		.attr("y", height)
		.transition().duration(3000)
		.delay( function(d,i) { return i * 200; })
		// attributes can be also combined under one .attr
		.attr({
		  "x": function(d) { return xScale(d.Name); },
		  "y": function(d) { return yScale(d.Deaths); },
		  "width": xScale.rangeBand(),
		  "height": function(d) { return  height - yScale(d.Deaths); }
		})
		.style("fill", function(d,i) { return 'rgb(' + ((i * 30) + 100) + ',30, 30)'});
		
		// lable the bars
		svg.selectAll('text')
			.data(data)
			.enter()
			.append('text')
			.text(function(d){
				return d.Deaths + " Deaths";
			})				
			.attr({
				"x": function(d){ return xScale(d.Name) + xScale.rangeBand() / 2; },
				"y": function(d){ return yScale(d.Deaths) + 12; },
				"font-family": 'sans-serif',
				"font-size": '13px',
				"font-weight": 'bold',
				"fill": 'white',
				"text-anchor": 'middle'
			})
			.style("fill", "white");
		
		// Draw xAxis and position the label
		svg.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + height + ")")
			.call(xAxis)
			.selectAll("text")
			.attr("dx", "-.8em")
			.attr("dy", "1.5em")
			.attr("transform", "rotate(-10)" )
			.style("text-anchor", "middle")
			.attr("font-size", "14px");
				});
}

var barGraphFired = 0;
window.addEventListener("scroll", makeBarGraphWhenInView);

function makeBarGraphWhenInView()
{
	var isElementInView = Utils.isElementInView($('#barGraphHeader'), false);

	if (isElementInView && barGraphFired == 0) 
	{
		GenerateBarGraph();
		barGraphFired = 1;
	} 
}

function isScrolledIntoView(elem)
{
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}

function Utils() {}
Utils.prototype = {
    constructor: Utils,
    isElementInView: function (element, fullyInView) {
        var pageTop = $(window).scrollTop();
        var pageBottom = pageTop + $(window).height();
        var elementTop = $(element).offset().top;
        var elementBottom = elementTop + $(element).height();

        if (fullyInView === true) {
            return ((pageTop < elementTop) && (pageBottom > elementBottom));
        } else {
            return ((elementTop <= pageBottom) && (elementBottom >= pageTop));
        }
    }
};
var Utils = new Utils();
