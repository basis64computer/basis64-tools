initializePage();
async function initializePage() {
	document.getElementById('userProfilePhoto').src = await getCookiePhoto();
}
