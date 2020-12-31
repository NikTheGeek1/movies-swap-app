import { useStore } from '../../../hooks-store/store';
import SyncedMovieList from '../SyncedMovieList/SyncedMovieList';

import './SyncedFriends.css';

const SyncedFriends = () => {
    const globalState = useStore()[0];

    let syncedFriendsListJSX = [];
    if (globalState.syncedFriends.length) {
        globalState.syncedFriends.forEach(syncedFriend => {
            syncedFriendsListJSX.push(
                <li key={syncedFriend.id}>{syncedFriend.name}</li>
            );
        });

    }
    return (
        <div className="synced-friends-container">
            <ul className="synced-friends-list">Sinced Friends
                {syncedFriendsListJSX}
            </ul>
            {(globalState.movies && syncedFriendsListJSX) && <SyncedMovieList syncedFriends={globalState.syncedFriends} />}
        </div>
    );
};

export default SyncedFriends;