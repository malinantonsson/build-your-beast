var svgData;

var outerWrapper = document.querySelector('.byb-outside-wrapper');
var introWrapper = document.querySelector('.intro-lightning');
var introClass = 'is-intro';
var hideIntroClass = 'intro-end';
var introIsFinished = false;

setTimeout(function() {
	if(!introIsFinished) {
		introIsFinished = true;
	} 
}, 3000);

var finishIntro = function() {
	introWrapper.classList.add(hideIntroClass);
	setTimeout(function() {
		outerWrapper.classList.remove(introClass);
	}, 1000);
};

var request = new XMLHttpRequest();


request.open('GET', '/data/beast-data.json', true);
//setTimeout(function() {
	request.send();
//}, 2000);
request.onload = function() {
  if (this.status >= 200 && this.status < 400) {
    // Success!
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

  } else {
  	console.log(this.status);
  	//TODO: add error messages
  	console.log('returned error');
    // We reached our target server, but it returned an error

  }
};

request.onerror = function() {
	//TODO: add error message
	console.log('connection error');
  // There was a connection error of some sort
};



var sliders = $('body').find('.slider');

sliders.each(function(index, parent) {
	//get the parentId (crown, eyes, nose, mouth);
	var slideId = $(parent).attr('id');
	var links = $(parent).find('.tab-content-icon-link');

	var nextSlide = $(this).closest('c-tabs-nav__link');

	//loop through the links, get the ids and assign event-listners
	links.each(function(i, link) {
		//get id of clicked svg
		var svgId = $(link).attr('id');
		
		$(link).on('click', function(evt){
			evt.preventDefault(); //TODO use vanilla js
			deactivateTabs.activate();

			var index = svgId.replace(/.*?(?=[1-9]|$)/gi, '');
			beast[slideId].id = index;

			var svgAdd = svgData[slideId][index];
        	$('.byb-canvas-' + slideId).html(svgAdd);
		});
	});
});
