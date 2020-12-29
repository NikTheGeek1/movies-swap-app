import { useStore } from '../../hooks-store/store';
import './Controlls.css';
import { postMovie } from '../../utils/add-movies-backend';


const Controlls = ({ movieId, userId }) => {
    const dispatch = useStore(false)[1];

    const nopeHandler = () => {
        postMovie('disliked', movieId, userId, () => dispatch('ADD_DISLIKED_MOVIE', movieId))    
    };

    const likedHandler = () => {
        postMovie('liked', movieId, userId, () => dispatch('ADD_LIKED_MOVIE', movieId))    
    };

    const seenHandler = () => {
        postMovie('seen', movieId, userId, () => dispatch('ADD_SEEN_MOVIE', movieId))    
    };

    return (
        <div className="controlls-container">
            <div className="nope-btn" onClick={nopeHandler}>❌</div>
            <div className="seen-btn" onClick={seenHandler}>I've watched</div>
            <div className="like-btn" onClick={likedHandler}>✅</div>
        </div>
    );
};

export default Controlls;