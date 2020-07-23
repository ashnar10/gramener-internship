function draw_barchart(element, data, options) {
    var INTERPOLATION_STRATEGY = d3.curveMonotoneX;
    var width = 960, height = 500;

    var insight = {'car':'https://svgsilh.com/svg/2386838.svg', 'walking':' https://upload.wikimedia.org/wikipedia/commons/8/8a/Man_Walking_Cartoon_Vector.svg',
    'transit': 'https://img.icons8.com/cotton/64/000000/traditional-school-bus--v1.png' }
  
    var svg = d3.select(element),
      margin = {top: 20, right: 20, bottom: 30, left: 50};
  
    svg.selectAll('*').remove()
  
    svg.attr("preserveAspectRatio", "xMidYMid meet")
      .attr("viewBox", "0 0 " + width + " " + height)
      .attr({width: width, height: height})
      

      width = +width - margin.left - margin.right;
      height = +height - margin.top - margin.bottom;
      svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      var g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")")

      var xScale = d3.scaleBand()
      .range([0, width])
      .padding(0.1)
      .domain(data.map(function(d) { return d[options.x]; }));
      g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xScale));

    var yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 120])
    svg.append("g")
    .call(d3.axisLeft(yScale));

    var color = d3.scaleOrdinal()
    .range(d3.schemeDark2)
    .domain(data.map(d => d[options.x]));


  //     svg.append("g")
  //     .attr("class", "x")
  //     .attr("transform", "translate(0," + height + ")")
  //     .call(x)
  //   .selectAll("text")
  //     .style("text-anchor", "end")
  //     .attr("dx", "-.8em")
  //     .attr("dy", "-.55em")
  //     .attr("transform", "rotate(-90)" );

  // svg.append("g")
  //     .attr("class", "y")
  //     .call(d3.axisLeft(yScale))
  //   .append("text")
  //   .attr("y", 6)
  //     .attr("dy", ".71em")
  //     .style("text-anchor", "end")
  //     .text("Mobility");

      svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr('fill', d => color(d[options.x]))
      .attr("x", function(d) { return xScale(d[options.x]) })
      .attr("width", xScale.bandwidth())
      .attr("y", function(d) { return yScale(d[options.y]) })
      .attr("height", function(d) { return height - yScale(d[options.y]) })

      svg.selectAll(".bar")
      .data(data)
      .enter()
      .append('image')
       .attr('xlink:href', "https://upload.wikimedia.org/wikipedia/commons/8/8a/Man_Walking_Cartoon_Vector.svg")
      .attr("x", function(d) { return xScale(d[options.x]) + 45})
      .attr("y", function(d) { return (height - yScale(d[options.y]))+ 10})
      .attr("width", 100)
      .attr("height", "50px")
      .attr("preserveAspectRatio", "none")

      // .enter()
      // .append('image')
      // .attr('xlink:href', "https://svgsilh.com/svg/2386838.svg")  // can also add svg file here
      // .attr("x", function(d) { return xScale(d[options.x]) }
      // .attr("y", function(d) { return height - yScale(d[options.y]); }
      // .attr("width", xScale.bandwidth())
      // .attr("height",  "28px")
      // .attr("preserveAspectRatio", "none")

}