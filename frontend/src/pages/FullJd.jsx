import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BookmarkIcon } from 'lucide-react';
import CommentSection from '../components/CommentSection';

export default function FullJd() {
  const { id, url } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    axios.get(`/backend/naukri/${url}/${id}`)
      .then((response) => {
        setJob(response.data);
        // Check if the job is already saved
        const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
        setIsSaved(savedJobs.some(savedJob => savedJob._id === response.data._id));
      })
      .catch((error) => console.error("Error fetching job data:", error));
  }, [id, url]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
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

  const handleSaveJob = () => {
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
    if (isSaved) {
      const updatedSavedJobs = savedJobs.filter(savedJob => savedJob._id !== job._id);
      localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
      setIsSaved(false);
    } else {
      savedJobs.push(job);
      localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
      setIsSaved(true);
    }
    navigate('/my-jobs');

  };

  return (
    <div className="mt-12 mb-20 px-4 lg:px-20">
      {job ? (
        <div className="bg-gradient-to-br from-blue-100 via-purple-200 to-indigo-200 p-8 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-extrabold text-indigo-800 mb-4 animate-fadeInUp">{job.title}</h2>
            <button
              onClick={handleSaveJob}
              className={`p-2 rounded-full ${isSaved ? 'bg-yellow-400' : 'bg-gray-200'} hover:bg-yellow-500 transition-colors duration-300`}
            >
              <BookmarkIcon size={24} color={isSaved ? 'white' : 'black'} />
            </button>
          </div>
          
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