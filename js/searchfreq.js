// line chart code: https://bl.ocks.org/d3noob/402dd382a51a4f6eea487f9a35566de0
// time series from: http://bl.ocks.org/mbostock/3883245
// set the dimensions and margins of the graph
var margin = { top: 20, right: 20, bottom: 30, left: 50 },
    height = 500 - margin.top - margin.bottom;
var maxWidth = 860 - margin.left - margin.right;
var width = 960 - margin.left - margin.right;

var parseTime = d3.timeParse("%Y-%m-%d");
var _x = d3.scaleTime().range([0, width]);
var _y = d3.scaleLinear().range([height, 0]);

var valueline = d3.line().x(function (d) {
  return _x(d.date);
}).y(function (d) {
  return _y(d.freq);
});

var svg = d3.select("#searchfreq").append("svg").attr("width", 960).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/multiTimeline.csv", function (error, data) {
  if (error) throw error;

  data.forEach(function (d) {
    d.date = parseTime(d.date);
    d.freq = +d.freq;
  });

  _x.domain(d3.extent(data, function (d) {
    return d.date;
  }));
  _y.domain([0, d3.max(data, function (d) {
    return d.freq;
  })]);

  svg.append("path").data([data]).attr("class", "line").attr("d", valueline);

  svg.append("g").attr("class", "x-axis").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(_x));

  svg.append("g").call(d3.axisLeft(_y));

  //Add annotations
  var labels = [{
    data: { date: "2012-12-16", freq: 75, label: "Sandy Hook shooting" },
    dy: 275,
    dx: 0
  },
  {
    data: { date: "2013-01-13", freq: 100, label: "Obama announces gun control plan" },
    dy: 37,
    dx: 40
  },
  {
    data: { date: "2013-04-14", freq: 61, label: "Assault Weapons Ban bill defeated in Senate" },
    dy: 37,
    dx: 40
  },
 
  {
    data: { date: "2015-10-01", freq: 30, label: " Umpqua Community College shooting" },
    dy: -100,
    dx: -142
  },
  {
    data: { date: "2015-12-02", freq: 26, label: "San Bernadino attack" },
    dy: 0,
    dx: -142
  },
  {
    data: { date: "2016-1-03", freq: 62, label: "Obama unveils new gun control proposal" },
    dy: -100,
    dx: 0,
    note: { align: "middle"}
  },
  {
    data: { date: "2015-06-17", freq: 8, label: "Charleston church shooting" },
    dy: -275,
    dx: 0,
    note: { align: "middle"}
  }, {
    data: { date: "2017-02-28", freq: 4, label: "Trump repeals Obama-era gun control policy" },
    dy: -325,
    dx: 0,
    note: { align: "middle"}
  }, {
    data: { date: "2016-06-12", freq: 43, label: "Orlando Nightclub Shooting" },
    dy: -80,
    dx: 0,
    note: { align: "middle" }
  }, {
    data: { date: "2017-10-01", freq: 39,label: "Las Vegas Shooting" },
    dy: 0,
    dx: -20
  }].map(function (l) {
    l.note = Object.assign({}, l.note, { title: l.data.label,
      label: ""});
    l.subject = { radius: 4 };

    return l;
  });

  var timeFormat = d3.timeFormat("%d-%b-%y");

  window.makeAnnotations = d3.annotation().annotations(labels).type(d3.annotationCalloutCircle).accessors({ x: function x(d) {
      return _x(parseTime(d.date));
    },
    y: function y(d) {
      return _y(d.freq);
    }
  }).accessorsInverse({
    date: function date(d) {
      return timeFormat(_x.invert(d.x));
    },
    freq: function freq(d) {
      return _y.invert(d.y);
    }
  })/*.on('subjectover', function (annotation) {
    annotation.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden", false);
  }).on('subjectout', function (annotation) {
    annotation.type.a.selectAll("g.annotation-connector, g.annotation-note").classed("hidden", true);
  });*/

  svg.append("g").attr("class", "annotation-test").call(makeAnnotations);
  svg.selectAll("g.annotation-connector, g.annotation-note").classed("hidden", false);
});
