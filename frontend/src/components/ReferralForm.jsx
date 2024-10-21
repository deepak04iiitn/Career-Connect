import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReferralForm({ toggleModal }) {
  const [formData, setFormData] = useState({
    fullName: '',
    company: '',
    position: '',
    jobid: '',
    contact: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.fullName || !formData.company || !formData.position || !formData.jobid || !formData.contact) {
      setError('All fields are required');
      return;
    }

    try {
      const response = await fetch('/backend/referrals/createReferral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Something went wrong');
      }

      const data = await response.json();
      setSuccess('Referral submitted successfully!');

      setFormData({
        fullName: '',
        company: '',
        position: '',
        jobid: '',
        contact: '',
      });

      setTimeout(() => {
        toggleModal();
      }, 2000);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 20 }}
      transition={{ type: 'spring', damping: 25, stiffness: 300 }}
      className="relative rounded-2xl shadow-2xl w-full max-w-lg mx-auto bg-cover bg-center"
      style={{
        backgroundImage: 'url(/assets/referral.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl"></div>

      <div className="relative z-10 p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
        <button
          onClick={toggleModal}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"
        >
          <X size={24} />
        </button>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <h2 className="text-xl sm:text-2xl font-bold text-center text-gray-800 mb-4">
            Share Your Referral
          </h2>

          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          {success && <p className="text-green-500 text-sm text-center">{success}</p>}

          <div className="space-y-3 sm:space-y-4">
            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                value={formData.fullName}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 transition duration-300 bg-white bg-opacity-50 px-3 py-2 text-sm sm:text-base"
                placeholder="Enter your name"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                Company
              </label>
              <input
                type="text"
                id="company"
                value={formData.company}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 transition duration-300 bg-white bg-opacity-50 px-3 py-2 text-sm sm:text-base"
                placeholder="Enter company name"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                Position
              </label>
              <input
                type="text"
                id="position"
                value={formData.position}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 transition duration-300 bg-white bg-opacity-50 px-3 py-2 text-sm sm:text-base"
                placeholder="Enter position title"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="jobid" className="block text-sm font-medium text-gray-700">
                Job ID
              </label>
              <input
                type="text"
                id="jobid"
                value={formData.jobid}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 transition duration-300 bg-white bg-opacity-50 px-3 py-2 text-sm sm:text-base"
                placeholder="Enter Job ID"
                onChange={handleChange}
              />
            </div>

            <div className="space-y-1 sm:space-y-2">
              <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
                Contact
              </label>
              <input
                type="text"
                id="contact"
                value={formData.contact}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 transition duration-300 bg-white bg-opacity-50 px-3 py-2 text-sm sm:text-base"
                placeholder="Enter your email address"
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gray-800 text-white py-2 sm:py-3 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 transform hover:scale-105 font-semibold text-sm sm:text-base"
          >
            Submit Referral
          </button>
        </form>
      </div>
    </motion.div>
  );
}