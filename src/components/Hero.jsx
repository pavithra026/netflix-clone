import axios from 'axios';
import React, { useEffect, useState } from 'react'
import endpoints, { ImageUrl } from '../services/movieServices';

const Hero = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios.get(endpoints.popular).then((response) => {
      const movies = response.data.results;
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      setMovie(randomMovie);

    })
  }, []);

  if(!movie){
    return(
      <>
        <p>fetching movie...</p>
      </>
    )
  }

  const slicer = (str, length) =>{
    if(!str) return "";
    return str.length > length? str.slice(0, length) + '...' : str
  };

  const {title, backdrop_path, release_date, overview} = movie;
  return (
    <div className="w-full h-[380px] lg:h-[520px]">
      <div className="w-full h-full">
        <div className="absolute w-full h-[380px] lg:h-[520px] bg-gradient-to-r from-black" />
          <img
            className="w-full h-full object-cover object-top"
            src={ImageUrl(backdrop_path, 'original')} //image url is a function that take in image filename and size. check out services folder!!
            alt={title}
            />
            <div className="absolute w-full top-[20%] lg:top-[45%] p-4 md:p-8 ">
              <h1 className="text-3xl md:text-6xl font-nsans-bold">{title}</h1>
              <div className="mt-7 mb-4"> 
                <button className="capitalize rounded-full border-red-600 bg-red-600 text-black py-2 px-5 transform hover:scale-105 transition duration-300 ease-in-out">Play</button>
                <button class="capitalize rounded-full border border-red-600 text-red-600 py-2 px-5 ml-2 transform hover:scale-105 transition duration-300 ease-in-out">watch later</button>

              </div>
              <p className="text-gray-400 text-sm">{release_date}</p>
              <p className="w-full md:max-w-[70%] lg:max-w-[45%] xl:max-w-[75%] text-gray-200 font-nsans-regular">{slicer(overview, 165)}</p>
            </div>
      </div>
    </div>
  )
}

export default Hero