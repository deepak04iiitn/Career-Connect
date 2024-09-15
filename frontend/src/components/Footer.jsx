import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';

export default function FooterCom() {
  return (

    <Footer container className='border border-t-8 border-teal-500 bg-white text-gray-800 py-10'>

      <div className='w-full max-w-7xl mx-auto'>

        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>

          <div>

            <Link
              to='/'
              className='self-center whitespace-nowrap text-lg sm:text-xl font-semibold text-teal-600'
            >

              <img
                src='/assets/CareerConnect.png'
                alt='Career Connect Image'
                className='mx-auto h-40 w-40 transition-transform duration-500 hover:scale-110'
              />

            </Link>

          </div>

          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>

            <div>
              <Footer.Title title='About' className='text-teal-600' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='#'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-teal-400 transition-colors duration-300'
                >

                  Best Opportunities

                </Footer.Link>

                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-teal-400 transition-colors duration-300'
                >

                  Career Connect

                </Footer.Link>

              </Footer.LinkGroup>

            </div>

            <div>

              <Footer.Title title='Follow us' className='text-teal-600' />

              <Footer.LinkGroup col>
                
                <Footer.Link
                  href='https://github.com/deepak04iiitn'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='hover:text-teal-400 transition-colors duration-300'
                >

                  Github

                </Footer.Link>

                <Footer.Link
                  href='#'
                  className='hover:text-teal-400 transition-colors duration-300'
                >

                  Discord

                </Footer.Link>

              </Footer.LinkGroup>

            </div>

            <div>

              <Footer.Title title='Legal' className='text-teal-600' />

              <Footer.LinkGroup col>

                <Footer.Link
                  href='#'
                  className='hover:text-teal-400 transition-colors duration-300'
                >

                  Privacy Policy

                </Footer.Link>

                <Footer.Link

                  href='#'
                  className='hover:text-teal-400 transition-colors duration-300'
                >

                  Terms &amp; Conditions

                </Footer.Link>

              </Footer.LinkGroup>

            </div>

          </div>

        </div>

        <Footer.Divider className='border-teal-500 mt-8' />

        <div className='w-full sm:flex sm:items-center sm:justify-between'>

          <Footer.Copyright
            href='#'
            by='CareerConnect'
            year={new Date().getFullYear()}
            className='text-gray-800'
          />

          <span className='text-gray-600 sm:mt-0 mt-4'>All rights reserved</span>

          <div className='flex gap-6 sm:mt-0 mt-4 sm:justify-center'>

            <Footer.Icon
              href='#'
              icon={BsFacebook}
              className='text-teal-600 hover:text-teal-400 transition-transform transform hover:scale-125 duration-300'
            />

            <Footer.Icon
              href='#'
              icon={BsInstagram}
              className='text-teal-600 hover:text-teal-400 transition-transform transform hover:scale-125 duration-300'
            />

            <Footer.Icon
              href='#'
              icon={BsTwitter}
              className='text-teal-600 hover:text-teal-400 transition-transform transform hover:scale-125 duration-300'
            />

            <Footer.Icon
              href='https://github.com/deepak04iiitn'
              icon={BsGithub}
              className='text-teal-600 hover:text-teal-400 transition-transform transform hover:scale-125 duration-300'
            />

            <Footer.Icon
              href='#'
              icon={BsDribbble}
              className='text-teal-600 hover:text-teal-400 transition-transform transform hover:scale-125 duration-300'
            />

          </div>

        </div>

      </div>

    </Footer>
  );
}
