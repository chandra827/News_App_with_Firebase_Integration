"use client"

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { UserAuth } from "../context/AuthContext";
import { useRouter } from 'next/navigation';

const Signin = () => {
  // Destructuring values from the UserAuth context
  const { user, googleSignIn, logOut ,updateAuthData } = UserAuth();

  // State variables for email, password, and user data
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [checkuser, setcheckusser] = useState([])

  // Access to Next.js router
  const router = useRouter()

  // Function to fetch user data
  const getUser = () => {
    try {
      axios.get(`https://flash-breezy-chime.glitch.me/users`).then(res => {
        setcheckusser(res.data)
      });
    } catch (error) {
      console.log(error)
    }
  }

  // Function to handle login
  const handleLogin = (e) => {
    e.preventDefault()
    
    // Find the user with matching email and password
    const foundUser = checkuser.find((user) => user.email === email && user.password === password);

    // If user found, update authentication data and redirect to home
    if (foundUser) {
      updateAuthData(foundUser)
      toast('User Login successful!', {
        icon: '✔️ ',
      });
      setemail('')
      setpassword('')
      router.push('/')
    } else {
      // Display an error toast for wrong credentials
      toast.error('Wrong credentials !!')
    }
  }

  // Function to handle Google authentication
  const handleGoogleAuth = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }

  // Effect to fetch user data and redirect if user is already authenticated
  useEffect(() => {
    getUser()
    if (user) {
      toast('User Login successful!', {
        icon: '✔️ ',
      });
      router.push('/')
    }
  }, [user])

  return (
    <>
      {/* Toast component for displaying notifications */}
      <Toaster />
      <div>
        <section className="bg-gray-50 dark:bg-gray-900 pt-20">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-auto lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Sign in to your account
                </h1>
                <form method="POST" className="space-y-4 md:space-y-6" action="#">
                  {/* Input fields for email and password */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                    <input value={email} onChange={(e) => setemail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                    <input value={password} onChange={(e) => setpassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  {/* Remember me checkbox and Forgot password link */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label className="text-gray-500 dark:text-gray-300">Remember me</label>
                      </div>
                    </div>
                    <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                  </div>
                  {/* Sign-in button and Google Sign-in button */}
                  <button onClick={handleLogin} type="submit" className="bg-blue-500 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                  <button onClick={handleGoogleAuth} className="px-4 py-2 w-full  border flex justify-center gap-2 border-slate-200 rounded-lg text-slate-700 hover:border-slate-400 hover:text-slate-900 hover:shadow transition duration-150">
                    <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" />
                    <span>Login with Google</span>
                  </button>
                  {/* Sign-up link */}
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Don’t have an account yet? <a href="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

export default Signin
