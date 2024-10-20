import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InterviewCard({ experience }) {
  const [likes, setLikes] = useState(experience.numberOfLikes);
  const [dislikes, setDislikes] = useState(experience.numberOfDislikes);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = async () => {
    try {
      const response = await fetch(`/backend/interviews/likeExperience/${experience._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to like experience');
      const data = await response.json();
      setLikes(data.likes);
      setDislikes(data.dislikes);
    } catch (error) {
      console.error('Error liking experience:', error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await fetch(`/backend/interviews/dislikeExperience/${experience._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Failed to dislike experience');
      const data = await response.json();
      setLikes(data.likes);
      setDislikes(data.dislikes);
    } catch (error) {
      console.error('Error disliking experience:', error);
    }
  };

  const formatExperience = (text) => {
    return text.split(/(?<=\.|\:)/).map((item, index) => (
      <p key={index} className="mb-6">
        {item.trim()}
      </p>
    ));
  };

  return (
    <>
      <motion.div
        className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="p-6">
          <motion.h3
            className="text-xl font-bold text-indigo-800 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {experience.company} - {experience.position}
          </motion.h3>
        </div>
        <div className="px-6 pb-4 flex-grow">
          <motion.p
            className="text-gray-700 line-clamp-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {experience.experience}
          </motion.p>
          <motion.button
            className="mt-2 text-indigo-600 hover:text-indigo-800 flex items-center"
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
          >
            Read more <ChevronDown className="ml-1" size={16} />
          </motion.button>
        </div>
        <motion.div
          className="p-4 flex justify-between items-center border-t border-indigo-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center space-x-4">
            <motion.button
              className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
              onClick={handleLike}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ThumbsUp className="mr-1" size={18} />
              {likes}
            </motion.button>
            <motion.button
              className="flex items-center text-sm text-indigo-600 hover:text-indigo-800"
              onClick={handleDislike}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ThumbsDown className="mr-1" size={18} />
              {dislikes}
            </motion.button>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, index) => (
              <motion.span
                key={index}
                className={`text-2xl ${
                  index < experience.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                initial={{ opacity: 0, rotate: -180 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                ★
              </motion.span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 relative">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {experience.company} - {experience.position}
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <motion.div
                  className="text-gray-700"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.1 } },
                  }}
                >
                  {formatExperience(experience.experience)}
                </motion.div>
              </div>
              <div className="p-6 bg-gray-100 flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <motion.button
                    className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                    onClick={handleLike}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ThumbsUp className="mr-1" size={18} />
                    {likes}
                  </motion.button>
                  <motion.button
                    className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
                    onClick={handleDislike}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ThumbsDown className="mr-1" size={18} />
                    {dislikes}
                  </motion.button>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <motion.span
                      key={index}
                      className={`text-2xl ${
                        index < experience.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      initial={{ opacity: 0, rotate: -180 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                    >
                      ★
                    </motion.span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}