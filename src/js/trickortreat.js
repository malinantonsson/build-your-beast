var svgData;
	//ex url: http://localhost:3000/trickortreat.html?h=green&c=2&e=3&n=4&m=6

	var colourClass = 'active-colour-';
	var errorSection;
	var body = document.getElementsByTagName('body')[0];
	var errorClass = 'has-error';
	var errors = false;

	var outerWrapper = document.querySelector('.byb-outside-wrapper');
	var introWrapper = document.querySelector('.intro-lightning');
	var introClass = 'is-intro';
	var hideIntroClass = 'intro-end';
	var removeIntroClass = 'intro-hidden';
	var introIsFinished = false;

	setTimeout(function() {
		if(!introIsFinished) {
			introIsFinished = true;
		} 
	}, 4500);

	var finishIntro = function() {
		introWrapper.classList.add(hideIntroClass);
		setTimeout(function() {
			outerWrapper.classList.remove(introClass);
			introWrapper.classList.add(removeIntroClass);
		}, 1000);
	};



	var getParameterByName = function(name) {
	    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");

	    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
	    var results = regex.exec(location.search);
	    return results === null ? false : decodeURIComponent(results[1].replace(/\+/g, " "));
	};

	var handleData = function(section, data) {

		if(section === 'colour') {
			body.className = colourClass + data.id;
		} else {
			var el = document.getElementsByClassName(data.el)[0];
			el.innerHTML = svgData[section][data.id];
		}
	};

	var handleError = function() {
		body.className = errorClass;
	};

	var getData = function() {
		var request = new XMLHttpRequest();
		request.open('GET', './data/beast-data.json', true);
		request.onload = function() {
		  if (this.status >= 200 && this.status < 400) {
		    svgData = JSON.parse(this.response);
		    if(introIsFinished) {
			    finishIntro();
			} else {
				var checkIntro = setInterval(function() {
					if(introIsFinished) {
						clearInterval(checkIntro);
						finishIntro();
					}
				}, 500);
			}

		  	//get and store ids from url
			for (var item in beast) {
				var sectionData = beast[item];
				var id = getParameterByName(sectionData.short);
				if(id) {
					sectionData.id = id;
					handleData(item, sectionData);
				} else {
					//URL is missing items
					errors = true;
					handleError();
					break;
				}
			}

			if(!errors) {
				addSelectedItems();
			}


		  } else {
		  	//TODO: add error messages
		  	console.log('returned error');
			handleError();
		  }
		};

		request.onerror = function() {
			//TODO: add error message
			console.log('connection error');
			handleError();
		  // There was a connection error of some sort
		};

		request.send();
	};

	var init = function() {
		getData();		
	};


	init();
