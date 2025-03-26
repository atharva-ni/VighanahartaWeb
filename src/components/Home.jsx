import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Wrench, Users } from 'lucide-react';

function App() {
  const [portfolioData, setPortfolioData] = useState({ projects: [] });
  const [feedbackData, setFeedbackData] = useState({ testimonials: [] });
  const [slides, setSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentFeedback, setCurrentFeedback] = useState(0);

  // Fetch portfolio data
  useEffect(() => {
    fetch('src/components/data/portfolio.json')
      .then((response) => response.json())
      .then((data) => setPortfolioData(data))
      .catch((error) => console.error('Error fetching portfolio data:', error));
  }, []);

  // Fetch feedback data
  useEffect(() => {
    fetch('src/components/data/feedback.json')
      .then((response) => response.json())
      .then((data) => setFeedbackData(data))
      .catch((error) => console.error('Error fetching feedback data:', error));
  }, []);

  // Fetch slides data
  useEffect(() => {
    fetch('src/components/data/slides.json')
      .then((response) => response.json())
      .then((data) => setSlides(data.slides))
      .catch((error) => console.error('Error fetching slides:', error));
  }, []);

  // Automatically change the testimonial every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeedback((prevIndex) => (prevIndex + 1) % feedbackData.testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [feedbackData.testimonials.length]);

  // Automatically change the slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [slides.length]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section className="container mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-blue-600 text-6xl font-bold leading-tight mb-6">
              Reimagining<br />
              Engineering<br />
              Hardware
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg">
              Vighanaharta Engineers gives you the tools to effortlessly create precision hardware solutions—plus end-to-end manufacturing capabilities to scale your production.
            </p>
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors text-lg">
              Explore
            </button>
          </motion.div>

          {/* Slideshow Section */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-gray-100 rounded-2xl p-6">
              {/* Displaying current slide */}
              {slides.length > 0 && (
                <img
                  src={slides[currentSlideIndex].image}
                  alt={slides[currentSlideIndex].title}
                  className="rounded-xl w-full"
                />
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        id="services"
        className="py-20 bg-gray-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Our Services</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[{
              title: 'Custom Hardware Design',
              description: 'Tailored engineering solutions for your specific needs',
              icon: <Wrench className="h-12 w-12 text-blue-600" />
            }, {
              title: 'Precision Manufacturing',
              description: 'High-quality production with strict quality control',
              icon: <Building2 className="h-12 w-12 text-blue-600" />
            }, {
              title: 'Technical Consultation',
              description: 'Expert advice and engineering support',
              icon: <Users className="h-12 w-12 text-blue-600" />
            }].map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 1 }}
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Projects Showcase */}
      <motion.section
        id="projects"
        className="py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioData.projects.map((project) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Achievements Section */}
      <motion.section
        id="achievements"
        className="py-20 bg-blue-600 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Our Achievements</h2>
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[{
              number: '500+', label: 'Projects Completed'
            }, {
              number: '50+', label: 'Industry Partners'
            }, {
              number: '15+', label: 'Years Experience'
            }, {
              number: '100%', label: 'Client Satisfaction'
            }].map((achievement, index) => (
              <motion.div
                key={index}
                className="animate-fade-up"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 1 }}
              >
                <div className="text-4xl font-bold mb-2">{achievement.number}</div>
                <div className="text-lg">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Client Feedback Section */}
      <motion.section
        id="client-feedback"
          className="bg-blue-50 p-16 rounded-[5px] shadow-inner relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">
          What Our Clients Say
        </h2>
        <div className="max-w-3xl mx-auto relative h-32 flex items-center justify-center">
          {feedbackData.testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className={`absolute w-full text-center transition-opacity duration-500 ${
                index === currentFeedback ? "opacity-100 relative" : "opacity-0 absolute"
              }`}
            >
              <blockquote className="text-2xl italic text-gray-700">
                "{testimonial.quote}"
              </blockquote>
              <p className="text-right mt-4 font-semibold text-gray-600">
                - {testimonial.author}, {testimonial.position} of {testimonial.company}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default App;
