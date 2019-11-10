// Populates theme dropdown on load
function populateThemesDropdown() {
    getThemes().then((themes) => {
        let themeSelectList = document.getElementById("theme-select-list");
        themes.forEach((theme) => {
            let option = document.createElement("option");
            option.textContent = theme;
            option.value = theme;
            themeSelectList.appendChild(option);
        });
    })
}

function populateSongsTable() {
    let themeSelectList = document.getElementById("theme-select-list");
    let theme = themeSelectList.options[themeSelectList.selectedIndex].value;
    if (themeSelectList.selectedIndex == 0) {
        document.getElementById("song-table-body").textContent = "choose a theme!";
        return;
    }
    getSongsByTheme(theme).then((songObjects) => {
        if (!songObjects || !songObjects.length) {
            document.getElementById("song-table-body").textContent = "no songs found";
        } else {
            let songTableBody = document.getElementById("song-table-body");
            while (songTableBody.firstChild) {
                songTableBody.removeChild(songTableBody.firstChild);
            }
            songObjects.forEach((songObject) => {
                let tableRow = document.createElement("tr");
                let nameElement = document.createElement("td");
                nameElement.textContent = songObject['name'];
                let artistElement = document.createElement("td");
                artistElement.textContent = songObject['artist'];
                let keyElement = document.createElement("td");
                keyElement.textContent = songObject['key'];
                tableRow.appendChild(nameElement);
                tableRow.appendChild(artistElement);
                tableRow.appendChild(keyElement);
                songTableBody.appendChild(tableRow);
            })

        }
    })
}

// gets list of themes
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

// gets songs from respective themes
function getSongsByTheme(theme) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://127.0.0.1:5000/songs/' + theme, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
                resolve(JSON.parse(xhr.responseText));
            }
        };
        xhr.onerror = () => reject(new Error('Error making request to get timeline.'));
        xhr.send();
    });
}

populateThemesDropdown();


