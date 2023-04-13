from flask import Flask, render_template, request
from database import get_db, close_db

app = Flask(__name__)
app.teardown_appcontext(close_db)
app.config['SECRET_KEY'] = 'key'


@app.route("/")
def index():
    db = get_db()
    players = db.execute("SELECT * FROM players ORDER BY score DESC;").fetchall()
    return render_template("index.html", players=players)

@app.route("/play")
def game():
    return render_template("canvas.html")

@app.route("/store_score", methods=["POST"])
def store_score():
    name = request.form["name"]
    score = int(request.form["score"])
    enemy_count = int(request.form["enemies_killed"])
    time_alive = request.form["time_alive"]

    db = get_db()
    db.execute("INSERT INTO players (name, score, enemy_count, time_alive) VALUES (?, ?, ?, ?);", (name, score, enemy_count, time_alive))
    db.commit()

    return "success"