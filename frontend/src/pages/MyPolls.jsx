import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PollCard from '../components/PollCard';
import { Spinner, Button } from 'flowbite-react';
import { motion, AnimatePresence } from 'framer-motion';

const MyPolls = () => {
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMyPolls();
  }, []);

  const fetchMyPolls = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get('/backend/polls/my');
      if (Array.isArray(response.data)) {
        setPolls(response.data);
      } else {
        throw new Error('Received invalid data format');
      }
    } catch (error) {
      console.error('Error fetching my polls:', error);
      setError('Failed to fetch your polls. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (pollId) => {
    try {
      await axios.delete(`/backend/polls/${pollId}`);
      setPolls(polls.filter((poll) => poll._id !== pollId));
    } catch (error) {
      console.error('Error deleting poll:', error);
      setError('Failed to delete the poll. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 to-blue-100"
      >
        <Spinner size="xl" className="text-purple-500" />
      </motion.div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex justify-center items-center h-screen bg-gradient-to-br from-purple-100 to-blue-100"
      >
        <div className="text-center text-red-500 bg-white p-6 rounded-lg shadow-lg">
          <p className="text-xl font-semibold mb-2">Error</p>
          <p>{error}</p>
          <Button
            color="failure"
            onClick={fetchMyPolls}
            className="mt-4"
          >
            Try Again
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container mx-auto px-4 py-8 bg-gradient-to-br from-purple-100 to-blue-100 min-h-screen"
    >
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        <motion.span
          className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          My Polls
        </motion.span>
      </h1>
      {polls.length === 0 ? (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-600 text-xl"
        >
          You haven't created any polls yet.
        </motion.p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <AnimatePresence>
            {polls.map((poll) => (
              <motion.div
                key={poll._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="h-[400px]" // Fixed height for all cards
              >
                <PollCard poll={poll} onDelete={() => handleDelete(poll._id)} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </motion.div>
  );
};

export default MyPolls;