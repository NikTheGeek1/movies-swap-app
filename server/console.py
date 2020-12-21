from models.user import User
from repositories.user_rep import UserRep
from repositories.movie_rep import MovieRep
from repositories.friendships_rep import FriendshipRep

import pdb; pdb.set_trace()


UserRep().get_disliked_movies(14)
FriendshipRep().select_all()
UserRep().get_friends(1)