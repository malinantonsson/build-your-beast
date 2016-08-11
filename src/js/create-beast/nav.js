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
    	//console.log(index);
		if (index !== activeIndex && index >= 0 && index <= tabNavigationLinks.length) {
		    tabNavigationLinks[activeIndex].classList.remove('is-active');
		    tabNavigationLinks[index].classList.add('is-active');
		    tabContentContainers[activeIndex].classList.remove('is-active');
		    tabContentContainers[index].classList.add('is-active');
		    activeIndex = index;

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