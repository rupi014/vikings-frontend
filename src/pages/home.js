import React from 'react';
import '../pages/page-styles/home.css';
import Banner from '../components/banner';
import Promo from '../components/promo';
import Unete from '../components/unete';  
import Carousel from '../components/carousel';

const Home = () => {
  return (
    <div className="home-page">
      <Banner />
      <Promo />
      <Unete />
      <Carousel />
    </div>
  );
};

export default Home;
