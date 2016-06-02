var twitterButton = document.getElementById('twitter');
var facebookButton = document.getElementById('facebook');

var face = {
	'colour': 'pink', //pink is default
	'crown': '',
	'eyes': '',
	'nose': '',
	'mouth': ''
};

var initShare = function() {
	//TODO: add validation to check all items have been selected
	var url = createUrl();
    console.log(url);
};

if ( twitterButton ) {
    twitterButton.addEventListener('click', function(e) {
        e.preventDefault();
         //TWITTER 
        var text = 'Trick or Treat';
        var twitterurl = 'https://twitter.com/intent/tweet?text='+text+'&hashtags=buildyourbeast'+'&url=';
        var url = 'https://www.buildyourbeast.com/' + createUrl();

        window.open(twitterurl + url, 'twWindow', 'status = 1, height = 380, width = 500, resizable = 0' );
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
    var url = 'http://www.buildyourbeast.co.uk?/trickortreat/h=' + face.colour + '&c=' + face.crown + '&e=' + face.eyes + '&n=' + face.nose + '&m=' + face.mouth;
    console.log(url);
    return encodeURIComponent(url);
};