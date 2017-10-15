var mswidth = 960,
    msheight = 600;

var massshootingsvg = d3.select("#massshootingmap").append("svg")
    	.attr("width", mswidth)
    	.attr("height", msheight);

d3.queue()
    .defer(d3.json, "data/us.json")
    .defer(d3.tsv, "data/us-state-names.tsv")
    .defer(d3.json, "data/us-congress-115.json")
    .defer(d3.csv, "data/2017massshootings.csv")
    .await(ready);

function ready(error, us, statenames, congress, shootings) {


	if (error) throw error;
	console.log(us);
	console.log(congress);
	console.log(shootings);

	shootings.forEach(function(d) {
		d['district'] = +d['district'];
		d['stateid'] = 
	});
	console.log(shootings);


	
	var projection = d3.geoAlbersUsa()
	    .scale(1200)
	    .translate([width / 2, height / 2]);

	var path = d3.geoPath()
	    .projection(projection);

	massshootingsvg.append("defs").append("path")
      .attr("id", "land")
      .datum(topojson.feature(us, us.objects.land))
      .attr("d", path);

  	massshootingsvg.append("clipPath")
      .attr("id", "clip-land")
    .append("use")
      .attr("xlink:href", "#land");

	massshootingsvg.append("g")
      .attr("class", "districts")
      .attr("clip-path", "url(#clip-land)")
    .selectAll("path")
      .data(topojson.feature(congress, congress.objects.districts).features)
    .enter().append("path")
      .attr("d", path)
    .append("title")
      .text(function(d) { return d.id; });

    massshootingsvg.append("path")
      .attr("class", "district-boundaries")
      .datum(topojson.mesh(congress, congress.objects.districts, function(a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); }))
      .attr("d", path);

   
}
	