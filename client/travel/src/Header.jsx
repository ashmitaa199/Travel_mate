import React, { useEffect, useState } from 'react';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ForumIcon from '@mui/icons-material/Forum';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link, useNavigate } from 'react-router-dom';
import Sidenav from './Sidenav'; // Ensure this import is correct

import icon from "./assets/icon.png"

const Header = ({ backButton }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {

  }, []);

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(backButton);
  };

  return (
    
    <div className=' flex flex-wrap rounded-3xl  justify-between items-center h-14 mt-2 px-4 
    w-full bg-white bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-black
    '>
      {backButton ? (
        <IconButton onClick={handleBack}>
          <ArrowBackIosNewIcon fontSize='large'  className='header__icon' />
        </IconButton>
      ) : (
        <div className='flex items-center space-x-4'>
          <Sidenav />
          <div className='flex items-center space-x-2'>
            <IconButton>
              <PersonRoundedIcon fontSize='large' style={{ color: 'black' }}/>
            </IconButton>
            <span className='text-xs'>{userName}</span>
          </div>
        </div>
      )}

      <img className=" w-12 h-12 " src={icon}/>

      <Link to='/chat'>
        <IconButton>
          <ForumIcon fontSize='large' style={{ color: 'black' }}/>
        </IconButton>
      </Link>
    </div>
   
    
    
  );
};

export default Header;
