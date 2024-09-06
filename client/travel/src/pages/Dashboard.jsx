import React, { useState, useEffect } from 'react';
import Header from '../Header';
import TinderCards from '../TinderCards';
import SwipeButtons from '../SwipeButtons';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [genderedUsers, setGenderedUsers] = useState([]);
  const [cookies] = useCookies(['user']);
  const userId = cookies.UserId;

  // Fetch user data
  const getUser = async () => {
    try {
      const response = await axios.get('https://travel-mate-backend-9h6l.onrender.com/user', {
        params: { userId }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get('https://travel-mate-backend-9h6l.onrender.com/gendered-users', {
        params: { gender: user?.gender_interest === 'everyone' ? null : user?.gender_interest }
      });
      setGenderedUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (user) {
      getGenderedUsers();
    }
  }, [user]);

  console.log('user', user);
  console.log('gendered users', genderedUsers);
  
  return (
    <div className='relative  px-10'  >
    <div className='absolute top-0 left-0 w-full h-full '
    style={{
      backgroundImage: "url('https://img.freepik.com/free-vector/hand-drawn-colorful-travel-background_23-2149033528.jpg?ga=GA1.1.1971569092.1720470843')",
      // https://img.freepik.com/free-photo/view-travel-items-assortment-still-life_23-2149617645.jpg?t=st=1723048157~exp=1723051757~hmac=d2c08351fdd8dbb34ca0e58304440afe5ce63bfac825ac2a8c5c73007968dbfb&w=826
      // backgroundRepeat: "no-repeat",
    
      opacity:0.6,
      zIndex: -1,
    }}>
       <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
      </div>
      {/* flex justify-center */}
      <div className="relative flex justify-center items-center ">
      {user ? (
        <div className='w-full'
        
        >
          <Header />
          <TinderCards genderedUsers={genderedUsers} user={user} />
          <SwipeButtons />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
    </div>
  );
};

export default Dashboard;