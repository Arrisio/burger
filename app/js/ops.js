var initOps = (() => {
	ops = {};
	ops.model = (() => {
		var currentPosition = 0;
		const minPosition = 0,
			maxPosition = $('.section').length - 1;

		moveTo = ((newPosition) => {
			isLastPosition = (newPosition === maxPosition);
			if (newPosition != currentPosition) {
				ops.view.goToSection(newPosition, isLastPosition);
				currentPosition = newPosition;
			}
		})
		moveOn = ((deltaY) => {
			let newPosition = Math.max(
				Math.min((currentPosition + deltaY), maxPosition),
				minPosition
			)
			moveTo(newPosition);
		})

		moveDown = function () {
			currentPosition < maxPosition ? ops.model.moveOn(1) : ops.model.moveTo(0);
		}
		return {
			moveTo,
			moveOn,
			moveDown
		}
	})()

	ops.view = (() => {
		opsContainer = $('.ops__container');
		downButton = $('.down-btn');
		opsSliderItems = $('.ops-slider__item');

		goToSection = ((position, isLastPosition = false) => {
			translatePropery = `translateY(${-position * 100}vh)`;
			opsContainer.css({
				transform: translatePropery
			});
			opsSliderItems.removeClass('is-active');
			opsSliderItems.eq(position).addClass('is-active');
			if (isLastPosition) {
				downButton.css('transform', "rotate(180deg)")
			} else {
				downButton.css('transform', "rotate(0deg)")
			}
		})
		return {
			goToSection
		}
	})();

	ops.controll = (() => {
		$('.ops').on('wheel', e => {
			e.preventDefault();
			ops.model.moveOn(Math.floor(e.originalEvent.deltaY / 100));
		});
		$('.down-btn').on('click', e => {
			e.preventDefault();
			ops.model.moveDown();
		});
		$('.ops-slider li').on('click', function (e) {
			e.preventDefault();
			ops.model.moveTo($(this).index());
		})
		$('.nav__item').on('click', function (e) {
			e.preventDefault();
			//$(this).index() - номер слайдера(т.е. секции) на который ткнули
			ops.model.moveTo($(this).index());
		})
		$(document).on({
			'keydown': e => {
				// кнопки вверх и вниз
				switch (e.keyCode) {
					case 40:
						ops.model.moveOn(1);
						break;
					case 38:
						ops.model.moveOn(-1);
						break;
				}
			}
		})

		$(document).swipe({
			swipe: function (event, direction, distance, duration, fingerCount) {
				console.log(distance, duration);
				if (direction === 'up') {
					ops.model.moveOn(1);
				} else if (direction === 'down') {
					ops.model.moveOn(-1);
				}
			},
			fingers: 'all'
		});

	})()
});


initOps();