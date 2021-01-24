export const fetchUserMovies = (userId, cb) => {
    fetch(`https://movie-swap.web.app/api/get-movies/${userId}`)
        .then(res => {
            return res.json();
        })
        .then(data => {
            if (data.success) {
                cb(data.movies);
            } else {
                new Error ('Server Error -- fetchUserMovies.js -- line: 10')
            }
        })
        .catch(err => console.log(err));
};