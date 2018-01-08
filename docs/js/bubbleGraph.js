function GenerateBubbles() 
{
    var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

    var format = d3.format(",d");

    var color = d3.scaleOrdinal(d3.schemeCategory20c);

    var pack = d3.pack()
        .size([width, height])
        .padding(1.5);

    d3.csv("data/BubbleGraphData.csv", function(d) {
    /*console.log(d.Deaths);
    console.log(d.Location);
    console.log(d.Summary);*/
    d.Deaths = +d.Deaths;
    d.Manufacturer = d.Manufacturer;
    d.Location = d.Location;
    d.Summary = d.Summary;
    if (d.Deaths) return d;
    }, function(error, classes) {
    if (error) throw error;

    var root = d3.hierarchy({children: classes})
        .sum(function(d) { return d.Deaths; })
        .each(function(d) {
            if (Manufacturer = d.data.Manufacturer) {
            var Manufacturer, i = Manufacturer.lastIndexOf(".");
            d.Manufacturer = Manufacturer;
            d.package = Manufacturer.slice(0, i);
            d.class = Manufacturer.slice(i + 1);
            }
        });
    
    var node = svg.selectAll(".node")
        .data(pack(root).leaves())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("circle")
        .attr("Manufacturer", function(d) { 
            return d.Manufacturer; })
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) { return color(d.package); });

    node.append("clipPath")
        .attr("Manufacturer", function(d) { 
            return "clip-" + d.Manufacturer; })
        .append("use")
        .attr("xlink:href", function(d) { return "#" + d.Manufacturer; });

    node.append("text")
        .attr("clip-path", function(d) { return "url(#clip-" + d.Manufacturer + ")"; })
        .selectAll("tspan")
        .data(function(d) { return d.class.split(/(?=[A-Z][^A-Z])/g); })
        .enter().append("tspan")
        .attr("x", 0)
        .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
        .text(function(d) { 
            return d; });

    node.append("text")
        .attr("clip-path", function(d) { return "url(#clip-" + d.Manufacturer + ")"; })
        .selectAll("tspan")
        .data(function(d) { return d.data.Deaths.toString().split(/(?=[A-Z][^A-Z])/g); })
        .enter().append("tspan")
        .attr("x", 0)
        .attr("y", function(d, i, nodes) { return 28 + (i - nodes.length / 2 - 0.5) * 10; })
        .text(function(d) { 
            return d; });
           
    node.append("title")
        .text(function(d) { 
            return d.data.Location.toString() + "\n" + d.data.Summary.toString(); });
        });

    d3.select("#timelinePlaceHolder").attr("align","center");

    console.log("bubbleGraph made");
}

var timebubbleFired = 0;
window.addEventListener("scroll", makeBubbleGraphWhenInView);

function makeBubbleGraphWhenInView()
{
	var isElementInView = Utils.isElementInView($('#bubbleGraphHeader'), false);

	if (isElementInView && timebubbleFired == 0) 
	{
		GenerateBubbles();
		timebubbleFired = 1;
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
