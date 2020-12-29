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
        <div className="filters-main-container">
            <div className="slider-years">
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
                <label className="slider-label" htmlFor="year-slide">Years: {state.years.from} - {state.years.to}</label>
            </div>
            
            <div className="slider-scores">
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
                <label className="slider-label" htmlFor="score-slide">Score: {state.scores.from} - {state.scores.to}</label>
            </div>
            <Genres onSetGenres={setGenresHandler} genres={state.genres}/>
        </div>
    );
};

export default SetFilters;