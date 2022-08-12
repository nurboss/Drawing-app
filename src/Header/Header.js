import React from 'react'
import UseAuth from '../firebase/AuthProvider/UseAuth';
import './Header.css'

const Header = () => {
    const { logout, user } = UseAuth();
  return (
        <div className='header'> 
                <h4>{user.displayName}</h4>
                <button onClick={logout}className='logout-btn'>Logout</button>  
        </div>
  )
}

export default Header