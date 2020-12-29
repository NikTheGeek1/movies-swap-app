import { useEffect, useState } from 'react';
import './Friends.css';
import { fetchFriends, removeFriend, fetchFriendWithMovies } from '../../utils/friends';
import { useStore } from '../../hooks-store/store';
import AddFriend from './AddFriend/AddFriend';
import SyncedMovieList from './SyncedMovieList/SyncedMovieList';

const Friends = () => {
    const globalState = useStore()[0];
    const [friends, setFriends] = useState([]);
    const [syncedFriends, setSyncedFriends] = useState([]);

    useEffect(() => {
        fetchFriends(globalState.userId, data => setFriends(data.friends));
    }, []);

    const removefriendFromListHandler = friendId => {
        removeFriend(friendId, globalState.userId, data => setFriends(data.friends));
    };

    const toggleSyncWithFriendHandler = friendId => {
        const updatedSyncedFriends = syncedFriends.filter(friend => friend.id !== friendId);
        // if there was the friend already synced
        if (updatedSyncedFriends.length < syncedFriends.length) {
            return setSyncedFriends(updatedSyncedFriends);
        }
        // else add them
        fetchFriendWithMovies(globalState.userId, friendId, data => {
            updatedSyncedFriends.push(data.friend);
            setSyncedFriends(updatedSyncedFriends);
        });
    };



    let friendsList = <h5>You have no friends :( Add a friend</h5>;
    if (friends.length) {
        friendsList = friends.map(friend => {
            return (
                <li key={friend.email}>
                    {friend.name}
                    <div
                        onClick={() => toggleSyncWithFriendHandler(friend.id)}
                        style={{
                            display: 'inline-block',
                            color: syncedFriends.some(syncedFriend => syncedFriend.id === friend.id) ? 'green' : 'gray',
                            cursor: 'pointer'
                        }}>
                        &nbsp;♼
                </div>
                    <div
                        onClick={() => removefriendFromListHandler(friend.id)}
                        style={{ display: 'inline-block', color: 'red', cursor: 'pointer' }}>
                        &nbsp;x
                </div>
                </li>
            );
        });
    }

    let syncedFriendsListJSX = [];
    if (syncedFriends.length) {
        syncedFriends.forEach(syncedFriend => {
            syncedFriendsListJSX.push(
                <li key={syncedFriend.id}>{syncedFriend.name}</li>
            );
        });

    }

    return (
        <div className="friends-container">
            <div className="friends-list-container">
                <h3>Friends <hr /></h3>
                <ul className="friends-list">
                    {friendsList}
                </ul>
            </div>
            <AddFriend userId={globalState.userId} onAddFriend={setFriends} />
            <div className="synced-friends-container">
                <ul className="synced-friends-list">You are synced with:
                {syncedFriendsListJSX}
                </ul>
                {(globalState.movies && syncedFriendsListJSX) && <SyncedMovieList syncedFriends={syncedFriends} />}
            </div>
        </div>
    );
};

export default Friends;