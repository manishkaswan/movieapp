import React, { useEffect, useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  
  const fetchMovies = () => {
    setLoading(true);
    axios.get('https://swapi.dev/api/people')
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
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
        {!loading && <MoviesList movies={movies} />}
        {loading && <p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
