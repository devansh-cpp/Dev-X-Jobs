import React, { useRef } from 'react';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import { Outlet } from 'react-router-dom';


function Layout(params) {
    
    return(
        <>
        
        <Navbar/>
        <div className="mt-10">
      
            <Outlet/>
            </div> 
        
        <Footer/>
        </>
    )
}

export default Layout