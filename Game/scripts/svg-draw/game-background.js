(function () {
	var paper,
        width = window.innerWidth,
		height = window.innerHeight,
		svg = document.getElementsByTagName('svg')[2];

    try{
        paper = Raphael(0, 0, width, height);
    }
    catch(ex){
        alert('Your browser does not support Raphael. Please upgrade.');
    }

	svg.setAttribute('id', 'game-background');

	paper.rect(width - 300, height - 20, 270, 20).attr({
		stroke: '#FFFFFF',
		fill: '#FFFFFF'
	});

	paper.rect(width - 270, height - 45, 210, 25).attr({
		stroke: '#FFFFFF',
		fill: '#FFFFFF'
	});

	paper.path('M ' + (width - 260) + ' ' + (height - 45) + ' l 0 -10 l 25 0 l 0 11 l 57 0 l 0 -11 l 25 0 l 0 11 l 57 0 l 0 -11 l 25 0 l 0 11').attr({
		stroke: '#FFFFFF',
		'stroke-width': 3,
	});

	paper.rect(width - 255, height - 205, 15, 150).attr({
		stroke: '#FFFFFF',
		fill: '#FFFFFF',
	});

	paper.rect(width - 173, height - 255, 15, 200).attr({
		stroke: '#FFFFFF',
		fill: '#FFFFFF'
	});

	paper.rect(width - 91, height - 205, 15, 150).attr({
		stroke: '#FFFFFF',
		fill: '#FFFFFF'
	});

	paper.rect(width - 254, height - 175, 175, 15).attr({
		stroke: '#FFFFFF',
		fill: '#FFFFFF'
	});

	paper.rect(width - 254, height - 190, 175, 2).attr({
		stroke: '#FFFFFF',
		fill: '#FFFFFF'
	});

	paper.rect(width - 171, height - 335, 10, 80).attr({
		stroke: '#FFFFFF',
		'stroke-width': 2,
		fill: 'none'
	});

	paper.ellipse(width - 166, height - 340, 11, 7).attr({
		stroke: '#FFFFFF',
		fill: '#FFFFFF'
	});

	paper.circle(width - 166, height - 352, 6).attr({
		stroke: '#FFFFFF',
		'stroke-width': 2,
		fill: 'none'
	});

	paper.rect(width - 168, height - 378, 4, 20, 2, 0, 0, 0).attr({
		stroke: '#FFFFFF',
		'stroke-width': 2,
		fill: 'none'
	});

	paper.path('M ' + (width - 172) + ' ' + (height - 250) + ' Q ' + (width - 245) + ' ' + (height - 162) + ' ' + (width - 300) + ' ' + (height - 245)).attr({
		stroke: '#FFFFFF',
		'stroke-width': 3,
		'stroke-linecap': 'round'
	});

	paper.path('M ' + (width - 159) + ' ' + (height - 250) + ' Q ' + (width - 86) + ' ' + (height - 162) + ' ' + (width - 31) + ' ' + (height - 248)).attr({
		stroke: '#FFFFFF',
		'stroke-width': 3,
		'stroke-linecap': 'round'
	});

	paper.path('M ' + (width - 172) + ' ' + (height - 280) + ' Q ' + (width - 240) + ' ' + (height - 175) + ' ' + (width - 315) + ' ' + (height - 260)).attr({
		stroke: '#FFFFFF',
		'stroke-width': 3,
		'stroke-linecap': 'round'
	});

	paper.path('M ' + (width - 160) + ' ' + (height - 280) + ' Q ' + (width - 92) + ' ' + (height - 175) + ' ' + (width - 16) + ' ' + (height - 265)).attr({
		stroke: '#FFFFFF',
		'stroke-width': 3,
		'stroke-linecap': 'round'
	});

	paper.path('M ' + (width - 173) + ' ' + (height - 325) + ' Q ' + (width - 250) + ' ' + (height - 220) + ' ' + (width - 340) + ' ' + (height - 274)).attr({
		stroke: '#FFFFFF',
		'stroke-width': 7,
		'stroke-linecap': 'round'
	});

	paper.path('M ' + (width - 158) + ' ' + (height - 324) + ' Q ' + (width - 96) + ' ' + (height - 220) + ' ' + (width - 6) + ' ' + (height - 274)).attr({
		stroke: '#FFFFFF',
		'stroke-width': 7,
		'stroke-linecap': 'round'
	});

	paper.path('M ' + (width - 300) + ' ' + (height - 245) + ' l 10 -10 m 0 18 l 16 -16 m 0 25 l 35 -35 m -20 40 l 88 -88 m -65 87 l 65 -65').attr({
		stroke: '#FFFFFF',
		'stroke-width': 2
	});

	paper.path('M ' + (width - 35) + ' ' + (height - 247) + ' l -10 -10 m 0 18 l -16 -16 m 0 25 l -35 -35 m 15 40 l -79 -82 m 60 79 l -60 -60').attr({
		stroke: '#FFFFFF',
		'stroke-width': 2
	});

	paper.circle(width - 265, height - 199, 10).attr({
		stroke: '#FFFFFF',
		'stroke-width': 3
	});

	paper.circle(width - 276, height - 210, 5).attr({
		stroke: '#FFFFFF',
		'stroke-width': 3
	});

	paper.circle(width - 66, height - 199, 10).attr({
		stroke: '#FFFFFF',
		'stroke-width': 3
	});

	paper.circle(width - 56, height - 210, 5).attr({
		stroke: '#FFFFFF',
		'stroke-width': 3
	});

	paper.path('M ' + (width - 254) + ' ' + (height - 192) + ' Q ' + (width - 270) + ' ' + (height - 175) + ' ' + (width - 300) + ' ' + (height - 195)).attr({
		stroke: '#FFFFFF',
		'stroke-width': 6,
		'stroke-linecap': 'round'
	});

	paper.path('M ' + (width - 254) + ' ' + (height - 175) + ' Q ' + (width - 275) + ' ' + (height - 160) + ' ' + (width - 300) + ' ' + (height - 195)).attr({
		stroke: '#FFFFFF',
		'stroke-width': 5,
		'stroke-linecap': 'round'
	});

	paper.path('M ' + (width - 81) + ' ' + (height - 195) + ' Q ' + (width - 70) + ' ' + (height - 175) + ' ' + (width - 35) + ' ' + (height - 194)).attr({
		stroke: '#FFFFFF',
		'stroke-width': 6,
		'stroke-linecap': 'round'
	});

	paper.path('M ' + (width - 81) + ' ' + (height - 176) + ' Q ' + (width - 65) + ' ' + (height - 159) + ' ' + (width - 35) + ' ' + (height - 194)).attr({
		stroke: '#FFFFFF',
		'stroke-width': 6,
		'stroke-linecap': 'round'
	});

	var patternPath = '';

	for (var i = 0; i < 15; i += 1) {
		patternPath += ' l 45 0 l 0 -20 l -5 0 l 0 10 l -10 0 l 0 -20 l 50 0 l 0 20 l -10 0 l 0 -10 l -5 0 l 0 20 ';
	}

	patternPath += ' l 75 0 l -30 0';

	for (var i = 0; i < 16; i += 1) {
		patternPath += ' l -45 0 l 0 20 l 5 0 l 0 -10 l 10 0 l 0 20 l -50 0 l 0 -20 l 10 0 l 0 10 l 5 0 l 0 -20 ';
	}

	paper.path('M 0 ' + (height - 40) + ' l 25 0 l 0 -20 l -5 0 l 0 10 l -10 0 l 0 -20 l 50 0 l 0 20 l -10 0 l 0 -10 l -5 0 l 0 20 ' + patternPath).attr({
		stroke: '#FFFFFF',
		'stroke-width': 2
	});

	var patterPathVerticalLines = '';

	for (var i = 0; i < 15; i += 1) {
		patterPathVerticalLines += ' m 65 -60 l 0 60 ';
	}

	paper.path('M 35 ' + (height - 70) + ' l 0 60' + patterPathVerticalLines).attr({
		stroke: '#FFFFFF',
		'stroke-width': 2
	});

}());
