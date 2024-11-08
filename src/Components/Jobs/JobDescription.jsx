import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiBriefcase, FiUsers, FiDollarSign, FiCalendar, FiExternalLink } from 'react-icons/fi';
import { IoShareSocialSharp } from 'react-icons/io5';
import axios from 'axios';
import NotFound from '../../Pages/Error'; // Assuming NotFound component is defined and imported correctly

const JobDescription = () => {
  const { jobId } = useParams(); // Ensure this matches the route parameter name in your router configuration
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await axios.get(`https://script.google.com/macros/s/AKfycbylQspLXBPnRQc-a1o45newgjQY5kNEAVKYTaW_rurq9d9BrUxWqg_bKLAvy_tuRJtD0w/exec?id=${jobId}`);
        console.log('API Response:', response.data.data);
        if (Array.isArray(response.data.data) && response.data.data.length > 0) {
          setJob(response.data.data[0]);
        } else {
          setError(true);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(true);
        setLoading(false); // Update loading state
      }
    };

    fetchJob();
  }, [jobId]);

  const handleShareClick = () => {
    const jobUrl = window.location.href;
    if (navigator.share) {
      navigator.share({
        title: job.Job_Title,
        text: `Check out this job at ${job.Company_Name}: ${job.Job_Title}`,
        url: jobUrl,
      }).then(() => {
        console.log('Successful share');
      }).catch((error) => {
        console.error('Error sharing:', error);
      });
    } else {
      navigator.clipboard.writeText(jobUrl).then(() => {
        alert('Job URL copied to clipboard');
      }).catch((error) => {
        console.error('Error copying URL:', error);
      });
    }
  };

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error || !job) {
    return <NotFound />; // Render custom 404 component or message
  }

  const renderList = (items) => {
    if (!items) return null;
    const itemArray = items.split('`').map(item => item.trim());
    return (
      <ul className="list-disc pl-6">
        {itemArray.map((item, index) => (
          <li key={index} className="text-gray-700">{item}</li>
        ))}
      </ul>
    );
  };

  const formatApplyLink = (link) => {
    if (!link.startsWith('http://') && !link.startsWith('https://')) {
      return `http://${link}`;
    }
    return link;
  };

  const applyLink = formatApplyLink(job.Apply_Link);

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mx-auto max-w-4xl p-8 md:mt-16 mt-8">
      {/* Render job details */}
      <div className="flex items-center mb-6">
        <img src={job.Logo_Link} alt="Company Logo" className="w-20 h-20 object-contain mr-4" />
        <div>
          <h1 className="text-2xl text-left font-bold">{job.Company_Name}</h1>
          <p className="text-gray-500 text-left">{job.Job_Location}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <div>
          <h2 className="text-xl font-bold md:mb-2">{job.Job_Title}</h2>
          <p className="flex items-center text-gray-500">
            <FiBriefcase className="mr-2" /> {job.Type}
          </p>
        </div>
        <div className="text-left">
          <p className="text-gray-500 text-left"><FiDollarSign className="inline-block mr-2 " /> {job.Package_CTC}</p>
          <p className="text-gray-500 text-left"><FiUsers className="inline-block mr-2" /> {job.Number_of_Openings} openings</p>
          <p className="text-gray-500 text-left"><FiCalendar className="inline-block mr-2" /> Last Date to Apply: {formatDate(job.Last_Date_Apply)}</p>
        </div>
      </div>

      <div className="mb-8 sm:text-left">
        <h2 className="text-xl font-bold mb-4">About the Job</h2>
        <p className="text-gray-700 text-left md:text-base text-sm mb-4">{job.About_the_Job}</p>
        {job.Requirements && (
          <>
            <h3 className="text-lg font-bold mb-2">Job Requirements</h3>
            {renderList(job.Requirements)}
          </>
        )}
      </div>

      <div className="mb-8 sm:text-left">
        <h2 className="text-xl font-bold mb-4">Who Can Apply</h2>
        <p className="text-gray-700 text-left md:text-base text-sm mb-4">{job.Who_can_apply}</p>
        {job.Skills_Required && (
          <>
            <h3 className="text-lg font-bold mb-2">Required Skills</h3>
            {renderList(job.Skills_Required)}
          </>
        )}
      </div>

      <div className="mb-8 sm:text-left">
        <h2 className="text-xl font-bold mb-4">Employee Perks</h2>
        {job.Perks && (
          renderList(job.Perks)
        )}
      </div>

      <div className="mb-8 sm:text-left">
        <h2 className="text-xl font-bold mb-4">About the Company</h2>
        <p className="text-gray-700 text-left md:text-base text-sm">{job.About_the_Company}</p>
      </div>

      <div className="text-center sm:text-left flex justify-center sm:justify-start items-center gap-4">
        <a href={applyLink} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Apply Now <FiExternalLink className="inline-block ml-2" />
        </a>
        <div className='flex items-center cursor-pointer' onClick={handleShareClick}>
          <IoShareSocialSharp className='text-blue-500 hover:text-blue-600' />
          <span className='ml-2 text-blue-500 hover:text-blue-600 font-bold'>Share</span>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
