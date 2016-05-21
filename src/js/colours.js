var colours = $('body').find('.tab-content-colour');

colours.each(function(index, colour) {

	var colourId = $(colour).attr('id');
	$(colour).on('click', function(){
		face.colour = colourId;
    	$('body')[0].className = 'active-colour-' + colourId;
	});
});