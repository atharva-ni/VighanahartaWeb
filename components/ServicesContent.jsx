"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Phone,
  ArrowRight,
  Factory,
  Wrench,
  Truck,
  Cog,
  Fan,
  Hammer,
  Zap,
  ChevronRight,
  X,
  PenToolIcon as Tool,
  Award,
} from "lucide-react";
import { motion } from "framer-motion";
import { services, facilities } from "@/lib/data";

const iconMap = {
  1: <Tool className="h-6 w-6" />,
  2: <Truck className="h-6 w-6" />,
  3: <Cog className="h-6 w-6" />,
  4: <Wrench className="h-6 w-6" />,
  5: <Factory className="h-6 w-6" />,
  6: <Fan className="h-6 w-6" />,
  7: <Zap className="h-6 w-6" />,
  8: <Hammer className="h-6 w-6" />,
};

const facilityIconMap = {
  7: <Zap className="h-6 w-6" />,
  8: <Cog className="h-6 w-6" />,
  1: <Hammer className="h-6 w-6" />,
  2: <Hammer className="h-6 w-6" />,
  3: <Zap className="h-6 w-6" />,
  4: <Factory className="h-6 w-6" />,
  5: <Tool className="h-6 w-6" />,
  6: <Cog className="h-6 w-6" />,
};

const whatsappBase = "https://wa.me/9146924531?text=";

function ServiceModal({ service, onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-2xl relative"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {service.image && (
          <div className="relative h-56 w-full">
            <Image
              src={service.image}
              alt={service.name}
              fill
              className="object-cover rounded-t-xl"
              sizes="(max-width: 768px) 100vw, 512px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent rounded-t-xl" />
            <div className="absolute bottom-4 left-6">
              <span className="text-xs text-primary-300 uppercase tracking-wider font-medium">
                {service.category}
              </span>
              <h2 className="text-xl font-bold text-white">
                {service.name}
              </h2>
            </div>
          </div>
        )}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white/90 backdrop-blur rounded-full p-1.5 text-gray-600 hover:text-gray-800 transition-colors z-10 shadow-sm"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="p-6">
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            {service.more}
          </p>
          <div className="flex gap-3">
            <a
              href={`${whatsappBase}Hello, I'm interested in your service: ${encodeURIComponent(service.name)}. Please share more details.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-3 text-sm font-medium text-center text-white bg-green-500 rounded-lg hover:bg-green-600 transition-colors"
            >
              Quote on WhatsApp
            </a>
            <a
              href="tel:+919146924531"
              className="px-4 py-3 text-sm font-medium text-center text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Phone className="h-4 w-4 inline mr-1" /> Call
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function ServicesContent() {
  const [openModal, setOpenModal] = useState(null);

  const closeModal = useCallback(() => {
    setOpenModal(null);
    document.body.style.overflow = "";
  }, []);

  const openService = useCallback((service) => {
    setOpenModal(service);
    document.body.style.overflow = "hidden";
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative bg-gray-900 py-14 md:py-24 overflow-hidden">
        <Image
          src="/services/s3.jpg"
          alt="Manufacturing Workshop"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70" />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white">Services</span>
            </div>
            <span className="inline-flex items-center gap-2 bg-primary-600/20 text-primary-300 font-semibold text-xs tracking-wider uppercase px-3 py-1.5 rounded-full mb-4 border border-primary-500/30">
              <Award className="h-3.5 w-3.5" />
              What We Do
            </span>
            <h1 className="text-3xl sm:text-4xl sm:text-5xl font-bold text-white leading-tight mb-3 font-[family-name:var(--font-manrope)]">
              Precision Manufacturing &<br />Fabrication Services
            </h1>
            <p className="text-lg text-gray-300 max-w-xl mb-8">
              Custom fabrication, precision machining, and industrial component
              manufacturing for modern industries. Trusted by leaders like
              Mahindra, Thermax, and Beumer.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={`${whatsappBase}Hello, I'd like to request a quote for your services.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg text-white bg-primary-600 hover:bg-primary-700 transition-colors"
              >
                Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
              </a>
              <a
                href="tel:+919146924531"
                className="inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg text-white border border-white/20 hover:bg-white/10 transition-colors"
              >
                <Phone className="mr-2 h-4 w-4" /> Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="mb-14">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              Our Services
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Comprehensive industrial solutions tailored to meet your specific
              requirements with precision and expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="group overflow-hidden rounded-xl border border-gray-200 bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                onClick={() => openService(service)}
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-primary-100 text-primary-700 flex-shrink-0">
                      {iconMap[service.id]}
                    </div>
                    <h3 className="text-base font-bold text-gray-900 leading-tight">
                      {service.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 mb-4 leading-relaxed line-clamp-2">
                    {service.description}
                  </p>
                  <button
                    className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center transition-colors"
                  >
                    View Details <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
              Our Equipment
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-3">
              Our Advanced Manufacturing Facility
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Equipped with modern CNC machines, welding equipment, and precision
              tooling to deliver high-quality industrial components.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {facilities.map((facility, index) => (
              <motion.div
                key={facility.id}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={facility.image}
                    alt={facility.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="p-2 bg-primary-100 rounded-lg text-primary-700 flex-shrink-0">
                      {facilityIconMap[facility.id]}
                    </div>
                    <h3 className="text-sm font-bold text-gray-900">
                      {facility.name}
                    </h3>
                  </div>
                  <div className="space-y-1.5">
                    {facility.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="text-xs text-gray-500 flex items-center gap-1.5"
                      >
                        <span className="w-1 h-1 rounded-full bg-primary-400 flex-shrink-0" />
                        {spec}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative rounded-xl overflow-hidden p-10 md:p-16 text-center">
            <Image
              src="/services/s3.jpg"
              alt="Manufacturing facility"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/85" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Discuss Your Project?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Our team of experts is ready to help you find the perfect solution
                for your industrial needs.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href={`${whatsappBase}Hello, I'd like to schedule a consultation.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg text-primary-700 bg-white hover:bg-primary-50 transition-colors"
                >
                  Get a Free Consultation
                </a>
                <a
                  href="tel:+919146924531"
                  className="inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg text-white border border-white/30 hover:bg-white/10 transition-colors"
                >
                  <Phone className="mr-2 h-4 w-4" /> Call Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {openModal && (
        <ServiceModal service={openModal} onClose={closeModal} />
      )}
    </div>
  );
}
