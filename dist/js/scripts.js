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
    if(!beastCanvas) return;

    beastCanvas.clearRect(0, 0, canvas.width, canvas.height);
    beastCanvas.fillStyle = "#000";
    beastCanvas.fillRect(0,0,canvas.width, canvas.height);
    beastCanvas.fill();
};


var closeImageOverlay = function(btn, overlay) {
    btn.addEventListener('click', function(e) {
        overlay.style.display = 'none';
    });
};

var initDownload = function() {
    var imageWrapper = document.querySelector('.download-image-wrapper');
    var downloadImageContent = document.querySelector('.download-image-content');
    var imageToDownload = document.querySelector('.js-download-image__image');

    downloadButton.addEventListener('click', function(e) {
        var href = getImgData();

        if((window.Modernizr) && (window.Modernizr.touch)) {
            e.preventDefault();
            imageToDownload.src = href;

            downloadImageContent.appendChild(imageToDownload);
            imageWrapper.style.display = 'block';

            var closeBtn = document.querySelector('.js-close-image-overlay');
            closeImageOverlay(closeBtn, imageWrapper);

        } else {
            downloadButton.href = href;
        }
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
//TODO: add delay for download
var aboutBtn = document.getElementById('about-btn');
var aboutOverlay = document.getElementById('aboutOverlay');
var closeBtn = document.getElementById('close-btn');
var body = document.getElementsByTagName('body');

var hideClass = 'is-hidden';
var overlayOpenClass = 'overlay-open';

if(aboutBtn) {
	aboutBtn.addEventListener('click', function() {
		aboutOverlay.classList.remove(hideClass);
		body[0].classList.add(overlayOpenClass);
	});
}

if (closeBtn) {
	closeBtn.addEventListener('click', function() {
		aboutOverlay.classList.add(hideClass);
		body[0].classList.remove(overlayOpenClass);
	});
}
var deactivateTabs = {
	settings: {
		currentSlide: 0,
		deactiveClass: 'is-deactivated'
	},
	ui: {},
	init: function() {
		var tabsLinkWrapper = document.querySelector('#tabs');
		this.ui.tabsLinks = tabsLinkWrapper.querySelectorAll('.c-tabs-nav__link');
	},
	setCurrentSlide: function(index) {
		this.settings.currentSlide = index;
	},
	activate: function(index) {
		var nextSlide;
		if (index) {
			nextSlide = this.ui.tabsLinks[index];
		} else {
			var slideIndex = this.settings.currentSlide;
			nextSlide = this.ui.tabsLinks[slideIndex + 1];
		}
		
		if (nextSlide.classList.contains(this.settings.deactiveClass)) {
		    nextSlide.classList.remove(this.settings.deactiveClass);
		} 
	}
};

deactivateTabs.init();
var initCarousel = function(carousel) {
    $(carousel).bxSlider({
        slideWidth: 180,
        minSlides: 2,
        maxSlides: 6,
        slideMargin: 0,
        adaptiveHeight: true,
        pager: false,
        nextText: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>',
        prevText: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>'
    });
};
var colours = $('body').find('.tab-content-colour');

colours.each(function(index, colour) {
	deactivateTabs.activate();	

	var colourId = $(colour).attr('id');
	$(colour).on('click', function(){
		beast.colour.id = colourId;
    	$('body')[0].className = 'active-colour-' + colourId;
	});
});
var svgData;

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
		outerWrapper.style.display = 'block';
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
var beastHasItems = [];

sliders.each(function(parentIndex, parent) {
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

			var index = svgId.replace(/.*?(?=[0-9]|$)/gi, '');
			beast[slideId].id = index;

			// add to beast items list if slideId hasn't already been added
			if(beastHasItems.indexOf(slideId) == -1) {
				beastHasItems.push(slideId);
			}

			// if all parts have been added, activate share tab
			if( beastHasItems.length == 4) {
				deactivateTabs.activate(5);
			}

			var svgAdd = svgData[slideId][index];
        	$('.byb-canvas-' + slideId).html(svgAdd);
		});
	});
});

(function() {

  'use strict';

  var tabs = function(options) {

    var el = document.querySelector(options.el);
    var tabNavigationLinks = el.querySelectorAll(options.tabNavigationLinks);
    var tabContentContainers = el.querySelectorAll(options.tabContentContainers);

    var activeIndex = 0;
    var initCalled = false;
    var carousel;

    var init = function() {
		if (!initCalled) {
		    initCalled = true;
		    el.classList.remove('no-js');

		    for (var i = 0; i < tabNavigationLinks.length; i++) {
		      var link = tabNavigationLinks[i];
		      handleClick(link, i);
		    }
		}
	};

    var handleClick = function(link, index) {
	  	link.addEventListener('click', function(e) {
		    e.preventDefault();
		    goToTab(index);
	  	});
	};

    var goToTab = function(index) {

    	//return if share link has not been activated yet
    	if (tabNavigationLinks[index].classList.contains('is-deactivated')) {
    		return;
		} 

		if (index !== activeIndex && index >= 0 && index <= tabNavigationLinks.length) {
		    tabNavigationLinks[activeIndex].classList.remove('is-active');
		    tabNavigationLinks[index].classList.add('is-active');
		    tabContentContainers[activeIndex].classList.remove('is-active');
		    tabContentContainers[index].classList.add('is-active');
		    activeIndex = index;
			
			//deactivateTabs.setCurrentSlide(index);

			carousel = tabContentContainers[activeIndex].querySelectorAll('.slider');
			
			if( carousel.length > 0 ) {
				initCarousel(carousel);		   
			}

			if( index === 5) {
				initShare();
			} else {
				clearCanvas();
			}
		}
	};

    return {
      init: init,
      goToTab: goToTab
    };

  };

  window.tabs = tabs;

})();
var twitterButton = document.getElementById('twitter');
var facebookButton = document.getElementById('facebook');

var initShare = function() {
	//TODO: add validation to check all items have been selected
	var url = createUrl();
    //starts canvas build
    addSelectedItems();
};

if ( twitterButton ) {
    twitterButton.addEventListener('click', function(e) {
        e.preventDefault();
         //TWITTER 
        var text = 'Trick or Treat';
        var twitterurl = 'https://twitter.com/intent/tweet?text='+text+'&hashtags=buildyourbeast'+'&url=' + createUrl();

        window.open(twitterurl, 'twWindow', 'status = 1, height = 380, width = 500, resizable = 0' );
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
    var baseUrl = window.location.href || 'http://www.buildyourbeast.co.uk/';
    var url = baseUrl + 'trickortreat/?h=' + beast.colour.id + '&c=' + beast.crown.id + '&e=' + beast.eyes.id + '&n=' + beast.nose.id + '&m=' + beast.mouth.id;
    return encodeURIComponent(url);
};