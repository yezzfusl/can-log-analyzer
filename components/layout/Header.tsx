import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Transition } from '@headlessui/react';
import { useTheme } from 'next-themes';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  return (
    <header className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 sticky top-0 z-50 transition-all duration-300 ease-in-out glassmorphism">
      <nav className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
            CAN Log Analyzer
          </Link>
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
              Home
            </Link>
            <Link href="/analyze" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
              Analyze
            </Link>
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                {theme === 'dark' ? (
                  <SunIcon className="h-6 w-6" />
                ) : (
                  <MoonIcon className="h-6 w-6" />
                )}
              </button>
            )}
          </div>
          <div className="md:hidden flex items-center">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 mr-2"
              >
                {theme === 'dark' ? (
                  <SunIcon className="h-6 w-6" />
                ) : (
                  <MoonIcon className="h-6 w-6" />
                )}
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 dark:text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="md:hidden mt-4">
            <Link href="/" className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
              Home
            </Link>
            <Link href="/analyze" className="block py-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
              Analyze
            </Link>
          </div>
        </Transition>
      </nav>
    </header>
  );
};

export default Header;
