import { initStore } from '../store';

const configureStore = () => {
    const actions = {
        LOG_USER_IN: (curState, userId) => {
            return { userLoggedIn: true, userId: userId };
        },
        LOG_USER_OUT: () => {
            return { userLoggedIn: false, userId: null};
        }
    }
    initStore(actions, { userLoggedIn: false, userId: null });
}


export default configureStore;