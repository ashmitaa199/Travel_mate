import React, { useEffect,useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';
import AuthModal from './components/AuthModal';
import { useNavigate } from 'react-router-dom';
import { useCookies} from 'react-cookie';

const Home = () => {

  const [showModal, setShowModal]=useState(false)
  const [isSignUp, setIsSignUp] = useState(true)
  const [cookies, setCookie, removeCookie] = useCookies(['user'])

  const authToken = cookies.AuthToken;

  const handleClick =()=>{
    if (authToken) {
      removeCookie('UserId', cookies.UserId)
      removeCookie('AuthToken', cookies.AuthToken)
      window.location.reload()
      return
  }
    
    setShowModal(true);
    setIsSignUp(true)
    // navigate('/Signup');

  }
    

    
  return (
    <div className='overlay'>
    <Nav 
    authToken={authToken}
    setShowModal={setShowModal} 
    showModal={showModal}
    setIsSignUp={setIsSignUp}
    />
  
    <div className='Home '>

      <button className='primary-button border ' onClick={handleClick}>
        {authToken ? 'Signout':'Create Account'}
      </button>

      {showModal &&
       (
         <AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>
      )}
      
    </div>
    </div>
  )
}

export default Home
