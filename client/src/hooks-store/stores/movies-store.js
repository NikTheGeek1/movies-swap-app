import { initStore } from '../store';

const configureStore = () => {
    const actions = {
        SET_USER_MOVIES: (curState, fetchedMovies) => {
            return {
                movies: {
                    dislikedMovies: fetchedMovies.disliked_movies,
                    likedMovies: fetchedMovies.liked_movies,
                    seenMovies: fetchedMovies.seen_movies
                }
            };
        },

        ADD_DISLIKED_MOVIE: (curState, movie) => {
            const dislikedMovies = [...curState.movies.dislikedMovies];
            !dislikedMovies.includes(movie) && dislikedMovies.push(movie);
            const movies = { ...curState.movies };
            movies.dislikedMovies = dislikedMovies;
            return { movies: movies };
        },

        ADD_LIKED_MOVIE: (curState, movie) => {
            const likedMovies = [...curState.movies.likedMovies];
            !likedMovies.includes(movie) && likedMovies.push(movie);
            const movies = { ...curState.movies };
            movies.likedMovies = likedMovies;
            return { movies: movies };
        },

        ADD_SEEN_MOVIE: (curState, movie) => {
            const seenMovies = [...curState.movies.seenMovies];
            !seenMovies.includes(movie) && seenMovies.push(movie);
            const movies = { ...curState.movies };
            movies.seenMovies = seenMovies;
            return { movies: movies };
        },

        REMOVE_MOVIE: (curState, payload) => {
            const movieType = payload.type;
            const movieId = payload.movieId;
            const movies = curState.movies[movieType].filter(mvId => mvId !== movieId);
            const allTypesObj = { ...curState.movies };
            allTypesObj[movieType] = movies;
            return { movies: allTypesObj }; 
        }
    }
    initStore(actions, {});
}


export default configureStore;