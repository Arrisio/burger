const menu_btn = document.querySelector('#menu_btn'),
	ham_menu = document.querySelector('#ham_menu'),
	ham_list = document.querySelector('#ham_list'),
	body = document.querySelector('body');

function toggleMenu() {
	menu_btn.classList.toggle('is-active');
	ham_menu.classList.toggle('is-active');
	body.classList.toggle('is-locked');
};

menu_btn.addEventListener('click', function (e) {
	e.preventDefault();
	toggleMenu();
});
ham_list.addEventListener('click', function (e) {
	let el = e.target;
	if (el.tagName == 'A') {
		toggleMenu();
	};
});