var sliders = $('body').find('.slider');

sliders.each(function(index, parent) {
	//get the parentId (crown, eyes, nose, mouth);
	var slideId = $(parent).attr('id');
	var links = $(parent).find('.tab-content-icon-link');

	//loop through the links, get the ids and assign event-listners
	links.each(function(i, link) {
		//get id of clicked svg
		var svgId = $(link).attr('id');
		
		$(link).on('click', function(){
        	$('.byb-canvas-' + slideId).html(svgId);
		});
	});
});
