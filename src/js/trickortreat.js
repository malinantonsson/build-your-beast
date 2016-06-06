var svgData;
	//ex url: http://localhost:3000/trickortreat.html?h=green&c=2&e=3&n=4&m=6

	var colourClass = 'active-colour-';

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
				var el = document.getElementById(itemData.el);
				el.className = colourClass + itemData.id;
			} else {
				var el = document.getElementsByClassName(itemData.el)[0];
				el.innerHTML = data[item][itemData.id];
			}
		};

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
	};


	init();
