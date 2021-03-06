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

    d3.csv("data/CleanedAirplaneCrashes.csv", function(d) {
    d.Fatalities = +d.Fatalities;
    if (d.Fatalities) return d;
    }, function(error, classes) {
    if (error) throw error;

    var root = d3.hierarchy({children: classes})
        .sum(function(d) { return d.value; })
        .each(function(d) {
            if (Operator_Final_1 = d.data.Operator_Final_1) {
            var Operator_Final_1, i = Operator_Final_1.lastIndexOf(".");
            d.Operator_Final_1 = Operator_Final_1;
            }
        });
    
    var node = svg.selectAll(".node")
        .data(pack(root).leaves())
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

    node.append("circle")
        .attr("Operator_Final_1", function(d) { return d.Operator_Final_1; })
        .attr("r", function(d) { return d.r; })
        .style("fill", function(d) { return color('#FF0000'); });

    node.append("clipPath")
        .attr("Operator_Final_1", function(d) { return "clip-" + d.Operator_Final_1; })
        .append("use")
        .attr("xlink:href", function(d) { return "#" + d.Operator_Final_1; });

    node.append("text")
        .attr("clip-path", function(d) { return "url(#clip-" + d.Operator_Final_1 + ")"; })
        .selectAll("tspan")
        .data(function(d) { return "test"; })
        .enter().append("tspan")
        .attr("x", 0)
        .attr("y", function(d, i, nodes) { return 13 + (i - nodes.length / 2 - 0.5) * 10; })
        .text(function(d) { return d; });

    node.append("title")
        .text(function(d) { return d.Operator_Final_1 + "\n" + format(d.value); });
        });

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


