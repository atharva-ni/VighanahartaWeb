import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/clients", label: "Clients" },
  { href: "/contact", label: "Contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolling(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolling ? "bg-white shadow-md py-2" : "bg-transparent py-4"
        }`}
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <nav className="container mx-auto px-6 flex justify-between items-center h-16">
          <motion.img
            src="/services/logo.png"
            alt="Logo"
            className="h-55 object-contain"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
          />

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-800 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <ul className="hidden md:flex space-x-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-gray-800 hover:text-blue-600 px-3 py-2 relative transition-all"
                >
                  {link.label}
                  <motion.span
                    layoutId="underline"
                    className="absolute bottom-0 left-0 h-0.5 bg-blue-500 w-full origin-left scale-x-0 hover:scale-x-100 transition-transform duration-200"
                  />
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.ul
              key="mobileMenu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`md:hidden px-6 pt-2 pb-4 bg-white shadow-md space-y-2`}
            >
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="block text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md transition"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to offset fixed header */}
      <div className="h-20 md:h-24" />
    </>
  );
};

export default Header;
