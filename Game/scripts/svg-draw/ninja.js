(function () {
    var paper,
        svg;

    try {
        paper = new Raphael(50, 358, 300, 150);
    }
    catch (ex) {
        alert('Your browser does not support Raphael. Please upgrade.');
    }

    paper.circle(150, 145, 70).attr({
        stroke: '#FFFFFF',
        'stroke-width': 2
    });

    paper.path('M 102 95 l -30 -10 l 15 -15 L 102 94 l -7 -40 l 20 2 L 102 95').attr({
        stroke: '#FFFFFF',
        'stroke-width': 2
    });

    paper.rect(105, 107, 90, 17).attr({
        stroke: '#FFFFFF',
        'stroke-width': 2
    });

    paper.circle(135, 115, 5).attr({
        stroke: '#FFFFFF',
        fill: '#FFFFFF'
    });

    paper.circle(165, 115, 5).attr({
        stroke: '#FFFFFF',
        fill: '#FFFFFF'
    });

    svg = document.getElementsByTagName('svg')[0];
    svg.setAttribute('id', 'ninja');
    svg.style.zIndex = '0';
}());
