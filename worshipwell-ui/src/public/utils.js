// this function is getting a song from the song list after the submit button is hit
// separate java script code from html because keeping files separated, don't want too many script tags
function drawSongs() {
	getThemes().then((jsonThemes) => {
		document.getElementById("song-list").innerHTML = jsonThemes;
	})
}

function getThemes() {
	return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:5000/get_themes', true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            }
        };
        xhr.onerror = () => reject(new Error('Error making request to get timeline.'));
        xhr.send();
    });
}



