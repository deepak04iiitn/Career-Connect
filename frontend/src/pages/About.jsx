import React from 'react';
import { Button, Timeline } from 'flowbite-react';
import { HiArrowNarrowRight, HiCalendar } from 'react-icons/hi';

export default function About() {
  return (
    <div
      className='flex flex-col items-center bg-gradient-to-r from-blue-50 via-blue-100 to-blue-200 p-10'
      style={{ 
        fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
      }}
    >
      <h1
        className='text-4xl font-extrabold text-gray-800 mb-12'
        style={{
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        About Us
      </h1>
      <Timeline className='w-full max-w-4xl'>
        <Timeline.Item
          className='transition-transform transform hover:scale-105 duration-500 border-l-2 border-blue-600 pl-6 mb-10'
          style={{
            position: 'relative',
            paddingLeft: '1.5rem',
          }}
        >
          <Timeline.Point
            icon={HiCalendar}
            className='text-blue-600'
            style={{
              position: 'absolute',
              left: '-0.75rem',
              top: '0',
              backgroundColor: '#3b82f6',
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Timeline.Content
            className='p-6 bg-white rounded-lg shadow-lg'
            style={{
              position: 'relative',
              paddingLeft: '2.5rem',
            }}
          >
            <Timeline.Time className='text-gray-600 text-sm'>
              August 2024
            </Timeline.Time>
            <Timeline.Title className='text-2xl font-semibold text-gray-900 mt-2 mb-4'>
              Who Are We?
            </Timeline.Title>
            <Timeline.Body className='text-gray-700 text-base leading-relaxed'>
              ⮞ At <strong className='text-blue-600'>CareerConnect</strong>, we are a passionate team dedicated to bridging the gap between talented individuals and the career opportunities
              they deserve. <br />
              ⮞ Our platform is designed to help you discover job roles and internships that align with your skills, ambitions, and
              values. <br />
              ⮞ We believe in empowering individuals by connecting them with the right opportunities, ensuring that every step in your career
              is a fulfilling one. <br />
              ⮞ With a focus on innovation and user experience, CareerConnect is the ideal place for professionals and students to
              find their next big break.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item
          className='transition-transform transform hover:scale-105 duration-500 border-l-2 border-blue-600 pl-6 mb-10'
          style={{
            position: 'relative',
            paddingLeft: '1.5rem',
          }}
        >
          <Timeline.Point
            icon={HiCalendar}
            className='text-blue-600'
            style={{
              position: 'absolute',
              left: '-0.75rem',
              top: '0',
              backgroundColor: '#3b82f6',
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Timeline.Content
            className='p-6 bg-white rounded-lg shadow-lg'
            style={{
              position: 'relative',
              paddingLeft: '2.5rem',
            }}
          >
            <Timeline.Time className='text-gray-600 text-sm'>
              August 2024
            </Timeline.Time>
            <Timeline.Title className='text-2xl font-semibold text-gray-900 mt-2 mb-4'>
              What Makes Us Different from Others?
            </Timeline.Title>
            <Timeline.Body className='text-gray-700 text-base leading-relaxed'>
              ⮞ <strong className='text-blue-600'>CareerConnect</strong> goes beyond the traditional job search experience by focusing on personalized career recommendations.
              <br />
              ⮞ We use advanced algorithms to match your unique skills, experiences, and aspirations with the most relevant opportunities.
              <br />
              ⮞ Our platform also offers tailored resources to help you upskill, network, and stay updated with industry trends.
              <br />
              ⮞ Moreover, we emphasize community building, giving you access to forums, mentorship, and career advice from experts.
              <br />
              ⮞ It’s not just about finding a job — it’s about finding the right career path for you.
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
        <Timeline.Item
          className='transition-transform transform hover:scale-105 duration-500 border-l-2 border-blue-600 pl-6 mb-10'
          style={{
            position: 'relative',
            paddingLeft: '1.5rem',
          }}
        >
          <Timeline.Point
            icon={HiCalendar}
            className='text-blue-600'
            style={{
              position: 'absolute',
              left: '-0.75rem',
              top: '0',
              backgroundColor: '#3b82f6',
              width: '2rem',
              height: '2rem',
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
          />
          <Timeline.Content
            className='p-6 bg-white rounded-lg shadow-lg'
            style={{
              position: 'relative',
              paddingLeft: '2.5rem',
            }}
          >
            <Timeline.Time className='text-gray-600 text-sm'>
              August 2024
            </Timeline.Time>
            <Timeline.Title className='text-2xl font-semibold text-gray-900 mt-2 mb-4'>
              Why Choose Us?
            </Timeline.Title>
            <Timeline.Body className='text-gray-700 text-base leading-relaxed'>
              ⮞ Choosing <strong className='text-blue-600'>CareerConnect</strong> means choosing a platform that truly understands your career goals. We offer a seamless,
              intuitive experience to explore and apply for opportunities that resonate with your passion and skill set.
              <br />
              ⮞ With us, you are not just a job seeker; you are part of a community that supports continuous growth and success.
              <br />
              ⮞ Our commitment to offering curated opportunities, personalized insights, and professional development resources
              makes CareerConnect the ultimate platform to advance your career. Join us and take the first step toward a brighter,
              more fulfilling professional future!
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
      </Timeline>
    </div>
  );
}
