import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { collection, getDocs } from 'firebase/firestore';
import { db } from "./admin/firebase"; // adjust path if needed
import clientsData from './data/clients.json';

const Clients = () => {
  const [caseStudies, setCaseStudies] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [currentSet, setCurrentSet] = useState(0);
  const [x, setX] = useState(0);
  const sliderRef = useRef(null);

 
  useEffect(() => {
    const fetchPortfolio = async () => {
      const snapshot = await getDocs(collection(db, 'portfolio'));
      const projects = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPortfolio(projects);
    };
    fetchPortfolio();
  }, []);


  useEffect(() => {
    const fetchCaseStudies = async () => {
      const snapshot = await getDocs(collection(db, 'case_studies'));
      const cases = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCaseStudies(cases);
    };
    fetchCaseStudies();
  }, []);

  
  useEffect(() => {
    const fetchTestimonials = async () => {
      const snapshot = await getDocs(collection(db, 'testimonials'));
      const feedback = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTestimonials(feedback);
    };
    fetchTestimonials();
  }, []);

  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % Math.ceil(testimonials.length / 4));
    }, 10000);
    return () => clearInterval(interval);
  }, [testimonials]);

  
  useEffect(() => {
    if (portfolio.length <= 3) return;

    const slideWidth = 350;
    const maxIndex = portfolio.length - 3;

    const interval = setInterval(() => {
      setX((prevX) => {
        const currentIndex = Math.abs(prevX / slideWidth);
        const nextIndex = currentIndex + 1 > maxIndex ? 0 : currentIndex + 1;
        return -nextIndex * slideWidth;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [portfolio]);

  const visibleTestimonials = testimonials.slice(currentSet * 4, currentSet * 4 + 4);

  return (
    <div className="container mx-auto px-8 py-10">

     
      <motion.section 
        id="work-portfolio" 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
         <h2 className="text-3xl font-bold mb-8 text-gray-900 inline-flex items-center">
          <span className="w-2 h-8 bg-blue-500 mr-3 rounded-sm"></span>
          Our Work Portfolio
        </h2>

        <motion.div className="overflow-hidden" whileHover={{ cursor: "grab" }}>
          <motion.div 
            ref={sliderRef}
            className="flex gap-6"
            drag="x"
            dragConstraints={{ 
              left: portfolio.length > 3 ? -((portfolio.length - 3) * 350) : 0, 
              right: 0 
            }}
            animate={{ x }}
            transition={{ ease: "easeOut", duration: 0.5 }}
          >
            {portfolio.map((project) => (
              <motion.div
                key={project.id}
                className="min-w-[300px] relative overflow-hidden rounded-lg shadow-lg group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src={project.image || '/placeholder.png'} 
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

        
        <motion.section
        id="client-list"
        className="mb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-900 inline-flex items-center">
          <span className="w-2 h-8 bg-blue-500 mr-3 rounded-sm"></span>
          Our Trusted Clients
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {clientsData.companies.map((client) => (
            <motion.div
              key={client.id}
              className="bg-white pt-10 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              whileHover={{ y: -5 }}
            >
              <div className="h-16 flex items-center justify-center mb-4">
                <img src={client.logo || "/placeholder.svg"} alt={client.name} className="max-h-full object-contain" />
              </div>
              <h3 className="text-lg font-semibold text-center text-gray-800">{client.name}</h3>
              <p className="text-sm text-center text-blue-500">{client.industry}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>



      
      <motion.section
        id="case-studies"
        className="space-y-8 mb-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-900 inline-flex items-center">
          <span className="w-2 h-8 bg-blue-500 mr-3 rounded-sm"></span>
          Case Studies
        </h2>
        {caseStudies.map((study) => (
          <motion.div
            key={study.id}
            className="bg-white p-8 rounded-lg shadow-md overflow-hidden border-l-4 border-blue-500"
            whileHover={{
              scale: 1.01,
              boxShadow: "0 4px 20px rgba(37, 99, 235, 0.1)",
            }}
          >
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{study.title}</h3>
              <p className="mb-4 text-gray-600 leading-relaxed">{study.description}</p>
              <h4 className="font-semibold mb-2 text-blue-500">Key Results:</h4>
              <ul className="space-y-2">
                {study.results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <svg
                      className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span className="text-gray-600">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </motion.section>


      
      <motion.section 
        id="feedback" 
        className="bg-blue-50 p-8 rounded-2xl mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-gray-900 inline-flex items-center">
          <span className="w-2 h-8 bg-blue-500 mr-3 rounded-sm"></span>
          Client Feedback
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {visibleTestimonials.map((testimonial) => (
            <motion.blockquote
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow-md min-h-[220px] flex flex-col justify-between"
              whileHover={{ scale: 1.02 }}
            >
              <p className="text-lg italic mb-4 text-gray-700">"{testimonial.quote}"</p>
              <footer className="text-right mt-auto">
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
