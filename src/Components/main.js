import React from 'react';
import './main.css';
import MusicPlayer from './musicplayer';


function MainSection() {
  return (
    <div className='main-section'>
      
      <div className='left-section'>
        <section id="music-section">
          <MusicPlayer/>
        </section>

        <section id="about-section">
          <h3>About Us</h3>
          <p></p>
        </section>

        <section id="get-started-section">
          <h3>Get Started</h3>
          <p></p>
        </section>
      </div>

      <div className='right-section'>
        Trending in Music
      </div>
    </div>
  );
}

export default MainSection;
