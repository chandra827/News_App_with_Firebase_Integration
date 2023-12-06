"use client"

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReadMoreButton from '../pages/news/ReadMoreButton'
import { Toaster, toast } from 'react-hot-toast'
import { UserAuth } from "../context/AuthContext";

const Favourite = () => {
  const { user, authData } = UserAuth();

  const [newsdata, setnewsdata] = useState([])
  const [usernews, setusernews] = useState([])
  const [loading, setloading] = useState(false)

  const getnewsdata = () => {

    setloading(true)
    try {
      axios.get(`https://flash-breezy-chime.glitch.me/favourite`)
        .then(res => {
          if (res) {
            setnewsdata(res.data);
            setloading(false)
          }
        })

    } catch (error) {
      console.log(error)
    }
  }

  const handledelete = (id) => {
    //console.log(id)
    try {
      axios.delete(`https://flash-breezy-chime.glitch.me/favourite/${id}`)
        .then(res => {
          if (res) {
            toast('news deleted !', {
              icon: '❌',
            });
            getnewsdata()
          }
        })
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getnewsdata()


  }, [])

  useEffect(() => {
    if (user) {
      let arr2 = newsdata?.filter((item) => {
        return item.username === user?.displayName && item.useremail === user?.email;
      });
      setusernews(arr2)

    }
  }, [user,newsdata]);

  useEffect(() => {
    if (authData) {
   //   console.log('authDD',authData,newsdata)
      let arr2 = newsdata?.filter((item) => {
        return item.username === authData?.displayName && item.useremail === authData?.email;
      });
      setusernews(arr2)

    }
  }, [authData,newsdata]);
  //console.log('usernews', usernews, user, authData)
  return (
    <>

      {/* <Toaster /> */}
      {usernews.length == 0 && <h1 className='text-gray-600 text-2xl font-semibold text-center mt-24'>{(authData && authData.displayName) || (user && user.displayName)} No news Avilable in Favourite ..!!</h1>}
      <div className='w-[95%] mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10'>
        {usernews && usernews.map((el) =>
          <article className=" h-[100%] flex flex-col w-full relative max-w-sm mx-auto transition-all duration-200 ease-out rounded-lg shadow-md bg-article-light dark:bg-article-dark shadow-article-light-secondary/70 dark:shadow-article-dark-primary/70 hover:shadow-xl hover:shadow-article-light-secondary dark:hover:shadow-dark-primary">
            <a href="#" onClick={() => handledelete(el.id)} className='hover:cursor-pointer justify-end absolute right-5 mt-3'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 bg-gray-400 rounded-lg h-10 text-gray-100 hover:text-red-500 transition-colors duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </a>


            <img src={el.urlToImage} className="object-cover w-full rounded-t-lg h-60 " />



            <div className="flex flex-col flex-1">
              <div className="flex flex-col flex-1 p-5">
                <h2 className="font-serif font-bold text-article-dark dark:text-article-light">{el.title}</h2>
               
              </div>
              <ReadMoreButton data={...el} />
            </div>
          </article>
        )}
      </div>
    </>
  )
}

export default Favourite
