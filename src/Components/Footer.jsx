import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="text-gray-600 body-font">
  
      <div className="bg-gray-100">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 text-sm text-center sm:text-left">© devxloper 2024 . All right reserved
           </p>
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <NavLink to="https://www.linkedin.com/in/devanshcpp/" target="#" className="text-gray-500 ">
            <i class="text-xl fa-brands fa-linkedin"></i>
            </NavLink>
            <NavLink to="https://www.instagram.com/devansh.java/" target="#" className="ml-3 text-gray-500">
            <i class="text-xl fa-brands fa-instagram"></i>
            </NavLink>
            <NavLink to="https://github.com/devansh-cpp" target="#" className="ml-3 text-gray-500">
            <i class="text-xl fa-brands fa-github"></i>
            </NavLink>

             
          </span>
        </div>
      </div>
    </footer>
  );
}
