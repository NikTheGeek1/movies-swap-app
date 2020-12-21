import { useStore } from '../../hooks-store/store';
import './ListMovies.css';
import { fetchSpecificMovies } from '../../utils/fetchMovies';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { removeMovie } from '../../utils/remove-movies-backend';

const ListMovies = ({ movies, type, userId }) => {
    const dispatch = useStore()[1];
    const [fetchedMovies, setFetchedMovies] = useState([]);

    useEffect(() => {
        if (movies.length) {
            fetchSpecificMovies(movies, data => setFetchedMovies(data));
        }
    }, [movies]);

    const removeMovieFromListHandler = movieId => {
        removeMovie(type, movieId, userId, () => dispatch('REMOVE_MOVIE', {type: type+'Movies', movieId: movieId}) );
    };
    let listItems = <p>Please wait</p>;
    if (fetchedMovies.length) {
        listItems = fetchedMovies.map(movie => {
            return (
                <li key={movie.id}>
                    {movie.original_title}
                    <div
                        onClick={() => removeMovieFromListHandler(movie.id)}
                        style={{ display: 'inline-block', color: 'red', cursor: 'pointer' }}>
                        &nbsp;x
                        </div>
                </li>
            );
        });
    }

    return (
        <>
            <Link to="/movie-swap">Hide</Link>
            <ul>
                {listItems}
            </ul>
        </>
    );
};

export default ListMovies;