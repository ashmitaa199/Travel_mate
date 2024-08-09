import React, { useState } from 'react';
import ChatHeader from './components/ChatHeader';
import MatchesDisplay from './components/MatchesDisplay';
import ChatDisplay from './components/ChatDisplay';
import Chatt from './components/Chatt';

const Chat = ({ user }) => {

const [clickedUser, setClickedUser] =useState(null)
// console.log('clickedUser', clickedUser)

  if (!user) {
    return <div>Loading...</div>; // loading state
  }

  return (
    <div className='chat-container w-full h-screen overflow-x-hidden '
    style={{ backgroundImage: "url('https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-new-theme-whatsapp.jpg')" }}
    >
      <ChatHeader user={user} />
      <div className=''>
        <button className='option ' onClick={() => setClickedUser(null)}>Matches</button>
        <button className='option ' disabled={!clickedUser}>Chat</button>
      </div>
      <div className='w-full h-screen overflow-x-hidden m-0 p-0'>
        <div className=''>
        {!clickedUser && <MatchesDisplay matches={user.matches} setClickedUser={setClickedUser}/>}
        </div>
      
       {clickedUser && <ChatDisplay user={user} clickedUser={clickedUser}/>}
      </div>
    </div>
  );
};

export default Chat;
