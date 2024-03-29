from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
song_set = set()        # Hold set of songs
theme_dict = {}         # Associate theme to keywords to look for


@app.route('/')
def home():
    return "Hello world"


@app.route('/get_themes')
def get_theme():
    themes = []
    for key in theme_dict.keys():
        themes.append(key)
    return jsonify(themes)


@app.route('/songs/<string:theme>')
def get_results(theme):
    if not(theme_dict.keys().__contains__(theme)):
        return ""
    results = []
    for song in song_set:
        if song.theme_scores[theme] > 3:
            results.append(song)

    json_string = jsonify([ob.__dict__ for ob in results])
    return json_string


class Song:
    def __init__(self, artist="no artist", name="no name", key="no key"):
        self.artist = artist
        self.name = name
        self.key = key
        filename = "lyrics/" + self.name + ".txt"
        try:
            file = open(filename)
            self.lyrics = file.read()
            file.close()
        except IOError:
            self.lyrics = ""
        self.theme_scores = self.get_theme_scores()

    def get_theme_scores(self):
        theme_scores = {}
        for theme in theme_dict.keys():
            theme_scores[theme] = 0

        for theme in theme_dict:
            for keyword in theme_dict[theme]:
                theme_scores[theme] += self.lyrics.count(keyword)

        self.lyrics = ""
        return theme_scores

    def get_artist(self):
        return self.artist

    def get_name(self):
        return self.name

    def get_key(self):
        return self.key

    def get_lyrics(self):
        return self.lyrics


if __name__ == '__main__':
    with open('song_list.json', 'r') as f:
        json_songs = json.load(f)
    with open('themes.json', 'r') as f2:
        theme_dict = json.load(f2)
    for i in range(len(json_songs)):
        s = Song(json_songs[i]["artist"], json_songs[i]["name"], json_songs[i]["key"])
        song_set.add(s)

    app.run()
