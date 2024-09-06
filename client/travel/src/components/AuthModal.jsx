import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const AuthModal = ({ setShowModal, isSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [cookies, setCookie] = useCookies(['user']);

    let navigate = useNavigate();

    const handleClick = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isSignUp && password !== confirmPassword) {
            setError('Passwords need to match!');
            return;
        }

        try {
            const response = await axios.post(`https://travel-mate-backend-9h6l.onrender.com/${isSignUp ? 'signup' : 'login'}`, { email, password });

            setCookie('AuthToken', response.data.token);
            setCookie('UserId', response.data.userId);
            setCookie('Email', email);

            const success = response.status === (isSignUp ? 201 : 200);
            if (success) {
                navigate(isSignUp ? '/onboarding' : '/dashboard');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error during authentication:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data : 'An error occurred');
        }
    };

    return (
        <div className="auth-modal bg-black bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-100">
            <div className="close-icon text-white -mt-6 -mr-3" onClick={handleClick}>ⓧ</div>
            <h2 className='text-white font-bold'>{isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
            <p className='italic text-xs text-slate-200'>By clicking Log In, you agree to our terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border'
                    required
                />
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {isSignUp && (
                    <input
                        type="password"
                        id="password-check"
                        name="password-check"
                        placeholder="confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                )}
                <input className="secondary-button" type="submit" value={isSignUp ? 'Sign Up' : 'Log In'} />
                {error && <p className="error-message">{error}</p>}
            </form>
            <hr className='text-white' />
            <h2 className='text-teal-400'>GET THE APP</h2>
        </div>
    );
};

export default AuthModal;
