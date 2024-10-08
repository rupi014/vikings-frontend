import React from 'react';
import '../pages/page-styles/home.css';
import Banner from '../components/banner';
import Promo from '../components/promo';
const Home = () => {
  return (
    <div className="home-page">
      <Banner />
      <Promo />
    </div>
  );
};

export default Home;
