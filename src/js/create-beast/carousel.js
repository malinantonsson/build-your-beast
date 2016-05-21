var initCarousel = function(carousel) {
    $(carousel).bxSlider({
        slideWidth: 205,
        minSlides: 2,
        maxSlides: 6,
        slideMargin: 0,
        moveSlides: 5,
        adaptiveHeight: true,
        pager: false,
        nextText: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>',
        prevText: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg>'
    });
};