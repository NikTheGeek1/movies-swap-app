from json import loads, dumps
from flask import Flask, Blueprint, request
from repositories.user_rep import UserRep
from repositories.movie_rep import MovieRep
from repositories.liked_movies_users_rep import LikedMovieUserRep
from repositories.disliked_movies_users_rep import DislikedMovieUserRep
from repositories.seen_movies_users_rep import SeenMovieUserRep
from models.movie import Movie
from models.user import User
from models.disliked_movies_users import DislikedMovieUser
from models.liked_movies_users import LikedMovieUser
from models.seen_movies_users import SeenMovieUser

user_movies_blueprint = Blueprint("user_movies", __name__)

@user_movies_blueprint.route("/api/get-movies/<user_id>")
def get_movies(user_id):
    if user_id == 'null': 
        return dumps({"success": False, 'message': 'User is null in user_movies.py'}), 400, {'Content-type': 'application/json'}
    liked_movies = UserRep().get_liked_movies_array(user_id)
    disliked_movies = UserRep().get_disliked_movies_array(user_id)
    seen_movies = UserRep().get_seen_movies_array(user_id)
    movies = {'liked_movies': liked_movies, 'disliked_movies': disliked_movies, 'seen_movies': seen_movies}
    return dumps({"success": True, 'movies': movies}), 200, {'Content-type': 'application/json'}

@user_movies_blueprint.route("/api/add-disliked-movie/", methods=['POST'])
def add_disliked_movie():
    data = loads(request.data)
    movie_api_id = int(data['movie'])
    user_id = data['user']
    user = UserRep().select(user_id)
    # checking if there is already the movie in
    movie = MovieRep().select_by_api_id(movie_api_id)
    if movie is None:
        movie = Movie(movie_api_id)
        MovieRep().save(movie)
    
    disliked_movie_user = DislikedMovieUser(movie, user)

    # adding movie to user (dislike relationship)
    DislikedMovieUserRep().save(disliked_movie_user)
    return dumps({"success": True}), 200, {'Content-type': 'application/json'}

@user_movies_blueprint.route("/api/add-liked-movie/", methods=['POST'])
def add_liked_movie():
    data = loads(request.data)
    movie_api_id = int(data['movie'])
    user_id = data['user']
    user = UserRep().select(user_id)
    # checking if there is already the movie in
    movie = MovieRep().select_by_api_id(movie_api_id)
    if movie is None:
        movie = Movie(movie_api_id)
        MovieRep().save(movie)
    
    liked_movie_user = LikedMovieUser(movie, user)
    # adding movie to user (like relationship)
    LikedMovieUserRep().save(liked_movie_user)
    return dumps({"success": True}), 200, {'Content-type': 'application/json'}

@user_movies_blueprint.route("/api/add-seen-movie/", methods=['POST'])
def add_seen_movie():
    data = loads(request.data)
    movie_api_id = int(data['movie'])
    user_id = data['user']
    user = UserRep().select(user_id)
    # checking if there is already the movie in
    movie = MovieRep().select_by_api_id(movie_api_id)
    if movie is None:
        movie = Movie(movie_api_id)
        MovieRep().save(movie)
    
    seen_movie_user = SeenMovieUser(movie, user)

    # adding movie to user (seen relationship)
    SeenMovieUserRep().save(seen_movie_user)
    return dumps({"success": True}), 200, {'Content-type': 'application/json'}

@user_movies_blueprint.route("/api/remove-seen-movie/", methods=['DELETE'])
def remove_seen_movie():
    data = loads(request.data)
    movie_api_id = int(data['movie'])
    user_id = data['user']
    movie_id = MovieRep().select_by_api_id(movie_api_id).id
    SeenMovieUserRep().delete_by_user_id_and_movie_id(user_id, movie_id)
    return dumps({"success": True}), 200, {'Content-type': 'application/json'}

@user_movies_blueprint.route("/api/remove-liked-movie/", methods=['DELETE'])
def remove_liked_movie():
    data = loads(request.data)
    movie_api_id = int(data['movie'])
    user_id = data['user']
    movie_id = MovieRep().select_by_api_id(movie_api_id).id
    LikedMovieUserRep().delete_by_user_id_and_movie_id(user_id, movie_id)
    return dumps({"success": True}), 200, {'Content-type': 'application/json'}


@user_movies_blueprint.route("/api/remove-disliked-movie/", methods=['DELETE'])
def remove_disliked_movie():
    data = loads(request.data)
    movie_api_id = int(data['movie'])
    user_id = data['user']
    movie_id = MovieRep().select_by_api_id(movie_api_id).id
    DislikedMovieUserRep().delete_by_user_id_and_movie_id(user_id, movie_id)
    return dumps({"success": True}), 200, {'Content-type': 'application/json'}
