import React, { useState, useEffect } from 'react'
import { ImageUrl } from '../services/movieServices'
import { FaEye, FaRegHeart, FaHeart  } from "react-icons/fa";
import { arrayUnion, doc, updateDoc, arrayRemove, getDoc} from 'firebase/firestore';
import { db } from '../services/firebase';
import { UserAuth } from '../context/AuthContext';

const MovieItem = ({ movie, onEyeClick}) => {
    const { user } = UserAuth()
    const [like, setLike] = useState(false);
    const { title, backdrop_path, poster_path } = movie;

    useEffect(() => {
      const checkLikedStatus = async () => {
        if (!user) return;
        const userEmail = user.email;
        const userDocRef = doc(db, 'users', userEmail);
        const userDocSnapshot = await getDoc(userDocRef); // Use getDoc to fetch the document snapshot
        const userDocData = userDocSnapshot.data();
        if (userDocData && userDocData.favShows) {
          const isLiked = userDocData.favShows.some(
            (favMovie) => favMovie.id === movie.id
          );
          setLike(isLiked);
        }
      };
      checkLikedStatus();
    }, [user, movie]);

    const likeFavshows = async () => {
      const userEmail = user?.email;

      if(userEmail){
        const userDoc = doc(db, "users", userEmail);
        setLike(!like)
        if (like) { // Movie is liked, add to favShows
          await updateDoc(userDoc, {
            favShows: arrayRemove({ ...movie }), // Use FieldValue for removal
          });
        } else { // Movie is disliked, remove from favShows (assuming 'movie' contains the movie data)
          await updateDoc(userDoc, {
            favShows: arrayUnion({ ...movie }),
          });
        }
      } else{
        alert("Login to save movie to watchlist!");
      }
    }
    const bd = movie.title === "Kung Fu Panda 4" ? "/9mwZwBuGuBslC79UUyeoDTi2xEw.jpg" : backdrop_path;
  return (
    <div className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
        <img
            className="w-full h-40 block object-cover object-center" 
            src={ImageUrl(bd ?? poster_path, "w500")} 
            alt={title}
        />

        <div className="absolute top-0 left-0 w-full h-40 bg-black/60 opacity-0 hover:opacity-100">
            <p className="ml-2 font-nsans-bold whitespace-normal text-xs md:text-sm flex justify-center items-center h-full">{title}</p>

            <button onClick={likeFavshows}>{like ? (
              <FaHeart size={18} className="absolute top-2 right-10 text-gray-300" />
              ) : (
                <FaRegHeart size={18} className="absolute top-2 right-10 text-gray-300" />
              )}
            </button>

            <button onClick={() => onEyeClick(movie)}><FaEye size={20} className="absolute top-2 right-2 text-gray-300" /></button>
        </div>
    </div>
  )
}

export default MovieItem