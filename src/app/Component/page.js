// components/UserCard.js
import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <img src={user.avatar_url} alt={`${user.login}'s avatar`} width={100} className='rounded-2xl transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-125 duration-300' />
      <h2>{user.login}</h2>
      <p>Followers: {user.followers}</p>
    </div>
  );
};

export default UserCard;
