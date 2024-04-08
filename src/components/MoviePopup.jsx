import React from 'react'
import { FaTimesCircle } from "react-icons/fa";
import { ImageUrl } from '../services/movieServices';

const MoviePopup = ({ movie, onClose }) => {
    const{ title, backdrop_path, poster_path, overview, release_date } = movie
    const bd = backdrop_path || poster_path
  return (
    <>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[340px] h-[380px] sm:w-[340px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px] rounded-lg bg-gray-800 overflow-y-scroll scroll-smooth scroll scrollbar-hide px-4 py-6">
            <div className="absolute top-2 right-2">
                <button onClick={onClose}><FaTimesCircle size={25} className="text-gray-300" /></button>
            </div>
            <h2 className="text-white text-3xl font-bold p-4 font-nsans-bold">{title}</h2>
            <div className="w-full px-4 py-4">
                <img className="w-full h-full block object-cover object-center rounded-lg" src={ImageUrl(bd, 'w500')} alt={title} />
            </div>
            <div className="px-4">
            <p className="font-nsans-medium text-red-600">Description</p>
            <p className="text-white  w-full py-4 px-1 font-nsans-regular text-justify text-sm">{overview}</p>
            <p className="font-nsans-medium text-red-600">Release Date</p>
            <p className="py-2 font-nsans-regular text-sm">{release_date}</p>

            </div>
            
      </div>
    </>
  )
}

export default MoviePopup;