function draw(domain, data)
{	
	var colours = ["DeepPink", "Gold", "BlueViolet", "Chartreuse", "DarkOrange"]

	var sunX = 400
	var sunY = 400

	var	radiansSun = ( 2 * Math.PI ) / 10
	var rSun = 300

	var	radiansPlanet
	var rPlanet  = 80

	var radPlanet = 0
	var radSun = 0
	
	var	scale = d3
		.scale
			.linear()
			.domain(domain)
			.range([0, rPlanet])
	
	var svg = d3
		.selectAll("#starPlot")
		.append("svg")

	var star = svg
		.attr("class", "chart")
		.attr("width", window.innerWidth)
		.attr("height", window.innerWidth)
		
		.append("g")

	svg
		.append('image')
	    .attr('xlink:href', 'https://image.flaticon.com/icons/png/512/169/169367.png')
	    .attr('width', 50)
	    .attr('height', 50)
	    .attr('x',sunX -25)
	    .attr('y',sunY -25)

	var path = d3.svg.line.radial()

	var planets = []
	
	for (var i = 0; i < 10; i++) {

		var planetX = sunX + rSun * Math.cos( radSun )
		var planetY = sunY + rSun * Math.sin( radSun )

		radPlanet = 0
		
		data[i].forEach(function(d, i) {
			
			var x = rPlanet * Math.cos( radPlanet )
			var y = rPlanet * Math.sin( radPlanet )
			
			star.append("line")
				.attr("class", "axis")
				.attr("x1", planetX)
				.attr("y1", planetY)
				.attr("x2", planetX + x)
				.attr("y2", planetY + y)
			
			radiansPlanet = ( 2 * Math.PI ) / data[i].length
			radPlanet += radiansPlanet
		})

		var pathData = []

		radPlanet = Math.PI / 2

		data[i].forEach(function(d) {
			pathData
				.push([
					scale(d),
					radPlanet
				])
			
			radPlanet += radiansPlanet
		})

		planets.push(
			star
				.append("path")
				.attr("class", "path")
				.attr("transform", "translate(" + planetX + "," + planetY + ")")
				.attr("d", path(pathData) + "Z")
				
				.on("click", function()
				{ 
					planets.forEach(function (p) {
						p
							.transition()
								.style("fill-opacity", "0")
							    .duration(500)
						    .transition()
						    	.style("fill", "transparent")
					})
					
					d3
						.select(this)
						.transition()
							.style("fill", colours[Math.floor(Math.random()*colours.length)])
							.duration(500)
						.transition()
							.style("fill-opacity","0.6")
							.duration(500)
				})
		)

		radSun += radiansSun
	}
}
