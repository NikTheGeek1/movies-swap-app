export const chooseMovie = (genresMovies, seenMovies, likedMovies, dislikedMovies, filters) => {
    const genresMoviesCopied = [...genresMovies];
    const genres = genresMoviesCopied.shift().genres;
    const pages = genresMoviesCopied;
    let chosenMovie;
    for (const page of pages) {
        const results = page.results.find(movie => {
            
            return (
                isNotLiked(movie.id, likedMovies) &&
                isNotDisliked(movie.id, dislikedMovies) &&
                isNotSeen(movie.id, seenMovies) &&
                inYearRange(movie, filters.years) && 
                hasGenre(movie, filters.genres, genres) && 
                inScoreRange(movie, filters.scores)
            );
        });
        if (results) {
            chosenMovie = results;
            return chosenMovie;
        }
        
    }
};


const inYearRange = (movie, yearRange) => {
    const movieYear = +movie.release_date.slice(0, 4);
    if (movieYear >= yearRange.from && movieYear <= yearRange.to) return true;
};

const hasGenre = (movie, filteredGenres, genreCodes) => {
    const movieGenres = getGenres(movie, genreCodes);
    return movieGenres.some(gn => filteredGenres.includes(gn));
};

const getGenres = (movie, genreCodes) => {
    const genreObj = genreCodes.filter(gCode => movie.genre_ids.includes(gCode.id));
    return genreObj.map(obj => obj.name);
};

const inScoreRange = (movie, scoreRange) => {
    const movieScore = movie.vote_average;
    if (movieScore >= scoreRange.from && movieScore <= scoreRange.to) return true;
};

const isNotSeen = (movie, seenMovies) => {
    return !seenMovies.includes(movie);
};

const isNotDisliked = (movie, dislikedMovies) => {
    return !dislikedMovies.includes(movie);
};

const isNotLiked = (movie, likedMovies) => {
    return !likedMovies.includes(movie);
};