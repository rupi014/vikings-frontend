import React from 'react';
import '../components/styles/banner.css';
import Persona1 from '../assets/images/home_images/persona1.webp';
import Logo from '../assets/images/home_images/logoblanco.webp';
import Persona2 from '../assets/images/home_images/persona2.webp'; 

const Banner = () => {
  return (
    <div className="banner">
      <video autoPlay loop muted className="video-background">
        <source src="https://video.wixstatic.com/video/5cdc44_0fcf410856764076821a5428e4f4565f/1080p/mp4/file.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
      <div className="banner-content">
        <img src={Persona1} alt="Persona 1" className="banner-image1" />
        <img src={Logo} alt="Logo" className="banner-logo" />
        <img src={Persona2} alt="Persona 2" className="banner-image2" />
      </div>
    </div>
  );
};

export default Banner;