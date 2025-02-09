import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './social.css';

function SocialLinks() {
  return (
    <div className="social-links">
      <a href="" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} className="social-icon" />
      </a>
      <a href="" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
      </a>
    </div>
  );
}

export default SocialLinks;
