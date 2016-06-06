var svgData;
	//ex url: http://localhost:3000/trickortreat.html?h=green&c=2&e=3&n=4&m=6

	var colourClass = 'active-colour-';
	//var downloadButton = document.getElementById('print');
	//var canvasWrapper = document.getElementsByClassName('byb-canvas')[0];
	//var downloadButton = document.getElementById('print');
	//var DOMURL = window.URL || window.webkitURL || window;


	/*var beast = {
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
	}*/

	/*var initShare = function() {
		//TODO: add validation to check all items have been selected
		//var url = createUrl();
	    addSelectedItems();
	};*/

	/*var addItem = function(shape, index) {
	    var img = new Image();
	    var svg = new Blob([shape.data], {type: 'image/svg+xml'});
	    var url = DOMURL.createObjectURL(svg);
	    img.onload = function () {
	      beastCanvas.drawImage(img, shape.x, shape.y);
	      DOMURL.revokeObjectURL(url);
	    };

	    img.src = url;
	}*/

	/*var addBeastColour = function(colour) {
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
	}*/

	/*var downloadImageLink = function(imgData) {
	    return imgData.replace("image/png", "image/octet-stream");
	}*/

	/*var getImgData = function() {
	    var rawImageData = canvas.toDataURL();
	    return downloadImageLink(rawImageData);
	}*/
/*
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
	        addItem(shape); 
	    }
	};*/

/*	var createCanvas = function() {
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
	};*/

	/*var initDownload = function() {
	    downloadButton.addEventListener('click', function(e) {
	        var href = getImgData();
	        downloadButton.href = href;
	        return false;
	    });

	};*/

	




	var getParameterByName = function(name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	var handleData = function(data) {
		//add sections to the dom
		for (var item in beast) {
			var itemData = beast[item];
			if(item === 'colour') {
				console.log(itemData);
				var el = document.getElementById(itemData.el);
				el.className = colourClass + itemData.id;
			} else {
				var el = document.getElementsByClassName(itemData.el)[0];
				el.innerHTML = data[item][itemData.id];
			}
		};
		/*beast.map(function(section) {
			if(section.name === 'colour') {
				var el = document.getElementById(section.el);
				el.className = colourClass + section.id;
			} else {
				var el = document.getElementsByClassName(section.el)[0];
				el.innerHTML = data[section.name][section.id];
			}
		})*/;

		//initShare();
		console.log(svgData);
 		addSelectedItems();

	};

	var getData = function(callback) {
		var request = new XMLHttpRequest();
		request.open('GET', './data/beast-data.json', true);
		request.onload = function() {
		  if (this.status >= 200 && this.status < 400) {
		    svgData = JSON.parse(this.response);
		  	callback(svgData);
		  } else {
		  	//TODO: add error messages
		  	console.log('returned error');
		  }
		};

		request.onerror = function() {
			//TODO: add error message
			console.log('connection error');
		  // There was a connection error of some sort
		};

		request.send();
	};

	var init = function() {
		getData(handleData);

		//get and store ids from url
		for (var item in beast) {
			beast[item].id = getParameterByName(beast[item].short);
		}
		/*beast.map(function(section) {
			section.id = getParameterByName(section.short);
		});*/

		/*if((window.Modernizr) && (window.Modernizr.canvas)) {
		    if ( downloadButton ) {
		        initDownload();
		        createCanvas();
		    }
		} else {
		    console.log('hide canvas');
		}*/
	};


	init();
