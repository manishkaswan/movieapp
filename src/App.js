import React, { useEffect, useState, useRef } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';
import axios from 'axios';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newMovie, setNewMovie] = useState({
    title: '',
    director: '',
    releaseYear: ''
  });
  const [isTyping, setIsTyping] = useState(false);
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewMovie((prevMovie) => ({
      ...prevMovie,
      [name]: value
    }));
    setIsTyping(true); // User is typing
  };

  const handleAddMovie = () => {
    console.log(newMovie);
    setIsTyping(false); // User stopped typing, allow fetchMovies
    // Optionally, you can reset the form fields after adding the movie
    setNewMovie({
      title: '',
      director: '',
      releaseYear: ''
    });
  };

  useEffect(() => {
    if (!isTyping) {
      fetchMovies();
    }

    return () => {
      cancelRetry();
    };
  }, [isTyping]); // Only trigger when isTyping changes

  return (
    <React.Fragment>
      <section>
        <form>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={newMovie.title}
            onChange={handleInputChange}
          />
          <label>Director:</label>
          <input
            type="text"
            name="director"
            value={newMovie.director}
            onChange={handleInputChange}
          />
          <label>Release Year:</label>
          <input
            type="text"
            name="releaseYear"
            value={newMovie.releaseYear}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleAddMovie}>
            Add Movie
          </button>
        </form>
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
