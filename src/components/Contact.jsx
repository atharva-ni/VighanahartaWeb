'use client'
import React from 'react';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Youtube } from "lucide-react"
import { useState } from "react"
import emailjs from "emailjs-com"

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validateForm = () => {
    const tempErrors = {}
    if (!formData.name.trim()) tempErrors.name = "Name is required"
    if (!formData.email.trim()) tempErrors.email = "Email is required"
    if (!formData.message.trim()) tempErrors.message = "Message is required"
    setErrors(tempErrors)
    return Object.keys(tempErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setSending(true)
      emailjs.sendForm("service_oqe9z27", "template_rk1kr34", e.target, "-KwObMCsv7NTXEu2T").then(
        () => {
          alert("Message sent successfully!")
          setFormData({ name: "", email: "", message: "" })
          setSending(false)
        },
        () => {
          alert("Error sending message. Please try again.")
          setSending(false)
        },
      )
    }
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-6 space-y-20">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl pb-5 font-bold text-gray-800 relative inline-block">
          Contact Us
          <span className="absolute  bottom-0 left-0 w-full h-1 bg-blue-500 transform -translate-y-2"></span>
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're here to help with any questions you might have. Reach out to us using the form below or through our
          contact information.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <section className="lg:col-span-3 bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
              <Mail className="text-white h-5 w-5" />
            </span>
            Get in Touch
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6 mb-0">

            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Your name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="your.email@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={13}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="How can we help you?"
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300 font-medium flex items-center justify-center"
              disabled={sending}
            >
              {sending ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </button>
          </form>
        </section>

        <section className="lg:col-span-2 space-y-6">
          <div className="bg-white p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                <Phone className="text-white h-5 w-5" />
              </span>
              Contact Information
            </h2>
            <ul className="space-y-5 text-gray-700">
              <li className="flex items-start">
                <MapPin className="text-blue-500 mr-3 h-5 w-5 mt-1 flex-shrink-0" />
                <span>
                  Gutt No. 1549, Plot No-2 Shelar Vasti, Dehu – Alandi Road, Chikhali, Pune-411062, Maharashtra.
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="text-blue-500 mr-3 h-5 w-5 flex-shrink-0" />
                <a href="tel:+919850952181" className="hover:text-blue-500 transition">
                  +91 9850952181
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="text-blue-500 mr-3 h-5 w-5 flex-shrink-0" />
                <a
                  href="mailto:vihanahartaengineers@gmail.com"
                  className="hover:text-blue-500 transition break-all"
                >
                  vihanahartaengineers@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Clock className="text-blue-500 mr-3 h-5 w-5 flex-shrink-0" />
                <span>Mon-Fri: 9:00 AM - 8:00 PM</span>
              </li>
              <li className="flex items-center pt-4 border-t border-gray-100">
                <div className="bg-blue-500 text-white rounded-full p-2 mr-3 flex-shrink-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <div>
                  <span className="text-sm text-gray-600">GST No:</span>
                  <span className="block font-medium text-gray-800">27AFZPN4054P1ZE</span>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 hover:shadow-lg transition duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                <MapPin className="text-white h-5 w-5" />
              </span>
              Location Map
            </h2>
            <div className="rounded-lg overflow-hidden ">
              <iframe
                title="Google Map"
                className="w-full h-64"
                src="https://www.google.com/maps/embed/v1/place?key=AIzaSyApYgQOI5yRIIlO6PGO8qXtl_DKKNTXMjk&q=Chikhali,+Pune,+India"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      </div>

      
    </div>
  )
}

export default Contact
