// Hamburger menu
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
	hamMenu.classList.toggle('is-active');
	body.classList.toggle('is-locked');

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


// Modal
modal = document.getElementById('modal');

function openModal(name = '', text = '', event = false) {
	(event ? event.preventDefault() : void(0)); // Если модалка открыта не по клику из из AJAX
	modal.classList.add('is-active');
	modal.querySelector('#modal__name').textContent = name;
	modal.querySelector('#modal__text').textContent = text;
	body.classList.add('is-locked');
}
$('.reviews__item .btn').on('click', (e) => {
	openModal(
		name = $(e.target).siblings(".reviews__title").text(),
		text = $(e.target).siblings(".reviews__text").text(),
		event = e
	);
});

// Закрытие Окна
$('.modal').on('click', (e) => {
	if (e.target == modal || e.target == modal.querySelector('.modal__close')) {
		e.preventDefault();
		modal.classList.remove('is-active');
		body.classList.remove('is-locked');
	}
})

//Закрытие модалки или меню на Esc
document.addEventListener("keydown", e => {
	if (e.keyCode == 27) { // закрываем габмургер меню
		if (hamMenu.classList.contains('is-active')) {
			toggleMenu();
		}

		if (modal.classList.contains('is-active')) { // закрываем модалку
			modal.classList.remove('is-active');
			body.classList.remove('is-locked');
		}
	}

});



// all Accordions
allAccordions = document.getElementsByClassName('accordion');

// Ищем ближайшего родителя переданного e.target ,
// у которого радитель - accordion
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


// Слайдер с Бургерами
slider = new Siema({
	selector: '.burgers__list',
	duration: 200,
	easing: 'ease-out',
	perPage: 1,
	startIndex: 0,
	draggable: true,
	multipleDrag: true,
	threshold: 20,
	loop: true,
	rtl: false,
	// onInit: () => {},
	// onChange: () => {},
});

sliderNextBtn = document.getElementById('burgers_slider-control--next');
sliderNextBtn.addEventListener('click', (e) => {
	e.preventDefault();
	slider.next()
});

sliderPrevBtn = document.getElementById('burgers_slider-control--prev');
sliderPrevBtn.addEventListener('click', (e) => {
	e.preventDefault();
	slider.prev()
});


// AJAX and Order Form
const orderForm = document.getElementById('order-form');


document.getElementById('order-btn').addEventListener('click', e => {
	e.preventDefault();
	const formData = new FormData(),
		URL = "https://webdev-api.loftschool.com/sendmail",
		xhr = new XMLHttpRequest();

	xhr.resposeType = 'json';
	xhr.open("POST", URL);
	xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

	formData.append('name', orderForm.elements.customerName.value);
	formData.append('phone', orderForm.elements.phone.value);
	formData.append('comment', orderForm.elements.comment.value);
	formData.append('to', 'someemail@mail.ru');

	xhr.send(formData);
	xhr.onload = function () {
		let orderResponse = JSON.parse(xhr.responseText);
		if (orderResponse.status >= 400) { //status 0 fail send
			openModal(name = 'Ошибка', text = orderResponse.message);
			// void(0);
		} else {
			openModal(name = 'Сообщение', text = orderResponse.message);; //status 1 success send
		};
	}
});

// очищаем форму
document.getElementById('clearForm-btn').addEventListener('click', e => {
	e.preventDefault();
	orderForm.reset()
});

// Burgers - скрыть.показать ингредиенты
$(".ingredients").on('click', e => {
	e.preventDefault();
	$(e.currentTarget).toggleClass('is-active');
})