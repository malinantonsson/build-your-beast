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
	activate: function() {
		var slideIndex = this.settings.currentSlide;
		var nextSlide = this.ui.tabsLinks[slideIndex + 1];

		if (nextSlide.classList.contains(this.settings.deactiveClass)) {
		    nextSlide.classList.remove(this.settings.deactiveClass);
		} 
	}
}

deactivateTabs.init();

