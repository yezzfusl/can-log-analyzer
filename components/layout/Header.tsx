import React, { useState } from 'react';
import Link from 'next/link';
import { Transition } from '@headlessui/react';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white p-4 sticky top-0 z-50">
      <nav className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            CAN Log Analyzer
          </Link>
          <div className="hidden md:block">
            <ul className="flex space-x-4">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/analyze" className="hover:underline">
                  Analyze
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
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
          <div className="md:hidden">
            <ul className="pt-2 pb-3 space-y-1">
              <li>
                <Link
                  href="/"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/analyze"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
                >
                  Analyze
                </Link>
              </li>
            </ul>
          </div>
        </Transition>
      </nav>
    </header>
  );
};

export default Header;
