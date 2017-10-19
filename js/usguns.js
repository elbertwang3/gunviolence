var ugmargin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
},
ugwidth = 800 - ugmargin.left - ugmargin.right,
ugheight = 500 - ugmargin.top - ugmargin.bottom;

var ugx = d3.scaleLinear()
    .range([0, ugwidth]);

var ugy = d3.scaleLinear()
    .range([ugheight, 0]);

var ugxAxis = d3.axisBottom(ugx)


var ugyAxis = d3.axisLeft(ugy)


var ugsvg = d3.select("#usgunsscatter").append("svg")
    .attr("width", ugwidth + ugmargin.left + ugmargin.right)
    .attr("height", ugheight + ugmargin.top + ugmargin.bottom)
    .append("g")
    .attr("transform", "translate(" + ugmargin.left + "," + ugmargin.top + ")");
var ugtip = d3.select("#usgunsscatter").append("div")  
        .attr("class", "tooltip");

var redbluepicker = d3.scaleOrdinal()
                    .domain(["blue", "red"])
                    .range(['#08519B', '#B80F0A'])
d3.csv('data/ownershipdeathrate.csv', function(d) {
    console.log(d);
    //var data = create_data(1000);

    d.forEach(function(d) {
        d.Ownership = +d.Ownership;
        d['Death rate'] = +d['Death rate'];
    });
    console.log(d);
    d = findyhat(d)
    console.log(d)
    var ugline = d3.line()
        .x(function(d) {
            return ugx(d['Ownership']);
        })
        .y(function(d) {
            return ugy(d.yhat);
        });
    /*var line = d3.svg.line()
        .x(function(d) {
            return x(d.x);
        })
        .y(function(d) {
            return y(d.yhat);
        });*/
    
    console.log(d3.extent(d, function(d) {
        return d['Ownership'];
    }))
    ugx.domain([0, d3.max(d, function(d) {
        return d['Ownership'];
    }) +5.3]);
    console.log(d3.extent(d, function(d) {
        return d['Death rate'];
    }))
    ugy.domain([0, d3.max(d, function(d) {
        return d['Death rate'];
    }) + 5.41]);

    ugsvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + ugheight + ")")
        .call(ugxAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", ugwidth)
        .attr("y", 6)
        //.style("text-anchor", "end")
        //.text("Gun ownership %");

    ugsvg.append("g")
        .attr("class", "y axis")
        .call(ugyAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -6)
        .attr("dy", ".71em")
        //.style("text-anchor", "end")
        //.text("Firearm death rates per 100,000")
    ugsvg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - ugmargin.left)
      .attr("x",0 - (ugheight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Gun death rates per 100,000"); 
    
     ugsvg.append("text")             
      .attr("transform",
            "translate(" + (ugwidth/2) + " ," + 
                           (ugheight + ugmargin.top -10) + ")")
      .style("text-anchor", "middle")
      .text("Gun ownership percentage");
     

    ugsvg.selectAll(".dot")
        .data(d)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 10)
        .attr("cx", function(d) {
            return ugx(d['Ownership']);
        })
        .attr("cy", function(d) {
            return ugy(d['Death rate']);
        })
        .attr("fill", function(d) {
            return redbluepicker(d.election);
        })
        .on("mouseover", function(d) {
     
            console.log(d.State);
            ugtip.html(d.State)
             .style("left", (d3.event.pageX) + "px")    
                   .style("top", (d3.event.pageY - 28) + "px");
            ugtip.transition()   
                .duration(200)     
                 .style("opacity", "1")
        })
        .on("mouseout", function(d) {   
            ugtip.transition()    
            .duration(200)    
            .style("opacity", "0"); 
        });

        ugsvg.append("path")
        .datum(d)
        .attr("class", "bestfit")
        .attr("d", ugline)
        .attr("stroke", "black")

    function findyhat(d) {
        var x_mean = 0;
        var y_mean = 0;
        var term1 = 0;
        var term2 = 0;
        for (var i = 0; i < d.length; i++) {
            x_mean += d[i]['Ownership']
            y_mean += d[i]['Death rate']
        }
        x_mean /= d.length;
        y_mean /= d.length;

        var xr = 0;
        var yr = 0;
        for (i = 0; i < d.length; i++) {
            xr = d[i]['Ownership'] - x_mean;
            yr = d[i]['Death rate'] - y_mean;
            term1 += xr * yr;
            term2 += xr * xr;

        }
        var b1 = term1 / term2;
        var b0 = y_mean - (b1 * x_mean);
        // perform regression 

        yhat = [];
        // fit line using coeffs
        for (i = 0; i < d.length; i++) {
            yhat.push(b0 + (d[i]['Ownership'] * b1));
        }

        var data = [];
        for (i = 0; i < d.length; i++) {
            data.push({
                "yhat": yhat[i],
                "Ownership": d[i]['Ownership'],
                "Death rate": d[i]['Death rate'],
                "election": d[i]['election'],
                "State": d[i]['State']
            })
        }
        return (data);
    }


})

