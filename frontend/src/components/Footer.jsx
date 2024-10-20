import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaGithub, FaDribbble } from 'react-icons/fa';

const FooterLink = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-700 hover:text-indigo-600 transition-colors duration-300"
  >
    {children}
  </a>
);

const SocialIcon = ({ href, icon: Icon }) => (
  <a
    href={href}
    className="text-gray-700 hover:text-indigo-600 transition-colors duration-300"
  >
    <Icon className="w-5 h-5" />
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 relative shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <img
                src="/assets/TrendingJobs4All.png"
                alt="TrendingJobs4All Logo"
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold text-indigo-700">TrendingJobs4All</span>
            </Link>
            <p className="text-sm text-gray-700">
              Connecting you to the best career opportunities in the market.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">Quick Links</h3>
            <ul className="space-y-2">
              <li><FooterLink href="/about">About Us</FooterLink></li>
              <li><FooterLink href="/jobs">Job Listings</FooterLink></li>
              <li><FooterLink href="/resources">Career Resources</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">Legal</h3>
            <ul className="space-y-2">
              <li><FooterLink href="/privacy">Privacy Policy</FooterLink></li>
              <li><FooterLink href="/terms">Terms of Service</FooterLink></li>
              <li><FooterLink href="/cookies">Cookie Policy</FooterLink></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4 text-indigo-700">Newsletter</h3>
            <p className="text-sm text-gray-700 mb-4">Stay updated with the latest job trends and career advice.</p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-gray-800 px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <button
                type="submit"
                className="bg-indigo-700 text-white px-4 py-2 rounded-r-md hover:bg-indigo-800 transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-700">
            © {new Date().getFullYear()} TrendingJobs4All. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <SocialIcon href="#" icon={FaFacebookF} />
            <SocialIcon href="#" icon={FaInstagram} />
            <SocialIcon href="#" icon={FaTwitter} />
            <SocialIcon href="https://github.com/deepak04iiitn" icon={FaGithub} />
            <SocialIcon href="#" icon={FaDribbble} />
          </div>
        </div>
      </div>
      <div className="w-full h-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
    </footer>
  );
}