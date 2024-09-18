import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import CommentSection from '../components/CommentSection';

export default function FullJd() {

  const { id, url } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    axios.get(`/backend/naukri/${url}/${id}`)
      .then((response) => {
        setJob(response.data);
      })
      .catch((error) => console.error("Error fetching job data:", error));
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString(); 
    const formattedTime = date.toLocaleTimeString(); 
    return `${formattedDate} at ${formattedTime}`;
  };


  const formatJobDescription = (description) => {

    if (!description) return "";

    return description.split('\n').map((line, index) => (

      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>

    ));
  };

  // console.log(job);

  return (

    <div className="mt-12 mb-20 px-4 lg:px-20">

      {job ? (

        <div className="bg-gradient-to-br from-blue-100 via-purple-200 to-indigo-200 p-8 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">

          <h2 className="text-3xl font-extrabold text-indigo-800 mb-4 animate-fadeInUp">{job.title}</h2>
          
          <p className="text-lg mb-2 text-gray-700 font-medium mt-4">

            <span className="text-purple-600 font-bold">⮞ Company ➦ </span>{job.company}

          </p>
          
          <p className="text-lg mb-2 text-gray-700 font-medium mt-4">

            <span className="text-purple-600 font-bold">⮞ Location ➦ </span>{job.location.join(", ")}

          </p>
          
          <p className="text-lg mb-2 text-gray-700 font-medium mt-4">

            <span className="text-purple-600 font-bold">⮞ Experience ➦ </span>{job.min_exp} - {job.max_exp} years

          </p>

          <p className="text-lg mb-2 text-gray-700 font-medium mt-4">

            <span className="text-purple-600 font-bold">⮞ Posted on ➦ </span>{formatDate(job.time)}

          </p>
          
          <div className="text-lg mb-4 text-gray-700 font-medium mt-4">

            <span className="text-purple-600 font-bold">⮞ Job Description ➦ </span>

            <p className='ml-10 mt-4'>{formatJobDescription(job.full_jd)}</p>

          </div>
          
          <a
            href={job.apply_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-600 hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl mt-4"
          >
            Apply Here
          </a>

          <div className='flex flex-col mt-20'>
              <h1 className='text-blue-950 font-bold text-3xl'>Comment Section</h1>
              <CommentSection jobId={job._id}/>
          </div>

        </div>
      ) : (
        <p className="text-center text-indigo-800 text-lg font-medium animate-pulse">Loading job details...</p>
      )}


    </div>
  );
}
