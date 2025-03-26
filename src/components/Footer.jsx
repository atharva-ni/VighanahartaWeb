import React from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Linkedin, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 text-base relative">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6 }}
        className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">About</h3>
          <ul>
            <li><a href="/about" className="footer-link">Our Story</a></li>
            <li><a href="/about" className="footer-link">Team</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Services</h3>
          <ul>
            <li><a href="/services" className="footer-link">What We Offer</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Resources</h3>
          <ul>
            <li><a href="/clients" className="footer-link">Case Studies</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">Contact</h3>
          <ul>
            <li><a href="/contact" className="footer-link">Get in Touch</a></li>
          </ul>
          <div className="flex space-x-3 mt-3">
            <a href="#" className="social-icon"><Facebook size={20} /></a>
            <a href="#" className="social-icon"><Twitter size={20} /></a>
            <a href="#" className="social-icon"><Instagram size={20} /></a>
            <a href="#" className="social-icon"><Linkedin size={20} /></a>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-6 mt-6 pt-4 border-t border-gray-700 text-center text-gray-400 text-sm"
      >
        <p className="flex justify-center items-center space-x-2">
          <MapPin size={18} className="text-white" />
          <a 
            href="https://goo.gl/maps/YOUR_LOCATION_LINK" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="footer-link text-gray-300 hover:text-white"
          >
            123 Street, City, Country
          </a>
        </p>
        <p className="mt-2">
          © 2025 InnovateManufacturing. All rights reserved. &nbsp;
          <a href="/privacy" className="footer-link">Privacy Policy</a> &nbsp;|&nbsp; 
          <a href="/terms" className="footer-link">Terms of Service</a>
        </p>
      </motion.div>
    </footer>
  );
};

/** Styles **/
const footerStyles = `
  .footer-link {
    @apply text-gray-400 hover:text-white transition-all duration-300;
  }
  .social-icon {
    @apply text-gray-400 hover:text-white transition-colors duration-300;
  }
`;

export default Footer;
