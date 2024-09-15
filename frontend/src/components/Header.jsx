import { Button, Dropdown, Navbar, TextInput , Avatar } from 'flowbite-react'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux';
import { AiOutlineSearch } from 'react-icons/ai';
import { signoutSuccess } from '../redux/user/userSlice';

export default function Header() {

  const {currentUser} = useSelector((state) => state.user);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();


  const handleSignout = async() => {

    try {

        const res = await fetch('/backend/user/signout', {
            method : 'POST',
        })

        const data = await res.json();

        if(!res.ok)
        {
            console.log(data.message);
        }
        else
        {
            dispatch(signoutSuccess());
            navigate('/');
        }

    } catch (error) {
        console.log(error.message);
    }

}


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

      <form>
            <TextInput type='text' placeholder='Search...' rightIcon={AiOutlineSearch} className='w-20 lg:inline'/>
        </form>

      <div className="flex gap-2 md:order-2">

      {currentUser ? (
                <Dropdown arrowIcon={false} inline 
                label={
                  <Avatar 
                      alt='user'
                      img={currentUser.profilePicture}
                      rounded
                      className='w-10 h-10'
                  />
                }>
                    <Dropdown.Header>
                          <span className='block text-sm'>@{currentUser.username}</span>
                          <span className='block text-sm font-medium truncate'>{currentUser.email}</span>
                    </Dropdown.Header>
    
                    <Link to={'/profile'}>
                        <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
                </Dropdown>
            ) :
            (
                <Link to='/sign-in'>
                    <Button gradientDuoTone='purpleToBlue'>Sign In</Button>
                </Link>
            )}

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

        <Navbar.Link href="/trends" className="relative cursor-pointer text-lg font-semibold text-white before:absolute before:bottom-0 before:left-0 before:w-0 before:h-[2px] before:bg-white hover:before:w-full before:transition-all before:duration-300 before:ease-in-out">
          Trends
        </Navbar.Link>

      </Navbar.Collapse>
    </Navbar>
  );
}
