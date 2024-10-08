function generateRandomString(length, charset) {
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    result += charset.charAt(randomIndex);
  }
  return result;
}


function setCookieDays(name, value, days) {
	let expires = "";
	if (days) {
		let d = new Date();
		d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "expires=" + d.toUTCString();
	}
	document.cookie = name + "=" + JSON.stringify(value) + ";" + expires + ";SameSite=Lax" + ";path=/";
}

function setCookie(name, value) {
	let expires = "";
	let d = new Date();
	d.setTime(d.getTime() + (100 * 365 * 24 * 60 * 60 * 1000));
	expires = "expires=" + d.toUTCString();
	document.cookie = name + "=" + JSON.stringify(value) + ";" + expires + ";SameSite=Lax" + ";path=/";
}

function deleteAllCookies() {
    document.cookie.split(';').forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substring(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
    });
}

function getCookie(name) {
	const nameEQ = name + "=";
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
	let c = ca[i];
		while (c.charAt(0) === ' ')
			c = c.substring(1, c.length);

		if (c.indexOf(nameEQ) === 0) {
			return JSON.parse(c.substring(nameEQ.length, c.length));
		}
	}
	return null;
}

function cookieSetPhoto(file_id, callback) {
	setCookie("photo", "telegram:" + file_id, 0);
  if (callback)
    callback();
  /*fetch(`https://api.telegram.org/bot7179921959:AAF1bkyNnU9wfwQUytMX6CAgTUtbHtgWwHw/getFile?file_id=${file_id}`).then(response => response.json()).then(jsonResponse => {
    result = "https://api.telegram.org/file/bot7179921959:AAF1bkyNnU9wfwQUytMX6CAgTUtbHtgWwHw/" + jsonResponse.result.file_path;
    console.log("photo: " + result);
    setCookie("photo", result, 0);
    if (callback)
    	callback(result);
  });*/
}

async function getCookiePhoto() {
	if (!getCookie("photo")) {
		console.log("Photo is null");
		return await "assets/img/user.png";
	}

	if (getCookie("photo").includes("telegram:")) {
		let response = await fetch(`https://api.telegram.org/bot7179921959:AAF1bkyNnU9wfwQUytMX6CAgTUtbHtgWwHw/getFile?file_id=${getCookie("photo").replace("telegram:", "")}`);
		let json = await response.json();
		return "https://api.telegram.org/file/bot7179921959:AAF1bkyNnU9wfwQUytMX6CAgTUtbHtgWwHw/" + json.result.file_path;
	} else if (getCookie("photo").includes("https://")) {
		return getCookie("photo");
	}
	return await "assets/img/user.png";
}

function generateCookies() {
	const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	const numbers = '0123456789';
	const randomString = generateRandomString(32, charset);
	const randumNumbers = generateRandomString(10, numbers);
	setCookie("id", randomString, 0);
	setCookie("name", "user" + randumNumbers, 0);
	setCookie("photo", "assets/img/user.png");
	setCookie("trial", 5);
	databaseAddUser(randomString, "user" + randumNumbers);
	console.log("Created new cookies.");
}

function checkCookies() {
	console.log("Check cookies...");
	console.log("Cookie ID: " + getCookie("id"));
	
	if (getCookie("id") == null || getCookie("id") == "invalid") {
		generateCookies();
	} else {
		console.log("failed create new cookies." + getCookie("id"));
	}
}