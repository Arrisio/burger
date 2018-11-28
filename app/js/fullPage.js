fullpage_api = new fullpage('#maincontent', {
	//options here
	autoScrolling: true,
	scrollHorizontally: true,
	licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE'
});

//methods
fullpage_api.setAllowScrolling(true);

document.querySelector('.down-btn').addEventListener('click', e => {
	e.preventDefault();
	fullpage_api.moveSectionDown();
})