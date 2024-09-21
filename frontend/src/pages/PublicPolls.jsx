import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PollCard from '../components/PollCard';
import { Button, Spinner } from 'flowbite-react';
import { motion, AnimatePresence } from 'framer-motion';

const PublicPolls = () => {
  const [polls, setPolls] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    if (isLoading) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`/backend/polls?page=${page}&limit=10`);
      const newPolls = response.data.filter(poll => poll && poll.question && poll.options && poll.options.length > 0);
      if (newPolls.length < 10) {
        setHasMore(false);
      }
      setPolls(prevPolls => [...prevPolls, ...newPolls]);
      setPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error('Error fetching polls:', error);
      setError('Failed to fetch polls. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center text-red-500"
      >
        {error}
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
          Public Polls
        </motion.span>
      </h1>
      {polls.length === 0 && !isLoading ? (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-gray-600"
        >
          No polls available at the moment.
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
                <PollCard poll={poll} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mt-4"
        >
          <Spinner size="xl" className="text-purple-500" />
        </motion.div>
      )}
      {hasMore && !isLoading && (
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            onClick={fetchPolls}
            className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Load More
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PublicPolls;