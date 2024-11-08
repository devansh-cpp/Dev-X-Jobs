import React, { useEffect, useState } from 'react';

const DataComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://script.google.com/macros/s/AKfycbyiXzUZP4ajMVzAIBcuh_RdIiKMeemVyHgVkfKP8vroY8TIsif0b4xLaoaeYku1BHZH9w/exec') // Replace with your Google Apps Script Web App URL
      .then(response => response.json())
      .then(data => setData(data.data)) // Access the data array
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Job Postings</h1>
      {data.map((job, index) => (
        <div key={index}>
          <h2>{job.Job_Title}</h2>
          <p>{job.Company_Name}</p>
          {/* Render other job details as needed */}
        </div>
      ))}
    </div>
  );
};

export default DataComponent;
