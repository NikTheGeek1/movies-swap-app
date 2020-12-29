from db.run_sql import run_sql
from models.movie import Movie
from models.user import User

class UserRep:
    def __init__(self):
        self.table = "users"

    def save(self, user):
        sql = f"INSERT INTO {self.table} " + "(name, email, password) VALUES (%s, %s, %s) RETURNING id"
        values = [user.name, user.email, user.password]
        results = run_sql(sql, values)
        user.id = results[0]["id"]
        return user

    def select_all(self, sort = False):
        users = []
        sql = f"SELECT * FROM {self.table}"
        results = run_sql(sql)

        for row in results:
            user = User(
                row["name"],
                row["email"],
                row["password"],
                row["id"]
            )
            users.append(user)
        return users

    def select(self, id):
        user = None
        sql = f"SELECT * FROM {self.table} " + "WHERE id = %s"
        values = [id]
        result = run_sql(sql, values)

        if len(result) != 0:
            result = result[0]
            user = User(
                result["name"],
                result["email"],
                result["password"],
                result["id"]
            )
        return user
    
    def select_by_email(self, email):
        user = None
        sql = f"SELECT * FROM {self.table} " + "WHERE email = %s"
        values = [email]
        result = run_sql(sql, values)

        if len(result) != 0:
            result = result[0]
            user = User(
                result["name"],
                result["email"],
                result["password"],
                result["id"]
            )
        return user
        
    def delete_all(self):
        sql = f"DELETE FROM {self.table}"
        run_sql(sql)


    def delete(self, id):
        sql = f"DELETE FROM {self.table} " + "WHERE id = %s"
        values = [id]
        run_sql(sql, values)
    
    def update(self, user_name, user_email, user_password, user_id):
        sql = f"UPDATE {self.table} " + "SET (name, email, password) = (%s, %s, %s) WHERE id = %s"
        values = [user_name, user_email, user_password, user_id]
        run_sql(sql, values)
    

    def get_liked_movies(self, user_id):
        movies = []
        sql = """
        SELECT movies.* FROM movies
        INNER JOIN liked_movies_users ON movies.id = liked_movies_users.movie_id
        INNER JOIN users ON liked_movies_users.user_id = users.id
        WHERE users.id = %s
        """
        values = [user_id]
        results = run_sql(sql, values)

        for row in results:
            movie = Movie(row['api_id'], row["id"])
            movies.append(movie)
        return movies

    def get_disliked_movies(self, user_id):
        movies = []
        sql = """
        SELECT movies.* FROM movies
        INNER JOIN disliked_movies_users ON movies.id = disliked_movies_users.movie_id
        INNER JOIN users ON disliked_movies_users.user_id = users.id
        WHERE users.id = %s
        """
        values = [user_id]
        results = run_sql(sql, values)

        for row in results:
            movie = Movie(row['api_id'], row["id"])
            movies.append(movie)
        return movies

    def get_seen_movies(self, user_id):
        movies = []
        sql = """
        SELECT movies.* FROM movies
        INNER JOIN seen_movies_users ON movies.id = seen_movies_users.movie_id
        INNER JOIN users ON seen_movies_users.user_id = users.id
        WHERE users.id = %s
        """
        values = [user_id]
        results = run_sql(sql, values)

        for row in results:
            movie = Movie(row['api_id'], row["id"])
            movies.append(movie)
        return movies
    
    def get_liked_movies_array(self, user_id):
        movies = []
        sql = """
        SELECT movies.* FROM movies
        INNER JOIN liked_movies_users ON movies.id = liked_movies_users.movie_id
        INNER JOIN users ON liked_movies_users.user_id = users.id
        WHERE users.id = %s
        """
        values = [user_id]
        results = run_sql(sql, values)

        for row in results:
            movie = row['api_id']
            movies.append(movie)
        return movies

    def get_disliked_movies_array(self, user_id):
        movies = []
        sql = """
        SELECT movies.* FROM movies
        INNER JOIN disliked_movies_users ON movies.id = disliked_movies_users.movie_id
        INNER JOIN users ON disliked_movies_users.user_id = users.id
        WHERE users.id = %s
        """
        values = [user_id]
        results = run_sql(sql, values)

        for row in results:
            movie = row['api_id']
            movies.append(movie)
        return movies

    def get_seen_movies_array(self, user_id):
        movies = []
        sql = """
        SELECT movies.* FROM movies
        INNER JOIN seen_movies_users ON movies.id = seen_movies_users.movie_id
        INNER JOIN users ON seen_movies_users.user_id = users.id
        WHERE users.id = %s
        """
        values = [user_id]
        results = run_sql(sql, values)

        for row in results:
            movie = row['api_id']
            movies.append(movie)
        return movies

    def get_friends(self, user_id):
        friends = []
        sql = """
        SELECT befriended.* FROM users AS befriended
        INNER JOIN friendships ON befriended.id = friendships.befriended_id
        INNER JOIN users AS friend ON friendships.user_id = friend.id
        WHERE friend.id = %s
        """
        values = [user_id]
        results = run_sql(sql, values)

        for row in results:
            name = row['name']
            email = row['email']
            id = row['id']

            friends.append({'name': name, 'email': email, 'id': id})
        return friends

    def get_friend(self, user_id, friend_id):
        friend = None
        sql = """
        SELECT befriended.* FROM users AS befriended
        INNER JOIN friendships ON befriended.id = friendships.befriended_id
        INNER JOIN users AS friend ON friendships.user_id = friend.id
        WHERE friend.id = %s AND befriended.id = %s
        """
        values = [user_id, friend_id]
        results = run_sql(sql, values)

        if results is not None:
            if len(results) == 1:
                result = results[0]
                name = result['name']
                email = result['email']
                id = result['id']
                liked_movies = self.get_liked_movies_array(friend_id)
                seen_movies = self.get_seen_movies_array(friend_id)
                disliked_movies = self.get_disliked_movies_array(friend_id)
                friend = {'name': name, 'email': email, 'id': id, 'movies' : {'liked_movies': liked_movies, 'disliked_movies': disliked_movies, 'seen_movies': seen_movies}}
            else:
                print('results are more than 1 in user_rep.py get_friend')
        
        return friend