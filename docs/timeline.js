function GenerateTimeline() 
{
	var data = [
		{ name: "http requests", data: [new Date('2014/09/15 13:24:54'), new Date('2014/09/15 13:25:03'), new Date('2014/09/15 13:25:05')] },
		{ name: "SQL queries", data: [new Date('2014/09/15 13:24:57'), new Date('2014/09/15 13:25:04'), new Date('2014/09/15 13:25:04')] },
		{ name: "cache invalidations", data: [new Date('2014/09/15 13:25:12')] }
	  ];

	var eventDropsChart = d3.chart.eventDrops()
	.date(d => d.date);

	d3.select('#timelinePlaceHolder')
	.datum(data)
	.call(eventDropsChart);

}

var timelineFired = 0;
window.addEventListener("scroll", makeTimeLineWhenInView);

function makeTimeLineWhenInView()
{
	var isElementInView = Utils.isElementInView($('#timelineHeader'), false);

	if (isElementInView && timelineFired == 0) 
	{
		GenerateTimeline();
		timelineFired = 1;
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


