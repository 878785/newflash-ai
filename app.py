from flask import Flask, render_template, jsonify, session
from flask_cors import CORS
import requests
import os

app = Flask(__name__)
CORS(app)

app.secret_key = "your_secret_key_here"  # Session ke liye zaroori

API_KEY = "2c46153819d74ff899ea44a6aa993b7c"

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/trending')
def trending():
    return render_template('trending.html')   

@app.route('/bookmark')
def bookmark_page():
    return render_template('bookmark.html')

@app.route('/bookmarks')
def show_bookmarks():
    bookmarks = session.get('bookmarks', [])
    return render_template("bookmark.html", bookmarks=bookmarks)


@app.route("/about")
def about():
    return render_template("about.html")

@app.route("/saved")
def saved():
    return render_template("saved.html")

@app.route('/news')
def news_page():
    return render_template('news.html')

@app.route('/api/news')
def get_news():
    url = f"https://newsapi.org/v2/top-headlines?country=us&apiKey={API_KEY}"

    try:
        response = requests.get(url)
        data = response.json()
        articles = data.get("articles", [])
        return jsonify({"articles": articles})
    except Exception as e:
        return jsonify({"error": str(e)})

# ✅ Yehi ek hi bar hona chahiye
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)

