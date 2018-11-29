fullpage_api = new fullpage('#maincontent', {
	//options here
	anchors: ['hero', 'we-best', 'burgers', 'team', 'menu', 'reviews', 'form', 'contacts'],
	autoScrolling: true,
	scrollHorizontally: true,
	licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
	navigation: true,
	navigationPosition: 'right',
	scrollBar: true,
	// navigationTooltips: ['hero', 'we-best', 'burgers', 'team', 'menu', 'reviews', 'form', 'contacts'],
	// showActiveTooltip: true,
	// slidesNavigation: true,

});

//methods
fullpage_api.setAllowScrolling(true);

document.querySelector('.down-btn').addEventListener('click', e => {
	e.preventDefault();
	fullpage_api.moveSectionDown();
})