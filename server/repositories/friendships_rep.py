from db.run_sql import run_sql
from models.user import User
from models.friendship import Friendship
from repositories.user_rep import UserRep

class FriendshipRep:
    def __init__(self):
        self.table = 'friendships'

    def save(self, friendship):
        sql = f"INSERT INTO {self.table} " + "(user_id, befriended_id) VALUES (%s, %s) RETURNING id"
        values = [friendship.user.id, friendship.befriended.id]
        results = run_sql(sql, values)
        friendship.id = results[0]['id']
        return friendship

    def select_all(self):
        friendships = []
        sql = f"SELECT * FROM {self.table}"
        results = run_sql(sql)

        for row in results:
            user = UserRep().select(row['user_id'])
            befriended = UserRep().select(row['befriended_id'])
            friendship = Friendship(
                user,
                befriended,
                row["id"],
            )
            friendships.append(friendship)
        return friendships

    def select(self, id):
        friendship = None
        sql = f"SELECT * FROM {self.table} " + "WHERE id = %s"
        values = [id]
        result = run_sql(sql, values)[0]

        if result is not None:
            user = UserRep().select(result['user_id'])
            befriended = UserRep().select(result['befriended_id'])
            friendship = Friendship(
                user,
                befriended,
                result["id"],
            )
        return friendship
        
    def select_by_friend_id_and_user_id(self, friend_id, user_id):
        friendship = None
        sql = f"SELECT * FROM {self.table} " + "WHERE user_id = %s AND befriended_id = %s"
        print(friend_id, user_id)
        values = [user_id, friend_id]
        result = run_sql(sql, values)

        if len(result) != 0:
            result = result[0]
            user = UserRep().select(result['user_id'])
            befriended = UserRep().select(result['befriended_id'])
            friendship = Friendship(
                user,
                befriended,
                result["id"],
            )
        return friendship

    def delete_all(self):
        sql = f"DELETE FROM {self.table}"
        run_sql(sql)


    def delete(self, id):
        sql = f"DELETE FROM {self.table} " + "WHERE id = %s"
        values = [id]
        run_sql(sql, values)

    def delete_by_friend_id_and_user_id(self, friend_id, user_id):
        sql = f"DELETE FROM {self.table} " + "WHERE user_id = %s AND befriended_id = %s"
        values = [user_id, friend_id]
        run_sql(sql, values)