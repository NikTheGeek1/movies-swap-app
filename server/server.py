from flask import Flask
from flask_cors import CORS
from controllers.user_signup import user_signup_blueprint
from controllers.user_login import user_login_blueprint
from controllers.user_movies import user_movies_blueprint
from controllers.user_friends import user_friends_blueprint

app = Flask(__name__)
app.register_blueprint(user_signup_blueprint)
app.register_blueprint(user_login_blueprint)
app.register_blueprint(user_movies_blueprint)
app.register_blueprint(user_friends_blueprint)

# setting CORS policy to allow only localhost:3000
cors = CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})
if __name__ == '__main__':
    app.run(debug=True)