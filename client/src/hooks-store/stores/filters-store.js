import { initStore } from '../store';
import { GENRES } from '../../constants/genres';

const configureStore = () => {
    const actions = {
        TOGGLE_GENRE_FILTERS: (curState, genre) => {
            let updatedGenres;
            if (curState.genres.includes(genre)) {
                updatedGenres = curState.genres.filter(gn => gn !== genre);
            } else {
                updatedGenres = [...curState.genres, genre];
            }
            return { ...curState, genres: updatedGenres };
        },
        SET_YEAR_RANGE: (curState, yearsArr) => {

            return { ...curState, years: { from: Math.round(yearsArr[0]), to: Math.round(yearsArr[1]) } };
        },
        SET_SCORE_RANGE: (curState, scoresArr) => {
            return { ...curState, scores: { from: scoresArr[0].slice(0, 3), to: scoresArr[1].slice(0, 3) } };
        }
    }
    initStore(actions, { genres: GENRES, years: { from: 1980, to: 2020 }, scores: { from: 6, to: 8 } });
}


export default configureStore;