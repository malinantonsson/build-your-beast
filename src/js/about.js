//TODO: add delay for download
var aboutBtn = document.getElementById('about-btn');
var aboutOverlay = document.getElementById('aboutOverlay');
var closeBtn = document.getElementById('close-btn');
var body = document.getElementsByTagName('body');
console.log(body);

var hideClass = 'is-hidden';
var overlayOpenClass = 'overlay-open';



aboutBtn.addEventListener('click', function() {
	console.log('open');
	aboutOverlay.classList.remove(hideClass);
	body[0].classList.add(overlayOpenClass);
});

closeBtn.addEventListener('click', function() {
	console.log('close');
	aboutOverlay.classList.add(hideClass);
	body[0].classList.remove(overlayOpenClass);
});