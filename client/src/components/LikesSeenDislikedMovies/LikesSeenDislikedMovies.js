import { Link, Route } from 'react-router-dom';
import ListMovies from '../ListMovies/ListMovies';
import { useStore } from '../../hooks-store/store';

import './LikesSeenDislikedMovies.css';

const LikesSeenDislikedMovies = () => {
    const globalState = useStore()[0];

    return (
        <div className="likes-seen-disliked-movies-container">
            <div className="movie-links-container">
                <Link className="movie-link" to="/movie-swap/liked-movies">Liked movies</Link>
                <Link className="movie-link" to="/movie-swap/disliked-movies">Disliked movies</Link>
                <Link className="movie-link" to="/movie-swap/seen-movies">Seen movies</Link>
            </div>
            <div className="movie-links-results">
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
            </div>
        </div>
    );
};

export default LikesSeenDislikedMovies;