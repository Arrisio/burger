ymaps.ready(function () {
	var myMap = new ymaps.Map('map', {
			center: [59.93, 30.33],
			zoom: 12
		}, {
			searchControlProvider: 'yandex#search'
		}),
		clusterer = new ymaps.Clusterer({
			// Зададим массив, описывающий иконки кластеров разного размера.
			clusterIcons: [{
					href: '../img/contacts/map-marker.png',
					size: [46, 58],
					offset: [-23, -29]
				},
				{
					href: '../img/contacts/map-marker.png',
					size: [46, 58],
					offset: [-23, -29]
				}
			],
			// Эта опция отвечает за размеры кластеров.
			// В данном случае для кластеров, содержащих до 100 элементов,
			// будет показываться маленькая иконка. Для остальных - большая.
			clusterNumbers: [8],
			clusterIconContentLayout: null
		}),
		getPointData = function (index) {
			return {
				balloonContentBody: 'тошниловка <strong>№' + index + '</strong>',
				// clusterCaption: 'метка <strong>' + index + '</strong>',
			};
		},
		points = [
			[59.9, 30.3],
			[59.95, 30.43],
			[59.97, 30.35],

		],
		geoObjects = [];

	for (var i = 0, len = points.length; i < len; i++) {
		geoObjects[i] = new ymaps.Placemark(points[i], getPointData(i), {
			iconLayout: 'default#imageWithContent',
			iconImageHref: '../img/contacts/map-marker.png',
			iconImageSize: [46, 58],
			iconImageOffset: [-23, -29]
		});
	}

	clusterer.add(geoObjects);
	myMap.geoObjects.add(clusterer);

	myMap.setBounds(clusterer.getBounds(), {
		checkZoomRange: true
	});
});