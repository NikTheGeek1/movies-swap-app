import Nouislider from 'nouislider-react';
import "nouislider/distribute/nouislider.css";
import Genres from '../Genres/Genres';

import './SetFilters.css';
import { useStore } from '../../hooks-store/store';

const SetFilters = () => {
    const [state, dispatch] = useStore();

    const yearHandler = yearRange => {
        dispatch('SET_YEAR_RANGE', yearRange);
    };

    const scoreHandler = (scoreRange) => {
        dispatch('SET_SCORE_RANGE', scoreRange);
    };

    const setGenresHandler = genre => {
        dispatch('TOGGLE_GENRE_FILTERS', genre);
    };


    return (
        <div>
            <div style={{width: 400}}>
                <Nouislider
                    id="year-slide"
                    step={1}
                    start={[state.years.from, state.years.to]}
                    connect
                    orientation="horizontal"
                    range={{
                        min: 1980,
                        max: 2020
                    }}
                    onChange={yearHandler}
                />
                <label htmlFor="year-slide">{state.years.from} - {state.years.to}</label>
            </div>
            
            <div style={{width: 400}}>
                <Nouislider
                    id="score-slide"
                    step={.1}
                    start={[state.scores.from, state.scores.to]}
                    connect
                    orientation="horizontal"
                    range={{
                        min: 0,
                        max: 10
                    }}
                    onChange={scoreHandler}
                />
                <label htmlFor="score-slide">{state.scores.from} - {state.scores.to}</label>
            </div>
            <Genres onSetGenres={setGenresHandler} genres={state.genres}/>
        </div>
    );
};

export default SetFilters;