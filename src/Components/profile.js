import React from 'react';
import './profile.css';

const Profile = () => {
  return (
    <div className="profile">
      {/*<h2 className="profile-title"></h2>*/}
      <div className="profile-card-container">
        <div className="profile-card">
          <h3>My Library</h3>
        </div>
        <div className="profile-card">
          <h3>Community</h3>
        </div>
        <div className="profile-card">
          <h3>Friends</h3>
        </div>
      </div>
    </div>
  );
};

export default Profile;
