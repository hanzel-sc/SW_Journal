import React from 'react';
import Navbar from './navbar.js';  // Import Navbar
import './header.css';

function Header({ openModal }) {  // Receive openModal as prop
    return (
        <header className='header'>
            <div className='header-container'>
                <img className="logo" src="/icon2.png" alt="SWJ logo" />  {/* Use /icon2.png for public folder access */}
                <Navbar openModal={openModal} />  {/* Pass openModal to Navbar */}
            </div>
        </header>
    );
}

export default Header;
