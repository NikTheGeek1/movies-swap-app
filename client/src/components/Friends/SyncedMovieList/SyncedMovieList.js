import { useEffect, useState } from 'react';
import { useStore } from '../../../hooks-store/store';
import './SyncedMovieList.css';

const SyncedMovieList = ({ syncedFriends }) => {
    const globalState = useStore()[0];
    const [commonMovies, setCommonMovies] = useState([]);


    useEffect(() => {
        const updatedCommonMovies = globalState.movies.likedMovies.filter(myLikedMovie => {
            return syncedFriends.every(syncedFriend => syncedFriend.movies.liked_movies.includes(myLikedMovie));
        });
        setCommonMovies(updatedCommonMovies);
    }, [syncedFriends]);

    const commonMoviesJSX = commonMovies.map(commonMovie => {
        return (
            <li key={commonMovie}>{commonMovie}</li>
        );
    });
    return (
            <ul className="synced-movies-list">
                {commonMoviesJSX}
            </ul>
    );
};

export default SyncedMovieList;