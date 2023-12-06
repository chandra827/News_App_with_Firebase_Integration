import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Artical from './Artical';
import Loading from '../Loading/page';

const NewsList = () => {
  const [newsdata, setnewsdata] = useState([]);
  const [loading, setloading] = useState(false);
  const axiosInstance = axios.create({
    baseURL: "https://newsapi.org/v2/",
  });

  const getnewsdata = () => {
    setloading(true);
    try {
      axiosInstance
        .get(`https://flash-breezy-chime.glitch.me/newsdata`)
        .then((res) => {
          setnewsdata(res.data);
          setloading(false);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getnewsdata();
  }, []);

  console.log('news', newsdata);

  return (
    <>
      <div
        className="w-full items-center justify-center"
        style={{
          background: 'url("https://t4.ftcdn.net/jpg/04/75/67/67/240_F_475676739_4uSdpV10kGemUK6JN0MPrWLVOhxyZ49R.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '150px', 
        }}
      >
        <h1 className="text-4xl md:text-5xl lg:text-6xl text-center font-bold text-white mt-20 mb-8">
  <span className="text-red-600">Welcome to</span> The News App
</h1>

      </div>

      {loading && (
        <div className="w-full mt-32">
          <Loading />
        </div>
      )}
      <div className="w-[95%] mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
        {newsdata.map((el) => {
          return <Artical key={el.id} data={el} />;
        })}
      </div>
    </>
  );
};

export default NewsList;
