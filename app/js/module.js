const menuBtn = document.querySelector('.hamburger-menu-link'),
	hamMenu = document.getElementById('hamburger-menu'),
	hamList = document.getElementById('nav__list_hamburger'),
	// hamList = document.querySelector('.hamburger-menu'),
	body = document.querySelector('body');
hamListItems = document.querySelectorAll('.nav_hamburger .nav__item');
// console.log(hamListItems);

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
async function toggleMenu() {
	menuBtn.classList.toggle('is-active');
	body.classList.toggle('is-locked');
	hamMenu.classList.toggle('is-active');

	for (var i = 0; i < hamListItems.length; ++i) {
		hamListItems[i].classList.toggle('is-active');
		await sleep(100);
	};
};

menuBtn.addEventListener('click', function (e) {
	e.preventDefault();
	toggleMenu();
});
hamList.addEventListener('click', function (e) {
	let el = e.target;
	if (el.tagName == 'A') {
		toggleMenu();
	};
});

document.addEventListener("keydown", function (e) {
	if (e.keyCode == 27 && hamMenu.classList.contains('is-active')) {
		toggleMenu();
	}
});