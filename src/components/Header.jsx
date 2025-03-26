import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/clients", label: "Clients" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <motion.header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${scrolling ? "bg-white shadow-md py-2" : "bg-transparent py-4"}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="container mx-auto px-6 flex justify-between items-center h-16">
          <motion.img 
            src="src/assets/Images/logo.png" 
            alt="Logo" 
            className="w-65 h-65 object-contain"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />

          <button
            onClick={toggleMenu}
            className="md:hidden text-gray-800 focus:outline-none transition-transform duration-200"
          >
            {isOpen ? <X size={28} className="animate-spin" /> : <Menu size={28} />}
          </button>
          <motion.ul
            className={`md:flex space-x-6 ${isOpen ? "block" : "hidden"} md:block absolute md:static top-16 left-0 w-full ${scrolling ? "bg-white" : "bg-transparent"} md:bg-transparent md:w-auto p-4 md:p-0 border md:border-0 shadow-md md:shadow-none rounded-md md:rounded-none transition-all duration-200`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, index) => (
              <motion.li 
                key={link.href} 
                className="my-2 md:my-0"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <a
                  href={link.href}
                  className="relative text-gray-800 hover:text-gray-600 px-4 py-2 rounded-md transition-all duration-200"
                >
                  {link.label}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500"
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.2 }}
                  ></motion.span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </nav>
      </motion.header>
      
      {/* Spacer to ensure content starts below the navbar */}
      <div className="h-20 md:h-24"></div>
    </>
  );
};

export default Header;