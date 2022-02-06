import time
from flask import Flask


app = Flask(__name__)

@app.route("/")
def index():
    return "Index Page"

@app.route("/time")
def timer():
    return {"time": time.time()}

if __name__ == "__main__":
    print(time.time())
    app.run(debug=True)