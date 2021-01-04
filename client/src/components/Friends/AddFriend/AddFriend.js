import { useState } from 'react';
import './AddFriend.css';
import { addFriend } from '../../../utils/friends';

const AddFriend = ({ userId, onAddFriend }) => {
    const [email, setEmail] = useState('');
    const [resStatus, setResStatus] = useState({success: null, message: null})

    const addFriendHandler = () => {
        addFriend(email, userId, data => {
            if (data.success) {
                onAddFriend(data.friends);
                setResStatus(data);
            } else {
                setResStatus(data);
            }
        });
    };

    let userFeedback;
    if (resStatus.success === false) {
        userFeedback = <h3>{resStatus.message}</h3>;
    } 

    return (
        <div>
            <label htmlFor="add-friend">Add a friend: </label>
            <input
                required
                type="email"
                id="add-friend"
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
            />
            <button onClick={addFriendHandler}>Add Friend</button>
            {userFeedback}
        </div>
    );
};

export default AddFriend;