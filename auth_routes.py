from flask import Blueprint, request, session, jsonify

auth_bp = Blueprint('auth', __name__)

# Dummy users data (testing purpose only)
users = {
    "user@example.com": {"password": "1234", "name": "Demo User"}
}

# 🔐 Register a new user
@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')

    if email in users:
        return jsonify({"error": "User already exists"}), 400

    users[email] = {"password": password, "name": name}
    return jsonify({"message": "User registered successfully!"}), 201


# 🔑 Login user
@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = users.get(email)
    if not user or user['password'] != password:
        return jsonify({"error": "Invalid email or password"}), 401

    session['user'] = {"email": email, "name": user['name']}
    return jsonify({"message": "Login successful", "user": session['user']}), 200


# 🚪 Logout user
@auth_bp.route('/logout', methods=['POST'])
def logout():
    session.pop('user', None)
    return jsonify({"message": "Logout successful"}), 200


# 👤 Get current session user
@auth_bp.route('/current-user', methods=['GET'])
def current_user():
    user = session.get('user')
    if user:
        return jsonify({"user": user}), 200
    return jsonify({"error": "Not logged in"}), 401
