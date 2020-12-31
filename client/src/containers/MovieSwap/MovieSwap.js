import SetFilters from '../../components/SetFilters/SetFilters';
import { useStore } from '../../hooks-store/store';
import './MovieSwap.css';
import RandomMovie from '../../components/RandomMovie/RandomMovie';
import Controlls from '../../components/Controlls/Controlls';
import { fetchAllMovies, fetchAllGenres } from '../../utils/fetchMovies';
import { chooseMovie } from '../../utils/chooseMovie';
import { useEffect, useState } from 'react';
import { fetchUserMovies } from '../../utils/fetchUserMovies';
import Friends from '../../components/Friends/Friends';
import SyncedFriends from '../../components/Friends/SyncedFriends/SyncedFriends';
import LikesSeenDislikedMovies from '../../components/LikesSeenDislikedMovies/LikesSeenDislikedMovies';

const MovieSwap = () => {
    const [globalState, dispatch] = useStore();
    const [movies, setMovies] = useState([]);
    const [curMovie, setCurMovie] = useState(null);
    const [fetchPages, setFetchPages] = useState(10);
    const [allGenres, setAllGenres] = useState([]);

    useEffect(() => {
        const userMovies = { ...globalState.movies };
        if (movies.length && Object.keys(userMovies).length) {
            const filters = { years: globalState.years, scores: globalState.scores, genres: globalState.genres };
            const movie = chooseMovie(movies, allGenres, userMovies.seenMovies, userMovies.likedMovies, userMovies.dislikedMovies, filters);
            if (!movie) {
                return setFetchPages(oldState => oldState + 10); // fetch every 10 pages. e.g., 0-10, 10-20, 20-30 etc
            }
            // TODO: get IMDB rating
            setCurMovie(movie);
        } else {
            setCurMovie(null);
        }
    }, [
        movies,
        allGenres,
        globalState.movies && globalState.movies.dislikedMovies,
        globalState.movies && globalState.movies.likedMovies,
        globalState.movies && globalState.movies.seenMovies
    ]);

    useEffect(() => {
        fetchAllGenres(data => setAllGenres(data));
    }, []);

    useEffect(() => {
        fetchAllMovies(data => setMovies(data), fetchPages);
    }, [fetchPages]);

    useEffect(() => {
        fetchUserMovies(globalState.userId, data => dispatch('SET_USER_MOVIES', data)); // {likedMoves, seenMovies, DislikedMovies}
    }, [])

    return (
        <div className="container">
            <div className="header">
                <div className="logo">Logo</div>
                <div className="logout-button">Logout</div>
            </div>
            <div className="main">
                <div className="filters-main">
                    <SetFilters />
                </div>
                <div className="movie-main">
                    {curMovie ? <RandomMovie movie={curMovie} /> : <h3>No movies, please change filters. <button onClick={() => setFetchPages(10)}>ℛ</button></h3>}
                    {curMovie && <Controlls movieId={curMovie.id} userId={globalState.userId} />}
                </div>
                <div className="friends-main">
                    <Friends />
                </div>
            </div>
            <div className="footer">
                <LikesSeenDislikedMovies />
                <SyncedFriends />
            </div>
        </div>
    );
};

export default MovieSwap;