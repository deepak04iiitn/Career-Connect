import React, { useState, useEffect } from 'react';
import { TrashIcon, BriefcaseIcon, MapPinIcon, ClockIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';

const formatUrlString = (company, title) => {
  const formatString = (str) => str
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-');

  return `${formatString(company)}-${formatString(title)}`;
};


export default function MyJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser?._id;

  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const response = await axios.get(`/backend/saved-jobs/${userId}`);
        setSavedJobs(response.data);
      } catch (error) {
        console.error("Error fetching saved jobs:", error);
      }
    };

    if (userId) {
      fetchSavedJobs();
    }
  }, [userId]);


  const handleRemoveJob = async (jobId, event) => {
    event.stopPropagation();
    try {
      await axios.delete(`/backend/saved-jobs/${userId}/${jobId}`);
      setSavedJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
    } catch (err) {
      console.error("Error removing job:", err);
    }
  };

  const handleCardClick = (jobId, company, title) => {
    const formattedUrl = formatUrlString(company, title);
    navigate(`/fulljd/${formattedUrl}/${jobId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-indigo-800 mb-8 text-center"
        >
          My Saved Jobs
        </motion.h1>
        {savedJobs.length === 0 ? (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-center text-lg"
          >
            You haven't saved any jobs yet.
          </motion.p>
        ) : (
          <motion.div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {savedJobs.map((job) => (
              <motion.div
                key={job._id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl cursor-pointer"
                onClick={() => handleCardClick(job.jobId, job.company, job.title)}
              >
                {/* Job card content */}
                <div className="p-6 flex flex-col h-full">
                  <div className="flex-grow">
                    <h2 className="text-2xl font-semibold text-indigo-700 mb-3">{job.title}</h2>
                    <div className="flex items-center text-gray-600 mb-2">
                      <BriefcaseIcon size={18} className="mr-2" />
                      <p>{job.company}</p>
                    </div>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPinIcon size={18} className="mr-2" />
                      <p>{job.location.join(", ")}</p>
                    </div>
                    <div className="flex items-center text-gray-600 mb-4">
                      <ClockIcon size={18} className="mr-2" />
                      <p>{job.min_exp} - {job.max_exp} years experience</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <a
                      href={job.apply_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple-500 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-purple-600 transition-colors duration-300"
                    >
                      Apply Now
                    </a>
                    <button
                      onClick={(e) => handleRemoveJob(job._id, e)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-300 p-2 rounded-full hover:bg-red-100"
                    >
                      <TrashIcon size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}