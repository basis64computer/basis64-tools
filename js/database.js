var userID;
var userCookieID;
var userName;
var userPhoto;
var userAdmin;
var userActivated;

var userDynamicID;
var userData;
var database;
var premiumPages;
var record;

var databaseURL = 'https://api.npoint.io/dc0a5091e2cfc3e4e6f6';

/*
 * Fungsi callback untuk memproses database
 * bentuk JSON.
 */
function loadDatabaseCallback(callback, database, userCount) {
	let userData = getUser(database, getCookie("id"));
	if (userData == null) {
		setCookie("id", "invalid", 0);
		document.location.replace("403.html");
		return;
	}
	callback(userData, userCount);
}

function getUserFromArray(database, cookieID) {
	for (var i=0; i<database.length; i++) {
		console.log(database[i].cookie + " " + cookieID);
		/*
		 * Jika cookie pengguna ditemukan pada database
		 */
		if (database[i].cookie == cookieID) {
			setCookie("dynamic_id", i, 0);
			return database[i];
		}
	}
	console.log("user not found.");
	/*
	 * Jika data tidak ditemukan, akan memberikan nilai NULL
	 */
	return null;
}

/*
 * Fungsi untuk mendapatkan pengguna dan memverifikasi
 * apakah ID dinamis pengguna pada cookie sesuai dengan
 * yang ada di database
 */
function getUser(database, cookieID) {
	console.log(database[getCookie("dynamic_id")]);
	let userData = database[getCookie("dynamic_id")];
	if (userData == null || userData == "undefined") {
		/*
		 * Jika cookie pengguna tidak memiliki dynamic_id
		 */
		return getUserFromArray(database, cookieID);
	}
	let userCookieID = userData.cookie;
	if (userCookieID == cookieID) {
		/*Jika sesuai, akan memberikan hasil dari database*/
		return userData;
	}

	/*
	 * Jika tidak sesuai, akan mencari data pengguna
	 * pada array JSON pada database dengan menggunakan
	 * fungsi getUserFromArray()
	 */
	return getUserFromArray(database, cookieID);
}

/*
 * memuat database berupa JSON dari database
 */
async function loadDatabase() {
  var response = await fetch(databaseURL);
  var jsonResponse = await response.json();
  record = await jsonResponse;
	userCount = await record.users;
	database = await record.database;
	premiumPages = await record.pages;

	return await record;
}

function databaseSetName(name) {
	user = getUser(database, getCookie("id"));
	user.name = name;
	setCookie("name", name);
	console.log("database set name result: " + JSON.stringify(database));
}

function saveDatabase() {
	let req = new XMLHttpRequest();
	req.onreadystatechange = () => {
		if (req.readyState == XMLHttpRequest.DONE) {
		  console.log(req.responseText);
		}
	};

	req.open("POST", databaseURL, true);
	req.setRequestHeader("Content-Type", "application/json");
	req.setRequestHeader("X-Master-Key", "$2a$10$ls6EV35/v9eQm9p240tAfOJM6cj4/cHytWjQT0hEHrs.jfnrJWbAC");
	req.send(JSON.stringify(record));
}

function databaseSetPhoto(photo) {
	fetch(databaseURL).then(response => response.json()).then(jsonResponse => {
		let record = jsonResponse;
		let userCount = record.users;
		let database = record.database;
		
		user = getUser(database, getCookie("id"));
		user.photo = photo;

		let req = new XMLHttpRequest();

		req.onreadystatechange = () => {
		  if (req.readyState == XMLHttpRequest.DONE) {
		    console.log(req.responseText);
		  }
		};

		console.log(JSON.stringify(record));
		req.open("POST", databaseURL, true);
		req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader("mode", "no-cors");
		req.setRequestHeader("X-Master-Key", "$2a$10$ls6EV35/v9eQm9p240tAfOJM6cj4/cHytWjQT0hEHrs.jfnrJWbAC");
		req.send(JSON.stringify(record));
	});
}

function databaseSetUser(name, photo) {
	fetch(databaseURL).then(response => response.json()).then(jsonResponse => {
		let record = jsonResponse;
		let userCount = record.users;
		let database = record.database;
		
		user = getUser(database, getCookie("id"));
		user.name = name;
		user.photo = photo;

		let req = new XMLHttpRequest();

		req.onreadystatechange = () => {
		  if (req.readyState == XMLHttpRequest.DONE) {
		    console.log(req.responseText);
		  }
		};

		console.log(JSON.stringify(record));
		req.open("POST", databaseURL, true);
		req.setRequestHeader("Content-Type", "application/json");
		req.send(JSON.stringify(record));
	});
}

function databaseSetAdmin(admin) {
	fetch(databaseURL).then(response => response.json()).then(jsonResponse => {
		let record = jsonResponse;
		let userCount = record.users;
		let database = record.database;
		
		user = getUser(database, getCookie("id"));
		user.admin = admin;

		let req = new XMLHttpRequest();

		req.onreadystatechange = () => {
		  if (req.readyState == XMLHttpRequest.DONE) {
		    console.log(req.responseText);
		  }
		};

		console.log(JSON.stringify(record));
		req.open("PUT", databaseURL, true);
		req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader("X-Master-Key", "$2a$10$ls6EV35/v9eQm9p240tAfOJM6cj4/cHytWjQT0hEHrs.jfnrJWbAC");
		req.send(JSON.stringify(record));
	});
}

