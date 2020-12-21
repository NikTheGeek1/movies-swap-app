import SetFilters from '../../components/SetFilters/SetFilters';
import { useStore } from '../../hooks-store/store';
import './MovieSwap.css';
import RandomMovie from '../../components/RandomMovie/RandomMovie';
import Controlls from '../../components/Controlls/Controlls';
import ListMovies from '../../components/ListMovies/ListMovies';
import { fetchAllMoviesComplete } from '../../utils/fetchMovies';
import { chooseMovie } from '../../utils/chooseMovie';
import { useEffect, useState } from 'react';
import { fetchUserMovies } from '../../utils/fetchUserMovies';
import { Link, Route } from 'react-router-dom';
import Friends from '../../components/Friends/Friends';

const MovieSwap = () => {
    const [globalState, dispatch] = useStore();
    const [movies, setMovies] = useState([]);
    const [curMovie, setCurMovie] = useState(null);

    useEffect(() => {
        const userMovies = { ...globalState.movies };
        if (movies.length && Object.keys(userMovies).length) {
            const filters = { years: globalState.years, scores: globalState.scores, genres: globalState.genres };
            const movie = chooseMovie(movies, userMovies.seenMovies, userMovies.likedMovies, userMovies.dislikedMovies, filters);
            // TODO: get IMDB rating
            setCurMovie(movie);
        }
    }, [
        movies,
        globalState.movies && globalState.movies.dislikedMovies,
        globalState.movies && globalState.movies.likedMovies,
        globalState.movies && globalState.movies.seenMovies
    ]);

    useEffect(() => {
        fetchAllMoviesComplete(data => setMovies(data));
    }, []);

    useEffect(() => {
        fetchUserMovies(globalState.userId, data => dispatch('SET_USER_MOVIES', data)); // {likedMoves, seenMovies, DislikedMovies}
    }, [])

    return (
        <div>
            <div>
                <Link to="/movie-swap/liked-movies">Liked movies</Link>
                <Link to="/movie-swap/disliked-movies">Disliked movies</Link>
                <Link to="/movie-swap/seen-movies">Seen movies</Link>
            </div>
            { curMovie && <RandomMovie movie={curMovie} />}
            <SetFilters />
            { curMovie && <Controlls movieId={curMovie.id} userId={globalState.userId} />}
            {globalState.movies && <Route
                path="/movie-swap/liked-movies"
                render={() => <ListMovies type="liked" movies={globalState.movies.likedMovies} userId={globalState.userId}
                />}
            />}

            {globalState.movies && <Route
                path="/movie-swap/disliked-movies"
                render={() => <ListMovies type="disliked" movies={globalState.movies.dislikedMovies} userId={globalState.userId}
                />}
            />}

            {globalState.movies && <Route
                path="/movie-swap/seen-movies"
                render={() => <ListMovies type="seen" movies={globalState.movies.seenMovies} userId={globalState.userId}
                />}
            />}
            <Friends />
        </div>
    );
};

export default MovieSwap;