import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BookmarkIcon , FlagIcon } from 'lucide-react';
import CommentSection from '../components/CommentSection';
import { useSelector } from 'react-redux';
import pako from 'pako';

export default function FullJd() {
  const { id, url } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [isSaved, setIsSaved] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?._id;

  const decompressDescription = (compressedDescription) => {
    try {
      // Convert the base64 string to a Uint8Array
      const binaryString = atob(compressedDescription);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Decompress using pako
      const decompressed = pako.inflate(bytes, { to: 'string' });
      return decompressed;
    } catch (error) {
      console.error("Error decompressing job description:", error);
      return "Error: Unable to decompress job description";
    }
  };

  useEffect(() => {
    axios.get(`/backend/naukri/${url}/${id}`)
      .then((response) => {
        const jobData = response.data;
        // Decompress the job description
        jobData.full_jd = decompressDescription(jobData.full_jd);
        setJob(jobData);
        checkIfJobIsSaved(jobData._id);
      })
      .catch((error) => console.error("Error fetching job data:", error));
  }, [id, url]);

  const checkIfJobIsSaved = async (jobId) => {
    try {
      const { data } = await axios.get(`/backend/saved-jobs/${userId}`);
      const saved = data.some(savedJob => savedJob.jobId === jobId);
      setIsSaved(saved);
    } catch (err) {
      console.error("Error checking saved jobs:", err);
    }
  };

  const handleSaveJob = async () => {
    try {
      if (isSaved) {
        await axios.delete(`/backend/saved-jobs/${userId}/${job._id}`);
        setIsSaved(false);
      } else {
        const jobData = {
          jobId: job._id,
          title: job.title,
          company: job.company,
          location: job.location,
          min_exp: job.min_exp,
          full_jd: job.full_jd,
          apply_link: job.apply_link,
          time: job.time
        };
  
        await axios.post(`/backend/saved-jobs/${userId}`, jobData);
        setIsSaved(true);
        navigate("/my-jobs");
      }
    } catch (err) {
      console.error("Error saving job:", err);
      // Add more detailed error logging
      console.error("Error details:", err.response ? err.response.data : err.message);
    }
  };


  const handleReportJob = () => {
    // Placeholder for report functionality
    alert('Job has been reported.');
  };
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
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



  return (
    <div className="mt-12 mb-20 px-4 lg:px-20">
      {job ? (
        <div className="bg-gradient-to-br from-blue-100 via-purple-200 to-indigo-200 p-8 rounded-lg shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-extrabold text-indigo-800 mb-4 animate-fadeInUp">{job.title}</h2>

            <div className="flex items-center space-x-4">
              <button
                onClick={handleSaveJob}
                className={`p-2 rounded-full ${isSaved ? 'bg-yellow-400' : 'bg-gray-200'} hover:bg-yellow-500 transition-colors duration-300`}
              >
                <BookmarkIcon size={24} color={isSaved ? 'white' : 'black'} />
              </button>

              <button
                className="p-2 rounded-full bg-gray-200 hover:bg-red-500 transition-colors duration-300"
                title="Report this job"
              >
                <FlagIcon size={24} color="black" />
              </button>
            </div>

          </div>
          
          <p className="text-lg mb-2 text-gray-700 font-medium mt-4">
            <span className="text-purple-600 font-bold">⮞ Company ➦ </span>{job.company}
          </p>
          
          <p className="text-lg mb-2 text-gray-700 font-medium mt-4">
            <span className="text-purple-600 font-bold">⮞ Location ➦ </span>{job.location.join(", ")}
          </p>
          
          <p className="text-lg mb-2 text-gray-700 font-medium mt-4">
            <span className="text-purple-600 font-bold">⮞ Experience ➦ </span>{job.min_exp} years
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