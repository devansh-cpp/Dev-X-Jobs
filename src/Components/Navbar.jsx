import { Link, NavLink, useNavigate } from 'react-router-dom';
import Logo from '../assets/images/devxlogo.png';
import { useState } from 'react';

const Navbar =()=> {

    return (
        <>
            
                <nav className='w-full lg:px-14 px-4 md:py-2 py-4 h-16 shadow-lg bg-[#ffffff] rounded-b-lg    flex justify-between items-center fixed top-0 left-0 z-50'>
                    <div className='h-full min-w-48'>
                        <Link to={'/'}>
                            <img src={Logo} alt="TnP logo" className='h-full border-r-2 pr-2 border-blue-900' />
                        </Link>
                    </div>

                 
                    <div className="">
                        <Link to={'https://www.linkedin.com/in/devanshcpp/'}
                            className='py-2 px-4 text-lg text-white bg-blue-500 rounded-3xl hover:bg-white border-2 hover:border-blue-600 hover:text-blue-900 hover:font-semibold lg:block'
                        >
                           About Me
                        </Link>
                       
                    </div>
                </nav>
            
        </>
    );
}

export default Navbar;


