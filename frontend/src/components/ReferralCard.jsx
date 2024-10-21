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
            {referral.company} - {referral.position}
          </motion.h3>
          <motion.div
            className="flex flex-wrap gap-2 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-blue-100 px-2 py-1 rounded-full">Job ID : {referral.jobid}</span>
            <span className="bg-green-100 px-2 py-1 rounded-full">Referral by : {referral.fullName}</span>
          </motion.div>
        </div>
        <div className="px-6 pb-4 flex-grow">
          <motion.p
            className="text-gray-700 line-clamp-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Position : {referral.position}
          </motion.p>
          <motion.button
            className="mt-2 text-blue-600 hover:text-blue-800 flex items-center"
            onClick={() => setIsModalOpen(true)}
            whileHover={{ scale: 1.05 }}
          >
            View details <ChevronDown className="ml-1" size={16} />
          </motion.button>
        </div>
        <motion.div
          className="p-4 flex justify-center items-center border-t border-blue-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-sm text-gray-600">Contact : <strong>{referral.contact}</strong> </span>
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
              <div className="p-6 bg-gradient-to-r from-blue-600 to-green-600 relative">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {referral.company} - {referral.position}
                </h3>
                <div className="flex flex-wrap gap-2 text-sm">
                  <span className="bg-white bg-opacity-20 text-white px-2 py-1 rounded-full">
                    Job ID : {referral.jobid}
                  </span>
                  <span className="bg-white bg-opacity-20 text-white px-2 py-1 rounded-full">
                    Referral by : {referral.fullName}
                  </span>
                </div>
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
                  <h4 className="text-2xl font-bold mb-4">Referral Details</h4>
                  <p className="mb-2"><strong>Full Name :</strong> {referral.fullName}</p>
                  <p className="mb-2"><strong>Company :</strong> {referral.company}</p>
                  <p className="mb-2"><strong>Position :</strong> {referral.position}</p>
                  <p className="mb-2"><strong>Job ID :</strong> {referral.jobid}</p>
                  <p className="mb-4"><strong>Share your CV and details at :</strong> {referral.contact}</p>
                </motion.div>
              </div>
              <div className="p-6 bg-gray-100 flex justify-center items-center">
                <motion.p 
                  className="text-sm text-gray-700 italic text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  "Your next big opportunity awaits! Best of luck with your application!"
                </motion.p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}