import axios from 'axios';
import React, { useEffect, useState } from 'react'
import MovieItem from './MovieItem';

const Movie = ( {title, url, onEyeClick } ) => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get(url).then((response) => setMovies(response.data.results));
    },[url]);

  return (
    <>
        <h2 className="font-nsans-bold md:text-xl p-4 capitalize">{title}</h2>
        <div className="relative flex items-center ml-2" >
            <div
                id={`slider`}
                className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scroll scrollbar-hide"
            >
                {movies.map((movie) =>{
                    return <MovieItem key={movie.id}  movie={movie} onEyeClick={onEyeClick} />
                } )}
            </div>
        </div>
    </>
  )
}

export default Movie