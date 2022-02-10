import time
import requests
import json

from random import randint
from markupsafe import escape

from flask import Flask, request
from flask import send_from_directory
from flask import jsonify



app = Flask(__name__)

@app.route("/")
def index():
    return app.send_static_file("test.txt")

@app.route("/favicon.ico")
def favicon():
    return app.send_static_file("favicon.ico") 

@app.route("/word/<guess>")
def checkGuess(guess):
    response = requests.get(f"https://api.datamuse.com/words?sp={guess}")
    data = response.json()
    # check if guess is an actual word
    for possible in data:
        if possible["word"] == guess:
            return json.dumps(True)
    return json.dumps(False)

@app.route("/word-generator/")
def randomWordGenerator():
    word_bank = open("./database/word-bank.txt", "r")
    random_line = randint(0, 2499)
    for i, line in enumerate(word_bank):
        if i == random_line:
            word_bank.close()
            return {"word": line.strip()}

if __name__ == "__main__":
    app.run(debug=True)