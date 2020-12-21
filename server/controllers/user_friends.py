from json import loads, dumps
from flask import Flask, Blueprint, request
from repositories.user_rep import UserRep
from models.user import User
from repositories.friendships_rep import FriendshipRep
from models.friendship import Friendship


user_friends_blueprint = Blueprint("user_friends", __name__)

@user_friends_blueprint.route("/api/get-friends/<user_id>")
def get_friends(user_id):
    if user_id == 'null': 
        return dumps({"success": False, 'message': 'User is null in user_movies.py'}), 400, {'Content-type': 'application/json'}
    
    friends = UserRep().get_friends(user_id)
    return dumps({"success": True, 'friends': friends}), 200, {'Content-type': 'application/json'}

@user_friends_blueprint.route("/api/add-friend", methods=['POST'])
def add_friend():
    data = loads(request.data)
    user_id = data['userId']
    friend_email = data['email']
    friend = UserRep().select_by_email(friend_email)
    if friend is None:
        return dumps({"success": False, 'message': 'There is no user with this email.'}), 400, {'Content-type': 'application/json'}
    user = UserRep().select(user_id)
    # check if they are already friends
    are_friends = FriendshipRep().select_by_friend_id_and_user_id(friend.id, user_id)
    if are_friends is not None:
        return dumps({"success": False, 'message': f'You are already friends with {friend.name}'}), 400, {'Content-type': 'application/json'}
    friendship = Friendship(user, friend)
    FriendshipRep().save(friendship)
    friends = UserRep().get_friends(user_id)
    return dumps({"success": True, 'friends': friends}), 200, {'Content-type': 'application/json'}

@user_friends_blueprint.route("/api/remove-friend", methods=['DELETE'])
def remove_friend():
    data = loads(request.data)
    friend_id = data['friendId']
    user_id = data['userId']
    FriendshipRep().delete_by_friend_id_and_user_id(friend_id, user_id)
    friends = UserRep().get_friends(user_id)
    return dumps({"success": True, 'friends': friends}), 200, {'Content-type': 'application/json'}
