import { useEffect, useState } from 'react';
import './RandomMovie.css';
import { fetchMovieDetails, fetchMoveCredits } from '../../utils/fetch-movie-details';
import { getDirectors, getStars, getWriters } from '../../utils/extractCredits';

const RandomMovie = ({ movie }) => {
    const [mvDetails, setMvDetails] = useState({});
    const [mvCredits, setMvCredits] = useState({});

    useEffect(() => {
        fetchMovieDetails(movie.id, data => setMvDetails(data));
        fetchMoveCredits(movie.id, data => setMvCredits(data));
    }, [movie, fetchMovieDetails]);

    let mvGenres;
    if (Object.keys(mvDetails).length) {
        mvGenres = mvDetails.genres.reduce((acc, genre) => acc + genre.name + ' ', '')
    }

    const credits = {};
    if (Object.keys(mvCredits).length) {
        credits['stars'] = getStars(mvCredits.cast);
        credits['writers'] = getWriters(mvCredits.crew);
        credits['directors'] = getDirectors(mvCredits.crew);
    }

    return (
        <div className="mv-item">
            <div className="mv-item-inner">
                <h2 className="mv-title-main">{movie.original_title} <span>({movie.release_date.slice(0, 4)})</span></h2>
                <span className="mv-duration-main">{mvDetails.runtime}m</span>
                <span className="mv-genre-main">{mvGenres}</span>
                <span className="mv-score-main">{mvDetails.vote_average}★</span>
                <img className="mv-img-main" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" />
                <span className="mv-details-main"> <hr/> {mvDetails.overview}</span>
                <span className="mv-director-main"> <hr/> <b>Director</b>(s): {credits.directors}</span>
                <span className="mv-writer-main"><b>Writer</b>(s): {credits.writers}</span>
                <span className="mv-stars-main"><b>Starts</b>: {credits.stars}</span>
            </div>
        </div>
    );
};

export default RandomMovie;