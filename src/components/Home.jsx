import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Wrench, Users } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./admin/firebase"; // adjust path if needed

function App() {
  const [portfolioData, setPortfolioData] = useState({ projects: [] });
  const [feedbackData, setFeedbackData] = useState({ testimonials: [] });
  const [slides, setSlides] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentFeedback, setCurrentFeedback] = useState(0);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "portfolio"));
        const projects = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPortfolioData({ projects });
      } catch (error) {
        console.error("Error fetching projects from Firestore:", error);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "testimonials"));
        const testimonials = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFeedbackData({ testimonials });
      } catch (error) {
        console.error("Error fetching testimonials from Firestore:", error);
      }
    };

    fetchTestimonials();
  }, []);

  useEffect(() => {
    fetch("src/components/data/slides.json")
      .then((response) => response.json())
      .then((data) => setSlides(data.slides))
      .catch((error) => console.error("Error fetching slides:", error));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeedback(
        (prevIndex) => (prevIndex + 1) % feedbackData.testimonials.length
      );
    }, 7000);
    return () => clearInterval(interval);
  }, [feedbackData.testimonials.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProjectIndex(
        (prevIndex) => (prevIndex + 1) % Math.ceil(portfolioData.projects.length / 3)
      );
    }, 7000);
    return () => clearInterval(interval);
  }, [portfolioData.projects.length]);

  const getProjectsToShow = () => {
    const startIndex = currentProjectIndex * 3;
    return portfolioData.projects.slice(startIndex, startIndex + 3);
  };

  
  useEffect(() => {
    const nextIndex = (currentProjectIndex + 1) % Math.ceil(portfolioData.projects.length / 3);
    const nextProjects = portfolioData.projects.slice(nextIndex * 3, nextIndex * 3 + 3);
    nextProjects.forEach((project) => {
      const img = new Image();
      img.src = project.image;
    });
  }, [currentProjectIndex, portfolioData.projects]);

  return (
    <div className="min-h-screen bg-white">
     
      <motion.section className="container mx-auto px-6 py-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-blue-600 text-6xl font-bold leading-tight mb-6">
              Crafting Excellence
              <br />
              & Engineering Trust
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-2xl">
              Vighanaharta Engineers, established in 2017, delivers precision hardware and fabrication solutions with end-to-end manufacturing capabilities. With 22+ years of hands-on expertise, a 5000 sq.ft. shaded shop, and trusted clients.
            </p>
            <a
              href="Services"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-gray-800 transition-colors text-lg"
            >
              Explore
            </a>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <div className="bg-gray-100 rounded-2xl p-6">
              {slides.length > 0 && (
                <img
                  src={slides[currentSlideIndex].image}
                  alt={slides[currentSlideIndex].title}
                  className="rounded-xl w-full h-[450px] object-cover"
                  loading="lazy"
                />
              )}
            </div>
          </motion.div>
        </div>
      </motion.section>

    
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
            {[
              {
                title: "Custom Hardware Design",
                description: "Tailored engineering solutions for your specific needs",
                icon: <Wrench className="h-12 w-12 text-blue-600" />,
              },
              {
                title: "Precision Manufacturing",
                description: "High-quality production with strict quality control",
                icon: <Building2 className="h-12 w-12 text-blue-600" />,
              },
              {
                title: "Technical Consultation",
                description: "Expert advice and engineering support",
                icon: <Users className="h-12 w-12 text-blue-600" />,
              },
            ].map((service, index) => (
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
            {getProjectsToShow().map((project) => (
              <motion.div
                key={project.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <div className="relative">
                  <img
                    loading="lazy"
                    src={project.image}
                    alt={project.title}
                    className="w-full h-65 object-cover opacity-0 transition-opacity duration-700"
                    onLoad={(e) => e.currentTarget.classList.add("opacity-100")}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

     
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
              >
                <div className="text-4xl font-bold mb-2">{achievement.number}</div>
                <div className="text-lg">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      
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
