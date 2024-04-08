import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
    const { user, logOut } = UserAuth();
    const navigate = useNavigate();

    const handleLogout = async () =>{
        try{
            await logOut();
            navigate("/");
        }catch(e){
            console.log(e);
        }
    }
  return (
    <div className="absolute w-full p-4 flex items-center justify-between z-50">
        <Link to='/'>
            <h1 className="uppercase text-red-600 font-nsans-bold cursor-pointer text-3xl md:text-4xl lg:text-4xl">
                netflix
            </h1>
        </Link>
        

        {user?.email ?(
            <div className="flex items-center h-full">
                <Link to='/profile'>
                    <button className="capitalize pr-3 font-nsans-regular text-white"><FaUserCircle size={25} /></button>
                </Link>
                <div>
                <button onClick={handleLogout} className="capitalize bg-red-600 px-5 py-1 font-nsans-regular rounded-full cursor-pointer text-sm">log out</button>
                </div>
            </div>
        ) : (
            <div className="flex items-center h-full">
                <Link to='/login'>
                    <button className="capitalize pr-4 font-nsans-regular text-sm">login</button>
                </Link>

                <Link to='/signup'>
                    <button className="capitalize bg-red-600 px-5 py-1 font-nsans-regular rounded-full cursor-pointer text-sm">sign up</button>
                </Link>
            </div>
        )
        }
    </div>
  )
}

export default Navbar