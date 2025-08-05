import requests
from flask import Blueprint, jsonify, request

news_bp = Blueprint('news', __name__)

NEWS_API_KEY = "2c46153819d74ff899ea44a6aa993b7c"

@news_bp.route('/top-headlines', methods=['GET'])
def get_top_headlines():
    country = request.args.get('country', 'in')  # Default country = India
    category = request.args.get('category', 'general')  # Default category = general

    url = f"https://newsapi.org/v2/top-headlines?country={country}&category={category}&apiKey={NEWS_API_KEY}"

    try:
        response = requests.get(url)
        data = response.json()

        if data["status"] == "ok":
            return jsonify(data["articles"])
        else:
            return jsonify({"error": "Failed to fetch news", "details": data}), 500
    except Exception as e:
        return jsonify({"error": "An error occurred", "message": str(e)}), 500
