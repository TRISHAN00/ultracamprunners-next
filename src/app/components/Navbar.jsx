'use client'
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import logo from '../../app/assets/logo.png';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About Us' },
  { href: '/ucr-events', label: 'Events' },
  { href: '/ucr-race-crew', label: 'UCR Race Crew' },
  { href: '/upcoming-events', label: 'Upcoming Events' },
  { href: '/shop', label: 'Shop' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact-us', label: 'Contact Us' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md fixed z-40 w-full">
      <div className="max-w-[1300px] mx-auto">
        <div className="flex justify-between items-center h-16 px-4 lg:px-0">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-[#a52931]">
              <Image
                src={logo}
                alt="ucr-logo"
                width={150}
                height={150}
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="py-2 text-gray-700 hover:text-[#AD242F]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Register Button (Desktop) */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link
              href="/ucr-events"
              className="text-white bg-[#ad242f] px-6 py-2 rounded-lg hover:bg-black/90 hover:scale-90 transition-all"
            >
              Register Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="lg:hidden bg-white shadow-md absolute top-16 left-0 w-full px-4 py-4"
          >
            <ul className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <Link
                    href={link.href}
                    className="block py-2 text-gray-700 hover:text-[#AD242F]"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <div className="mt-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <Link
                  href="/ucr-events"
                  className="block text-center text-white bg-[#ad242f] px-6 py-2 rounded-lg hover:bg-black/90 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Register Now
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
