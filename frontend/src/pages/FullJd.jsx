import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

export default function FullJd() {

  const { id } = useParams();
  const [job, setJob] = useState(null);


  useEffect(() => {
    axios.get(`http://localhost:3000/backend/naukri/${id}`)
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

  return (
    <div className="mt-12 mb-20 px-4 lg:px-20">
      {job ? (
        <div className="bg-gradient-to-br from-blue-100 via-purple-200 to-indigo-200 p-8 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
          <h2 className="text-3xl font-extrabold text-indigo-800 mb-4 animate-fadeInUp">{job.title}</h2>
          
          <p className="text-lg mb-2 text-gray-700 font-medium">
            <span className="text-purple-600 font-bold">Company ➦ </span>{job.company}
          </p>
          
          <p className="text-lg mb-2 text-gray-700 font-medium">
            <span className="text-purple-600 font-bold">Location ➦ </span>{job.location.join(", ")}
          </p>
          
          <p className="text-lg mb-2 text-gray-700 font-medium">
            <span className="text-purple-600 font-bold">Experience ➦ </span>{job.min_exp} - {job.max_exp} years
          </p>
          
          <p className="text-lg mb-4 text-gray-700 font-medium">
            <span className="text-purple-600 font-bold">Job Description ➦ </span>{job.full_jd}
          </p>

          <p className="text-lg mb-2 text-gray-700 font-medium">
            <span className="text-purple-600 font-bold">Posted on ➦ </span>{formatDate(job.time)}
          </p>
          
          <a
            href={job.apply_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-purple-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-600 hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-2xl"
          >
            Apply Here
          </a>
        </div>
      ) : (
        <p className="text-center text-indigo-800 text-lg font-medium animate-pulse">Loading job details...</p>
      )}
    </div>
  );
}