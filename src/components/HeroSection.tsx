import React from "react";
import video1 from "../assets/teaVid1.mp4";
import video2 from "../assets/teaVid2.mp4";
import '/Users/user/Desktop/virtualr-main/src/components/HeroSection.css'



const HeroSection = () => {
  return (
    <div>
    <div className="hero-section">
      <div className="hero-section-content flex flex-col items-center mt-6 lg:mt-20">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
          Thé Tip Top
          <span className="bg-gradient-to-r from-orange-500 to-red-800 text-transparent bg-clip-text">
            {" "}
            Pour les amateurs de thé
          </span>
        </h1>
        <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
          Pour les amateurs de thé Pour les amateurs de thé Pour les amateurs de thé
        </p>
        <div className="flex justify-center my-10">
          <a
            href="#"
            className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md"
          >
            Start for free
          </a>
          <a href="#" className="py-3 px-4 mx-3 rounded-md border">
            Documentation
          </a>
        </div>
      </div>

      {/* Vidéos hors de la section hero */}
     
    </div>
    <div className="flex mt-10 justify-center">
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          autoPlay
          loop
          muted
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        >
          <source src={video2} type="video/mp4" />
          Your browser ne prend pas en charge la balise vidéo.
        </video>
      </div>
    </div>
  );
};

export default HeroSection;
