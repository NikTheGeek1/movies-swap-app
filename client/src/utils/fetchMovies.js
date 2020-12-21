import TMDbApi from '../constants/TMDbApi';


const fetchGenres = fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDbApi}&language=en-US`);
export const fetchAllMoviesComplete = (cb, numOfPages = 10) => {
    const moviePromises = [];
    moviePromises.push(fetchGenres);
    for (let i = 0; i < numOfPages; i++) {
        moviePromises.push(
            fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDbApi}&language=en-US&page=${i + 1}`)
        );
    }
    Promise.all(moviePromises)
        .then(res => {
            const moviePromises = [];
            for (let i = 0; i < res.length; i++) {
                moviePromises.push(res[i].json());
            }
            Promise.all(moviePromises)
                .then(data => {
                    cb(data);
                })
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
};

export const fetchSpecificMovies = (movies, cb) => {
    const promises = [];
    for (const movie of movies) {
        promises.push(fetch(`https://api.themoviedb.org/3/movie/${movie}?api_key=${TMDbApi}&language=en-US`));
    }
    Promise.all(promises).then(res => {
        const moviePromises = [];
            for (let i = 0; i < res.length; i++) {
                moviePromises.push(res[i].json());
            }
            Promise.all(moviePromises)
                .then(data => {
                    cb(data);
                })
                .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};