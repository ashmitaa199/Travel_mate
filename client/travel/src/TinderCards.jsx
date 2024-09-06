import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import TinderCard from 'react-tinder-card';
import axios from 'axios';

function TinderCards({ genderedUsers, user }) {
  const [lastDirection, setLastDirection] = useState(null);
  const [cookies] = useCookies(['user']);
  const userId = cookies.UserId;

  const updateMatches = async (matchedUserId) => {
    try {
      await axios.put('https://travel-mate-backend-9h6l.onrender.com/addmatch', {
        userId,
        matchedUserId
      });
    } catch (error) {
      console.log(error);
    }
  };

  const swiped = (direction, swipedUserId) => {
    if (direction === 'right') {
      updateMatches(swipedUserId);
    }
    setLastDirection(direction);
  };

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!');
  };

  const matchedUserIds = user?.matches.map(({ user_id }) => user_id).concat(userId) || [];

  const filteredGenderedUsers = genderedUsers?.filter(
    genderedUser => !matchedUserIds.includes(genderedUser.user_id)
  );

  return (
    <>
      {user && 
      
        <div className="relative w-full h-full -mt-7 ">
          
         
          <div className='card-container flex justify-center mt-[5vh] h-[500px]'>
            {filteredGenderedUsers?.map((genderedUser) => (
              <TinderCard
                className='swipe absolute mt-3'
                key={genderedUser.user_id}
                preventSwipe={['up', 'down']}
                onSwipe={(dir) => swiped(dir, genderedUser.user_id)}
                onCardLeftScreen={() => outOfFrame(genderedUser.first_name)}
              >
                <div
                  style={{ backgroundImage: 'url(' + genderedUser.url + ')' }}
                  className='card'
                >
                  <h3 className='absolute bottom-5 px-2 bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text'>{genderedUser.first_name}</h3>
                </div>
              </TinderCard>
              
            ))}
            <div className='swipe-info '>
            {lastDirection ? <p className='text-black text-xs'>You swiped {lastDirection}</p> : <p />}
          </div>
          </div>
          
        </div>
      }
    </>
  );
}

export default TinderCards;