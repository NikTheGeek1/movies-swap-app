import { useEffect, useState } from 'react';
import { useStore } from '../../../hooks-store/store';
import { fetchSpecificMovies } from '../../../utils/fetchMovies'
import SmallMovie from '../../SmallMovie/SmallMovie';
import './SyncedMovieList.css';

const SyncedMovieList = ({ syncedFriends }) => {
    const globalState = useStore()[0];
    const [commonMovies, setCommonMovies] = useState([]);
    const [fetchedMovies, setFetchedMovies] = useState([]);

    useEffect(() => {
        if (commonMovies.length) {
            fetchSpecificMovies(commonMovies, data => setFetchedMovies(data));
        }
    }, [commonMovies]);



    useEffect(() => {
        const updatedCommonMovies = globalState.movies.likedMovies.filter(myLikedMovie => {
            return syncedFriends.every(syncedFriend => syncedFriend.movies.liked_movies.includes(myLikedMovie));
        });
        setCommonMovies(updatedCommonMovies);
    }, [syncedFriends]);

    let commonMoviesJSX;
    if (fetchedMovies.length) {
        commonMoviesJSX = fetchedMovies.map(movie => {
            return (
                <SmallMovie key={movie.id} movie={movie} onRemoveMovie={false}/>
            );
        });
    }

    return (
            <ul className="synced-movies-list">
                {commonMoviesJSX}
            </ul>
    );
};

export default SyncedMovieList;