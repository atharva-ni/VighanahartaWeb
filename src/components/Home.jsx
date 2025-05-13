import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Building2, Wrench, Users } from "lucide-react";
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

  // Fetch data in parallel
  useEffect(() => {
    const fetchData = async () => {
      try {
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
      }
    };

    fetchData();
  }, []);

  // Single interval for slides, feedback, projects
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
      setCurrentFeedback((prev) =>
        feedbackData.testimonials.length ? (prev + 1) % feedbackData.testimonials.length : 0
      );
      setCurrentProjectIndex((prev) =>
        portfolioData.projects.length
          ? (prev + 1) % Math.ceil(portfolioData.projects.length / 3)
          : 0
      );
    }, 7000);

    return () => clearInterval(interval);
  }, [slides.length, feedbackData.testimonials.length, portfolioData.projects.length]);

  // Preload all project images once
  useEffect(() => {
    const batchSize = 3;
    const totalBatches = Math.ceil(portfolioData.projects.length / batchSize);

    for (let i = 0; i < totalBatches; i++) {
      const batch = portfolioData.projects.slice(i * batchSize, i * batchSize + batchSize);
      batch.forEach((project) => {
        const img = new Image();
        img.src = project.image;
      });
    }
  }, [portfolioData.projects]);

  const projectsToShow = useMemo(() => {
    const startIndex = currentProjectIndex * 3;
    return portfolioData.projects.slice(startIndex, startIndex + 3);
  }, [currentProjectIndex, portfolioData.projects]);

  return (
    <div className="min-h-screen bg-white">
    <motion.section className="container mx-auto px-4 sm:px-6 py-10">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
    {/* Left Content */}
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
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
        className="bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg hover:bg-gray-800 transition-colors text-base sm:text-lg"
      >
        Explore
      </a>
    </motion.div>

    {/* Right Image */}
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="bg-gray-100 rounded-2xl p-4 sm:p-6">
        <img
          src={slides[currentSlideIndex].image}
          alt={slides[currentSlideIndex].title}
          className="rounded-xl w-full h-60 sm:h-80 md:h-[450px] object-cover"
          loading="lazy"
        />
      </div>
    </motion.div>
  </div>
</motion.section>


      <motion.section id="services" className="py-20 bg-gray-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
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

      <motion.section id="projects" className="py-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsToShow.length === 0 ? (
              <p>Loading projects...</p>
            ) : (
              projectsToShow.map((project) => (
                <motion.div
                  key={project.id}
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <img
                    loading="lazy"
                    src={project.image}
                    alt={project.title}
                    className="w-full h-65 object-cover opacity-0 transition-opacity duration-700"
                    onLoad={(e) => e.currentTarget.classList.add("opacity-100")}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.section>

      <motion.section id="achievements" className="py-20 bg-blue-600 text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
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
  className="bg-blue-50 p-6 sm:p-10 md:p-16 rounded-[5px] shadow-inner relative overflow-hidden"
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
  <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center text-gray-800">
    What Our Clients Say
  </h2>
  <div className="max-w-3xl mx-auto relative min-h-[160px] sm:min-h-[128px] flex items-center justify-center px-2 text-center">
    {feedbackData.testimonials.length === 0 ? (
      <p>Loading testimonials...</p>
    ) : (
      feedbackData.testimonials.map((testimonial, index) => (
        <motion.div
          key={testimonial.id}
          className={`absolute w-full transition-opacity duration-500 px-4 sm:px-8 ${
            index === currentFeedback ? "opacity-100 relative" : "opacity-0 absolute"
          }`}
        >
          <blockquote className="text-lg sm:text-2xl italic text-gray-700 leading-relaxed">
            "{testimonial.quote}"
          </blockquote>
          <p className="text-sm sm:text-base text-right mt-3 font-semibold text-gray-600">
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
