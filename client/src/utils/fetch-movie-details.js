import TMDbApi from '../constants/TMDbApi';

export const fetchMovieDetails = (mvId, cb) => {
    fetch(`https://api.themoviedb.org/3/movie/${mvId}?api_key=${TMDbApi}&language=en-US`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        cb(data);
    })
    .catch(err => console.log(err));
};

export const fetchMoveCredits = (mvId, cb) => {
    fetch(`https://api.themoviedb.org/3/movie/${mvId}/credits?api_key=${TMDbApi}&language=en-US`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        cb(data);
    })
    .catch(err => console.log(err));
};