function databaseSetActivated(activated, timestamp) {
	fetch(databaseURL).then(response => response.json()).then(jsonResponse => {
		let record = jsonResponse;
		let userCount = record.users;
		let database = record.database;
		
		user = getUser(database, getCookie("id"));
		user.activated = activated;
		user.activation_expired = timestamp;

		let req = new XMLHttpRequest();

		req.onreadystatechange = () => {
		  if (req.readyState == XMLHttpRequest.DONE) {
		    console.log(req.responseText);
		  }
		};

		console.log(JSON.stringify(record));
		req.open("PUT", databaseURL, true);
		req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader("X-Master-Key", "$2a$10$ls6EV35/v9eQm9p240tAfOJM6cj4/cHytWjQT0hEHrs.jfnrJWbAC");
		req.send(JSON.stringify(record));
	});
}

/*
 * Menambahkan pengguna ke database
 */
function databaseAddUser(cookieID, name, successCallback, failCallback) {
	console.log("add user " + name);
	fetch(databaseURL).then(response => response.json()).then(jsonResponse => {
		let record = jsonResponse;
		let userCount = record.users;
		let database = record.database;
		
		database.push({"id": userCount + 10000000, "cookie": cookieID, "name": name, "photo": "assets/img/user.png", "activated": false, "activation_expired": 62125920000});
		userCount++;
		record.users = userCount;

		fetch(databaseURL, {
			method: "POST",
			body: JSON.stringify(record)
		}).then(success => {
			if (successCallback) {
				successCallback(record);
			}
		}, error => {
			console.log(error);
			if (failCallback) {
				failCallback(record, error);
			}
		});
	});
}

/*
 * Menghapus pengguna pada database
 */
function databaseDeleteUser() {
	console.log("delete user " + getCookie("name"));
	fetch(databaseURL).then(response => response.json()).then(jsonResponse => {
		let record = jsonResponse;
		let userCount = record.users;
		let database = record.database;

		if (getUser(database, getCookie("id")) == null) {
			console.log("user not found.");
			return;
		}
		
		database.splice(getCookie("dynamic_id"), 1);

		console.log(JSON.stringify(record));

		let req = new XMLHttpRequest();

		req.onreadystatechange = () => {
		  if (req.readyState == XMLHttpRequest.DONE) {
		    console.log(req.responseText);
		  }
		};

		req.open("PUT", databaseURL, true);
		req.setRequestHeader("Content-Type", "application/json");
		req.setRequestHeader("X-Master-Key", "$2a$10$ls6EV35/v9eQm9p240tAfOJM6cj4/cHytWjQT0hEHrs.jfnrJWbAC");
		req.onload = function() {
			setCookie("id", "invalid", 0);
			document.location.replace("403.html");
		};
		req.send(JSON.stringify(record));
	});
}

function loadUserInfoCallback(user, userCount) {
	console.log("user callback");
	
}

async function parseDatabasePhoto(photo) {
	if (!photo) {
		console.log("Photo is null");
		return await "assets/img/user.png";
	}

	if (photo.includes("telegram:")) {
		let response = await fetch(`https://api.telegram.org/bot7179921959:AAF1bkyNnU9wfwQUytMX6CAgTUtbHtgWwHw/getFile?file_id=${photo.replace("telegram:", "")}`);
		let json = await response.json();
		return "https://api.telegram.org/file/bot7179921959:AAF1bkyNnU9wfwQUytMX6CAgTUtbHtgWwHw/" + json.result.file_path;
	} else if (photo.includes("https://")) {
		return photo;
	}
	return await "assets/img/user.png";
}

async function loadUserInfo() {
	await loadDatabase();
	user = getUser(database, getCookie("id"));
	if (user == null) {
		setCookie("id", "invalid", 0);
		document.location.replace("403.html");
		return;
	}
	document.getElementById("userName").innerHTML = user.name;
	document.getElementById("userID").innerHTML = "ID: " + user.id + "<br>Cookie ID: " + user.cookie + "<br>Dynamic ID: " + (getCookie("dynamic_id") + 1 + "<br/>Activation Expired: " + formatDate(new Date(user.activation_expired), "dddd, dd MMMM yyyy - HH:mm:ss"));

	if (user.admin) {
		document.getElementById("adminStatus").innerHTML = "Admin";
	}

	if (user.activated) {
		activatedStatus = document.getElementById("activationStatus");
		activatedStatus.innerHTML = "Akun sudah diaktivasi";
		activatedStatus.classList.remove("bg-secondary");
		activatedStatus.classList.add("bg-success");

		setCookie("trial", 0);

		document.getElementById("btnActivateAccount").disabled = true;
	} else {
		activatedStatus = document.getElementById("activationStatus");
		activatedStatus.innerHTML = "Akun belum diaktivasi";
		activatedStatus.classList.remove("bg-success");
		activatedStatus.classList.add("bg-secondary");

		document.getElementById("btnActivateAccount").disabled = false;
	}

	console.log(user.photo);
	document.getElementById("profilePhoto").src = await parseDatabasePhoto(user.photo);
}