import React, { useState } from 'react'
import Hero from '../components/Hero'
import Movie from '../components/Movie';
import MovieItem from '../components/MovieItem';
import endpoints from '../services/movieServices';
import MoviePopup from '../components/MoviePopup';

const Home = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleEyeClick = (movie) =>{
    setSelectedMovie(movie);
  };
  const closeMovieDetails = () =>{
    setSelectedMovie(null);
  }
  return (
    <>
      <Hero />
      <Movie title='upcoming' url={endpoints.upcoming} onEyeClick={handleEyeClick} />
      <Movie title='popular now' url={endpoints.popular} onEyeClick={handleEyeClick} />
      <Movie title='trending' url={endpoints.trending} onEyeClick={handleEyeClick} />
      <Movie title='comedy' url={endpoints.comedy} onEyeClick={handleEyeClick} />
      <Movie title='top rated' url={endpoints.topRated} onEyeClick={handleEyeClick} />
      {selectedMovie && <MoviePopup movie={selectedMovie} onClose={closeMovieDetails} />}
    </>
  );
};

export default Home
