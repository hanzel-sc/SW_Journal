import React from "react";
import { Link } from "react-router-dom";  // Import Link for navigation
import './navbar.css';

function Navbar({ openModal }) {  // Receive openModal from props
    return (
        <nav className="navbar">
            <ul className="navlist">
                <li><Link to="/">Home</Link></li>               {/* Link to Home */}
                <li><Link to="/profile">Profile</Link></li>      {/* Link to Profile (MainSection) */}
                <li><a href="#" onClick={openModal}>Login</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
