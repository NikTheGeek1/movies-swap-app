export const getDirectors = crew => {
    const directors = crew.filter(person => person.job === 'Director');
    return directors.reduce((acc, director) => acc + director.name + ', ', '');
};


export const getWriters = crew => {
    const writers = crew.filter(person => person.job === 'Writer');
    return writers.reduce((acc, writer) => acc + writer.name + ', ', '');
};

export const getStars = cast => {
    const stars = cast.slice(0, 3);
    return stars.reduce((acc, star) => acc + star.name + ', ', '');
};