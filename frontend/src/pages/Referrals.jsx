import React, { useState, useEffect } from 'react';
import { Plus, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReferralForm from '../components/ReferralForm';
import ReferralCard from '../components/ReferralCard';

export default function Referrals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [referrals, setReferrals] = useState([]);
  const [visibleReferrals, setVisibleReferrals] = useState(10);
  const [companySearch, setCompanySearch] = useState('');
  const [positionSearch, setPositionSearch] = useState('');
  const [jobIdSearch, setJobIdSearch] = useState('');

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    fetchReferrals();
  }, []);

  const fetchReferrals = async () => {
    try {
      const response = await fetch('/backend/referrals/getReferral');
      if (!response.ok) {
        throw new Error('Failed to fetch referrals');
      }
      const data = await response.json();
      setReferrals(data);
    } catch (error) {
      console.error('Error fetching referrals:', error);
    }
  };

  const handleShowMore = () => {
    setVisibleReferrals(prev => prev + 10);
  };

  const filteredReferrals = referrals
    .filter(ref => {
      const companyMatch = ref.company.toLowerCase().includes(companySearch.toLowerCase());
      const positionMatch = positionSearch === '' || 
        ref.position.toLowerCase().includes(positionSearch.toLowerCase());
      const jobIdMatch = jobIdSearch === '' || 
        ref.jobid.toLowerCase().includes(jobIdSearch.toLowerCase());
      
      return companyMatch && positionMatch && jobIdMatch;
    });

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="flex flex-col justify-center items-stretch space-y-4 sm:space-y-0 sm:flex-row sm:space-x-4 lg:space-x-6 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-stretch gap-4 flex-grow">
            <SearchInput
              placeholder="Search by company"
              value={companySearch}
              onChange={(e) => setCompanySearch(e.target.value)}
            />
            <SearchInput
              placeholder="Search by position"
              value={positionSearch}
              onChange={(e) => setPositionSearch(e.target.value)}
            />
            <SearchInput
              placeholder="Search by job ID"
              value={jobIdSearch}
              onChange={(e) => setJobIdSearch(e.target.value)}
            />
          </div>

          <motion.button
            onClick={toggleModal}
            className="bg-indigo-600 text-white rounded-full px-4 py-2 lg:px-6 lg:py-3 shadow-lg transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={24} />
            <span className="ml-2 hidden lg:inline">Share Referral</span>
          </motion.button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredReferrals.slice(0, visibleReferrals).map((ref, index) => (
            <motion.div
              key={ref._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <ReferralCard referral={ref} />
            </motion.div>
          ))}
        </motion.div>

        {visibleReferrals < filteredReferrals.length && (
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <motion.button 
              onClick={handleShowMore} 
              className="px-6 py-2 bg-indigo-600 text-white rounded-full shadow-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Show More
            </motion.button>
          </motion.div>
        )}

        <AnimatePresence>
          {isModalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              onClick={toggleModal}
            >
              <ReferralForm toggleModal={toggleModal} onSubmitSuccess={fetchReferrals} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const SearchInput = ({ placeholder, value, onChange }) => (
  <motion.div 
    className="relative flex-grow"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full pl-10 pr-4 py-2 border border-indigo-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-white bg-opacity-80 backdrop-blur-sm"
    />
    <Search className="absolute left-3 top-2.5 text-indigo-400" size={20} />
  </motion.div>
);