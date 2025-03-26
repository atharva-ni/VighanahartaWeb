import React from 'react';
import { Target, Eye, Building2, Users, Briefcase, Star } from 'lucide-react';
import { motion } from 'framer-motion'; // Import framer-motion

// Animation variants
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 animate-fade-up">About Vighanaharta Engineers</h1>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto animate-fade-up animate-delay-100">
            Leading the way in precision engineering and manufacturing excellence since 2017
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-up">
              <div className="mb-6">
                <Target className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-gray-600">
                To provide innovative manufacturing solutions that exceed client expectations and drive industry progress.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-up animate-delay-100">
              <div className="mb-6">
                <Eye className="h-12 w-12 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-gray-600">
                To be at the point of glory & prosperity in the world of engineering industries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-8">
              <Building2 className="h-12 w-12 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-center mb-8 animate-fade-up">Company Overview</h2>
            <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-up animate-delay-100">
              <p className="text-gray-600 leading-relaxed">
                Vighnaharta Engineers was established in 2017. Located in Chikhali, Pune, the company operates with a 5000 sq. ft. shed area and 25,000 sq. ft. open pot area. We are ISO 9001:2015 certified and specialize in welding processes, logistic resources, material handling equipment, and engineering services for the automobile, engineering, and civil sectors.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Management Section */}
      <motion.section
        id="management"
        className="p-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6 }}
        variants={sectionVariants}
      >
        <h2 className="text-center h-18 text-3xl font-bold mb-4 text-black">Management</h2>
        <div className="space-y-8">
          {/* Nilesh at the top */}
          <div className="text-center">
            <img
              src="src/assets/Images/profile.webp"
              alt="Nilesh Nighot"
              className="w-35 h-35 mx-auto rounded-full shadow-lg"
            />
            <p className="mt-4 text-lg font-semibold text-gray-700">Nilesh Nighot</p>
            <p className="text-gray-500">Proprietor and Mechanical Engineer</p>
          </div>

          {/* Second level team members */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{
              name: "Swati Nighot",
              role: "Accountant",
              image: "src/assets/Images/profile.webp"
            }, {
              name: "Avinash",
              role: "Plant 1 Manager",
              image: "src/assets/Images/profile.webp"
            }, {
              name: "Bharat",
              role: "Plant 2 Manager",
              image: "src/assets/Images/profile.webp"
            }].map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 mx-auto rounded-full shadow-lg"
                />
                <p className="mt-4 text-lg font-semibold text-gray-700">{member.name}</p>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Work Domain */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">Our Work Domain</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-up animate-delay-100">
              <Briefcase className="h-12 w-12 text-blue-600 mb-6" />
              <ul className="space-y-4 text-gray-600">
                <li>• Material handling & storage equipment</li>
                <li>• Logistics equipment</li>
                <li>• Fabrication support services</li>
                <li>• Structural fabrication for refineries & chemical plants</li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg animate-fade-up animate-delay-200">
              <Users className="h-12 w-12 text-blue-600 mb-6" />
              <ul className="space-y-4 text-gray-600">
                <li>• Manufacturing of belt-bucket conveyors for cement industries</li>
                <li>• Manufacturing of ventilation systems for paper industries</li>
                <li>• Pump assembly parts manufacturing</li>
                <li>• Material storage systems for Mahindra & Mahindra</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 animate-fade-up">What Makes Us Different?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              "100% achievement of work schedules since establishment",
              "Quality maintained irrespective of quantity",
              "Trustworthy market image",
              "Over 22 years of professional expertise"
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg text-center animate-fade-up animate-delay-100">
                <Star className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
