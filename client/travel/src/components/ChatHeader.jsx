import React from 'react';
import { useCookies } from 'react-cookie';

const ChatHeader = ({ user }) => {
  const [cookies, setCookie, removeCookie] = useCookies(['user']);

  const userImageUrl = user?.url || 'default-profile-pic-url'; // Replace with a default image URL
  const userName = user?.first_name || 'Guest';

  return (
    <div className='chat-container-header fixed'>
      <div className='profile'>
        <div className='img-container'>
          <img src={userImageUrl} alt={'photo of ' + userName} />
        </div>
        <h3 className='text-white'>{userName}</h3>
      </div>
    
    </div>
  );
};

export default ChatHeader;
