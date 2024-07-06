// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = ({ user }) => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-left">
//         {user ? (
//           <div className="user-info">
//             <img src={user.profilePic} alt={user.username} className="profile-pic" />
//             <span>{user.username}</span>
//           </div>
//         ) : (
//           <button className="login-button">Login</button>
//         )}
//       </div>
//       <div className="navbar-center">
//         <h1 className="logo">Twitch Tools</h1>
//       </div>
//       <div className="navbar-right">
//         <Link to="/">Home</Link>
//         <Link to="/asciiconverter">ASCII Art Creator</Link>
//         <Link to="/image-filters">Image Filters</Link>
//         <Link to="/placeholder-tool">Placeholder Tool</Link>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// src/components/Navbar.js
// src/components/Navbar.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthButton from './AuthButton';

const Navbar = () => {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // Placeholder for API call
  //   fetch('https://localhost:8081/auth')
  //     .then(response => response.json())
  //     .then(data => {
  //       if (data.code === 200) {
  //         setUser(data.user);
  //       } else {
  //         setUser(null);
  //       }
  //     });
  // }, []);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src="/logo.png" alt="Logo" />
          <span>My Twitch Tools</span>
        </Link>
      </div>
      <div className="navbar-center">
        <Link to="/ascii-art">ASCII Art Creator</Link>
        <Link to="/filters">Image Filters</Link>
        <Link to="/placeholder">Placeholder Tool</Link>
      </div>
      <div className="navbar-right">
        <AuthButton user={user} />
      </div>
    </nav>
  );
};

export default Navbar;
