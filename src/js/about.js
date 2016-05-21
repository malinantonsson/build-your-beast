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