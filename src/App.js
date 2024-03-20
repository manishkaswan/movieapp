import React, { useEffect, useState, useRef } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const retryTimeoutRef = useRef(null);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://swapi.dev/api/people');
      if (res.status === 200) {
        setMovies(res.data.results);
        setLoading(false);
        setError(null);
      } else {
        throw new Error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Something went wrong ....Retrying');
      setLoading(false);
      setError(error);
      retryFetch();
    }
  };

  const retryFetch = () => {
    retryTimeoutRef.current = setTimeout(fetchMovies, 5000);
  };

  const cancelRetry = () => {
    if (retryTimeoutRef.current) {
      clearTimeout(retryTimeoutRef.current);
    }
  };


  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovies}>Fetch Movies</button>
        <button onClick={cancelRetry}>Cancel Retry</button>
      </section>
      <section>
        {loading && <p>Loading...</p>}
        {!loading && movies.length === 0 && <p>No movies found</p>}
        {error && <p>Error: {error.message}</p>}
        {!loading && !error && <MoviesList movies={movies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
