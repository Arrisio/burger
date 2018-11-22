const menuBtn = document.querySelector('.hamburger-menu-link'),
	hamMenu = document.getElementById('hamburger-menu'),
	hamList = document.getElementById('nav__list_hamburger'),
	body = document.querySelector('body');
hamListItems = document.querySelectorAll('.nav_hamburger .nav__item');


function аsleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function аsleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
async function toggleMenu() {
	menuBtn.classList.toggle('is-active');
	body.classList.toggle('is-locked');
	hamMenu.classList.toggle('is-active');

	for (let hamListItem of hamListItems) {
		// console.log(hamListItem);
		hamListItem.classList.toggle('is-active');
		await аsleep(100);
	};
};

menuBtn.addEventListener('click', e => {
	e.preventDefault();
	toggleMenu();
});
hamList.addEventListener('click', e => {
	let el = e.target;
	if (el.tagName == 'A') {
		toggleMenu();
	};
});

document.addEventListener("keydown", e => {
	if (e.keyCode == 27 && hamMenu.classList.contains('is-active')) {
		toggleMenu();
	}
});


allAccordions = document.getElementsByClassName('accordion');



function findParentAccordItem(elt) {
	let i = 0; // защита от зациклавания
	while (
		!(elt.parentElement.classList.contains('accordion')) &&
		i < 100
	) {
		elt = elt.parentElement;
	}
	return elt;
}


for (let accordList of allAccordions) {
	accordList.addEventListener('click', e => {
		e.preventDefault();
		clickedAccordItem = findParentAccordItem(e.target);
		clickedAccordMenuItems = clickedAccordItem.parentElement.getElementsByTagName("LI");

		for (let accordItem of clickedAccordMenuItems) {
			if (accordItem == clickedAccordItem) {
				accordItem.classList.toggle('is-active');
			} else {
				accordItem.classList.remove('is-active');
			}
		}
	})
};