import { Timeline } from 'flowbite-react';
import React from 'react';
import TypeWriterEffect from 'react-typewriter-effect';
import { IoIosSearch, IoIosCheckmarkCircle, IoIosTrendingUp } from "react-icons/io";
import JobTable from '../components/JobTable';

export default function Home() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 md:py-12 lg:py-16">
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <img
              src="/assets/gif2.gif"
              className="h-40 w-40 md:h-52 md:w-52"
              alt="Welcome"
            />
            <div className="flex flex-col items-center md:items-start text-center md:text-left">
              <span className="text-2xl md:text-5xl font-extrabold bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-4 block">
                <TypeWriterEffect
                  textStyle={{
                    fontFamily: 'Red Hat Display',
                    fontWeight: 'bold',
                    background: 'linear-gradient(to right, #00bcd4, #2196f3, #9c27b0)',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    fontSize: 'inherit',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.4)',
                  }}
                  startDelay={100}
                  cursorColor="black"
                  text="Welcome to TrendingJobs4All!"
                  typeSpeed={100}
                />
              </span>
              <span className="text-lg md:text-2xl font-medium bg-gradient-to-r from-gray-600 to-gray-400 bg-clip-text text-transparent">
                Explore Opportunities that Align with Your Passion and Skillset!
              </span>
            </div>
          </div>
        </div>

        <div className="py-8">
          <JobTable />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes fadeInSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-in-out;
        }

        .animate-fadeInSlideUp {
          animation: fadeInSlideUp 1s ease-in-out;
        }

        .animate-slideIn {
          animation: slideIn 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
}





