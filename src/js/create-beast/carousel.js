var initCarousel = function(carousel) {
    $(carousel).slick({

        slidesToScroll: 2,
        slidesToShow: 2,
        slide: '.slide',
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 5,
              slidesToScroll: 5
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4
            }
          },
        ],
        nextArrow: '<div class="slick-next"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg></div>',
        prevArrow: '<div class="slick-prev"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"/></svg></div>'
    });
};
