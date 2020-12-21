import './RandomMovie.css';

const RandomMovie = ({ movie }) => {
    return (
        <>
            <p>{movie.original_title} {movie.vote_average}⭐️</p>
            <img style={{ width: 100 }} src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" />
        </>
    );
};

export default RandomMovie;