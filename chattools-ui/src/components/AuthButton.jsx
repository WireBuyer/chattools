import React from "react";

const AuthButton = ({ user }) => {
  return (
    <div>
      {user ? (
        <div className="user-info">
          <img src={user.profilePic} alt="Profile" />
          <span>{user.username}</span>
        </div>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
};

export default AuthButton;
