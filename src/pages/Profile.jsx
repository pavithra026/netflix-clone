import React, { useEffect, useState } from 'react'
import { MdChevronLeft, MdChevronRight} from 'react-icons/md'
import { AiOutlineClose } from 'react-icons/ai'
import { UserAuth } from '../context/AuthContext'
import { arrayRemove, doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { FaUserCircle } from "react-icons/fa";
import { ImageUrl } from '../services/movieServices'
import { FaTimesCircle } from "react-icons/fa";


const Profile = () => {
  const [movies, setMovies] = useState([]);
  const { user } = UserAuth();
  useEffect(() => {
    
    if(user) {
      onSnapshot(doc(db,"users", `${user.email}`), (doc) => {
        if(doc.data()) setMovies(doc.data().favShows);
      })
    }
  }, [user?.email])

    if(!user){
      return(
        <>
          <p>Fetching movies...</p>
        </>
      )
    }

    const handleRemoveLikedShow = async (movie) => {
      const userDoc = doc(db, "users", user.email);

      await updateDoc(userDoc, {
        favShows: arrayRemove(movie),
      })
    }

    console.log(movies)

  return (
    <>

      <div className="w-full h-screen">
      <img 
        className='w-full h-[200px] object-cover object-center brightness-50'
        src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_medium.jpg" 
        />
        <div className="absolute top-[15%] flex items-center mt-2 gap-3 p-4">
              <FaUserCircle size={40} />
              <p className="text-xl text-white">{user?.email}</p>
            </div>
        <div className='mx-auto p-2 bg-black/100 rounded-sm'>
          
          <div className='p-3'>
            <p className="text-xl text-white mt-10 font-nsans-bold">My Wishlist</p>
            <div className="mt-4">
              <div className="relative flex items-center ml-2" >
                <div
                    className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scroll scrollbar-hide"
                >
                    {movies.map((movie) =>(
                      <div key={movie.id} className="relative w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block rounded-lg overflow-hidden cursor-pointer m-2">
                        <img
                            className="w-full h-40 block object-cover object-center" 
                            src={ImageUrl(movie.backdrop_path ?? movie.poster_path, "w500")} 
                            alt={movie.title}
                        />
                        <div className="absolute top-0 left-0 w-full h-40 bg-black/60 opacity-0 hover:opacity-100">
                            <p className="ml-2 font-nsans-bold whitespace-normal text-xs md:text-sm flex justify-center items-center h-full">{movie.title}</p>
                            <button onClick={() => handleRemoveLikedShow(movie)}><FaTimesCircle size={20} className="absolute top-2 right-2 text-gray-300" /></button>
                        </div>
                      </div>    
                    ) )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </> 
  )
}

export default Profile