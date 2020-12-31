import { initStore } from '../store';

const configureStore = () => {
    const actions = {
        SET_SYNCED_FRIENDS: (curState, syncedFriends) => {
            return { syncedFriends: syncedFriends };
        }
    }
    initStore(actions, { syncedFriends: [] });
}


export default configureStore;