import React, { useState, useEffect, useRef } from "react";
import HeroImg from "../assets/images/offcampushero.webp";
import { Link } from "react-router-dom";

function Test() {
  return (
    <>
      <div className="px-5 mt-16 mx-auto bg-[#E1E9ED]">
        <div className="flex justify-between">
          <div className="md:block hidden left-side w-1/2">
            <img src={HeroImg} className="h-[700px]" alt="Hero" />
          </div>

          <div className="right-side sm:pr-12 sm:py-0 py-12 sm:w-1/2 flex flex-col justify-center sm:items-end items-center gap-2">
            <h3 className="sm:text-2xl text-xl sm:text-right font-bold font-poppins text-[#FF914D] mt-5 sm:mb-10">
              DevXLoper's{" "}
              <span className="text-[#00bf63]">Trusted Listing</span>
            </h3>
            <h1 className="sm:text-6xl text-4xl sm:text-right font-bold font-poppins">
              Explore <span className="text-[#004aad]">Latest</span>
            </h1>
            <h1 className="sm:text-6xl text-3xl sm:text-right font-bold font-poppins mb-6">
              Job Opportunities
            </h1>

            <h1 className="sm:text-xl sm:text-right font-poppins">
              Discover 1000+ Job Opportunities
            </h1>
            <p className="sm:text-right text-center">
              I provides the full detail of upcoming and latest placement
              drives. Candidates may find the free Job alerts of latest hiring
              drives for any batch, Walk-ins and companies hiring, etc.
              Candidates may find the latest hiring alerts in various sectors
              like IT Sector, Manufacturing, Education, Automobile, Automation
              etc
            </p>
            <Link to={'/jobs'}>
            <button className="p-4  bg-blue-500 hover:bg-transparent hover:text-blue-500 border-2 border-blue-500 text-white font-bold rounded-lg ">
              Explore Now{" "}
            </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Test;
