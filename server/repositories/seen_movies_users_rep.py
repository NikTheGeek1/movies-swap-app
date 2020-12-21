from db.run_sql import run_sql
from models.seen_movies_users import SeenMovieUser
from models.user import User
from models.movie import Movie

from repositories.movie_rep import MovieRep
from repositories.user_rep import UserRep

class SeenMovieUserRep:
    def __init__(self):
        self.table = 'seen_movies_users'

    def save(self, seen_movie_user):
        sql = f"INSERT INTO {self.table} " + "(movie_id, user_id) VALUES (%s, %s) RETURNING id"
        values = [seen_movie_user.movie.id, seen_movie_user.user.id]
        results = run_sql(sql, values)
        seen_movie_user.id = results[0]['id']
        return seen_movie_user

    def select_all(self):
        seen_movies_users = []
        sql = f"SELECT * FROM {self.table}"
        results = run_sql(sql)

        for row in results:
            movie = MovieRep().select(row['movie_id'])
            user = UserRep().select(row['user_id'])
            seen_movie_user = SeenMovieUser(
                movie,
                user,
                row["id"],
            )
            seen_movies_users.append(seen_movie_user)
        return seen_movies_users

    def select(self, id):
        seen_movie_user = None
        sql = f"SELECT * FROM {self.table} " + "WHERE id = %s"
        values = [id]
        result = run_sql(sql, values)[0]

        if result is not None:
            movie = MovieRep().select(result['movie_id'])
            user = UserRep().select(result['user_id'])
            seen_movie_user = SeenMovieUser(
                movie,
                user,
                result["id"],
            )
        return seen_movie_user

    def select_by_user_id_and_movie_id(self, user_id, movie_id):
        seen_movie_user = None
        sql = f"SELECT * FROM {self.table} " + "WHERE user_id = %s AND movie_id = %s"
        values = [user_id, movie_id]
        result = run_sql(sql, values)[0]

        if result is not None:
            movie = MovieRep().select(result['movie_id'])
            user = UserRep().select(result['user_id'])
            seen_movie_user = SeenMovieUser(
                movie,
                user,
                result["id"],
            )
        return seen_movie_user
        
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
