import React from 'react';
import './styles/footer.css';
import twitter from '../assets/images/icons/twitter.png';
import twitch from '../assets/images/icons/twitch.png';
import instagram from '../assets/images/icons/instagram.png';
import tiktok from '../assets/images/icons/tiktok.webp';
import discord from '../assets/images/icons/discord.webp';
import youtube from '../assets/images/icons/youtube.png';   
import kong from '../assets/images/logos/kong.webp';
import viking from '../assets/images/logos/vikings.webp';

const Footer = () => {
  return (
    <footer className="footer">
        
        <div className='footer-top'></div>
            <div className="footer-vikings-logo">
            <img src={viking} alt="Vikings Logo" />
        </div>

        <div className='footer-bottom'> 
            <div className="footer-kong-logo">
            <img src={kong} alt="Kong Logo" />
            </div>
            <div className="footer-social">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <img src={twitter} alt="Twitter" />
            </a>
            <a href="https://twitch.tv" target="_blank" rel="noopener noreferrer">
                <img src={twitch} alt="Twitch" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <img src={instagram} alt="Instagram" />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
                <img src={tiktok} alt="TikTok" />
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                <img src={discord} alt="Discord" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                <img src={youtube} alt="YouTube" />
            </a>
            </div>
        </div>
  </footer>
  );
};

export default Footer;
