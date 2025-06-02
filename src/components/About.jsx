import React from 'react';
import { Target, Eye, Building2, Users, Briefcase } from "lucide-react"
import { motion } from "framer-motion"

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (custom) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: custom * 0.1,
      duration: 0.5,
    },
  }),
}

function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Improved text sizing for mobile */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-6 md:mb-8 animate-fade-up">
            About Vighanaharta Engineers
          </h1>
          <p className="text-lg md:text-xl text-gray-600 text-center max-w-3xl mx-auto animate-fade-up animate-delay-100">
            Leading the way in precision engineering and manufacturing excellence since 2017
          </p>
        </div>
      </section>

      {/* Mission & Vision - Improved grid for mobile */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
            <motion.div
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
            >
              <div className="mb-4 md:mb-6">
                <Target className="h-10 w-10 md:h-12 md:w-12 text-blue-600" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To provide innovative manufacturing solutions that exceed client expectations and drive industry
                progress.
              </p>
            </motion.div>
            <motion.div
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={sectionVariants}
              custom={1}
            >
              <div className="mb-4 md:mb-6">
                <Eye className="h-10 w-10 md:h-12 md:w-12 text-blue-600" />
              </div>
              <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To be at the point of glory & prosperity in the world of engineering industries.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Overview - Improved padding and spacing */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="flex items-center justify-center mb-6 md:mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              <Building2 className="h-10 w-10 md:h-12 md:w-12 text-blue-600" />
            </motion.div>
            <motion.h2
              className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
            >
              Company Overview
            </motion.h2>
            <motion.div
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              custom={1}
            >
              <p className="text-gray-600 leading-relaxed">
                Vighnaharta Engineers was established in 2017. Located in Chikhali, Pune, the company operates with a
                5000 sq. ft. shed area and 25,000 sq. ft. open pot area. We are ISO 9001:2015 certified and specialize
                in welding processes, logistic resources, material handling equipment, and engineering services for the
                automobile, engineering, and civil sectors.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Management - Improved image handling and responsive layout */}
      <motion.section
        id="management"
        className="py-12 md:py-20 px-4 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.1 }}
        variants={sectionVariants}
      >
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-black">Management</h2>
        <div className="space-y-8 md:space-y-12">
          <motion.div className="text-center" variants={itemVariants} custom={0}>
            <img
              src="/services/profile.webp"
              alt="Nilesh"
              className="w-28 h-28 md:w-35 md:h-35 mx-auto rounded-full shadow-lg object-cover"
              loading="lazy"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = "https://via.placeholder.com/150"
              }}
            />
            <p className="mt-4 text-lg font-semibold text-gray-700">Nilesh</p>
            <p className="text-gray-500">Proprietor and Mechanical Engineer</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "Swati",
                role: "Accountant",
                image: "/services/profile.webp",
              },
              {
                name: "Avinash",
                role: "Plant 1 Manager",
                image: "/services/profile.webp",
              },
              {
                name: "Bharat",
                role: "Plant 2 Manager",
                image: "/services/profile.webp",
              },
            ].map((member, index) => (
              <motion.div key={index} className="text-center" variants={itemVariants} custom={index + 1}>
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-24 h-24 md:w-28 md:h-28 mx-auto rounded-full shadow-lg object-cover"
                  loading="lazy"
                  onError={(e) => {
                    e.target.onerror = null
                    e.target.src = "https://via.placeholder.com/150"
                  }}
                />
                <p className="mt-3 md:mt-4 text-lg font-semibold text-gray-700">{member.name}</p>
                <p className="text-gray-500">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Work Domain - Improved list spacing and mobile layout */}
      <section className="bg-gray-50 py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2
            className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            Our Work Domain
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              custom={0}
            >
              <Briefcase className="h-10 w-10 md:h-12 md:w-12 text-blue-600 mb-4 md:mb-6" />
              <ul className="space-y-3 md:space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Material handling & storage equipment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Logistics equipment</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Fabrication support services</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Structural fabrication</span>
                </li>
              </ul>
            </motion.div>
            <motion.div
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={sectionVariants}
              custom={1}
            >
              <Users className="h-10 w-10 md:h-12 md:w-12 text-blue-600 mb-4 md:mb-6" />
              <ul className="space-y-3 md:space-y-4 text-gray-600">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Manufacturing of belt-bucket conveyors</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Manufacturing of ventilation systems</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Pump assembly parts manufacturing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span>Material storage systems</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
