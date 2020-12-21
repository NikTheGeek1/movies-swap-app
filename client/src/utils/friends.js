export const fetchFriends = (userId, cb) => {
    fetch(`http://localhost:5000/api/get-friends/${userId}`).then(res => res.json())
        .then(data => {
            cb(data);
        })
        .catch(err => console.log(err));
};

export const addFriend = (friendEmail, userId, cb) => {
    fetch(`http://localhost:5000/api/add-friend`, {
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
    fetch(`http://localhost:5000/api/remove-friend`, {
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