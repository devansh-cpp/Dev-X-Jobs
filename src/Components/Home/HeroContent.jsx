import React from "react";
import { Link, NavLink } from 'react-router-dom';
import Founder1 from "./assets/Founder1.png"

function HeroContent(){
    return(
    <>
    <div className="left-content font-poppins ">
                 <div className="heroTitle">
                    <h1 className="text-5xl font-bold ">
                 Road to <span className="text-bg text-5xl font-bold">Successful</span>
                 <span className="highlight"> Journey</span>
                    </h1>
                     <p className="Description-content text-xl pt-5 font-semibold">
                    Now is the winter of our
                     <span className="Text-bg"> discontent</span> <br />
                    Made glorious summer by this sun of York
                    </p>
                </div>

                <div className="text-white font-sourcesans flex flex-row gap-3">
                  <NavLink to='/LearnPage'>
                <button className=" bg-blue-800 text-white border shadow-2xl border-blue-700 duration-500 p-2 sm:p-3 rounded-lg hover:text-blue-800 font-medium hover:bg-white  w-full sm:w-auto mr-4">View Courses</button></NavLink>
                <NavLink to='/Jobs'>
                <button className=" bg-blue-800 text-white border shadow-2xl border-blue-700 duration-500 p-2 sm:p-3 rounded-lg hover:text-blue-800 font-medium hover:bg-white  w-full sm:w-auto mr-4">Explore Jobs</button></NavLink>
                </div>

                
                <div className="flex mt-1 items-center justify-center rounded-full border border-black bg-white w-fit p-2 gap-3 ">
                  <div class="flex items-center -space-x-3 "> 
                    <img alt="Tania Andre" src= {Founder1} className="relative inline-block h-10 w-10 !rounded-full  border-2 border-white object-cover object-center hover:z-10 hover:scale-110" />
                    <img alt="Tania Andre" src= {Founder1} className="relative inline-block h-10 w-10 !rounded-full  border-2 border-white object-cover object-center hover:z-10 hover:scale-110" />
                    <img alt="Tania Andre" src= {Founder1} className="relative inline-block h-10 w-10 !rounded-full  border-2 border-white object-cover object-center hover:z-10 hover:scale-110" />
                    <img alt="Tania Andre" src= {Founder1} className="relative inline-block h-10 w-10 !rounded-full  border-2 border-white object-cover object-center hover:z-10 hover:scale-110" />
                  </div>
                        <p className="px-2  text-xl font-semibold" >80,000+ Members</p> 
                           
                  </div>
                  <div className="social-media flex gap-4  text-3xl ">
                    
                    <Link to="https://www.instagram.com/tnpofficer/" target="#" className="fab fa-instagram hover:scale-125"></Link> 
                    <Link to="https://www.linkedin.com/company/tnpofficer/" target="#" className="fab fa-linkedin hover:scale-125"></Link> 
                    <Link to="https://t.me/tnpofficer" target="#" className="fab fa-telegram hover:scale-125"></Link> 
                    
                  </div>
                  

                
                  
                  
            </div>
            
    </>
    )
}
export default HeroContent