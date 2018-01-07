function GenerateTimeline() 
{
    FusionCharts.ready(function(){
        var fusioncharts = new FusionCharts({
        type: 'scrollColumn2d',
        renderAt: 'timelinePlaceHolder',
        width: '550',
        height: '350',
        dataFormat: 'json',
        dataSource: {
            "chart": {
                "caption": "Deaths by plane crashes",
                "subcaption": "1990 - 2008",
                "xaxisname": "Year",
                "yaxisname": "Deaths",
                "showvalues": "1",
                "placeValuesInside": "1",
                "rotateValues": "1",
                "valueFontColor": "#ffffff",
                "numberprefix": "",
    
                //Cosmetics
                "baseFontColor": "#333333",
                "baseFont": "Helvetica Neue,Arial",
                "captionFontSize": "14",
                "subcaptionFontSize": "14",
                "subcaptionFontBold": "0",
                "showborder": "0",
                "paletteColors": "#c20c00",
                "bgcolor": "#FFFFFF",
                "showalternatehgridcolor": "0",
                "showplotborder": "0",
                "labeldisplay": "WRAP",
                "divlinecolor": "#CCCCCC",
                "showcanvasborder": "0",
                "linethickness": "3",
                "plotfillalpha": "100",
                "plotgradientcolor": "",
                "numVisiblePlot": "12",
                "divlineAlpha": "100",
                "divlineColor": "#999999",
                "divlineThickness": "1",
                "divLineIsDashed": "1",
                "divLineDashLen": "1",
                "divLineGapLen": "1",
                "scrollheight": "10",
                "flatScrollBars": "1",
                "scrollShowButtons": "0",
                "scrollColor": "#cccccc",
                "showHoverEffect": "1",
            },
            "categories": [{
                "category": [{
                    "label": "1990"
                }, {
                    "label": "1991"
                }, {
                    "label": "1992"
                }, {
                    "label": "1993"
                }, {
                    "label": "1994"
                }, {
                    "label": "1995"
                }, {
                    "label": "1996"
                }, {
                    "label": "1997"
                }, {
                    "label": "1998"
                }, {
                    "label": "1999"
                }, {
                    "label": "2000"
                }, {
                    "label": "2001"
                }, {
                    "label": "2002"
                }, {
                    "label": "2003"
                }, {
                    "label": "2004"
                }, {
                    "label": "2005"
                }, {
                    "label": "2006"
                }, {
                    "label": "2007"
                }, {
                    "label": "2008"
                }]
            }],
            "dataset": [{
                "data": [{
                    "value": "693"
                }, {
                    "value": "980"
                }, {
                    "value": "1873"
                }, {
                    "value": "1081"
                }, {
                    "value": "1095"
                }, {
                    "value": "941"
                }, {
                    "value": "1204"
                }, {
                    "value": "844"
                }, {
                    "value": "861"
                }, {
                    "value": "612"
                }, {
                    "value": "482"
                }, {
                    "value": "3246"
                }, {
                    "value": "964"
                }, {
                    "value": "723"
                }, {
                    "value": "405"
                }, {
                    "value": "780"
                }, {
                    "value": "664"
                }, {
                    "value": "518"
                }, {
                    "value": "629"
                }]
            }]
        }
    }
    );
        fusioncharts.render();
    });
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


