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
    var url = 'http://www.buildyourbeast.co.uk/trickortreat/?h=' + beast.colour.id + '&c=' + beast.crown.id + '&e=' + beast.eyes.id + '&n=' + beast.nose.id + '&m=' + beast.mouth.id;
    return encodeURIComponent(url);
};