import { useStore } from '../../hooks-store/store';
import './ListMovies.css';
import { fetchSpecificMovies } from '../../utils/fetchMovies';
import { useEffect, useState } from 'react';
import { removeMovie } from '../../utils/remove-movies-backend';
import SmallMovie from '../SmallMovie/SmallMovie';

const ListMovies = ({ movies, type, userId }) => {
    const dispatch = useStore()[1];
    const [fetchedMovies, setFetchedMovies] = useState([]);

    useEffect(() => {
        if (movies.length) {
            fetchSpecificMovies(movies, data => setFetchedMovies(data));
        }
    }, [movies]);

    const removeMovieFromListHandler = movieId => {
        removeMovie(type, movieId, userId, () => dispatch('REMOVE_MOVIE', { type: type + 'Movies', movieId: movieId }));
    };

    let listItems = <p style={{textAlign: 'center'}}>{`No ${type} movies yet`}</p>;
    if (fetchedMovies.length) {
        listItems = fetchedMovies.map(movie => {
            return (
                <SmallMovie key={movie.id} movie={movie} onRemoveMovie={removeMovieFromListHandler} />
            );
        });
    }

    return (
        <ul className="small-mvs-list">
            {listItems}
        </ul>
    );
};

export default ListMovies;