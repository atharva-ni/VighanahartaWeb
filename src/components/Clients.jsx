import React, { useEffect, useState, useRef, useMemo } from "react"
import { motion } from "framer-motion"
import { collection, getDocs } from "firebase/firestore"
import { db } from "../firebase.js"

const Clients = () => {
  const [data, setData] = useState({
    caseStudies: [],
    testimonials: [],
    portfolio: [],
    clients: [],
  })
  const [currentSet, setCurrentSet] = useState(0)
  const [x, setX] = useState(0)
  const sliderRef = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      const [portfolioSnapshot, caseStudiesSnapshot, testimonialsSnapshot, clientsSnapshot] = await Promise.all([
        getDocs(collection(db, "portfolio")),
        getDocs(collection(db, "case_studies")),
        getDocs(collection(db, "testimonials")),
        getDocs(collection(db, "clients")),
      ])

      setData({
        portfolio: portfolioSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        caseStudies: caseStudiesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        testimonials: testimonialsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
        clients: clientsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })),
      })
    }

    fetchData()
  }, [])

  useEffect(() => {
    const testimonialCount = Math.ceil(data.testimonials.length / 4)
    if (testimonialCount <= 1) return

    const interval = setInterval(() => {
      setCurrentSet((prev) => (prev + 1) % testimonialCount)
    }, 10000)

    return () => clearInterval(interval)
  }, [data.testimonials.length])

  useEffect(() => {
    if (data.portfolio.length <= 3) return

    const slideWidth = 350
    const maxIndex = data.portfolio.length - 3

    const interval = setInterval(() => {
      setX((prevX) => {
        const currentIndex = Math.abs(prevX / slideWidth)
        const nextIndex = currentIndex + 1 > maxIndex ? 0 : currentIndex + 1
        return -nextIndex * slideWidth
      })
    }, 4000)

    return () => clearInterval(interval)
  }, [data.portfolio])

  const visibleTestimonials = useMemo(
    () => data.testimonials.slice(currentSet * 4, currentSet * 4 + 4),
    [data.testimonials, currentSet]
  )

  const portfolioPaginationDots = useMemo(() => {
    const count = Math.ceil(data.portfolio.length / 3)
    return Array.from({ length: count })
  }, [data.portfolio.length])

  const testimonialPaginationDots = useMemo(() => {
    const count = Math.ceil(data.testimonials.length / 4)
    return Array.from({ length: count })
  }, [data.testimonials.length])

  return (
    <div className="container mx-auto px-4 md:px-8 py-16 bg-gradient-to-b from-white to-gray-50">
      {/* Animation fixes: consistent initial and animate */}
      <motion.section
        id="work-portfolio"
        className="text-center mb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: { opacity: 1, y: 0 },
        }}
      >
        <h2 className="text-4xl font-bold mb-10 text-gray-900 inline-flex items-center">
          <span className="w-2 h-10 bg-blue-500 mr-3 rounded-sm"></span>
          Our Work Portfolio
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-12">
          Explore our latest projects and see how we've helped businesses transform their digital presence.
        </p>

        <motion.div className="overflow-hidden rounded-xl" whileHover={{ cursor: "grab" }}>
          <motion.div
            ref={sliderRef}
            className="flex gap-6 py-4"
            drag="x"
            dragConstraints={{
              left: data.portfolio.length > 3 ? -((data.portfolio.length - 3) * 350) : 0,
              right: 0,
            }}
            animate={{ x }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
          >
            {data.portfolio.map((project) => (
              <motion.div
                key={project.id}
                className="min-w-[300px] relative overflow-hidden rounded-xl shadow-lg group"
                whileHover={{ scale: 1.03, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src={project.image || "/placeholder.png"}
                  alt={project.title}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col items-center justify-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-white/80 text-sm mb-3">{project.category || "Project"}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="flex justify-center mt-8 gap-2">
            {portfolioPaginationDots.map((_, index) => {
              const active = Math.round(Math.abs(x / 350)) === index
              return (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    active ? "bg-blue-500 w-6" : "bg-gray-300"
                  }`}
                  onClick={() => setX(-index * 350)}
                />
              )
            })}
          </div>
        </motion.div>
      </motion.section>


      {/* Clients Section */}
      <motion.section
        id="client-list"
        className="mb-28"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-4xl font-bold mb-10 text-gray-900 inline-flex items-center">
          <span className="w-2 h-10 bg-blue-500 mr-3 rounded-sm"></span>
          Our Trusted Clients
        </h2>
        <p className="text-gray-600 max-w-2xl mb-12">
          We're proud to work with industry leaders who trust us with their digital transformation needs.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {data.clients.map((client) => (
            <motion.div
              key={client.id}
              className="bg-white pt-10 p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div className="h-16 flex items-center justify-center mb-6">
                <img src={client.logo || "/placeholder.svg"} alt={client.name} className="max-h-full object-contain" />
              </div>
              <h3 className="text-lg font-semibold text-center text-gray-800 mb-1">{client.name}</h3>
              <p className="text-sm text-center text-blue-600">{client.industry}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Case Studies Section */}
      <motion.section
        id="case-studies"
        className="space-y-12 mb-28"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 inline-flex items-center justify-center">
            <span className="w-2 h-10 bg-blue-500 mr-3 rounded-sm"></span>
            Case Studies
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover how we've helped our clients achieve remarkable results through innovative solutions.
          </p>
        </div>

        {data.caseStudies.map((study, index) => (
          <motion.div
            key={study.id}
            className="bg-white p-8 md:p-10 rounded-2xl shadow-lg overflow-hidden border-l-4 border-blue-500"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
            }}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-2/3">
                <div className="flex items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-3 py-1 rounded-full mr-3">
                    {study.category || "Case Study"}
                  </span>
                  <span className="text-gray-500 text-sm">{study.date || "Recent"}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{study.title}</h3>
                <p className="mb-6 text-gray-600 leading-relaxed">{study.description}</p>
                <h4 className="font-semibold mb-3 text-blue-600">Key Results:</h4>
                <ul className="space-y-3">
                  {study.results?.map((result, index) => (
                    <li key={index} className="flex items-start">
                      <span className="bg-blue-500 p-1 rounded-full text-white mr-3 mt-0.5 flex-shrink-0">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </span>
                      <span className="text-gray-700">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
          </motion.div>
        ))}
      </motion.section>

<motion.section
  id="feedback"
  className="bg-gradient-to-br from-blue-50 to-teal-50 p-6 sm:p-10 rounded-3xl mb-16"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.6 }}
>
  <div className="text-center mb-12">
    <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-gray-900 inline-flex items-center justify-center">
      <span className="w-2 h-10 bg-blue-500 mr-3 rounded-sm"></span>
      Client Feedback
    </h2>
    <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
      Don't just take our word for it. Here's what our clients have to say about working with us.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {visibleTestimonials.map((testimonial, index) => (
      <motion.blockquote
        key={testimonial.id}
        className="bg-white p-6 sm:p-8 rounded-2xl shadow-md min-h-[220px] flex flex-col justify-between relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.03, boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)" }}
      >
        <svg
          className="absolute top-6 left-6 w-10 h-10 text-blue-100"
          fill="currentColor"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
        </svg>

        <p className="text-base sm:text-lg italic mb-6 text-gray-700 pt-8 pl-6">{testimonial.quote}</p>

        <footer className="mt-auto flex items-center">
          {testimonial.avatar ? (
            <img
              src={testimonial.avatar || "/placeholder.svg"}
              alt={testimonial.author}
              className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-blue-200"
            />
          ) : (
            <div className="w-12 h-12 rounded-full mr-4 bg-blue-100 flex items-center justify-center text-blue-500 font-bold text-lg border-2 border-blue-200">
              {testimonial.author?.charAt(0) || "C"}
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-800">{testimonial.author}</p>
            <p className="text-sm text-blue-600">
              {testimonial.position}, {testimonial.company}
            </p>
          </div>
        </footer>
      </motion.blockquote>
    ))}
  </div>

  <div className="flex justify-center mt-10 gap-2">
    {Array.from({ length: Math.ceil(data.testimonials.length / 4) }).map((_, index) => (
      <button
        key={index}
        className={`w-3 h-3 rounded-full transition-all duration-300 ${
          currentSet === index ? "bg-blue-500 w-6" : "bg-gray-300"
        }`}
        onClick={() => setCurrentSet(index)}
      />
    ))}
  </div>
</motion.section>


      {/* Call to Action */}
      <motion.section
        className="text-center py-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-6">Ready to transform your business?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Let's discuss how we can help you achieve your business goals with our tailored solutions.
        </p>
        <motion.button
          className="px-8 py-3 bg-blue-600 text-white font-medium rounded-full shadow-lg hover:bg-blue-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Get in Touch
        </motion.button>
      </motion.section>
    </div>
  )
}

export default Clients
