(function () {
        var paper = Raphael(210, 90, 600, 80),
                svg = document.getElementsByTagName('svg')[1];
                
        svg.setAttribute('id', 'samurai-sword');
        svg.style.zIndex = '1';

        paper.rect(30, 30, 80, 20, 1, 1, 1, 1).attr({
                stroke: '#FFFFFF',
                'stroke-width': 2,
                fill: 'none'
        });

        paper.path('M 42 30 l -2 10 l 2 8.9 l 2 -8.9 l -2 -10 ' +
                'm 10 0 l -2 10 l 2 8.9 l 2 -8.9 l -2 -10 ' +
                'm 10 0 l -2 10 l 2 8.9 l 2 -8.9 l -2 -10 ' +
                'm 10 0 l -2 10 l 2 8.9 l 2 -8.9 l -2 -10 ' +
                'm 10 0 l -2 10 l 2 8.9 l 2 -8.9 l -2 -10 ' +
                'm 10 0 l -2 10 l 2 8.9 l 2 -8.9 l -2 -10 ' +
                'm 10 0 l -2 10 l 2 8.9 l 2 -8.9 l -2 -10').attr({
                        stroke: '#FFFFFF',
                        'stroke-width': 2,
                        fill: '#FFFFFF'
                });

        paper.rect(110, 15, 10, 50, 1, 1, 1, 1).attr({
                stroke: '#FFFFFF',
                'stroke-width': 2,
                fill: '#FFFFFF'
        });

        paper.path('M 120 50 l 430 0 l 20 -20 l -450 0').attr({
                stroke: '#FFFFFF',
                'stroke-width': 2,
                'stroke-linejoin': 'round',
                fill: 'none'
        });
} ());