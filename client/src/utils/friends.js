export const fetchFriends = (userId, cb) => {
    fetch(`https://movie-swap.herokuapp.com/api/get-friends/${userId}`).then(res => res.json())
        .then(data => {
            cb(data);
        })
        .catch(err => console.log(err));
};

export const addFriend = (friendEmail, userId, cb) => {
    fetch(`https://movie-swap.herokuapp.com/api/add-friend`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: friendEmail, userId: userId })
    })
        .then(res => res.json())
        .then(data => {
            cb(data);
        })
        .catch(err => console.log(err));
};

export const removeFriend = (friendId, userId, cb) => {
    fetch(`https://movie-swap.herokuapp.com/api/remove-friend`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ friendId, userId })
    })
        .then(res => res.json())
        .then(data => {
            cb(data);
        })
        .catch(err => console.log(err));
};


export const fetchFriendWithMovies = (userId, friendId, cb) => {
    fetch(`https://movie-swap.herokuapp.com/api/get-friends/${userId}/${friendId}`).then(res => res.json())
        .then(data => {
            cb(data);
        })
        .catch(err => console.log(err));
};

