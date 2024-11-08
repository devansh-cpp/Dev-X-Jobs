import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiFilter } from 'react-icons/fi';
import { IoClose } from 'react-icons/io5';
import axios from 'axios';

import JobCard from '../Components/Jobs/JobCard';

export default function Jobs() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(null); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('https://script.google.com/macros/s/AKfycbylQspLXBPnRQc-a1o45newgjQY5kNEAVKYTaW_rurq9d9BrUxWqg_bKLAvy_tuRJtD0w/exec');
      setData(response.data.data);
      setLoading(false); // Update loading state
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false); // Update loading state
    }
  };

  const filteredJobs = data
    .filter(job => {
      const jobTitle = job.Job_Title.toLowerCase();
      const type = job.Type.toLowerCase();

      const jobMatchesSearch = jobTitle.includes(searchQuery.toLowerCase());
      const typeMatchesFilter = !filterType || type === filterType;

      let batchMatchesFilter = true;
      if (filterType === 'jobs') {
        // Check if selectedBatch matches any batch in the job's Batch field
        if (selectedBatch !== null) {
          const selectedBatchString = `${selectedBatch}`;
          batchMatchesFilter = job.Batch.includes(selectedBatchString);
        }
      }

      return jobMatchesSearch && typeMatchesFilter && batchMatchesFilter;
    })
    .sort((a, b) => new Date(b.Date_Posting) - new Date(a.Date_Posting)); // Sort by date

  const handleCategoryClick = category => {
    setFilterType(category === 'job' ? 'jobs' : 'internships');
    setSelectedBatch(null); // Reset selected batch when changing filter category
  };

  const handleSearch = () => {
    // Implement more advanced search functionality here if needed
    // For now, it filters based on the searchQuery state
  };

  return (
    <>
      <div className='container px-5 py-16 mx-auto'>
        <div className='mb-8 p-2 bg-[#FFFDF5] w-full'>
          <h1 className='sm:text-5xl text-center p-3 text-3xl font-bold text-[#5C6BC0]'>
            Jobs / Internships<span className='text-[#103059]'> for You</span>
          </h1>
          <p className='sm:text-3xl text-center font-semibold text-gray-500'>
            Discover Your Next Career Move: Explore the Latest Jobs and Internships
          </p>
        </div>

        {/* Desktop Search Bar */}
        <div className='hidden sm:flex justify-center mb-8'>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-gray-300 rounded-l-lg px-2 py-2 w-2/5"
            placeholder="Search for jobs or companies..."
          />
          <button
            onClick={handleSearch}
            className="bg-blue-900 text-white px-4 py-2 rounded-r-lg ml-2 hover:bg-blue-600"
          >
            Search
          </button>
        </div>

        {/* Mobile Filter Button */}
        <div className='filters mt-8 block sm:hidden'>
          <button
            className='bg-neutral-50 bg-opacity-15 border-2 px-2 py-1 rounded-full text-blue-900 font-bold mr-3 flex justify-center items-center'
            onClick={() => setIsModalOpen(true)}
          >
            <FiFilter className='mr-2' /> Filters
          </button>
        </div>

        {/* Modal for mobile filters */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-5 rounded-lg w-full mx-2 sm:w-1/2">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Filters</h2>
                <IoClose className="text-2xl cursor-pointer" onClick={() => setIsModalOpen(false)} />
              </div>
              <div className="flex flex-col">
                <h3
                  className={`hover:underline cursor-pointer mb-2 ${filterType === 'job' ? 'text-blue-500' : 'text-gray-700'}`}
                  onClick={() => handleCategoryClick('job')}
                >
                  Jobs
                </h3>
                <h3
                  className={`hover:underline cursor-pointer mb-2 ${filterType === 'internship' ? 'text-blue-500' : 'text-gray-700'}`}
                  onClick={() => handleCategoryClick('internship')}
                >
                  Internships
                </h3>
                {filterType === 'jobs' && (
                  <div className="flex flex-col mt-4">
                    {Array.from({ length: 9 }, (_, i) => 2020 + i).map(batch => (
                      <h3
                        key={batch}
                        className={`hover:underline cursor-pointer mb-2 ${selectedBatch === batch ? 'text-blue-500' : 'text-gray-700'}`}
                        onClick={() => setSelectedBatch(batch)}
                      >
                        {batch} Batch Jobs
                      </h3>
                    ))}
                    <h3
                      className={`hover:underline cursor-pointer mb-2 ${selectedBatch === null ? 'text-blue-500' : 'text-gray-700'}`}
                      onClick={() => setSelectedBatch(null)}
                    >
                      All Jobs
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-12 gap-8">
          <div className="col-span-3 hidden sm:block rounded-lg border-1 border-gray-500 shadow-md overflow-hidden bg-[#F0F8FF]">
            <div className="flex flex-col justify-start">
              <div className="Jobs">
                <div className="available-jobs text-blue-700">
                  <div className="flex flex-col p-4 border-r-2 border-gray-200">
                    <h3
                      className={`hover:underline text-xl font-semibold text-blue-900 cursor-pointer mb-2 ${filterType === 'job' ? 'text-blue-500' : 'text-gray-700'}`}
                      onClick={() => handleCategoryClick('job')}
                    >
                      Jobs
                    </h3>
                    <h3
                      className={`hover:underline text-xl font-semibold text-blue-900 cursor-pointer mb-2 ${filterType === 'internship' ? 'text-blue-500' : 'text-gray-700'}`}
                      onClick={() => handleCategoryClick('internship')}
                    >
                      Internships
                    </h3>
                    {filterType === 'jobs' && (
                      <div className="flex flex-col mt-4">
                        {Array.from({ length: 9 }, (_, i) => 2020 + i).map(batch => (
                          <h3
                            key={batch}
                            className={`hover:underline cursor-pointer mb-2 ${selectedBatch === batch ? 'text-blue-500' : 'text-gray-700'}`}
                            onClick={() => setSelectedBatch(batch)}
                          >
                            {batch} Batch Jobs
                          </h3>
                        ))}
                        <h3
                          className={`hover:underline cursor-pointer mb-2 ${selectedBatch === null ? 'text-blue-500' : 'text-gray-700'}`}
                          onClick={() => setSelectedBatch(null)}
                        >
                          All Jobs
                        </h3>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-1 sm:col-span-7">
            {/* Render JobCards */}
            {loading ? (
              <div className="text-center">Loading...</div>
            ) : filteredJobs.length > 0 ? (
              filteredJobs.map((job, index) => (
                <div key={index}>
                  <Link to={`/${job.jobId}`}>
                    <JobCard
                      jobTitle={job.Job_Title}
                      companyName={job.Company_Name}
                      experience={job.Experience}
                      salary={job.Package_CTC}
                      location={job.Job_Location}
                      qualification={job.Eligibility}
                      datePosted={job.Date_Posting}
                      jobId={job.jobId} // Pass job ID to JobCard
                    />
                  </Link>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No records found</div>
            )}
          </div>

          <div className="col-span-2 hidden sm:block">
           
          </div>
        </div>
      </div>
    </>
  );
}
