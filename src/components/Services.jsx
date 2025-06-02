"use client"

import React, { useState, useEffect, memo } from "react"
import {
  Phone,
  ArrowRight,
  Factory,
  PenToolIcon as Tool,
  Truck,
  Wrench,
  Cog,
  Fan,
  Hammer,
  Zap,
  ChevronRight,
  X,
} from "lucide-react"

const CustomModal = memo(({ isOpen, onClose, title, description, children }) => {
  const modalRef = React.useRef(null)

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose()
      }
    }

    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = ""
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-sm animate-fadeIn">
      <div
        ref={modalRef}
        className="w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl transform transition-all duration-300 animate-scaleIn relative"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="mb-4 pr-8">
            <h2 id="modal-title" className="text-xl font-semibold text-gray-800 leading-tight">
              {title}
            </h2>
            <p id="modal-description" className="pt-4 text-gray-600 text-sm leading-relaxed">
              {description}
            </p>
          </div>
          {children}
        </div>
      </div>
    </div>
  )
})

const loadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = () => resolve(img)
    img.onerror = reject
  })
}

const services = [
  {
    id: 1,
    name: "Material Handling & Storage Equipment",
    category: "Equipment",
    description: "Design and fabrication of trolleys, pallets, skids, base frames and storage systems.",
    more: "Customized industrial storage and handling solutions provided for clients like Mahindra & Mahindra, ensuring optimized logistics and space usage.",
    icon: <Tool className="h-6 w-6" />,
    image: "/services/1.jpg",
  },
  {
    id: 2,
    name: "Logistics Equipment",
    category: "Transport",
    description: "Heavy-duty logistic support equipment for efficient material flow.",
    more: "We manufacture various logistic support assemblies used across industries for material movement and operational efficiency.",
    icon: <Truck className="h-6 w-6" />,
    image: "/services/2.jpg",
  },
  {
    id: 3,
    name: "Auto & Engineering Assemblies",
    category: "Engineering",
    description: "Mechanical assemblies for automotive and engineering sectors.",
    more: "Assembly and fabrication services for auto parts, frames, and engineering structures, catering to both light and heavy engineering domains.",
    icon: <Cog className="h-6 w-6" />,
    image: "/services/3.jpg",
  },
  {
    id: 4,
    name: "Fabrication Support Services",
    category: "Fabrication",
    description: "Light and heavy structural fabrication services.",
    more: "Complete fabrication support including structural work for refineries and chemical plants like those of Thermax Ltd.",
    icon: <Wrench className="h-6 w-6" />,
    image: "/services/4.jpg",
  },
  {
    id: 5,
    name: "Belt–Bucket Conveyors",
    category: "Manufacturing",
    description: "Conveyor systems for cement industries.",
    more: "Manufactured for clients like Beumer India Pvt Ltd and Tsubaki Conveyor Pvt Ltd, our conveyor systems support bulk handling in cement plants.",
    icon: <Factory className="h-6 w-6" />,
    image: "/services/5.jpg",
  },
  {
    id: 6,
    name: "Ventilation Systems",
    category: "Industrial",
    description: "Hood and pocket ventilation systems for paper industries.",
    more: "Produced for Forbes Marshall Pvt Ltd, these systems ensure proper airflow and industrial compliance in paper manufacturing plants.",
    icon: <Fan className="h-6 w-6" />,
    image: "/services/6.jpg",
  },
  {
    id: 7,
    name: "Pump Assembly Parts",
    category: "Components",
    description: "Components like base frames, tanks, and jackets for pumps.",
    more: "Supplied to Kishor Pump, Pune, our precision components support reliable and robust pump assembly performance.",
    icon: <Zap className="h-6 w-6" />,
    image: "/services/7.jpg",
  },
  {
    id: 8,
    name: "Welding Services",
    category: "Welding",
    description: "Spot welding, MIG welding, CD projection welding services.",
    more: "Full-fledged welding shop with advanced facilities supporting various welding types across sectors.",
    icon: <Hammer className="h-6 w-6" />,
    image: "/services/8.jpg",
  },
]

