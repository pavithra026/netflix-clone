import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

const Signup = () => {
  const [rememberCredentials, setRememberCredentials] = useState(true);
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  const { user, signUp } = UserAuth();
  const navigate = useNavigate();

  const formSubmit = async (e) =>{
    e.preventDefault();
    try{
      await signUp(email, password)
      navigate("/")
    }catch(e){
      console.log(e);
    }
  }
  return (
    <>
      <div className="w-full h-screen">
        <img 
        className="sm:block absolute w-full h-full object-cover object-center"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240311-popsignuptwoweeks-perspective_alpha_website_medium.jpg" 
        />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen" />

        <div className="fixed w-full px-4 py-24 z-20">
          <div className="max-w-[350px] h-[430px] mx-auto bg-black/60 rounded-lg">
            <div className="max-w-[255px] mx-auto py-14">
              <h1 className="text-3xl font-nsans-bold">Sign Up</h1>

              <form onSubmit={formSubmit} className="w-full flex flex-col py-4">
                <input 
                className="p-3 my-2 bg-gray-700 rounded"
                type="email"
                placeholder="Email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                className="p-3 my-2 bg-gray-700 rounded"
                type="password"
                placeholder="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-red-600 py-3 rounded my-6 font-nsans-bold">Sign Up</button>
                <div className="flex justify-between items-center text-gray-600">
                  <p className="text-sm">
                    <input type="checkbox" className="mr-2"  checked={rememberCredentials} onChange={(e) => setRememberCredentials(!rememberCredentials)}/>
                    Remember me
                  </p>
                  <p className="text-sm">
                    Need help?
                  </p>
                </div>
                <p className="my-4">
                  <span className="text-gray-600 mr-2 text-sm">Already subscribed to Netflix?</span>
                  <Link to="/login" className="underline text-sm">Sign In</Link>
                  </p>
              </form>

            </div>

          </div>
        </div>

      </div>
    </>
  )
}

export default Signup