import { useState } from 'react';
import { HiMenuAlt4 } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { Transition } from '@headlessui/react';

import logo from '../assets/images/logo.png';

const NavbarItem = ({ title, classProps }) => {
    return <li className={`mx-4 cursor-pointer ${classProps}`}>{title}</li>;
};

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className='w-full flex md:justify-center justify-between items-center p-4'>
            <div className='md:flex-[0.5] flex-initial justify-center items-center'>
                <img src={logo} alt='logo' className='w-32 cursor-pointer' />
            </div>
            <ul className='text-white md:flex hidden list-none flex-row justify-between items-center'>
                {['Market', 'Exchange', 'Tutorials', 'Wallet'].map(title => (
                    <NavbarItem
                        key={title}
                        title={title}
                        classProps='text-white'
                    />
                ))}
                <li className='bg-[#2952e3] py-2 px-7 mx-4 rounded-full cursor-pointer hover:bg-[#2546bd] transition-all'>
                    Login
                </li>
            </ul>

            <div className='flex relative'>
                {isOpen ? (
                    <AiOutlineClose
                        fontSize={28}
                        className='text-white md:hidden cursor-pointer'
                        onClick={() => setIsOpen(false)}
                    />
                ) : (
                    <HiMenuAlt4
                        fontSize={28}
                        className='text-white md:hidden cursor-pointer'
                        onClick={() => setIsOpen(true)}
                    />
                )}
                <Transition
                    show={isOpen}
                    enter='transition ease-in-out duration-300 transform'
                    enterFrom='opaity-0 scale-95'
                    enterTo='opacity-100 scale-100'
                    leave='transition ease-in-out duration-300'
                    leaveFrom='opacity-100 scale-100'
                    leaveTo='opacity-0 scale-95'
                >
                    <ul className='z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in'>
                        <li className='text-xl w-full my-2'>
                            <AiOutlineClose onClick={() => setIsOpen(false)} />
                        </li>

                        {['Market', 'Exchange', 'Tutorials', 'Wallet'].map(
                            title => (
                                <NavbarItem
                                    key={title}
                                    title={title}
                                    classProps='my-2 text-lg'
                                />
                            )
                        )}
                    </ul>
                </Transition>
            </div>
        </nav>
    );
};

export default Navbar;
