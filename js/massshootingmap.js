var mswidth = 960,
    msheight = 600;

var massshootingsvg = d3.select("#massshootingmap").append("svg")
    	.attr("width", mswidth)
    	.attr("height", msheight);

var mstip = d3.select("#massshootingmap").append("div")  
        .attr("class", "tooltip");
massshootingsvg.append("text")
      .attr("class", "source")
      .attr("transform", "translate(" + (mswidth - 400) + ", " + (msheight - 25) + ")")
      .text("source: http://www.gunviolencearchive.org/reports/mass-shooting")
	
var projection = d3.geoAlbersUsa()
    .scale(1280)
    .translate([mswidth / 2, msheight / 2]);

var path = d3.geoPath()
   // .projection(projection);
massshootingsvg.append("g")
  .attr("class", "mslegend")
  .attr("transform", "translate(" + 6*mswidth/7 + ", " + (30*msheight/50) + ")");
var names = {};
d3.queue()
    .defer(d3.json, "data/us.json")
    .defer(d3.tsv, "data/us-state-names.tsv", function(d, i) {   
      names[d.id] = d.name;
    })
  
   // .defer(d3.json, "data/us-congress-115.json")
    .defer(d3.csv, "data/2017massshootings2.csv")
    .defer(d3.csv, "data/census-state-populations.csv")
    .defer(d3.csv, "data/cities2add.csv")
    .await(ready);


function ready(error, us, statenames, shootings, populations, cities) {


	if (error) throw error;
	console.log(cities);
	populations.map(function(d) { d['pop_est_2014'] = +d['pop_est_2014']; return +d; })
	populationsobj = {};
	for (var i = 0; i < populations.length; i++) {
		populationsobj[populations[i]['state']] = 1000000/populations[i]['pop_est_2014'];
	}
	//console.log(populationsobj);
	var shootingswstateid = shootings.map(function(d) {

		d['district'] = add0ifneeded(d['district'])
		d['stateid'] = add0ifneeded(names[d['State']]);
		d['GEOID'] = d['stateid'] + d['district']
		return d;
	});

	//console.log(shootingswstateid);
	var nestedshootings = d3.nest()
							.key(function(d) { return d.State;})
							.rollup(function(v) { return v.length;})
							.entries(shootingswstateid)
	//console.log(nestedshootings);
	

	

	nestedshootingsobj = {};
	for (var i = 0; i < nestedshootings.length; i++) {
		nestedshootingsobj[nestedshootings[i]['key']] = nestedshootings[i]['value'] * populationsobj[nestedshootings[i]['key']]
	}
	//console.log(nestedshootingsobj);

	var colorScale = d3.scaleQuantile()
						.domain(Object.values(nestedshootingsobj))
						.range(d3.schemeBlues[9]);
	
	var mslegend = d3.legendColor()
  //.shape('rectangle')
  .labelFormat(d3.format(".2f"))

  .title("Mass shootings per 1,000,000 people")
    .titleWidth(150)
  //use cellFilter to hide the "e" cell
    .cellFilter(function(d){ return d.label !== "e" })
  .scale(colorScale);

    d3.select(".mslegend")
  .call(mslegend);

	var circleScale = d3.scaleLinear()
						.domain(d3.extent(shootings, function(d) { return +d.killed}))
						.range([4, 15])

	state = massshootingsvg.append("g")
    .attr("class", "states")
    .selectAll("path")
    .data(topojson.feature(us, us.objects.states).features)
    .enter().append("path")
    .attr("d", path)
   	.attr("fill", function(d) { 
    	//console.log(nestedshootingsobj[names[d.id]]);
    	var shootingspermil = nestedshootingsobj[names[d.id]]
    	if (shootingspermil == null) {
    		return "white";
    	} else {
    		return colorScale(shootingspermil);
    	}
    	//colorScale(nestedshootingsobj(d.properties.State))
    });


    massshootingsvg.append("g")
    .attr("class", "shootings").selectAll("circle")
		.data(shootings).enter()
		.append("circle")
	
		.attr("r", function (d) { return circleScale(+d.killed); })
		.attr("fill", "red")
		.attr("opacity", 0.5)
		.attr("transform", function(d) {
		 
	    return "translate(" + projection([
	      d.lng,
	      d.lat
	    ]) + ")";
	  	})
		.on("mouseover", function(d) {
	     
	            console.log(d);
	            mstip.html(d.City + ", " + d.State + ": " + d.killed + " killed, " + d.injured + " injured")
	             .style("left", (d3.event.pageX) + "px")    
	                   .style("top", (d3.event.pageY - 28) + "px");
	            mstip.transition()   
	                .duration(200)     
	                 .style("opacity", "1")
	        })
	        .on("mouseout", function(d) {   
	            mstip.transition()    
	            .duration(200)    
	            .style("opacity", "0"); 
	        });

	var citiesg = massshootingsvg.append("g")
		.attr("class", "cities")
		.selectAll("g")
		.data(cities).enter()
		.append("g")
		.attr("class", "city")
		.attr("transform", function(d) {
		 
	    return "translate(" + projection([
	      d.lng,
	      d.lat
	    ]) + ")";
	  	})
	d3.selectAll(".city")
		.append("circle")
		.attr("r", 1)
		.attr("fill", "black")
	d3.selectAll(".city")
		.append("text")
		.text(function(d) { return d.cities})

}
function add0ifneeded(id) {
	return ('0' + id).slice(-2)
}

