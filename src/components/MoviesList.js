import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  console.log(props.movies);
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.name}
          title={movie.name}
          releaseDate={movie.gender}
          openingText={movie.skin_color}
        />
      ))}
    </ul>
  );
};

export default MovieList;
