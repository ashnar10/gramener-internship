function draw_trendline(element, data, options) {
  var INTERPOLATION_STRATEGY = d3.curveMonotoneX;
  var width = 960, height = 500; 

  var svg = d3.select(element),
    margin = {top: 20, right: 20, bottom: 30, left: 50};

  svg.selectAll('*').remove()

  svg.attr("preserveAspectRatio", "xMidYMid meet")
    .attr("viewBox", "0 0 " + width + " " + height)
    .attr({width: width, height: height});
    
  width = +width - margin.left - margin.right;
  height = +height - margin.top - margin.bottom;
  svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
  var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  var focus = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
   
  var parseTime = d3.timeParse("%d-%b-%y"),
    formatDate = d3.timeFormat("%d-%b"),
    bisectDate = d3.bisector(function(d) { return d.date; }).left;
    
  var x = d3.scaleTime()
    .rangeRound([0, width])
    
    .domain(d3.extent(data, function(d) { return d[options.x]; }));
    svg.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x));
    
  var y = d3.scaleLinear()
    .rangeRound([height, 0])
    y.domain(d3.extent(data, function(d) { return d[options.y]; }));
    svg.append("g")
    .call(d3.axisLeft(y))

  var line = d3.line()
    .x(function(d) { return x(d[options.x]); })
    .y(function(d) { return y(d[options.y]); })
    .curve(INTERPOLATION_STRATEGY);

  var area = d3.area()
    .x(function(d) { return x(d[options.x]); })
    .y0(height)
    .y1(function(d) { return y(d[options.y]); })
    .curve(INTERPOLATION_STRATEGY);

  svg.append("linearGradient")
    .attr("id", "temperature-gradient")
    .attr("x1", "0").attr("y1", "0")
    .attr("x2", "0").attr("y2", "1")
  .selectAll("stop")
    .data([
      {offset: "0%", color: "steelblue"},
      {offset: "100%", color: "rgba(255, 255, 255, 0)"}
    ])
    .enter().append("stop")
      .attr("offset", function(d) { return d.offset; })
      .attr("stop-color", function(d) { return d.color; });
  
  g.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);
 
  g.append("path")
      .datum(data)
      .attr("class", "area")
      .attr("d", area)

    //append the x line
    focus.append("line")
        .attr("class", "x")
        .style("stroke", "blue")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("y1", 0)
        .attr("y2", height);

    // append the y line
    focus.append("line")
        .attr("class", "y")
        .style("stroke", "blue")
        .style("stroke-dasharray", "3,3")
        .style("opacity", 0.5)
        .attr("x1", width)
        .attr("x2", width);

    // append the circle at the intersection
    focus.append("circle")
        .attr("class", "y")
        .style("fill", "none")
        .style("stroke", "blue")
        .attr("r", 4);

    // place the value at the intersection
    focus.append("text")
        .attr("class", "y1")
        .style("stroke", "white")
        .style("stroke-width", "3.5px")
        .style("opacity", 0.8)
        .attr("dx", 8)
        .attr("dy", "-.3em");
    focus.append("text")
        .attr("class", "y2")
        .attr("dx", 8)
        .attr("dy", "-.3em");

    // place the date at the intersection
    // focus.append("text")
    //     .attr("class", "y3")
    //     .style("stroke", "white")
    //     .style("stroke-width", "3.5px")
    //     .style("opacity", 0.8)
    //     .attr("dx", 8)
    //     .attr("dy", "1em");
    // focus.append("text")
    //     .attr("class", "y4")
    //     .attr("dx", 8)
    //     .attr("dy", "1em");

//     // append the rectangle to capture mouse
    svg.append("rect")
        .attr("width", width)
        .attr("height", height)
        .style("fill", "none")
        .style("pointer-events", "all")
        .on("mouseover", function() { focus.style("display", null); })
        .on("mouseout", function() { focus.style("display", "none"); })
        .on("mousemove", mousemove);

    function mousemove() {
      var x0 = x.invert(d3.mouse(this)[0]),
          i = bisectDate(data, x0, 1),
          d0 = data[i - 1],
          d1 = data[i],
          d = x0 - d0.date > d1.date - x0 ? d1 : d0;

      focus.select("circle.y")
          .attr("transform",
                "translate(" + x(d[options.x]) + "," +
                               y(d[options.y]) + ")");

      focus.select("text.y1")
          .attr("transform",
                "translate(" + x(d[options.x]) + "," +
                               y[options.y] + ")")
          .text(d[options.y]);

      focus.select("text.y2")
          .attr("transform",
                "translate(" + x(d[options.x]) + "," +
                               y(d[options.y]) + ")")
          .text(d[options.y]);

      // focus.select("text.y3")
      //     .attr("transform",
      //           "translate(" + x(d[options.x]) + "," +
      //                          y(d[options.y]) + ")")
      //     .text(formatDate([options.x]));

      // focus.select("text.y4")
      //     .attr("transform",
      //           "translate(" + x(d[options.x]) + "," +
      //                          y(d[options.y]) + ")")
      //     .text(formatDate(d.date));

      focus.select(".x")
          .attr("transform",
                "translate(" + x(d[options.x]) + "," +
                               y(d[options.y]) + ")")
                     .attr("y2", height - y(d[options.y]));

      focus.select(".y")
          .attr("transform",
                "translate(" + width * -1 + "," +
                               y(d[options.y]) + ")")
                     .attr("x2", width + width);

     
}

}
      
   