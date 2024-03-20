import React, { useEffect, useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([]); // State to hold movies data

  
  const fetchMovies = () => {
    axios.get('https://swapi.dev/api/people')
      .then((res) => {
        setMovies(res.data.results); // Set movies data when the API call is successful
      })
      .catch((error) => {
        console.error('Error fetching movies:', error);
      });
  };
  useEffect(() => {
    fetchMovies();
  },[])

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
