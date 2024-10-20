import React, { useState } from 'react';
import { Plus, X, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function InterviewExp() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const toggleModal = () => setIsModalOpen(!isModalOpen);

  return (

    <div className="min-h-screen bg-gray-100 relative flex items-center justify-center p-4">

      <button
        onClick={toggleModal}
        className="bg-white text-gray-800 rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >

        <Plus size={32} />

      </button>

      <AnimatePresence>

        {isModalOpen && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={toggleModal}
          >

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative rounded-2xl shadow-2xl w-full max-w-lg mx-auto bg-cover bg-center"
              style={{
                backgroundImage: 'url(/assets/interview.png)', // Replace with your actual image URL
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
              onClick={(e) => e.stopPropagation()}
            >

              <div className="absolute inset-0 bg-white bg-opacity-80 backdrop-blur-sm rounded-2xl"></div>
              
              <div className="relative z-10 p-6">

                <button 
                  onClick={toggleModal} 
                  className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                >

                  <X size={24} />

                </button>

                <form className="space-y-4">
                    
                  <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
                    Share Your Interview Experience
                  </h2>

                  <div className="space-y-2">

                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 transition duration-300 bg-white bg-opacity-50 px-3 py-2 text-base"
                      placeholder="Enter your name"
                    />

                  </div>

                  <div className="space-y-2">

                    <label htmlFor="company" className="block text-sm font-medium text-gray-700">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 transition duration-300 bg-white bg-opacity-50 px-3 py-2 text-base"
                      placeholder="Enter company name"
                    />

                  </div>

                  <div className="space-y-2">

                    <label htmlFor="position" className="block text-sm font-medium text-gray-700">
                      Position
                    </label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 transition duration-300 bg-white bg-opacity-50 px-3 py-2 text-base"
                      placeholder="Enter position title"
                    />

                  </div>

                  <div className="space-y-2">

                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700">
                      Experience
                    </label>
                    <textarea
                      id="experience"
                      name="experience"
                      rows="5"
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring focus:ring-gray-200 focus:ring-opacity-50 transition duration-300 bg-white bg-opacity-50 px-3 py-2 text-base"
                      placeholder="Describe your interview experience..."
                    ></textarea>

                  </div>

                  <div className="space-y-2">

                    <label className="block text-sm font-medium text-gray-700">
                      Rating
                    </label>

                    <div className="flex justify-center space-x-2">

                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className={`focus:outline-none transition-colors duration-200 ${
                            star <= rating ? 'text-yellow-500' : 'text-gray-400'
                          }`}
                        >
                          <Star 
                            fill={star <= rating ? 'currentColor' : 'none'} 
                            size={24} 
                            strokeWidth={2}
                          />
                        </button>
                      ))}

                    </div>

                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gray-800 text-white py-3 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transition duration-300 transform hover:scale-105 font-semibold text-base"
                  >

                    Submit Experience

                  </button>

                </form>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>
      
    </div>
  );
}