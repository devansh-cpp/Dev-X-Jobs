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
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('https://script.google.com/macros/s/AKfycbylQspLXBPnRQc-a1o45newgjQY5kNEAVKYTaW_rurq9d9BrUxWqg_bKLAvy_tuRJtD0w/exec');
      
      // Add null checks and default values
      const jobsData = response.data?.data || [];
      setData(jobsData);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load jobs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = data
    .filter(job => {
      // Add null checks for job properties
      if (!job) return false;
      
      const jobTitle = (job.Job_Title || '').toLowerCase();
      const type = (job.Type || '').toLowerCase();
      const batch = job.Batch || '';

      const jobMatchesSearch = jobTitle.includes(searchQuery.toLowerCase());
      const typeMatchesFilter = !filterType || type === filterType;

      let batchMatchesFilter = true;
      if (filterType === 'jobs' && selectedBatch !== null) {
        const selectedBatchString = `${selectedBatch}`;
        batchMatchesFilter = batch.toString().includes(selectedBatchString);
      }

      return jobMatchesSearch && typeMatchesFilter && batchMatchesFilter;
    })
    .sort((a, b) => {
      // Add null checks for date sorting
      const dateA = a.Date_Posting ? new Date(a.Date_Posting) : new Date(0);
      const dateB = b.Date_Posting ? new Date(b.Date_Posting) : new Date(0);
      return dateB - dateA;
    });

  const handleCategoryClick = category => {
    // Fix the filter type assignment
    if (category === 'job') {
      setFilterType('jobs');
    } else if (category === 'internship') {
      setFilterType('internships');
    }
    setSelectedBatch(null); // Reset selected batch when changing filter category
  };

  const handleBatchClick = (batch) => {
    setSelectedBatch(batch);
  };

  const handleClearFilters = () => {
    setFilterType(null);
    setSelectedBatch(null);
    setSearchQuery('');
  };

  const handleSearch = () => {
    // The filtering is already handled in the filteredJobs computation
    // This function can be used for additional search logic if needed
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Generate batch years (2020-2028)
  const batchYears = Array.from({ length: 9 }, (_, i) => 2020 + i);

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
            className="border-2 border-gray-300 rounded-l-lg px-4 py-2 w-2/5 focus:outline-none focus:border-blue-500"
            placeholder="Search for jobs or companies..."
          />
          <button
            onClick={handleSearch}
            className="bg-blue-900 text-white px-6 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </div>

        {/* Mobile Search Bar */}
        <div className='sm:hidden mb-4'>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border-2 border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:border-blue-500"
            placeholder="Search for jobs or companies..."
          />
        </div>

        {/* Mobile Filter Button */}
        <div className='filters mt-4 mb-6 block sm:hidden'>
          <div className="flex gap-2">
            <button
              className='bg-blue-50 border-2 border-blue-200 px-4 py-2 rounded-full text-blue-900 font-semibold flex justify-center items-center hover:bg-blue-100 transition-colors'
              onClick={() => setIsModalOpen(true)}
            >
              <FiFilter className='mr-2' /> Filters
            </button>
            {(filterType || selectedBatch) && (
              <button
                className='bg-red-50 border-2 border-red-200 px-4 py-2 rounded-full text-red-700 font-semibold hover:bg-red-100 transition-colors'
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
            )}
          </div>
          
          {/* Active filters display */}
          {(filterType || selectedBatch) && (
            <div className="mt-2 flex flex-wrap gap-2">
              {filterType && (
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                  {filterType === 'jobs' ? 'Jobs' : 'Internships'}
                </span>
              )}
              {selectedBatch && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  {selectedBatch} Batch
                </span>
              )}
            </div>
          )}
        </div>

        {/* Modal for mobile filters */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-full mx-4 max-w-md max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">Filters</h2>
                <IoClose 
                  className="text-2xl cursor-pointer text-gray-600 hover:text-gray-800" 
                  onClick={closeModal} 
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-700 mb-3 text-lg">Category</h3>
                  <div className="space-y-2">
                    <button
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        filterType === 'jobs' 
                          ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                          : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100'
                      }`}
                      onClick={() => handleCategoryClick('job')}
                    >
                      Jobs
                    </button>
                    <button
                      className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                        filterType === 'internships' 
                          ? 'bg-blue-100 text-blue-800 border-2 border-blue-300' 
                          : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100'
                      }`}
                      onClick={() => handleCategoryClick('internship')}
                    >
                      Internships
                    </button>
                  </div>
                </div>

                {filterType === 'jobs' && (
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-3 text-lg">Batch Year</h3>
                    <div className="space-y-2">
                      <button
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          selectedBatch === null 
                            ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                            : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100'
                        }`}
                        onClick={() => handleBatchClick(null)}
                      >
                        All Batches
                      </button>
                      {batchYears.map(batch => (
                        <button
                          key={batch}
                          className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            selectedBatch === batch 
                              ? 'bg-green-100 text-green-800 border-2 border-green-300' 
                              : 'bg-gray-50 text-gray-700 border-2 border-gray-200 hover:bg-gray-100'
                          }`}
                          onClick={() => handleBatchClick(batch)}
                        >
                          {batch} Batch
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-gray-200">
                  <button
                    className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                    onClick={handleClearFilters}
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid sm:grid-cols-12 gap-8">
          {/* Desktop Sidebar Filters */}
          <div className="col-span-3 hidden sm:block">
            <div className="sticky top-4 rounded-lg border border-gray-300 shadow-lg overflow-hidden bg-[#F0F8FF]">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-blue-900">Filters</h2>
                  {(filterType || selectedBatch) && (
                    <button
                      className="text-sm text-red-600 hover:text-red-800 underline"
                      onClick={handleClearFilters}
                    >
                      Clear All
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-blue-900 mb-3 text-lg">Category</h3>
                    <div className="space-y-2">
                      <button
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          filterType === 'jobs' 
                            ? 'bg-blue-200 text-blue-900 font-semibold' 
                            : 'text-blue-800 hover:bg-blue-100'
                        }`}
                        onClick={() => handleCategoryClick('job')}
                      >
                        Jobs
                      </button>
                      <button
                        className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                          filterType === 'internships' 
                            ? 'bg-blue-200 text-blue-900 font-semibold' 
                            : 'text-blue-800 hover:bg-blue-100'
                        }`}
                        onClick={() => handleCategoryClick('internship')}
                      >
                        Internships
                      </button>
                    </div>
                  </div>

                  {filterType === 'jobs' && (
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-3 text-lg">Batch Year</h3>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        <button
                          className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                            selectedBatch === null 
                              ? 'bg-green-200 text-green-900 font-semibold' 
                              : 'text-blue-800 hover:bg-blue-100'
                          }`}
                          onClick={() => handleBatchClick(null)}
                        >
                          All Batches
                        </button>
                        {batchYears.map(batch => (
                          <button
                            key={batch}
                            className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                              selectedBatch === batch 
                                ? 'bg-green-200 text-green-900 font-semibold' 
                                : 'text-blue-800 hover:bg-blue-100'
                            }`}
                            onClick={() => handleBatchClick(batch)}
                          >
                            {batch} Batch
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Active filters summary */}
                {(filterType || selectedBatch) && (
                  <div className="mt-6 pt-4 border-t border-blue-200">
                    <h4 className="font-semibold text-blue-900 mb-2">Active Filters:</h4>
                    <div className="space-y-1 text-sm">
                      {filterType && (
                        <div className="text-blue-700">
                          Category: {filterType === 'jobs' ? 'Jobs' : 'Internships'}
                        </div>
                      )}
                      {selectedBatch && (
                        <div className="text-blue-700">
                          Batch: {selectedBatch}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-1 sm:col-span-7">
            {/* Results count */}
            <div className="mb-4 text-gray-600">
              {!loading && (
                <p>
                  Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'result' : 'results'}
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              )}
            </div>

            {/* Error State */}
            {error && (
              <div className="text-center py-8">
                <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
                  <p className="font-semibold mb-2">Error Loading Jobs</p>
                  <p>{error}</p>
                  <button 
                    onClick={fetchJobs}
                    className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Retry
                  </button>
                </div>
              </div>
            )}

            {/* Loading State */}
            {loading && !error && (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Loading jobs...</p>
              </div>
            )}

            {/* Job Results */}
            {!loading && !error && (
              <>
                {filteredJobs.length > 0 ? (
                  <div className="space-y-4">
                    {filteredJobs.map((job, index) => (
                      <div key={job.jobId || index}>
                        <Link to={`/${job.jobId}`} className="block hover:shadow-lg transition-shadow">
                          <JobCard
                            jobTitle={job.Job_Title || 'N/A'}
                            companyName={job.Company_Name || 'N/A'}
                            experience={job.Experience || 'N/A'}
                            salary={job.Package_CTC || 'N/A'}
                            location={job.Job_Location || 'N/A'}
                            qualification={job.Eligibility || 'N/A'}
                            datePosted={job.Date_Posting || 'N/A'}
                            jobId={job.jobId}
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <div className="bg-gray-50 rounded-lg p-8">
                      <p className="text-gray-500 text-lg mb-4">No jobs found</p>
                      <p className="text-gray-400 mb-4">
                        {filterType || selectedBatch || searchQuery 
                          ? 'Try adjusting your filters or search terms.' 
                          : 'No jobs are currently available.'}
                      </p>
                      {(filterType || selectedBatch || searchQuery) && (
                        <button
                          onClick={handleClearFilters}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Sidebar (placeholder) */}
          <div className="col-span-2 hidden sm:block">
            {/* You can add additional content here like ads, related links, etc. */}
          </div>
        </div>
      </div>
    </>
  );
}