const facilities = [
  { id: 1, name: "Arc Welding Machines", image: "/services/Arc.jpg" },
  { id: 2, name: "CO₂ Welding Machines", image: "/services/Arc.jpg" },
  {
    id: 3,
    name: "Projection Welding Machines",
    image: "/services/Projection.webp",
  },
  {
    id: 4,
    name: "Oxy-Acetylene & LPG Cutting Sets",
    image: "/services/Industrial LPG.jpg",
  },
  { id: 5, name: "Drill Machines", image: "/services/drill.webp" },
  { id: 6, name: "Lathe Machines", image: "/services/Lathe.webp" },
  {
    id: 7,
    name: "CNC Laser Cutting Machine (Deswam, 1.5m x 3m, 1.5kW)",
    image: "/services/cnc.jpg",
  },
  {
    id: 8,
    name: "CNC Bending Machine (ADH PRESS, 3m Bed, 125 Ton)",
    image: "/services/cncbending.jpeg",
  },
]

const whatsappBase = "https://wa.me/9146924531?text="

const ServiceCard = memo(({ service }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.src = service.image
    img.onload = () => setIsImageLoaded(true)
    img.onerror = () => setImageError(true)
  }, [service.image])

  return (
    <div className="overflow-hidden group hover:shadow-2xl transition-all duration-300 border border-slate-200 rounded-xl bg-white transform hover:-translate-y-1">
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <div
          className={`absolute inset-0 bg-blue-100 ${isImageLoaded && !imageError ? "opacity-0" : "opacity-100"} transition-opacity duration-300 flex items-center justify-center`}
        >
          {imageError && (
            <div className="text-gray-400 text-center p-4">
              <div className="text-4xl mb-2">{service.icon}</div>
              <p className="text-sm">Image not available</p>
            </div>
          )}
        </div>
        {!imageError && (
          <img
            src={service.image || "/placeholder.svg"}
            alt={service.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute top-3 right-3">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-white text-blue-500 shadow-md">
            {service.category}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-4 sm:p-5 pb-2 flex flex-col sm:flex-row items-start sm:items-center">
        <div className="mb-3 sm:mb-0 sm:mr-3 p-2 sm:p-3 rounded-full bg-blue-50 text-blue-500 shadow-sm flex-shrink-0">
          {service.icon}
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 leading-tight">{service.name}</h3>
      </div>

      <div className="p-4 sm:p-5 pt-2">
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">{service.description}</p>
        <div className="flex justify-between items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-500 hover:text-blue-700 p-0 h-auto text-sm font-medium flex items-center transition-colors"
            aria-label={`Learn more about ${service.name}`}
          >
            Learn more <ChevronRight className="ml-1 h-4 w-4" />
          </button>
        </div>
      </div>

      {isModalOpen && (
        <CustomModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={service.name}
          description={service.more}
        >
          <div className="mt-4">
            <a
              href={`${whatsappBase}Hello, I'm interested in your service: ${encodeURIComponent(service.name)}. Please share more details.`}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-3 text-sm font-medium text-center text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Get a Quote
            </a>
          </div>
        </CustomModal>
      )}
    </div>
  )
})

const FacilityCard = memo(({ facility }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)

  return (
    <div className="overflow-hidden group hover:shadow-xl transition-all duration-300 bg-white border border-slate-200 rounded-xl transform hover:-translate-y-1">
      <div className="relative h-40 sm:h-48 overflow-hidden">
        <div
          className={`absolute inset-0 bg-blue-100 ${isImageLoaded && !imageError ? "opacity-0" : "opacity-100"} transition-opacity duration-300 flex items-center justify-center`}
        >
          {imageError && (
            <div className="text-gray-400 text-center p-4">
              <Factory className="h-8 w-8 mx-auto mb-2" />
              <p className="text-xs">Image not available</p>
            </div>
          )}
        </div>
        {!imageError && (
          <img
            src={facility.image || "/placeholder.svg"}
            alt={facility.name}
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${isImageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoad={() => setIsImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="font-semibold text-white text-sm"></h3>
        </div>
      </div>
      <div className="p-3 sm:p-4 group-hover:bg-blue-50 transition-colors duration-300">
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base leading-tight">{facility.name}</h3>
      </div>
    </div>
  )
})

const ServicesPage = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Preload critical images
    const criticalImages = [
      services[0]?.image,
      "https://images.pexels.com/photos/3846249/pexels-photo-3846249.jpeg", // Hero background
    ].filter(Boolean)

    Promise.all(criticalImages.map((src) => loadImage(src).catch(() => null))).then(() => {
      setIsLoading(false)
    })

    // Add CSS for animations
    const style = document.createElement("style")
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      @keyframes scaleIn {
        from { transform: scale(0.95); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      @keyframes slideInUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .animate-fadeIn {
        animation: fadeIn 0.3s ease-out;
      }
      .animate-scaleIn {
        animation: scaleIn 0.3s ease-out;
      }
      .animate-slideInUp {
        animation: slideInUp 0.5s ease-out;
      }
      
      /* Mobile optimizations */
      @media (max-width: 640px) {
        .animate-slideInUp {
          animation-duration: 0.3s;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      if (document.head.contains(style)) {
        document.head.removeChild(style)
      }
    }
  }, [])

  return (
    <div className="w-full px-3 sm:px-4 py-8 sm:py-16 space-y-8 sm:space-y-12">
      {/* Hero Section */}
      <section className="relative mb-12 sm:mb-24 rounded-2xl sm:rounded-3xl overflow-hidden bg-white shadow-xl animate-slideInUp w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 z-0">
          <div
            className="absolute inset-0 opacity-30 mix-blend-overlay bg-center bg-cover"
            style={{
              backgroundImage: "url('https://images.pexels.com/photos/3846249/pexels-photo-3846249.jpeg')",
            }}
          ></div>
        </div>
        <div className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 md:px-12 max-w-5xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white mb-4 sm:mb-6 tracking-tight leading-tight">
            Industrial Excellence <span className="text-blue-500">Delivered</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            Providing premium engineering, fabrication, and manufacturing solutions for over two decades. Trusted by
            industry leaders for quality and precision.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a
              href={`${whatsappBase}Hello, I'd like to request a quote for your services.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-3 text-sm sm:text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="tel:+919146924531"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-3 text-sm sm:text-base font-medium rounded-md text-white border border-white hover:bg-white hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-white/30 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              <Phone className="mr-2 h-4 w-4" /> Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section
        className="mb-12 sm:mb-24 bg-white p-4 sm:p-8 rounded-xl shadow-xl animate-slideInUp w-full"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">Our Services</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl">
            Comprehensive industrial solutions tailored to meet your specific requirements with precision and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <div key={service.id} className="animate-slideInUp" style={{ animationDelay: `${0.1 + index * 0.05}s` }}>
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </section>

      {/* Facilities Section */}
      <section
        className="mb-12 sm:mb-24 bg-white p-4 sm:p-8 rounded-xl shadow-xl animate-slideInUp w-full"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3">Manufacturing Facility</h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            State-of-the-art equipment and machinery to deliver high-quality industrial solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {facilities.map((facility, index) => (
            <div key={facility.id} className="animate-slideInUp" style={{ animationDelay: `${0.2 + index * 0.05}s` }}>
              <FacilityCard facility={facility} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl sm:rounded-2xl p-6 sm:p-8 md:p-12 shadow-2xl animate-slideInUp w-full"
        style={{ animationDelay: "0.3s" }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
            Ready to Discuss Your Project?
          </h2>
          <p className="text-blue-100 mb-6 sm:mb-8 text-sm sm:text-base">
            Our team of experts is ready to help you find the perfect solution for your industrial needs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <a
              href={`${whatsappBase}Hello, I'd like to schedule a consultation for my industrial project.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-3 text-sm sm:text-base font-medium rounded-md text-blue-900 bg-white hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-white/30 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              Get a Free Consultation
            </a>
            <a
              href={`${whatsappBase}Hello, I'm interested in your services. Please share more details.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 sm:px-5 py-3 text-sm sm:text-base font-medium rounded-md text-white border border-white hover:bg-white hover:text-blue-900 transition-all duration-300 shadow-lg hover:shadow-white/30 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ServicesPage
