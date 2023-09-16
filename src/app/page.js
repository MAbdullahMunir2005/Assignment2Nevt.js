"use client"


import React, { useState } from 'react';
import axios from 'axios';
import UserCard from '../app/Component/page';
import Button from '../app/Component/button';

const Home = () => {
  const [userName, setUserName] = useState('');
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingFollowers, setLoadingFollowers] = useState(false);

  const fetchUser = async () => {
    try {
      setLoadingUser(true);
      const response = await axios.get(`https://api.github.com/users/${userName}`);
      setUser(response.data);
      setLoadingUser(false);
    } catch (error) {
      console.error(error);
      setLoadingUser(false);
    }
  };

  const fetchFollowers = async () => {
    try {
      setLoadingFollowers(true);
      const response = await axios.get(user.followers_url);
      setFollowers(response.data);
      setLoadingFollowers(false);
    } catch (error) {
      console.error(error);
      setLoadingFollowers(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">GitHub User Explorer</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter GitHub username"
          className="border p-2 rounded-lg"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Button onClick={fetchUser} loading={loadingUser}>
          Fetch User
        </Button>
      </div>
      {user && <UserCard user={user} />}
      {user && user.followers > 0 && (
        <div>
          <Button onClick={fetchFollowers} loading={loadingFollowers}>
            Fetch Followers 👀
          </Button>
          <h2 className="text-2xl font-bold my-4">Followers</h2>
          <div className="flex flex-wrap gap-4">
            {followers.map((follower) => (
              <UserCard key={follower.id} user={follower} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
