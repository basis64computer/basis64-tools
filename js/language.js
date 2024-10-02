const languages = {
	id: {
		language_index: "1",
		select_language: "🇮🇩 Indonesia",
		feedback: "Kirim Feedback",
		title: "BASIS-64 Math",
		title2: "BASIS-64 Math adalah website matematika dengan rumus matematika yang lengkap.",
		download: "Unduh",
		download_video: "Unduh video",
		download_audio: "Unduh audio",
	}
}

const selector = document.getElementById("languageSelector");
let feedback = document.getElementById("feedback");
let title = document.getElementById("title");
let title2 = document.getElementById("title2");
let download = document.getElementById("download");


window.addEventListener('DOMContentLoaded', async () => {
    //const lang = navigator.language.split("-");
    setLanguage("id");
    //setLanguage(lang[0]);
});

/*selector.addEventListener("change", (event) => {
	setLanguage(event.target.value);
})*/

const setLanguage = (language) => {
	if (language == "en") {
		console.log("EN");
		//selector.selectedIndex = languages.en.language_index;
		//feedback.innerText = languages.en.feedback;
		//title.innerText = languages.en.title;
		//title2.innerText = languages.en.title2;
		//download.innerText = languages.en.download;
	} else if (language == "id") {
		console.log("ID");
		//selector.selectedIndex = languages.id.language_index;
		//feedback.innerText = languages.id.feedback;
		title.innerText = languages.id.title;
		title2.innerText = languages.id.title2;
		//download.innerText = languages.id.download;
	}
}
