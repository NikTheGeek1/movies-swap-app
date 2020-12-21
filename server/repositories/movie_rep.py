from db.run_sql import run_sql
from models.movie import Movie

class MovieRep:
    def __init__(self):
        self.table = "movies"

    def save(self, movie):
        sql = f"INSERT INTO {self.table} " + "(api_id) VALUES (%s) RETURNING id"
        values = [movie.api_id]
        results = run_sql(sql, values)
        movie.id = results[0]["id"]
        return movie

    def select_all(self, sort = False):
        movies = []
        sql = f"SELECT * FROM {self.table}"
        results = run_sql(sql)

        for row in results:
            movie = Movie(
                row["api_id"],
                row["id"]
            )
            movies.append(movie)
        return movies

    def select(self, id):
        movie = None
        sql = f"SELECT * FROM {self.table} " + "WHERE id = %s"
        values = [id]
        result = run_sql(sql, values)

        if len(result) != 0:
            result = result[0]
            movie = Movie(
                result["api_id"],
                result["id"]
            )
        return movie

    def select_by_api_id(self, api_id):
        movie = None
        sql = f"SELECT * FROM {self.table} " + "WHERE api_id = %s"
        values = [api_id]
        result = run_sql(sql, values)

        if len(result) != 0:
            result = result[0]
            movie = Movie(
                result["api_id"],
                result["id"]
            )
        return movie
        
    def delete_all(self):
        sql = f"DELETE FROM {self.table}"
        run_sql(sql)


    def delete(self, id):
        sql = f"DELETE FROM {self.table} " + "WHERE id = %s"
        values = [id]
        run_sql(sql, values)

    