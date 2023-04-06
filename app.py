from flask import Flask, render_template, redirect, url_for
from database import get_db, close_db

app = Flask(__name__)
app.teardown_appcontext(close_db)
app.config['SECRET_KEY'] = 'key'


@app.route("/")
def index():
    db = get_db()
    players = db.execute("SELECT * FROM players;").fetchall()
    return render_template("index.html", players=players)

@app.route("/play")
def game():
    return render_template("canvas.html")