import React from 'react';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedinIn, faTwitter } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
  return (
    <>
      <div className="relative bg-gradient-to-r from-blue-400 to-purple-500 border-t-4 mt-10">
  <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
    <div className="relative max-w-2xl sm:mx-auto sm:max-w-xl md:max-w-2xl sm:text-center">
      <h2 className="mb-6 font-sans text-3xl text-center font-semibold text-white sm:text-5xl sm:leading-none">
        Meet the Developer
      </h2>
      <p className="max-w-md mb-10 text-center text-lg text-gray-300 tracking-wide sm:text-sm sm:mx-auto md:mb-16">
        Hi, I'm Chandra Shekhar, a passionate developer creating awesome web experiences. Connect with me and explore the digital world together!
      </p>
      
      {/* Social Icons */}
      <div className="flex justify-center space-x-6">
        <a href="https://github.com/chandra827" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
          <FontAwesomeIcon icon={faGithub} size="2x" />
        </a>
        <a href="https://www.linkedin.com/in/chandra827/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
          <FontAwesomeIcon icon={faLinkedinIn} size="2x" />
        </a>
        <a href="https://twitter.com/Chandra2942" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">
          <FontAwesomeIcon icon={faTwitter} size="2x" />
        </a>
      </div>
      
      {/* Copyright Notice */}
      <div className="text-center text-gray-300 mt-8">
        <p className="text-sm">
          © Chandra, All rights reserved
        </p>
      </div>
    </div>
  </div>
</div>

    
    </>
  )
}

export default Footer
