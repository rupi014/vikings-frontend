import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './styles/carousel.css';
import imagen1 from '../assets/images/home_images/imagen1.webp';
import imagen2 from '../assets/images/home_images/imagen2.webp';
import imagen3 from '../assets/images/home_images/imagen3.webp';    
import imagen4 from '../assets/images/home_images/imagen4.webp';
import imagen5 from '../assets/images/home_images/imagen5.webp';
import imagen6 from '../assets/images/home_images/imagen6.webp';
import imagen7 from '../assets/images/home_images/imagen7.webp';
import imagen8 from '../assets/images/home_images/imagen8.webp';
import imagen9 from '../assets/images/home_images/imagen9.webp';

// Se crea el carousel de la pagina principal
const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div>   
          <img src={imagen1} alt="Imagen 1" />
        </div>
        <div>
          <img src={imagen2} alt="Imagen 2" />
        </div>
        <div>
          <img src={imagen3} alt="Imagen 3" />
        </div>
        <div>
          <img src={imagen4} alt="Imagen 4" />
        </div>
        <div>
          <img src={imagen5} alt="Imagen 5" />
        </div>
        <div>
          <img src={imagen6} alt="Imagen 6" />
        </div>
        <div>
          <img src={imagen7} alt="Imagen 7" />
        </div>
        <div>
          <img src={imagen8} alt="Imagen 8" />
        </div>
        <div>
          <img src={imagen9} alt="Imagen 9" />
        </div>
      </Slider>
    </div>
  );
};

export default Carousel;