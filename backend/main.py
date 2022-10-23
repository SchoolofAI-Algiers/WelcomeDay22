
import os
import pickle
import neat
from flask_cors import CORS
from flask import Flask, redirect, url_for, request, render_template, jsonify
from firebase_admin import credentials, firestore, initialize_app
os.chdir("./backend")

app = Flask(__name__)
CORS(app)
# Initialize Firestore DB
cred = credentials.Certificate("cred.json")
initialize_app(cred)
db = firestore.client()
scoreboard_ref = db.collection('scoreboard')
local_dir = os.path.dirname(__file__)
config_path = os.path.join(local_dir, "config.txt")

config = neat.Config(neat.DefaultGenome, neat.DefaultReproduction,
                     neat.DefaultSpeciesSet, neat.DefaultStagnation,
                     config_path)

with open("best.pickle", "rb") as f:
    winner = pickle.load(f)


def test_ai(paddle, ball):
    [px, py] = paddle
    [bx, by] = ball
    net = neat.nn.FeedForwardNetwork.create(winner, config)
    output = net.activate(
        (py, by, abs(px - bx)))
    decision = output.index(max(output))
    return decision


app = Flask(__name__)
CORS(app)


@app.route('/')
def home():
    return render_template('index.html')


@app.route('/getPos', methods=['POST'])
def getPos():
    data = request.get_json()
    ball = data['ball']
    paddle = data["paddle"]
    return str(test_ai(paddle, ball))


@app.route('/addScore', methods=['POST'])
def addScore():
    try:
        data = request.get_json()
        username = data['username']
        score = data["score"]
        scoreboard_ref.document().set(
            {"username": username, "score": score})
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


@app.route('/getScore', methods=['GET'])
def getScore():
    try:
        docs = [doc.to_dict() for doc in scoreboard_ref.stream()]
        return jsonify(docs), 200
    except Exception as e:
        return f"An Error Occurred: {e}"


if __name__ == '__main__':
    app.run()
