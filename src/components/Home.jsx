import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Building2, Wrench, Users } from 'lucide-react';
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase.js";

const slides = [
  {
    id: 1,
    image: "/services/s1.jpg",
    title: "Advanced Manufacturing Solutions",
  },
  {
    id: 2,
    image: "/services/s2.jpg",
    title: "Precision Engineering",
  },
  {
    id: 3,
    image: "/services/s3.jpg",
    title: "Quality Assurance",
  },
];

function App() {
  const [portfolioData, setPortfolioData] = useState({ projects: [] });
  const [feedbackData, setFeedbackData] = useState({ testimonials: [] });

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentFeedback, setCurrentFeedback] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data in parallel
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [portfolioSnap, testimonialsSnap] = await Promise.all([
          getDocs(collection(db, "portfolio")),
          getDocs(collection(db, "testimonials")),
        ]);

        setPortfolioData({
          projects: portfolioSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        });

        setFeedbackData({
          testimonials: testimonialsSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        });
      } catch (error) {
        console.error("Error fetching Firestore data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Single interval for slides, feedback, projects
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
      
      if (feedbackData.testimonials.length) {
        setCurrentFeedback((prev) => (prev + 1) % feedbackData.testimonials.length);
      }
      
      if (portfolioData.projects.length) {
        setCurrentProjectIndex((prev) => 
          (prev + 1) % Math.ceil(portfolioData.projects.length / 3)
        );
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [slides.length, feedbackData.testimonials.length, portfolioData.projects.length]);

  // Preload all project images once with proper error handling and crossOrigin
  useEffect(() => {
    if (!portfolioData.projects.length) return;
    
    const batchSize = 3;
    const totalBatches = Math.ceil(portfolioData.projects.length / batchSize);

    for (let i = 0; i < totalBatches; i++) {
      const batch = portfolioData.projects.slice(i * batchSize, i * batchSize + batchSize);
      batch.forEach((project) => {
        if (project.image) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = project.image;
          img.onerror = () => console.error(`Failed to load image: ${project.image}`);
        }
      });
    }
  }, [portfolioData.projects]);

  const projectsToShow = useMemo(() => {
    if (!portfolioData.projects.length) return [];
    const startIndex = currentProjectIndex * 3;
    return portfolioData.projects.slice(startIndex, startIndex + 3);
  }, [currentProjectIndex, portfolioData.projects]);

  return (
    <div className="min-h-screen bg-white">
      <motion.section className="container mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="order-2 md:order-1 mt-8 md:mt-0"
          >
            <h1 className="text-blue-600 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
              Building Excellence, <br className="hidden sm:block" />
              Engineering Trust
            </h1>
            <p className="text-base sm:text-lg text-gray-600 mb-6 max-w-xl">
              Vighanaharta Engineers, established in 2017, delivers precision hardware and fabrication solutions with end-to-end manufacturing capabilities.
              With 22+ years of hands-on expertise, a 5000 sq.ft. shaded shop, and trusted clients.
            </p>
            <a
              href="Services"
              className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-gray-800 transition-colors text-base sm:text-lg"
            >
              Explore
            </a>
          </motion.div>

          {/* Right Image */}
          <motion.div
            className="relative order-1 md:order-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-gray-100 rounded-2xl p-4 sm:p-6">
              {slides.map((slide, index) => (
                <div 
                  key={slide.id}
                  className={`transition-opacity duration-700 ${
                    index === currentSlideIndex ? "opacity-100" : "opacity-0 absolute top-0 left-0"
                  }`}
                  style={{ display: index === currentSlideIndex ? 'block' : 'none' }}
                >
                  <img
                    src={slide.image || "/placeholder.svg"}
                    alt={slide.title}
                    className="rounded-xl w-full h-60 sm:h-80 md:h-[450px] object-cover"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        id="services" 
        className="py-16 md:py-20 bg-gray-50" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-16">Our Services</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Custom Hardware Design",
                description: "Tailored engineering solutions for your specific needs",
                icon: <Wrench className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600" />,
              },
              {
                title: "Precision Manufacturing",
                description: "High-quality production with strict quality control",
                icon: <Building2 className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600" />,
              },
              {
                title: "Technical Consultation",
                description: "Expert advice and engineering support",
                icon: <Users className="h-10 w-10 sm:h-12 sm:w-12 text-blue-600" />,
              },
            ].map((service, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 sm:p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 1 }}
              >
                <div className="mb-4">{service.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="projects" 
        className="py-16 md:py-20" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-16">Featured Projects</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {isLoading ? (
              <div className="col-span-full text-center py-8">Loading projects...</div>
            ) : projectsToShow.length === 0 ? (
              <div className="col-span-full text-center py-8">No projects available</div>
            ) : (
              projectsToShow.map((project) => (
                <motion.div
                  key={project.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <div className="relative w-full h-48 sm:h-56 md:h-65 overflow-hidden">
                    <img
                      loading="lazy"
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      className="w-full h-full object-cover transition-opacity duration-700 opacity-0"
                      onLoad={(e) => {
                        if (e.target.complete) {
                          e.target.classList.replace("opacity-0", "opacity-100");
                        }
                      }}
                    />
                    <div className="absolute inset-0 bg-gray-200 -z-10"></div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">{project.title}</h3>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.section>

      <motion.section 
        id="achievements" 
        className="py-16 md:py-20 bg-blue-600 text-white" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-16">Our Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { number: "500+", label: "Projects Completed" },
              { number: "50+", label: "Industry Partners" },
              { number: "15+", label: "Years Experience" },
              { number: "100%", label: "Client Satisfaction" },
            ].map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.2, duration: 1 }}
                className="p-4"
              >
                <div className="text-3xl sm:text-4xl font-bold mb-2">{achievement.number}</div>
                <div className="text-base sm:text-lg">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        id="client-feedback"
        className="py-16 md:py-20 bg-blue-50 px-4 sm:px-10 md:px-16 rounded-[5px] shadow-inner relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-800">
          What Our Clients Say
        </h2>
        <div className="max-w-3xl mx-auto relative min-h-[200px] sm:min-h-[160px] md:min-h-[128px] flex items-center justify-center px-2 text-center">
          {isLoading ? (
            <p>Loading testimonials...</p>
          ) : feedbackData.testimonials.length === 0 ? (
            <p>No testimonials available</p>
          ) : (
            feedbackData.testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`absolute w-full transition-opacity duration-500 px-4 sm:px-8 ${
                  index === currentFeedback ? "opacity-100 relative" : "opacity-0 absolute"
                }`}
              >
                <blockquote className="text-base sm:text-lg md:text-2xl italic text-gray-700 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>
                <p className="text-xs sm:text-sm md:text-base text-right mt-3 font-semibold text-gray-600">
                  - {testimonial.author}, {testimonial.position} of {testimonial.company}
                </p>
              </motion.div>
            ))
          )}
        </div>
      </motion.section>
    </div>
  );
}

export default App;