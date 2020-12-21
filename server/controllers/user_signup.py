from json import loads, dumps
from flask import Flask, Blueprint, request
from repositories.user_rep import UserRep
from models.user import User

user_signup_blueprint = Blueprint("user_signup", __name__)


@user_signup_blueprint.route("/api/user-signup", methods=["POST"])
def user_signup():
    data = loads(request.data)
    try:
        newUser = User(data['name'], data['email'], data['password'])
        userId = UserRep().save(newUser).id
        return dumps({"success": True, "userId": userId}), 200, {'Content-type': 'application/json'}
    except IndexError:
        return dumps({"success": False}), 400, {'Content-type': 'application/json'}


@user_signup_blueprint.route("/api/user-login", methods=["POST"])
def user_login():
    data = loads(request.data)
    email = data['email']
    password = data['password']

    user = UserRep().select_by_email(email)
    if user is None:
        return dumps({"success": False, "message": 'User does not exist'}), 400, {'Content-type': 'application/json'}
    
    if user.password != password:
        return dumps({"success": False, "message": 'Wrong password'}), 400, {'Content-type': 'application/json'}

    return dumps({"success": True, 'userName': user.name, 'userId': user.id}), 200, {'Content-type': 'application/json'}


