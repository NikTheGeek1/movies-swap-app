export const fetchUserMovies = (userId, cb) => {
    fetch(`http://localhost:5000/api/get-movies/${userId}`)
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