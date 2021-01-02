import { Link, Route } from 'react-router-dom';
import ListMovies from '../ListMovies/ListMovies';
import { useStore } from '../../hooks-store/store';

import './LikesSeenDislikedMovies.css';

const LikesSeenDislikedMovies = () => {
    const globalState = useStore()[0];

    return (
        <div className="likes-seen-disliked-movies-container">
            <div className="liked-movies-container">
                <p className="movie-link">Liked movies</p>
                {globalState.movies && 
                <ListMovies type="liked" movies={globalState.movies.likedMovies} userId={globalState.userId}
                    />}
            </div>

            <div className="disliked-movies-container">
                <p className="movie-link">Disliked movies</p>
                {globalState.movies && 
                <ListMovies type="disliked" movies={globalState.movies.dislikedMovies} userId={globalState.userId}
                    />}
            </div>

            <div className="seen-movies-container">
                <p className="movie-link">Seen movies</p>
                {globalState.movies && 
                <ListMovies type="seen" movies={globalState.movies.seenMovies} userId={globalState.userId}
                    />}
            </div>

        </div>
    );
};

export default LikesSeenDislikedMovies;