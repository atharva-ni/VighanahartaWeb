import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-12 p-4">
      <motion.section
        id="mission-vision"
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        variants={sectionVariants}
      >
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">Our Mission</h2>
          <p className="text-gray-700">
            To provide innovative manufacturing solutions that exceed client expectations and drive industry progress.
          </p>
        </div>
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-4 text-blue-600">Our Vision</h2>
          <p className="text-gray-700">
            To be at the point of glory & prosperity in the world of engineering industries.
          </p>
        </div>
      </motion.section>

      <motion.section
        id="company-overview"
        className="bg-gray-100 p-8 rounded-lg shadow-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Company Overview</h2>
        <p className="text-gray-700">
          <strong>Vighnaharta Engineers</strong> was established in 2017. Located in Chikhali, Pune, the company operates with a 5000 sq. ft. shed area and 25,000 sq. ft. open pot area. We are ISO 9001:2015 certified and specialize in welding processes, logistic resources, material handling equipment, and engineering services for the automobile, engineering, and civil sectors.
        </p>
      </motion.section>

      <motion.section
        id="management"
        className="p-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Management</h2>
        <div className="space-y-8">
          <div className="text-center">
            <img src="src/assets/Images/profile.webp" alt="Nilesh Nighot" className="w-35 h-35 mx-auto rounded-full shadow-lg" />
            <p className="mt-4 text-lg font-semibold text-gray-700">Nilesh Nighot</p>
            <p className="text-gray-500">Proprietor and Mechanical Engineer</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <img src="src/assets/Images/profile.webp" alt="Swati Nighot" className="w-28 h-28 mx-auto rounded-full shadow-lg" />
              <p className="mt-4 text-lg font-semibold text-gray-700">Swati Nighot</p>
              <p className="text-gray-500">Accountant</p>
            </div>
            <div className="text-center">
              <img src="src/assets/Images/profile.webp" alt="Avinash" className="w-28 h-28 mx-auto rounded-full shadow-lg" />
              <p className="mt-4 text-lg font-semibold text-gray-700">Avinash</p>
              <p className="text-gray-500">Shop 1 Manager</p>
            </div>
            <div className="text-center">
              <img src="src/assets/Images/profile.webp" alt="Bharat" className="w-28 h-28 mx-auto rounded-full shadow-lg" />
              <p className="mt-4 text-lg font-semibold text-gray-700">Bharat</p>
              <p className="text-gray-500">Shop 2 Manager</p>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="work-domain"
        className="bg-blue-50 p-8 rounded-lg shadow-md"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Our Work Domain</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Material handling & storage equipment</li>
          <li>Logistics equipment</li>
          <li>Fabrication support services</li>
          <li>Structural fabrication for refineries & chemical plants</li>
          <li>Manufacturing of belt-bucket conveyors for cement industries</li>
          <li>Manufacturing of ventilation systems for paper industries</li>
          <li>Pump assembly parts manufacturing</li>
          <li>Material storage systems for Mahindra & Mahindra</li>
        </ul>
      </motion.section>


      <motion.section
        id="why-choose-us"
        className="p-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        variants={sectionVariants}
      >
        <h2 className="text-3xl font-bold mb-4 text-blue-600">What Makes Us Different?</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>100% achievement of work schedules since establishment</li>
          <li>Quality maintained irrespective of quantity</li>
          <li>Trustworthy market image</li>
          <li>Over 22 years of professional expertise</li>
        </ul>
      </motion.section>

      
    </div>
  );
};

export default About;