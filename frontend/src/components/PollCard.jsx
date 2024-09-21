import React, { useState } from 'react';
import { Card, Button, Progress } from 'flowbite-react';
import axios from 'axios';
import { motion } from 'framer-motion';

const PollCard = ({ poll, onDelete }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState(null);
  const [votedPoll, setVotedPoll] = useState(poll);

  if (!votedPoll || !votedPoll.question || !Array.isArray(votedPoll.options) || votedPoll.options.length === 0) {
    return null;
  }

  const handleVote = async () => {
    if (selectedOption === null) return;
    setIsVoting(true);
    setError(null);
    try {
      const response = await axios.post(`/backend/polls/${votedPoll._id}/vote`, { option: selectedOption });
      setVotedPoll(response.data);
    } catch (error) {
      console.error('Error voting:', error);
      setError('Failed to submit vote. Please try again.');
    } finally {
      setIsVoting(false);
    }
  };

  const calculateVoteStats = () => {
    const totalVotes = votedPoll.votes.length;
    return votedPoll.options.map((option, index) => {
      const optionVotes = votedPoll.votes.filter(vote => vote.option === index).length;
      const percentage = totalVotes > 0 ? (optionVotes / totalVotes) * 100 : 0;
      return {
        votes: optionVotes,
        percentage: percentage.toFixed(1)
      };
    });
  };

  const voteStats = calculateVoteStats();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card className="w-full h-full flex flex-col bg-gradient-to-br from-purple-100 to-blue-100 shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex-grow overflow-y-auto">
          <h5 className="text-xl font-bold tracking-tight text-gray-900 mb-4">
            {votedPoll.question}
          </h5>
          <div className="space-y-4">
            {votedPoll.options.map((option, index) => (
              <motion.div
                key={index}
                className="space-y-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`option-${votedPoll._id}-${index}`}
                    name={`poll-${votedPoll._id}`}
                    value={index}
                    checked={selectedOption === index}
                    onChange={() => setSelectedOption(index)}
                    className="mr-2 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor={`option-${votedPoll._id}-${index}`} className="text-sm cursor-pointer">
                    {option}
                  </label>
                </div>
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                        {voteStats[index].percentage}%
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-blue-600">
                        {voteStats[index].votes} votes
                      </span>
                    </div>
                  </div>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${voteStats[index].percentage}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    <Progress
                      progress={parseFloat(voteStats[index].percentage)}
                      color="blue"
                      size="sm"
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <Button
            onClick={handleVote}
            disabled={isVoting || selectedOption === null}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 text-sm"
          >
            {isVoting ? 'Voting...' : 'Vote'}
          </Button>
          {onDelete && (
            <Button
              color="failure"
              onClick={onDelete}
              className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 text-sm"
            >
              Delete Poll
            </Button>
          )}
        </div>
        {error && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 mt-2 text-sm"
          >
            {error}
          </motion.p>
        )}
        <p className="text-xs text-gray-500 mt-2">
          Total votes: {votedPoll.votes.length}
        </p>
      </Card>
    </motion.div>
  );
};

export default PollCard;