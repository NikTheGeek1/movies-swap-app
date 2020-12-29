import TMDbApi from '../constants/TMDbApi';


export const fetchAllGenres = cb => {
    fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${TMDbApi}&language=en-US`)
    .then(res => {
        return res.json();
    })
    .then(data => {
        cb(data.genres);
    })
    .catch(err => console.log(err));
}

export const fetchAllMovies = (cb, numOfPages = 10, pagesPerFetch = 10) => {
    const moviePromises = [];
    for (let i = (numOfPages - pagesPerFetch); i < numOfPages; i++) {
        let promise = fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${TMDbApi}&language=en-US&page=${i + 1}`);
        moviePromises.push(promise);
    }
    Promise.all(moviePromises)
        .then(res => {
            const moviePromises = [];
            for (let i = 0; i < res.length; i++) {
                moviePromises.push(res[i].json());
            }
            Promise.all(moviePromises)
                .then(data => {
                    const dt = data.filter(d => !d.errors)
                    cb(dt);
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