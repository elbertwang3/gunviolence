var mswidth = 960,
    msheight = 600;

var massshootingsvg = d3.select("#massshootingmap").append("svg")
    	.attr("width", mswidth)
    	.attr("height", msheight);

	
var projection = d3.geoAlbersUsa()
    .scale(1280)
    .translate([mswidth / 2, msheight / 2]);

var path = d3.geoPath()
   // .projection(projection);

var names = {};
d3.queue()
    .defer(d3.json, "data/us.json")
    .defer(d3.tsv, "data/us-state-names.tsv", function(d, i) {   
      names[d.id] = d.name;
    })
  
   // .defer(d3.json, "data/us-congress-115.json")
    .defer(d3.csv, "data/2017massshootings.csv")
    .defer(d3.csv, "data/census-state-populations.csv")
    .await(ready);

function ready(error, us, statenames, shootings, populations) {


	if (error) throw error;
	populations.map(function(d) { d['pop_est_2014'] = +d['pop_est_2014']; return +d; })
	populationsobj = {};
	for (var i = 0; i < populations.length; i++) {
		populationsobj[populations[i]['state']] = 1000000/populations[i]['pop_est_2014'];
	}
	console.log(populationsobj);
	var shootingswstateid = shootings.map(function(d) {

		d['district'] = add0ifneeded(d['district'])
		d['stateid'] = add0ifneeded(names[d['State']]);
		d['GEOID'] = d['stateid'] + d['district']
		return d;
	});

	var nestedshootings = d3.nest()
							.key(function(d) { return d.State;})
							.rollup(function(v) { return v.length;})
							.entries(shootingswstateid)
	console.log(nestedshootings);
	

	

	nestedshootingsobj = {};
	for (var i = 0; i < nestedshootings.length; i++) {
		nestedshootingsobj[nestedshootings[i]['key']] = nestedshootings[i]['value'] * populationsobj[nestedshootings[i]['key']]
	}
	console.log(nestedshootingsobj);

	var colorScale = d3.scaleQuantile()
						.domain(Object.values(nestedshootingsobj))
						.range(d3.schemeBlues[9]);

	console.log(us)
	console.log(us.objects.states);
	state = massshootingsvg.append("g")
    .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
    .attr("d", path)
   	.attr("fill", function(d) { 
    	console.log(nestedshootingsobj[names[d.id]]);
    	var shootingspermil = nestedshootingsobj[names[d.id]]
    	if (shootingspermil == null) {
    		return "white";
    	} else {
    		return colorScale(shootingspermil);
    	}
    	//colorScale(nestedshootingsobj(d.properties.State))
    });
	/*massshootingsvg.append("defs").append("path")
      .attr("id", "land")
      .datum(topojson.feature(us, us.objects.land))
      .attr("d", path);

  	massshootingsvg.append("clipPath")
      .attr("id", "clip-land")
    .append("use")
      .attr("xlink:href", "#land");*/

	/*massshootingsvg.append("g")
      .attr("class", "districts")
      .attr("clip-path", "url(#clip-land)")
    .selectAll("path")
      .data(topojson.feature(congress, congress.objects.district).features)
    .enter().append("path")
      .attr("d", path)
      .attr("fill", function(d) { 
      
        //console.log(names[+d.id]);
        //console.log(unemployment.get(names[+d.id]));	
        //console.log(color(unemployment.get(names[+d.id])));
        //console.log(colorScale(nestedshootings[d.properties.GEOID]));
        //console.log(nestedshootingsobj[d.properties.GEOID]);
        return colorScale(nestedshootingsobj[d.properties.GEOID]);
      })
    .append("title")
      .text(function(d) { return d.id; });

    massshootingsvg.append("path")
      .attr("class", "district-boundaries")
      .datum(topojson.mesh(congress, congress.objects.district, function(a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); }))
      .attr("d", path);


    massshootingsvg.append("path")
      .attr("class", "state-boundaries")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("d", path);*/

   
}
function add0ifneeded(id) {
	return ('0' + id).slice(-2)
}
	