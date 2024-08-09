import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './Header';
import Chat from './Chat';
import Sidenav from './Sidenav';
import Home from './Home';
import OnBoarding from './pages/OnBoarding';
import CreatePost from './pages/CreatePost';
import DisplayPosts from './pages/DisplayPosts'; 
import Dashboard from './pages/Dashboard';

import { useCookies } from 'react-cookie';
import axios from 'axios';

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [user, setUser] = useState(null);

  const authToken = cookies.AuthToken;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user', {
          params: { userId: cookies.UserId }
        });
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (authToken) {
      fetchUser();
    }
  }, [authToken, cookies.UserId]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {authToken && <Route path="/dashboard" element={<Dashboard />} />}
        {authToken && <Route path="/onboarding" element={<OnBoarding />} />}
        <Route path="/chat" element={
          <>
            <Header backButton="/dashboard" />
            <Chat user={user} />
          </>
        } />

<Route path="/post" element={<CreatePost />} />
<Route path="/posts" element={<DisplayPosts />} />  
      </Routes>
    </Router>
  );
}

export default App;
