import React from 'react'
import Hero from '../components/Hero'
import Movie from '../components/Movie';
import endpoints from '../services/movieServices';

const Home = () => {
  return (
    <>
      <Hero />
      <Movie title='upcoming' url={endpoints.upcoming} />
      <Movie title='popular now' url={endpoints.popular} />
      <Movie title='trending' url={endpoints.trending} />
      <Movie title='comedy' url={endpoints.comedy} />
      <Movie title='top rated' url={endpoints.topRated} />
    </>
  );
};

export default Home
