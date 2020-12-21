import { useEffect, useState } from 'react';
import './Friends.css';
import { fetchFriends, removeFriend } from '../../utils/friends';
import { useStore } from '../../hooks-store/store';
import AddFriend from './AddFriend/AddFriend';

const Friends = () => {
    const globalState = useStore()[0];
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        fetchFriends(globalState.userId, data => setFriends(data.friends));
    }, []);

    const removefriendFromListHandler = friendId => {
        // TODO: remove from state and backend
        removeFriend(friendId, globalState.userId, data => setFriends(data.friends));
    };

    let friendsList = <h5>You have no friends :( Add a friend</h5>;
    if (friends.length) {
        friendsList = friends.map(friend => {
            return (
            <li key={friend.email}>
                {friend.name}
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
        <div>
            <div>
                <h3>Your friends</h3>
                <ul>
                    {friendsList}
                </ul>
            </div>
            <AddFriend userId={globalState.userId} onAddFriend={setFriends}/>
        </div>
    );
};

export default Friends;