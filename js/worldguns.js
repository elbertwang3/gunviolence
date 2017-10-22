var wgmargin = {
    top: 50,
    right: 50,
    bottom: 50,
    left: 50
},
wgwidth = 800 - wgmargin.left - wgmargin.right,
wgheight = 500 - wgmargin.top - wgmargin.bottom;

var wgx = d3.scaleLinear()
    .range([0, wgwidth]);

var wgy = d3.scaleLinear()
    .range([wgheight, 0]);

var wgxAxis = d3.axisBottom(wgx)


var wgyAxis = d3.axisLeft(wgy)


var wgsvg = d3.select("#worldgunsscatter").append("svg")
    .attr("width", wgwidth + wgmargin.left + wgmargin.right)
    .attr("height", wgheight + wgmargin.top + wgmargin.bottom)
    .append("g")
    .attr("transform", "translate(" + wgmargin.left + "," + wgmargin.top + ")");
var wgtip = d3.select("#worldgunsscatter").append("div")  
        .attr("class", "tooltip");

d3.csv('data/gunsdeathrate.csv', function(d) {
    console.log(d);
    //var data = create_data(1000);

    d.forEach(function(d) {
        d['gunsper100'] = +d['gunsper100'];
        d['homicides'] = +d['homicides'];
    });
    console.log(d);
    d = findyhat(d)

    var wgline = d3.line()
        .x(function(d) {
            return wgx(d['gunsper100']);
        })
        .y(function(d) {
            return wgy(d.yhat);
        });
    /*var line = d3.svg.line()
        .x(function(d) {
            return x(d.x);
        })
        .y(function(d) {
            return y(d.yhat);
        });*/
    

    wgx.domain([0, 120]);

    wgy.domain([0, 4]);

    wgsvg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + wgheight + ")")
        .call(wgxAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", wgwidth)
        .attr("y", 6)
        //.style("text-anchor", "end")
        //.text("Gun ownership %");

    wgsvg.append("g")
        .attr("class", "y axis")
        .call(wgyAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", -6)
        .attr("dy", ".71em")
        //.style("text-anchor", "end")
        //.text("Firearm death rates per 100,000")
    wgsvg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - wgmargin.left)
      .attr("x",0 - (wgheight / 2))
      .attr("dy", "1em")
      .style("text-anchor", "middle")
      .text("Gun-related homicides per 100,000 people"); 
    
     wgsvg.append("text")             
      .attr("transform",
            "translate(" + (wgwidth/2) + " ," + 
                           (wgheight + wgmargin.top -10) + ")")
      .style("text-anchor", "middle")
      .text("Guns per 100 people");
     

    wgsvg.selectAll(".dot")
        .data(d)
        .enter().append("circle")
        .attr("class", "dot")
        .attr("r", 3)
        .attr("cx", function(d) {
            return wgx(d['gunsper100']);
        })
        .attr("cy", function(d) {
            return wgy(d['homicides']);
        })
        .attr("fill", function(d) {
            return d.election;
        })
        .on("mouseover", function(d) {
     
            console.log(d.country);
            wgtip.html(d.country)
             .style("left", (d3.event.pageX) + "px")    
                   .style("top", (d3.event.pageY - 28) + "px");
            wgtip.transition()   
                .duration(200)     
                 .style("opacity", "1")
        })
        .on("mouseout", function(d) {   
            wgtip.transition()    
            .duration(200)    
            .style("opacity", "0"); 
        });

        wgsvg.append("path")
        .datum(d)
        .attr("class", "bestfit")
        .attr("d", wgline)
        .attr("stroke", "black")

        function findyhat(d) {
    var x_mean = 0;
    var y_mean = 0;
    var term1 = 0;
    var term2 = 0;
    for (var i = 0; i < d.length; i++) {
        x_mean += d[i]['gunsper100']
        y_mean += d[i]['homicides']
    }
    x_mean /= d.length;
    y_mean /= d.length;

    var xr = 0;
    var yr = 0;
    for (i = 0; i < d.length; i++) {
        xr = d[i]['gunsper100'] - x_mean;
        yr = d[i]['homicides'] - y_mean;
        term1 += xr * yr;
        term2 += xr * xr;

    }
    var b1 = term1 / term2;
    var b0 = y_mean - (b1 * x_mean);
    // perform regression 

    yhat = [];
    // fit line using coeffs
    for (i = 0; i < d.length; i++) {
        yhat.push(b0 + (d[i]['gunsper100'] * b1));
    }

    var data = [];
    for (i = 0; i < d.length; i++) {
        data.push({
            "yhat": yhat[i],
            "gunsper100": d[i]['gunsper100'],
            "homicides": d[i]['homicides'],
            "country": d[i]['country']
         
        })
    }
    return (data);
}


})

