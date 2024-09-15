import { Button, Dropdown, Navbar } from 'flowbite-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation(); // Track the active tab

  return (
    <Navbar
      className="border-b-2 shadow-lg py-2 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 transition-all duration-500 ease-in-out"
    >
      
      <Link to="/" className="self-center bg-white p-2 rounded-full shadow-lg">
        <img
          src="/assets/CareerConnect.png"
          alt="Career Connect"
          className="h-12 w-12" 
        />
      </Link>

      <div className="flex gap-2 md:order-2">
        <Link to="/sign-in">
          <Button gradientDuoTone="purpleToBlue">Sign In</Button>
        </Link>

        <Navbar.Toggle />
      </div>

      <Navbar.Collapse className="transition-all duration-500 ease-in-out">
        {/* Tab links with underline animation */}
        <Navbar.Link
          href="/"
          className="relative cursor-pointer text-lg font-semibold text-white before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-white hover:before:w-full before:transition-all before:duration-300 before:ease-in-out"
        >
          Home

        </Navbar.Link>

        <Navbar.Link
          href="/about"
          className="relative cursor-pointer text-lg font-semibold text-white before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-white hover:before:w-full before:transition-all before:duration-300 before:ease-in-out"
        >
          About Us
        </Navbar.Link>

        <Navbar.Link
          href="/profile"
          className="relative cursor-pointer text-lg font-semibold text-white before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-white hover:before:w-full before:transition-all before:duration-300 before:ease-in-out"
        >
          Profile
         
        </Navbar.Link>

        <Navbar.Link href="/trends" className="relative cursor-pointer text-lg font-semibold text-white before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-white hover:before:w-full before:transition-all before:duration-300 before:ease-in-out">
          Trends
        </Navbar.Link>

      </Navbar.Collapse>
    </Navbar>
  );
}
