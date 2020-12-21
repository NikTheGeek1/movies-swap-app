from db.run_sql import run_sql
from models.disliked_movies_users import DislikedMovieUser
from models.user import User
from models.movie import Movie

from repositories.movie_rep import MovieRep
from repositories.user_rep import UserRep

class DislikedMovieUserRep:
    def __init__(self):
        self.table = 'disliked_movies_users'

    def save(self, disliked_movie_user):
        sql = f"INSERT INTO {self.table} " + "(movie_id, user_id) VALUES (%s, %s) RETURNING id"
        values = [disliked_movie_user.movie.id, disliked_movie_user.user.id]
        results = run_sql(sql, values)
        disliked_movie_user.id = results[0]['id']
        return disliked_movie_user

    def select_all(self):
        disliked_movies_users = []
        sql = f"SELECT * FROM {self.table}"
        results = run_sql(sql)

        for row in results:
            movie = MovieRep().select(row['movie_id'])
            user = UserRep().select(row['user_id'])
            disliked_movie_user = DislikedMovieUser(
                movie,
                user,
                row["id"],
            )
            disliked_movies_users.append(disliked_movie_user)
        return disliked_movies_users

    def select(self, id):
        disliked_movie_user = None
        sql = f"SELECT * FROM {self.table} " + "WHERE id = %s"
        values = [id]
        result = run_sql(sql, values)[0]

        if result is not None:
            movie = MovieRep().select(result['movie_id'])
            user = UserRep().select(result['user_id'])
            disliked_movie_user = DislikedMovieUser(
                movie,
                user,
                result["id"],
            )
        return disliked_movie_user
        
    def delete_all(self):
        sql = f"DELETE FROM {self.table}"
        run_sql(sql)


    def delete(self, id):
        sql = f"DELETE FROM {self.table} " + "WHERE id = %s"
        values = [id]
        run_sql(sql, values)

    def delete_by_user_id_and_movie_id(self, user_id, movie_id):
        sql = f"DELETE FROM {self.table} " + "WHERE user_id = %s AND movie_id = %s"
        values = [user_id, movie_id]
        run_sql(sql, values) 
