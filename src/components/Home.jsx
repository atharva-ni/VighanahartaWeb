import { Link } from "react-router-dom";
import React from "react";
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, Award, Star, Users } from "lucide-react";

// Import JSON data
import slidesData from './data/slides.json';
import feedbackData from './data/feedback.json';

const achievements = [
  {
    id: 1,
    title: "ISO 9001:2015 Certified",
    description: "Recognized for our commitment to quality management systems.",
    icon: Award,
    color: "blue"
  },
  {
    id: 2,
    title: "Best Manufacturer Award 2022",
    description: "Acknowledged as a leader in innovative manufacturing practices.",
    icon: Star,
    color: "yellow"
  },
  {
    id: 3,
    title: "Green Manufacturing Excellence",
    description: "Recognized for our sustainable and eco-friendly manufacturing processes.",
    icon: Users,
    color: "green"
  }
];

const SERVICES = [
  {
    "id": 1,
    "title": "Custom Fabrication",
    "description": "Tailored solutions for your unique needs, crafted with precision and care.",
    
    
  },
  {
    "id": 2,
    "title": "Repair & Maintenance",
    "description": "Keep your equipment running smoothly with our expert maintenance services.",
    
    
  },
  {
    "id": 3,
    "title": "Consulting Services",
    "description": "Expert advice to tackle your toughest manufacturing challenges head-on.",
    
    
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentFeedback, setCurrentFeedback] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);

  useEffect(() => {
    const slideTimer = setInterval(() => {  
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.slides.length);
    }, 5000);

    const feedbackTimer = setInterval(() => {
      setCurrentFeedback((prevFeedback) => (prevFeedback + 1) % feedbackData.testimonials.length);
    }, 8000);

    return () => {
      clearInterval(slideTimer);
      clearInterval(feedbackTimer);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slidesData.slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slidesData.slides.length) % slidesData.slides.length);
  };

  return (
    <div className="space-y-24 px-4 py-8 bg-white">
      <motion.section
        id="hero"
        className="relative h-screen flex items-center justify-center text-center text-gray-800"
        style={{ opacity, scale }}
      >
        <div className="relative z-10">
          <motion.h1
            className="text-5xl font-bold mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Welcome to Vighanaharta Engineers
          </motion.h1>
          <motion.p
            className="text-xl mb-10 text-gray-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Crafting Excellence, Engineering Trust
          </motion.p>
          <motion.button
            className="bg-blue-600 text-white px-8 py-3 rounded text-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Explore Our Services
          </motion.button>
        </div>
      </motion.section>

      <section id="slideshow" className="relative h-[600px] overflow-hidden rounded-lg shadow-lg">
        {slidesData.slides.map((slide, index) => (
          <motion.div
            key={slide.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentSlide ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-3xl font-bold text-white">{slide.title}</h2>
            </div>
          </motion.div>
        ))}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/50 p-2 rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </section>

      <motion.section
        id="key-offerings"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        {SERVICES.map((service) => (
          <motion.div
            key={service.id}
            className="bg-white p-8 rounded-lg shadow-lg border border-gray-200"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">
              {service.title}
            </h3>
            <p className="mb-4 text-gray-600">{service.description}</p>
          </motion.div>
        ))}
      </motion.section>



      <motion.section
        id="e-brochure"
        className="text-center bg-gray-50 p-16 rounded-lg shadow-inner"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Discover Our Full Range of Services</h2>
        <p className="text-xl mb-8 text-gray-600">
          Download our comprehensive e-brochure to explore how we can elevate your manufacturing processes.
        </p>
        <motion.button
          className="bg-blue-600 text-white px-8 py-3 rounded text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center mx-auto"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Download className="mr-2" /> Download E-Brochure
        </motion.button>
      </motion.section>

      <motion.section
        id="awards-certifications"
        className="bg-white p-16 rounded-lg shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((achievement) => {
            const IconComponent = achievement.icon;
            return (
              <motion.div 
                key={achievement.id}
                className="flex flex-col items-center text-center" 
                whileHover={{ scale: 1.05 }}
              >
                <IconComponent className={`w-16 h-16 text-${achievement.color}-600 mb-4`} />
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      <motion.section
      id="client-feedback"
      className="bg-blue-50 p-16 rounded-lg shadow-inner relative overflow-hidden"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
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

      <motion.section
        id="quick-navigation"
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Link
          to="/about"
          className="bg-white border border-gray-200 p-6 rounded-lg text-center hover:bg-gray-50 transition-colors duration-300 shadow-md"
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-800">About Us</h3>
          <p className="text-gray-600">Discover our story and values</p>
        </Link>
        <Link
          to="/services"
          className="bg-white border border-gray-200 p-6 rounded-lg text-center hover:bg-gray-50 transition-colors duration-300 shadow-md"
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Services</h3>
          <p className="text-gray-600">Explore our range of solutions</p>
        </Link>
        <Link
          to="/clients"
          className="bg-white border border-gray-200 p-6 rounded-lg text-center hover:bg-gray-50 transition-colors duration-300 shadow-md"
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Clients</h3>
          <p className="text-gray-600">See who we've worked with</p>
        </Link>
        <Link
          to="/contact"
          className="bg-white border border-gray-200 p-6 rounded-lg text-center hover:bg-gray-50 transition-colors duration-300 shadow-md"
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Contact Us</h3>
          <p className="text-gray-600">Get in touch with our team</p>
        </Link>
      </motion.section>
    </div>
  );
}