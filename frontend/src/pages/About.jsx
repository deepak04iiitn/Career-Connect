import React from 'react';
import { Button, Timeline } from "flowbite-react";
import { HiArrowNarrowRight, HiCalendar } from "react-icons/hi";

export default function About() {
  return (
    <div className='flex justify-center items-center'>
      <Timeline className='m-10'>
      <Timeline.Item>
        <Timeline.Point icon={HiCalendar} />
        <Timeline.Content>
          <Timeline.Time>August 2024</Timeline.Time>
          <Timeline.Title>Who Are We?</Timeline.Title>
          <Timeline.Body>
                At <strong>CareerConnect</strong>, we are a passionate team dedicated to bridging the gap between talented individuals and the career opportunities <br />
                they deserve. Our platform is designed to help you discover job roles and internships that align with your skills, ambitions, and <br />
                values. We believe in empowering individuals by connecting them with the right opportunities, ensuring that every step in your career <br />
                is a fulfilling one. With a focus on innovation and user experience, CareerConnect is the ideal place for professionals and students to <br />
                find their next big break.
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point icon={HiCalendar} />
        <Timeline.Content>
          <Timeline.Time>August 2024</Timeline.Time>
          <Timeline.Title>What Makes Us Different from Others?</Timeline.Title>
          <Timeline.Body>
                <strong>CareerConnect</strong> goes beyond the traditional job search experience by focusing on personalized career recommendations. <br />
                We use advanced algorithms to match your unique skills, experiences, and aspirations with the most relevant opportunities. <br />
                Our platform also offers tailored resources to help you upskill, network, and stay updated with industry trends. <br />
                Moreover, we emphasize community building, giving you access to forums, mentorship, and career advice from experts. <br />
                It’s not just about finding a job — it’s about finding the right career path for you.
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
      <Timeline.Item>
        <Timeline.Point icon={HiCalendar} />
        <Timeline.Content>
          <Timeline.Time>August 2024</Timeline.Time>
          <Timeline.Title>Why Choose Us?</Timeline.Title>
          <Timeline.Body>
                Choosing <strong>CareerConnect</strong> means choosing a platform that truly understands your career goals. We offer a seamless, <br />
                intuitive experience to explore and apply for opportunities that resonate with your passion and skill set. <br />
                With us, you are not just a job seeker; you are part of a community that supports continuous growth and success. <br />
                Our commitment to offering curated opportunities, personalized insights, and professional development resources <br />
                makes CareerConnect the ultimate platform to advance your career. Join us and take the first step toward a brighter, <br />
                more fulfilling professional future!
          </Timeline.Body>
        </Timeline.Content>
      </Timeline.Item>
    </Timeline>
    </div>
  )
}