var votewidth = 960,
    voteheight = 600;

var votesvg = d3.select("#votemap").append("svg")
    	.attr("width", votewidth)
    	.attr("height", voteheight);

	
var projection = d3.geoAlbersUsa()
    .scale(1280)
    .translate([votewidth / 2, voteheight / 2]);

var path = d3.geoPath()
    .projection(projection);

var codes = {};
d3.queue()
    .defer(d3.json, "data/us.json")
    .defer(d3.tsv, "data/us-state-names.tsv", function(d, i) {   
      codes[d.code] = d.id;
    })
    .defer(d3.json, "data/us-congress-115.json")
    .defer(d3.csv, "data/congress_votes_115-2017_h77.csv")
    .await(ready);

function ready(error, us, statenames, congress, votes) {


	if (error) throw error;
  console.log(congress);
  console.log(congress.objects.districts);
	var voteswithid = votes.map(function(d) {

		d['district'] = add0ifneeded(d['district'])
		d['stateid'] = add0ifneeded(codes[d['state']]);
		d['GEOID'] = d['stateid'] + d['district']
		return d;
	});
  var votesobj = {};

  for (i = 0; i < voteswithid.length; i++) {
    votesobj[voteswithid[i]['GEOID']] = voteswithid[i];
  }

	var voteScale = d3.scaleOrdinal()
						.domain(["Aye Republican", "Aye Democrat", "No Republican", "No Democrat"])
						.range(["#E64045", "#D9D9FF", "#FFD9D9","#2657A1"]);


	/*votesvg.append("defs").append("path")
      .attr("id", "land")
      .datum(topojson.feature(us, us.objects.land))
      .attr("d", path);

  votesvg.append("clipPath")
      .attr("id", "clip-land")
    .append("use")
      .attr("xlink:href", "#land");*/

	votesvg.append("g")
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
        if (votesobj[d.properties.GEOID] != null) {
          var vote = votesobj[d.properties.GEOID]['vote']
          var party = votesobj[d.properties.GEOID]['party']
          console.log(vote + " " + party);
          return voteScale(vote + " " + party);
        } else {
          return "lightgrey";
        }
        //return "lightgrey";
      })

    votesvg.append("path")
      .attr("class", "district-boundaries")
      .datum(topojson.mesh(congress, congress.objects.district, function(a, b) { return a !== b && (a.id / 1000 | 0) === (b.id / 1000 | 0); }))
      .attr("d", path);

    votesvg.append("path")
      .attr("class", "state-boundaries")
      .datum(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; }))
      .attr("d", path);

   
}
function add0ifneeded(id) {
	return ('0' + id).slice(-2)
}
	