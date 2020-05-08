let pattern = [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0],
       [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
       [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
       [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
       [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
       [0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0],
       [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
       [0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
       [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 0, 0],
       [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
       [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
       [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
       [1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]

function rowHintData(pattern) {
	let hint = new Array();
	for (var row = 0; row < pattern.length; row++) {
		let h = new Array();
		let count = 0;
		for (var col = 0; col < pattern[0].length; col++) {
			if (pattern[row][col] == 1) {
				count += 1;
			} else if (count != 0) {
				h.push(count);
				count = 0;
			}
		}
		if (count != 0) {
			h.push(count);
		}
		hint.push(h.join(' '));
	}
	return hint;
}

function colHintData(pattern) {
	let hint = new Array();
	for (var col = 0; col < pattern[0].length; col++) {
		let h = new Array();
		let count = 0;
		for (var row = 0; row < pattern.length; row++) {
			if (pattern[row][col] == 1) {
				count += 1;
			} else if (count != 0) {
				h.push(count);
				count = 0;
			}
		}
		if (count != 0) {
			h.push(count);
		}
		hint.push(h.join(' '));
	}
	return hint;
}

console.log(rowHintData(pattern), colHintData(pattern));

let rowLabelLength = 60;
let colLabelLength = 60;
let cellSize = 30;

function gridData() {
	var data = new Array();
	var xpos = 1; //starting xpos and ypos at 1 so the stroke will show when we make the grid below
	var ypos = 1;
	var width = cellSize;
	var height = cellSize;
	var confirmed = false;
	var cancelled = false;
	
	// iterate for rows	
	for (var row = 0; row < pattern.length; row++) {
		data.push( new Array() );
		
		// iterate for cells/columns inside rows
		for (var column = 0; column < pattern[0].length; column++) {
			data[row].push({
				x: xpos,
				y: ypos,
				width: width,
				height: height,
				confirmed: confirmed,
				cancelled: cancelled
			})
			// increment the x position. I.e. move it over by 50 (width variable)
			xpos += width;
		}
		// reset the x position after a row is complete
		xpos = 1;
		// increment the y position for the next row. Move it down 50 (height variable)
		ypos += height;	
	}
	return data;
}


function validate(gridData) {
	let pixel = gridData.map(row => row.map(cell => cell.confirmed ? 1 : 0));
	console.log(pixel);
	console.log(pattern);
	if (JSON.stringify(pixel) === JSON.stringify(pattern)) {
		alert("Completed");
	}
}

var gridData = gridData();	


var grid = d3.select("#grid")
	.append("svg")
	.attr("width","1510px")
	.attr("height","1510px");
	
var row = grid.selectAll(".row")
	.data(gridData)
	.enter().append("g")
	.attr("class", "row");
	
var column = row.selectAll(".square")
	.data(function(d) { return d; })
	.enter().append("rect")
	.attr("class","square")
	.attr("x", function(d) { return rowLabelLength + d.x; })
	.attr("y", function(d) { return colLabelLength + d.y; })
	.attr("width", function(d) { return d.width; })
	.attr("height", function(d) { return d.height; })
	.style("fill", "#fff")
	.style("stroke", "#222")
	.on('click', function(d) {
		d.confirmed = !d.confirmed;
		d3.select(this).style("fill", d.confirmed ? "#000" : "#fff");
		validate(gridData);
    })
    .on('dblclick', function(d) {
    	d.cancelled = !d.cancelled;
    	d.confirmed = false;
    	d3.select(this).style("fill", d.cancelled ? "#ff0000" : "#fff");  
    });

var rowLabels = grid.selectAll(".rowLabels")
	.data(rowHintData(pattern))
	.enter().append("text")
	.attr("class","rowLabels")
	.attr("x", function(d) { return 50 })
    .attr("y", function(d, i) { return colLabelLength + i * cellSize + cellSize/2 })
    .attr("text-anchor","end")
    .attr("dy",".35em")
    .text(function(d) { return d });

var colLabels = grid.selectAll(".colLabels")
	.data(colHintData(pattern))
	.enter().append("text")
	.attr("class","colLabels")
	.attr("x", function(d, i) { return rowLabelLength + i * cellSize + cellSize/2 })
    .attr("y", function(d, i) { return 50 })
    .attr("text-anchor","end")
    .attr("dy",".35em")
    .attr("transform", function(d,i){
  return "rotate(90 " + (rowLabelLength + i * cellSize + cellSize/2) +" 50)";
})
    .text(function(d) { return d });
