import React from 'react';
import TypeWriterEffect from 'react-typewriter-effect';

export default function Home() {
  return (

    <div className="p-4 md:p-8 lg:p-12 bg-gray-50">

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">

        <img
          src="/assets/gif2.gif"
          className="h-52 w-52"
          alt="CareerConnect Welcome"
        />

        <div className="flex flex-col items-center md:items-start text-center md:text-left">

          <span className="text-3xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4 block">

            <TypeWriterEffect
              textStyle={{
                fontFamily: 'Red Hat Display',
                fontWeight: 'bold',
                background: 'linear-gradient(to right, #ff6f61, #d500f9, #00e676)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontSize: 'inherit',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)', // Add shadow for extra depth
              }}
              startDelay={100}
              cursorColor="black"
              text="Welcome to CareerConnect!"
              typeSpeed={100}
            />

          </span>

          <span className="text-xl md:text-2xl font-medium bg-gradient-to-r from-gray-500 to-gray-700 bg-clip-text text-transparent">
            Explore Opportunities that Align with Your Passion and Skillset!
          </span>

        </div>

      </div>
      
    </div>
  );
}
