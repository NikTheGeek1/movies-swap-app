import './Genres.css';

import { GENRES } from '../../constants/genres';

const Genres = ({ onSetGenres, genres }) => {

    const genresJSX = GENRES.map(genre => {
        // console.log(genres, 'Genres.js', 'line: ', '11');
        if (genres.includes(genre)) {
            return <div className="genre selected" key={genre} onClick={() => onSetGenres(genre)}>{genre}</div>;
        }
        return <div className="genre" key={genre} onClick={() => onSetGenres(genre)}>{genre}</div>;
    });

    return (
        <div>
            {genresJSX}
        </div>
    );
};

export default Genres;