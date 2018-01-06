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
		
	//Deaths = 113919
	//Survivors = 47512
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

var pieChartFired = 0;
window.addEventListener("scroll", makePieCharthWhenInView);

function makePieCharthWhenInView()
{
	var isElementInView = Utils.isElementInView($('#pieChartHeader'), false);

	if (isElementInView && pieChartFired == 0) 
	{
		GeneratePieChart();
		pieChartFired = 1;
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