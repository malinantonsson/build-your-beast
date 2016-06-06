var twitterButton = document.getElementById('twitter');
var facebookButton = document.getElementById('facebook');
var downloadButton = document.getElementById('print');

var canvasWrapper = document.getElementsByClassName('byb-canvas')[0];
var canvas, beastCanvas;
var DOMURL = window.URL || window.webkitURL || window;

var beast = {
    colour: {
        id: 'pink',
        x: 0,
        y: 0
    },
    crown: {
        id: '',
        x: 0,
        y: 0
    },
    eyes: {
        id: '',
        x: 87,
        y: 210
    },
    nose: {
        id: '',
        x: 87,
        y: 320
    },
    mouth: {
        id: '',
        x: 87,
        y: 430
    }
}

var initShare = function() {
	//TODO: add validation to check all items have been selected
	var url = createUrl();
    addSelectedItems();
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
}

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
}

var downloadImageLink = function(imgData) {
    return imgData.replace("image/png", "image/octet-stream");
}

var getImgData = function() {
    var rawImageData = canvas.toDataURL();
    return downloadImageLink(rawImageData);
}

var addSelectedItems = function() {

    for (var shape in beast) {
        var item;
        var value = beast[shape].id;
        
        if(shape === 'colour') {
            item = addBeastColour(beast.colour.id);
        } else {
            item = svgData[shape][value];
        }
        
        var shape = { data: item, x: beast[shape].x, y:beast[shape].y };
        addItem(shape, i); 
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

if ( twitterButton ) {
    twitterButton.addEventListener('click', function(e) {
        e.preventDefault();
         //TWITTER 
        var text = 'Trick or Treat';
        var twitterurl = 'https://twitter.com/intent/tweet?text='+text+'&hashtags=buildyourbeast'+'&url=' + createUrl();

        window.open(twitterurl + 'twWindow', 'status = 1, height = 380, width = 500, resizable = 0' );
        return false;
    });
}

if ( facebookButton ) {
    facebookButton.addEventListener('click', function(e) {
        e.preventDefault();
       //FB
        fburl = 'https://www.facebook.com/sharer/sharer.php?u=' + createUrl();

        window.open(fburl, 'fbWindow', 'status = 1, height = 380, width = 500, resizable = 0' );
        return false;
    });
}

var createUrl = function() {
    var url = 'http://www.buildyourbeast.co.uk/trickortreat/?h=' + beast.colour.id + '&c=' + beast.crown.id + '&e=' + beast.eyes.id + '&n=' + beast.nose.id + '&m=' + beast.mouth.id;
    return encodeURIComponent(url);
};