import { IoShareSocialSharp } from 'react-icons/io5';
import { BsSuitcaseLgFill } from 'react-icons/bs';
import { MdCurrencyRupee } from 'react-icons/md';
import { SlLocationPin } from 'react-icons/sl';
import { PiGraduationCapThin } from 'react-icons/pi';
import { CiBookmark } from 'react-icons/ci';

const JobCard = ({ jobTitle, companyName, experience, salary, location, qualification, datePosted,jobId }) => {

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
  };

  const handleShareClick = () => {
    const jobUrl = jobId;
    if (navigator.share) {
      navigator.share({
        title: jobTitle,
        text: `Check out this job at ${companyName}: ${jobTitle}`,
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

  return (
    <div className="card m-3 p-5 rounded-lg border-1 border-gray-500 shadow-md hover:scale-105 duration-300 bg-[#F0F8FF]">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <div>
            <h1 className='font-bold text-lg text-blue-950 text-left'>{jobTitle}</h1>
            <h3 className='text-gray-500 font-semibold text-base'>{companyName}</h3>
          </div>
          <div className='flex justify-center items-center cursor-pointer' onClick={handleShareClick}>
            <IoShareSocialSharp className='mr-2' />
            <h2 className='font-semibold text-gray-500'>Share</h2>
          </div>
        </div>

        <div className='flex flex-wrap justify-start mt-2 items-center gap-4 sm:gap-8'>
          <div className='flex justify-center items-center'>
            <BsSuitcaseLgFill className='mr-2' />
            <h2 className='font-semibold text-gray-500'>{experience}</h2>
          </div>
          <div className='flex justify-center items-center'>
            <MdCurrencyRupee className='mr-2' />
            <h2 className='font-semibold text-gray-500'>{salary}</h2>
          </div>
          <div className='flex justify-center items-center'>
            <SlLocationPin className='mr-2' />
            <h2 className='font-semibold text-gray-500'>{location}</h2>
          </div>
        </div>

        <div className='flex justify-start items-center my-2'>
          <PiGraduationCapThin className='mr-2' />
          <h2 className='font-semibold text-gray-500'>{qualification}</h2>
        </div>

        <div className='bottom-items flex justify-between items-center mt-2 sm:mt-5'>
          <div>
            <h1 className='text-gray-500 font-semibold'>{formatDate(datePosted)}</h1>
          </div>
          <div className='flex justify-center items-center gap-2'>
            <div>
              <CiBookmark />
            </div>
            <div>
              <h1 className='text-gray-500 font-semibold'>Save</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
