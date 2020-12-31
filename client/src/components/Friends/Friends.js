import { useEffect, useState } from 'react';
import './Friends.css';
import { fetchFriends, removeFriend, fetchFriendWithMovies } from '../../utils/friends';
import { useStore } from '../../hooks-store/store';
import AddFriend from './AddFriend/AddFriend';

const Friends = () => {
    const [globalState, dispatch] = useStore();
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        fetchFriends(globalState.userId, data => setFriends(data.friends));
    }, []);

    const removefriendFromListHandler = friendId => {
        removeFriend(friendId, globalState.userId, data => setFriends(data.friends));
    };

    const toggleSyncWithFriendHandler = friendId => {
        const updatedSyncedFriends = globalState.syncedFriends.filter(friend => friend.id !== friendId);
        // if there was the friend already synced
        if (updatedSyncedFriends.length < globalState.syncedFriends.length) {
            return dispatch('SET_SYNCED_FRIENDS', updatedSyncedFriends);
        }
        // else add them
        fetchFriendWithMovies(globalState.userId, friendId, data => {
            updatedSyncedFriends.push(data.friend);
            dispatch('SET_SYNCED_FRIENDS', updatedSyncedFriends);
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
                            color: globalState.syncedFriends.some(syncedFriend => syncedFriend.id === friend.id) ? 'green' : 'gray',
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


    return (
        <div className="friends-container">
            <div className="friends-list-container">
                <h3>Friends <hr /></h3>
                <ul className="friends-list">
                    {friendsList}
                </ul>
            </div>
            <AddFriend userId={globalState.userId} onAddFriend={setFriends} />
        </div>
    );
};

export default Friends;