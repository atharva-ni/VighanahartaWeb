import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    if (!formData.email.trim()) tempErrors.email = "Email is required";
    if (!formData.message.trim()) tempErrors.message = "Message is required";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Message sent successfully!");
      setFormData({ name: "", email: "", message: "" });
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 p-6">
      <h1 className="text-4xl font-bold text-center text-gray-800">Contact Us</h1>

      <section className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400" />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 font-medium">Message</label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"></textarea>
            {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">Send Message</button>
        </form>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-center"><MapPin className="mr-2" /> 123 Manufacturing St, Industrial City, 12345</li>
            <li className="flex items-center"><Phone className="mr-2" /> +1 (555) 123-4567</li>
            <li className="flex items-center"><Mail className="mr-2" /> info@yourcompany.com</li>
            <li className="flex items-center"><Clock className="mr-2" /> Mon-Fri: 9:00 AM - 5:00 PM</li>
          </ul>
        </div>
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Location Map</h2>
          <iframe title="Google Map" className="w-full h-64 rounded-lg" src="https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=Industrial+City,12345" allowFullScreen></iframe>
        </div>
      </section>

      <section className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Connect With Us</h2>
        <div className="flex justify-center space-x-6 text-2xl">
          <a href="#" className="text-blue-600 hover:text-blue-700"><Facebook /></a>
          <a href="#" className="text-blue-400 hover:text-blue-500"><Twitter /></a>
          <a href="#" className="text-blue-700 hover:text-blue-800"><Linkedin /></a>
          <a href="#" className="text-red-600 hover:text-red-700"><Youtube /></a>
        </div>
      </section>
    </div>
  );
};

export default Contact;
