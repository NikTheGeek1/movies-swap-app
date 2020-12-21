from flask import Flask, Blueprint

user_login_blueprint = Blueprint('user_login', __name__)

@user_login_blueprint.route('/')
def user_login():
    pass