
  var width = 960;
  var height = 500;
  
  var lowColor = '#f9f9f9'
  var highColor = '#bc2a66'

  var projection = d3.geoAlbersUsa()
  .translate([width / 2, height / 2]) 
  .scale([1000]);

  var path = d3.geoPath() 
  .projection(projection);

  var svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

  d3.csv("statesdata.csv", function(data) {
    var dataArray = [];
    for (var d = 0; d < data.length; d++) {
      dataArray.push(parseFloat(data[d].value))
    }
    var minVal = d3.min(dataArray)
    var maxVal = d3.max(dataArray)
    var ramp = d3.scaleLinear().domain([minVal,maxVal]).range([lowColor,highColor])

    d3.json("us-states.json", function(json) {

      // Loop through each state data value in the .csv file
      for (var i = 0; i < data.length; i++) {
  
        // Grab State Name
        var dataState = data[i].state;
  
        // Grab data value 
        var dataValue = data[i].value;
        for (var j = 0; j < json.features.length; j++) {
          var jsonState = json.features[j].properties.name;
  
          if (dataState == jsonState) {
  
            // Copy the data value into the JSON
            json.features[j].properties.value = dataValue;
  
            // Stop looking through the JSON
            break;
          }
        }
      }

      svg.selectAll("path")
      .data(json.features)
      .enter()
      .append("path")
      .attr("d", path)
      .style("stroke", "#fff")
      .style("stroke-width", "1")
      .style("fill", function(d) { return ramp(d.properties.value) });
    
		// add a legend
		var w = 140, h = 300;

		var key = d3.select("body")
			.append("svg")
			.attr("width", w)
			.attr("height", h)
			.attr("class", "legend");

		var legend = key.append("defs")
			.append("svg:linearGradient")
			.attr("id", "gradient")
			.attr("x1", "100%")
			.attr("y1", "0%")
			.attr("x2", "100%")
			.attr("y2", "100%")
			.attr("spreadMethod", "pad");

		legend.append("stop")
			.attr("offset", "0%")
			.attr("stop-color", highColor)
			.attr("stop-opacity", 1);
			
		legend.append("stop")
			.attr("offset", "100%")
			.attr("stop-color", lowColor)
			.attr("stop-opacity", 1);

		key.append("rect")
			.attr("width", w - 100)
			.attr("height", h)
			.style("fill", "url(#gradient)")
      .attr("transform", "translate(0,10)");
      
      var y = d3.scaleLinear()
			.range([h, 0])
			.domain([minVal, maxVal]);

		var yAxis = d3.axisRight(y);

		key.append("g")
			.attr("class", "y axis")
			.attr("transform", "translate(41,10)")
			.call(yAxis)
    })
})
  