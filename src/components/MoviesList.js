// MoviesList.js

import React from 'react';
import Movie from './Movie';

const MoviesList = (props) => {
  const deleteMovieHandler = (movieId) => {
    props.onDeleteMovie(movieId);
  };

  return (
    <ul>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          openingText={movie.openingText}
          releaseDate={movie.releaseDate}
          onDeleteMovie={() => deleteMovieHandler(movie.id)}
        />
      ))}
    </ul>
  );
};

export default MoviesList;
