// Import necessary dependencies
"use client"
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation';

// Functional component for Signup
const Signup = () => {
  // State variables for name, email, password, and user data
  const [name, setname] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [checkuser, setcheckusser] = useState([])

  // Access to Next.js router
  const router = useRouter()

  // Function to fetch user data
  const getUser = () => {
    try {
      // Fetch user data from the server
      axios.get(`https://flash-breezy-chime.glitch.me/users`).then(res => {
        setcheckusser(res.data)
      });
    } catch (error) {
      console.log(error)
    }
  }

  // Function to handle user signup
  const handleSignup = (e) => {
    e.preventDefault()
    
    // Create an object with user data
    let obj = {
      name, email, password
    }

    // Check if the user with the same email and password already exists
    const foundUser = checkuser.find((user) => user.email === email && user.password === password);

    // If user already exists, display an error toast
    if (foundUser) {
      toast.error('User already exists!')
      setname('')
      setemail('')
      setpassword('')
      return;
    } else {
      // If user doesn't exist, make a POST request to register the user
      axios.post(`https://flash-breezy-chime.glitch.me/users`, obj)
        .then(res => {
          if (res) {
            toast.success('User registered successfully!')
            setname('')
            setemail('')
            setpassword('')
            router.push('/signin')
          }
        }
      )
    }
  }

  // Effect to fetch user data on component mount
  useEffect(() => {
    getUser()
  }, [])

  // JSX structure for the Signup component
  return (
    <>
      {/* Toast component for displaying notifications */}
      <Toaster />
      <div>
        <section className="bg-gray-50 dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">

            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
              <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
                </h1>
                <form method="POST" className="space-y-4 md:space-y-6" action="#" onSubmit={handleSignup}>
                  {/* Input field for user's name */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                    <input value={name} onChange={(e) => setname(e.target.value)} type="name" name="name" id="name" placeholder="Enter your name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  {/* Input field for user's email */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                    <input value={email} onChange={(e) => setemail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                  </div>
                  {/* Input field for user's password */}
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Enter Password</label>
                    <input value={password} onChange={(e) => setpassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                  </div>
                  {/* Checkbox for accepting terms and conditions */}
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                    </div>
                  </div>
                  {/* Button to submit the signup form */}
                  <button type="submit" className="bg-blue-500 w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button>
                  {/* Link to redirect to the signin page */}
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                    Already have an account? <a href="/signin" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
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

// Export the Signup component
export default Signup
