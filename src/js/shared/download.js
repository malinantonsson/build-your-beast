var downloadButton = document.getElementById('print');

var canvasWrapper = document.getElementsByClassName('byb-canvas')[0];
var canvas, beastCanvas;
var DOMURL = window.URL || window.webkitURL || window;

var beast = {
    colour: {
        id: 'pink',
        x: 0,
        y: 0,
		short: 'h',
		el: 'trick-or-treat'
    },
    crown: {
        id: '',
        x: 0,
        y: 0,
		short: 'c',
		el: 'byb-canvas-crown'
    },
    eyes: {
        id: '',
        x: 87,
        y: 210,
		short: 'e',
		el: 'byb-canvas-eyes'
    },
    nose: {
        id: '',
        x: 87,
        y: 320,
		short: 'n',
		el: 'byb-canvas-nose'
    },
    mouth: {
        id: '',
        x: 87,
        y: 430,
		short: 'm',
		el: 'byb-canvas-mouth'
    }
};

var addItem = function(shape, index) {
    var img = new Image();
    var svg = new Blob([shape.data], {type: 'image/svg+xml'});
    var url = DOMURL.createObjectURL(svg);
    img.onload = function () {
      beastCanvas.drawImage(img, shape.x, shape.y);
      DOMURL.revokeObjectURL(url);
    };

    img.src = url;
};

var addBeastColour = function(colour) {
    switch(colour) {
        case 'pink': 
            hex = '#ed6171';
            break;
        case 'green': 
            hex = '#02583f';
            break;
        case 'red': 
            hex = '#a7361d';
            break;
    }
    return '<svg xmlns="http://www.w3.org/2000/svg" width="480" height="608" x="0px" y="0px" viewBox="0 0 479.5 608" enable-background="new 0 0 479.5 608" xml:space="preserve"><g id="background"><rect x="-270" y="-51" display="inline" width="100%" height="100%"/></g><g id="face_colour_1"><path fill="' + hex + '" d="M393,456.4c0,84.3-68.3,152.6-152.6,152.6h-0.7C155.3,609,87,540.7,87,456.4V232.6C87,148.3,155.3,80,239.6,80h0.7C324.7,80,393,148.3,393,232.6V456.4z"/></g></svg>';
};

var downloadImageLink = function(imgData) {
    return imgData.replace("image/png", "image/octet-stream");
};

var getImgData = function() {
    var rawImageData = canvas.toDataURL();
    return downloadImageLink(rawImageData);
};

var addSelectedItems = function() {

    for (var part in beast) {
        var item;
        var value = beast[part].id;
        
        if(part === 'colour') {
            item = addBeastColour(beast.colour.id);
        } else {
            item = svgData[part][value];
        }
        
        var shape = { data: item, x: beast[part].x, y:beast[part].y };
        console.log(shape);
        addItem(shape); 
    }
};


var createCanvas = function() {
    canvas = document.createElement('canvas');
    canvas.id = "byb-canvas__canvas";
    canvas.width  = 480;
    canvas.height = 608;

    beastCanvas = canvas.getContext('2d');
    
    beastCanvas.clearRect(0, 0, canvas.width, canvas.height);
    beastCanvas.fillStyle = "#000";
    beastCanvas.fillRect(0,0,canvas.width, canvas.height);
    beastCanvas.fill();

    canvasWrapper.appendChild(canvas);
};

var clearCanvas = function() {
    console.log('clear');
    beastCanvas.clearRect(0, 0, canvas.width, canvas.height);
    beastCanvas.fillStyle = "#000";
    beastCanvas.fillRect(0,0,canvas.width, canvas.height);
    beastCanvas.fill();
};

var initDownload = function() {
    downloadButton.addEventListener('click', function(e) {
        var href = getImgData();
        downloadButton.href = href;
        return false;
    });

};

if((window.Modernizr) && (window.Modernizr.canvas)) {
    if ( downloadButton ) {
        initDownload();
        createCanvas();
    }
} else {
    console.log('hide canvas');
}