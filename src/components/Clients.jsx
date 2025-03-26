import React from 'react';
import { motion } from 'framer-motion';

// Import JSON data
import portfolioData from './data/portfolio.json';
import clientsData from './data/clients.json';
import caseStudiesData from './data/case-studies.json';
import feedbackData from './data/feedback.json';

const Clients = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16">
      <motion.section 
        id="work-portfolio" 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Work Portfolio</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portfolioData.projects.map((project) => (
            <motion.div
              key={project.id}
              className="relative overflow-hidden rounded-lg shadow-lg group"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-xl font-semibold text-white">{project.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        id="client-list" 
        className="bg-gray-50 p-8 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Our Trusted Clients</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {clientsData.companies.map((client) => (
            <motion.div
              key={client.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              whileHover={{ y: -5 }}
            >
              <img 
                src={client.logo} 
                alt={client.name}
                className="w-20 h-20 object-contain mb-4 mx-auto"
              />
              <h3 className="text-lg font-semibold text-center text-gray-800">{client.name}</h3>
              <p className="text-sm text-center text-gray-600">{client.industry}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section 
        id="case-studies" 
        className="space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Case Studies</h2>
        {caseStudiesData.cases.map((study) => (
          <motion.div
            key={study.id}
            className="bg-white p-8 rounded-xl shadow-lg overflow-hidden"
            whileHover={{ scale: 1.01 }}
          >
            <div className="md:flex gap-8">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <img 
                  src={study.image} 
                  alt={study.title}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800">{study.title}</h3>
                <p className="mb-4 text-gray-600">{study.description}</p>
                <h4 className="font-semibold mb-2 text-gray-700">Key Results:</h4>
                <ul className="list-disc list-inside space-y-1 text-gray-600">
                  {study.results.map((result, index) => (
                    <li key={index}>{result}</li>
                  ))}
                </ul>
                <button className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Read full case study
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.section>

      <motion.section 
        id="feedback" 
        className="bg-blue-50 p-8 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-800">Client Feedback</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {feedbackData.testimonials.map((testimonial) => (
            <motion.blockquote
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow-md"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-lg italic mb-4 text-gray-700">"{testimonial.quote}"</p>
              <footer className="text-right">
                <p className="font-semibold text-gray-800">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.position}, {testimonial.company}</p>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default Clients;