import './SmallMovie.css';

const SmallMovie = ({ movie, onRemoveMovie }) => {

    return (
        <li key={movie.id} className="small-mv-container">
            <img className="small-mv-img-main" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`} alt="" />
            <span className="small-mv-title-main">{movie.original_title} <span>({movie.release_date.slice(0, 4)})</span></span>
            <div className="small-mv-delete" onClick={() => onRemoveMovie(movie.id)}>
                x
            </div>
        </li>
    );
};

export default SmallMovie;