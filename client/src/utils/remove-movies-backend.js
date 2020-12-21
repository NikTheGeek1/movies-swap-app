export const removeMovie = (type, movie, user, cb) => {
    let url;
    if (type === 'disliked') {
        url = 'http://localhost:5000/api/remove-disliked-movie/';
    } else if (type === 'liked') {
        url = 'http://localhost:5000/api/remove-liked-movie/';
    } else if (type === 'seen') {
        url = 'http://localhost:5000/api/remove-seen-movie/';
    } else {
        throw new Error("Wrong 'type' argument in remove-movies-backend.js");
    }
    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ movie, user })
    })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                cb();
            } else {
                throw new Error (`Success: ${data.success} in add-movies-backend.js line 14`)
            }

        })
        .catch(err => console.log(err))
}