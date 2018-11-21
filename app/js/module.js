const menuBtn = document.querySelector('.hamburger-menu-link'),
	hamMenu = document.getElementById('hamburger-menu'),
	hamList = document.getElementById('nav__list_hamburger'),
	body = document.querySelector('body');
hamListItems = document.querySelectorAll('.nav_hamburger .nav__item');


function аsleep(ms) {
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


allAccordions = document.querySelectorAll('.accordion');

function findParentAccordion(elt) {
	let i = 0; // защита от зациклавания
	while (!(elt.classList.contains('accordion')) && i < 100) {
		elt = elt.parentNode;
	}
	return elt;
};

for (let iAccord = 0; iAccord < allAccordions.length; iAccord++) {
	accordMenu = allAccordions[iAccord].getElementsByTagName("A");
	for (let iItem = 0; iItem < accordMenu.length; iItem++) {

		accordMenu[iItem].addEventListener('click', function (e) {
			e.preventDefault();
			clickedAccordMenuItems = findParentAccordion(this).getElementsByTagName("LI");
			parentLi = this.parentNode;
			for (let i = 0; i < clickedAccordMenuItems.length; i++) {
				if (parentLi == clickedAccordMenuItems[i]) {
					clickedAccordMenuItems[i].classList.toggle('is-active');
					console.log('toggle', clickedAccordMenuItems[i]);
				} else {
					clickedAccordMenuItems[i].classList.remove('is-active');
					console.log('rm', clickedAccordMenuItems[i]);
				}
			}
		});

	}
};