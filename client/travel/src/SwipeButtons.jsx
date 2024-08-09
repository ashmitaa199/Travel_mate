import React from 'react';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import { IconButton } from '@mui/material';


function SwipeButtons() {
  return (
    <div className='swipeButtons fixed bottom-[0.5vh] flex justify-center w-5/6 gap-9 lg:ml-14'>
      <IconButton  className="swipeButtons__ReplayIcon size-1 "><ReplayIcon fontSize="small"/></IconButton>
      <IconButton className='swipeButtons__left size-1'><CloseIcon fontSize="medium"/></IconButton>
      <IconButton className='swipeButtons__star size-1'> <StarRateIcon fontSize="medium"/></IconButton>
      <IconButton className='swipeButtons__right size-1'><FavoriteIcon fontSize="medium"/></IconButton>
      <IconButton className='swipeButtons__Lightning size-1'><FlashOnIcon fontSize="medium"/></IconButton>
     
    </div>
  );
};

export default SwipeButtons;
