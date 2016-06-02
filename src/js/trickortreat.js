(function() {
	//ex url: http://www.buildyourbeast.co.uk/?/trickortreat/h=pink&c=2&e=3&n=4&m=5
	var svgData;
	var colourClass = 'active-colour-';

	var sections = [
		{
			name: 'colour',
			short: 'h',
			el: 'trick-or-treat'
		},
		{
			name: 'crown',
			short: 'c',
			el: 'byb-canvas-crown'
		},
		{
			name: 'eyes',
			short: 'e',
			el: 'byb-canvas-eyes'
		},
		{
			name: 'nose',
			short: 'n',
			el: 'byb-canvas-nose'
		},
		{
			name: 'mouth',
			short: 'm',
			el: 'byb-canvas-mouth'
		}
	];

	var getParameterByName = function(name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
	        results = regex.exec(location.search);
	    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
	}

	var handleData = function(data) {
		//get and store ids from url
		sections.map(function(section) {
			if(section.name === 'colour') {
				var el = document.getElementById(section.el);
				el.className = colourClass + section.id;
			} else {
				var el = document.getElementsByClassName(section.el)[0];
				el.innerHTML = data[section.name][section.id];
			}
		});
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
		sections.map(function(section) {
			section.id = getParameterByName(section.short);
			console.log(section);
		});
	};


	init();
})();

(function(){
	 /*var body = document.getElementsByTagName('body')[0];
	 var saveBtn = document.getElementsByClassName('btn-save');
	var elements = [];*/

    //get canvas
    /*var canvas = document.getElementById('canvas');
    var monsterCanvas = canvas.getContext('2d');
    
    var faceColor;
    var DOMURL = window.URL || window.webkitURL || window;


    var drawShape = function(shape) {
        var img = new Image();
        var svg = new Blob([shape.data], {type: 'image/svg+xml;charset=utf-8'});
        var url = DOMURL.createObjectURL(svg);
        img.onload = function () {
          monsterCanvas.drawImage(img, shape.x, shape.y);
          DOMURL.revokeObjectURL(url);
        };

        img.src = url;
    };
    
    var drawFace = function() {
        monsterCanvas.clearRect(0, 0, canvas.width, canvas.height);
        monsterCanvas.fillStyle = "#000";
        monsterCanvas.fillRect(0,0,canvas.width, canvas.height);
        monsterCanvas.fill();

        if(color === '#0a5840') {
            body.className = 'theme--green';
        } else if(color === '#a53623') {
            body.className = 'theme--orange';
        } else {
            body.className = '';
        }

        // faceColor;
        if (color) {
            faceColor = color;
        } else {
            faceColor = '#EE6272';
        }
        

        var svgFace = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 479.5 608" enable-background="new 0 0 479.5 608" xml:space="preserve"><g id="background"><rect x="-270" y="-51" display="inline" width="100%" height="100%"/></g><g id="face_colour_1"><path fill="' + faceColor + '" d="M393,456.4c0,84.3-68.3,152.6-152.6,152.6h-0.7C155.3,609,87,540.7,87,456.4V232.6C87,148.3,155.3,80,239.6,80h0.7C324.7,80,393,148.3,393,232.6V456.4z"/></g></svg>';

        var shape = { data: svgFace, x: 0, y:0 };
        drawShape(shape);
    };
  

	var color = '#' + getParameterByName("h");
	drawFace(color);
	var c =  'crown_' + getParameterByName("c");
	var e = 'eyes_' + getParameterByName("e");
	var n = 'nose_' + getParameterByName("n");
	var m = 'mouth_' + getParameterByName("m");

	var checkElements = function(shape, arr) {
       var data, x, y;
       
        var selectedShape = shape;
        var element = arr;

        elements[element].forEach(function(item){
            //get new element data
            if(selectedShape === item.id) {
                data = item.svg;
                x = item.x;
                y = item.y;
            }
        });

        var item = {};
        item.name = element;
        item.data = data;
        item.x = x;
        item.y = y;

        drawShape(item); 
    };
    window.setTimeout(function() {
		checkElements(m, 'mouths');
		checkElements(c, 'crowns');
		checkElements(e, 'eyes');
		checkElements(n, 'noses');
		
		window.setTimeout(function() {
			getImgData();
		}, 500);
	}, 500);

	 var getImgData = function() {
        var rawImageData = canvas.toDataURL();
        var imgData = rawImageData.replace("image/png", "image/octet-stream");
        saveBtn.href = imgData;
    }*/
    
})();