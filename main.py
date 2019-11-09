from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/<string:theme>')
def getResults(theme):
    if (theme == "trust"):
        return jsonify({"song1": "I trust you"})
    elif (theme == "sacrifice"):
        return jsonify({"song1": "sacrifice"})
    elif (theme == "unity"):
        return jsonify({"song1": "together"})
    elif (theme == "suffering"):
        return jsonify({"song1": "suffering"})
    else:
        return jsonify({"song1": "not found"})



if __name__ == '__main__':
    app.run()