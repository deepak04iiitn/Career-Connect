import React, { useState, useEffect } from 'react';
import { Plus, Search, SortAsc, SortDesc, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import InterviewForm from '../components/InterviewForm';
import InterviewCard from '../components/InterviewCard';

export default function InterviewExp() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [experiences, setExperiences] = useState([]);
  const [visibleExperiences, setVisibleExperiences] = useState(10);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [yoeSearch, setYoeSearch] = useState('');
  const [verdictFilter, setVerdictFilter] = useState('');
  const [sortOrder, setSortOrder] = useState('desc');

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const response = await fetch('/backend/interviews/getInterviewExp');
      if (!response.ok) {
        throw new Error('Failed to fetch experiences');
      }
      const data = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error('Error fetching experiences:', error);
    }
  };

  const handleShowMore = () => {
    setVisibleExperiences(prev => prev + 10);
  };

  const filteredExperiences = experiences
    .filter(exp => {
      const keywordMatch = exp.company.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        exp.position.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        exp.experience.toLowerCase().includes(searchKeyword.toLowerCase());
      
      const yoeMatch = yoeSearch === '' || 
        (exp.yoe !== undefined && exp.yoe.toString() === yoeSearch);
      
      const verdictMatch = verdictFilter === '' || 
        (exp.verdict && exp.verdict.toLowerCase() === verdictFilter.toLowerCase());
      
      return keywordMatch && yoeMatch && verdictMatch;
    })
    .sort((a, b) => {
      if (sortOrder === 'asc') {
        return (a.rating || 0) - (b.rating || 0);
      } else {
        return (b.rating || 0) - (a.rating || 0);
      }
    });

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="flex flex-col justify-center items-center space-y-4 sm:space-y-0 sm:flex-row sm:space-x-6 mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-wrap justify-center items-center gap-6">
            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <input
                type="text"
                placeholder="Search with any keyword"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="pl-10 pr-4 py-2 border border-indigo-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-white bg-opacity-80 backdrop-blur-sm"
              />
              <Search className="absolute left-3 top-2.5 text-indigo-400" size={20} />
            </motion.div>

            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <input
                type="number"
                placeholder="Years of Experience"
                value={yoeSearch}
                onChange={(e) => setYoeSearch(e.target.value)}
                className="pl-4 pr-4 py-2 border border-indigo-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-white bg-opacity-80 backdrop-blur-sm"
              />
            </motion.div>

            <motion.div 
              className="relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <select
                value={verdictFilter}
                onChange={(e) => setVerdictFilter(e.target.value)}
                className="pl-10 pr-4 py-2 border border-indigo-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-white bg-opacity-80 backdrop-blur-sm appearance-none"
              >
                <option value="">All Verdicts</option>
                <option value="selected">Selected</option>
                <option value="rejected">Rejected</option>
              </select>
              <Filter className="absolute left-3 top-2.5 text-indigo-400" size={20} />
            </motion.div>

            <motion.button
              onClick={toggleSortOrder}
              className="flex items-center justify-center px-4 py-2 bg-white bg-opacity-80 backdrop-blur-sm border border-indigo-300 rounded-full hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {sortOrder === 'asc' ? <SortAsc size={20} className="text-indigo-600" /> : <SortDesc size={20} className="text-indigo-600" />}
              <span className="ml-2 text-indigo-700">Sort by rating</span>
            </motion.button>
          </div>

          <motion.button
            onClick={toggleModal}
            className="bg-indigo-600 text-white rounded-full px-6 py-3 shadow-lg transition-all duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 flex items-center mt-4 sm:mt-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus size={24} />
            <span className="ml-2">Share Experience</span>
          </motion.button>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {filteredExperiences.slice(0, visibleExperiences).map((exp, index) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <InterviewCard experience={exp} />
            </motion.div>
          ))}
        </motion.div>

        {visibleExperiences < filteredExperiences.length && (
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
              <InterviewForm toggleModal={toggleModal} onSubmitSuccess={fetchExperiences} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}