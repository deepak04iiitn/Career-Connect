import React, { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ReferralCard({ referral }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!referral) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <motion.div
        className="bg-gradient-to-br from-blue-100 to-green-100 rounded-lg shadow-lg overflow-hidden h-full flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02 }}
      >
        <div className="p-6">
          <motion.h3
            className="text-xl font-bold text-blue-800 mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {referral.company}
          </motion.h3>
          <motion.div
            className="flex flex-wrap gap-2 text-sm text-gray-600 mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-blue-100 px-2 py-1 rounded-full">
              {referral.positions.length} {referral.positions.length === 1 ? 'Position' : 'Positions'}
            </span>
            <span className="bg-green-100 px-2 py-1 rounded-full">
              Referral by : {referral.fullName}
            </span>
          </motion.div>
          <motion.div
            className="text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span className="bg-purple-100 px-2 py-1 rounded-full">
              Contact : {referral.contact}
            </span>
          </motion.div>
        </div>
        <div className="px-6 pb-4 mt-auto">
          <motion.button
            className="text-blue-600 hover:text-blue-800 flex items-center"
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
          >
            View details <ChevronDown className="ml-1" size={16} />
          </motion.button>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-md p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl w-full max-w-2xl overflow-hidden"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 bg-gradient-to-r from-blue-600 to-green-600 relative">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {referral.company}
                </h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-white bg-opacity-20 text-white px-2 py-1 rounded-full">
                    Referral by : {referral.fullName}
                  </span>
                  <span className="bg-white bg-opacity-20 text-white px-2 py-1 rounded-full">
                    Contact : {referral.contact}
                  </span>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-4 right-4 text-white hover:text-gray-200"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-gray-800">Available Positions</h4>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Position
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Job ID
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {referral.positions.map((pos, index) => (
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {pos.position}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {pos.jobid || 'Not found'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Contact Information Section */}
                  <div className="mt-8 text-center">
                    <p className="text-gray-700 font-medium">
                      Share your CV and details at: <span className="text-blue-600">{referral.contact}</span>
                    </p>
                  </div>
                  
                  {/* Motivational Message */}
                  <div className="mt-6 text-center border-t pt-6">
                    <p className="text-gray-600 italic font-serif text-lg">
                      "Your next big opportunity awaits! Best of luck with your application!"
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}