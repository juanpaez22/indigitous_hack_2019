from flask import Flask, jsonify
import json

app = Flask(__name__)
song_dict = {}


@app.route('/get_themes')
def get_theme():
    themes = []
    for key in song_dict.keys():
        themes.append(key)
    return jsonify(themes)


@app.route('/songs/<string:theme>')
def get_results(theme):
    if song_dict.__contains__(theme):
        return jsonify(song_dict[theme])

    return jsonify({})


if __name__ == '__main__':
    with open('song_list.json', 'r') as f:
        song_dict = json.load(f)
    app.run()
