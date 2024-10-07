const brand = "BASIS-64 Tools";
const copyright = "Copyright © BASIS-64 2024";

initializePage();
async function initializePage() {
	document.getElementById('userProfilePhoto').src = await getCookiePhoto();
	document.getElementById('navbar-brand').appendChild(document.createTextNode(brand));
	document.getElementById('copyright-text').innerHTML = copyright;
	document.getElementById('privacy-link').setAttribute("href", "#");
	document.getElementById('terms-link').setAttribute("href", "#");
	document.getElementById('contact-link').setAttribute("href", "#");
}
