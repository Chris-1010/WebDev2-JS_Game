from flask import Flask, render_template, request, session
from flask_session import Session
from database import get_db, close_db

app = Flask(__name__)
app.teardown_appcontext(close_db)
app.config['SECRET_KEY'] = 'key'

app.config['SESSION_PERMANENT'] = 'False'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)


@app.route("/")
def index():
    db = get_db()
    normalMode_players = db.execute("SELECT * FROM players WHERE mode = 'normal' ORDER BY score DESC;").fetchall()
    survivalMode_players = db.execute("SELECT * FROM players WHERE mode = 'survival' ORDER BY score DESC;").fetchall()
    session["mode"] = "normal"
    return render_template("index.html", normalMode_players=normalMode_players, survivalMode_players=survivalMode_players)

@app.route("/play")
def game():
    return render_template("canvas.html")

@app.route("/get_mode", methods=["POST"])
def get_mode():
    return session["mode"]

@app.route("/change_mode", methods=["POST"])
def change_mode():
    if session["mode"] == "normal":
        session["mode"] = "survival"
    elif session["mode"] == "survival":
        session["mode"] = "normal"
    return session["mode"]


@app.route("/store_score", methods=["POST"])
def store_score():
    name = request.form["name"]
    score = int(request.form["score"])
    enemy_count = int(request.form["enemies_killed"])
    time_alive = request.form["time_alive"]

    db = get_db()
    db.execute("INSERT INTO players (mode, name, score, enemy_count, time_alive) VALUES (?, ?, ?, ?, ?);", (session["mode"], name, score, enemy_count, time_alive))
    db.commit()

    return "success"