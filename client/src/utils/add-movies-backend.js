export const postMovie = (type, movie, user, cb) => {
    let url;
    if (type === 'disliked') {
        url = 'https://movie-swap.herokuapp.com/api/add-disliked-movie/';
    } else if (type === 'liked') {
        url = 'https://movie-swap.herokuapp.com/api/add-liked-movie/';
    } else if (type === 'seen') {
        url = 'https://movie-swap.herokuapp.com/api/add-seen-movie/';
    } else {
        throw new Error("Wrong 'type' argument in add-movies-backend.js");
    }
    fetch(url, {
        method: 'POST',
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