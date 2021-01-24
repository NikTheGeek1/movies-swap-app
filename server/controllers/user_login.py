from flask import Flask, Blueprint
from json import loads, dumps

user_login_blueprint = Blueprint('user_login', __name__)

@user_login_blueprint.route('/')
def user_login():
    return dumps({"success": True}), 200, {'Content-type': 'application/json'}
