import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Linkedin, Youtube } from "lucide-react";
import React, { useState } from "react";
import emailjs from "emailjs-com"; // Import EmailJS

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false); // For showing loading status

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
      setSending(true); // Start loading state
      // Call EmailJS to send the message
      emailjs.sendForm('service_oqe9z27', 'template_rk1kr34', e.target, '-KwObMCsv7NTXEu2T')
        .then((result) => {
          alert("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
          setSending(false); // End loading state
        }, (error) => {
          alert("Error sending message. Please try again.");
          setSending(false); // End loading state
        });
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
          <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition">
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
  <div className="bg-gray-100 p-8 rounded-lg max-w-full">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Information</h2>
    <ul className="space-y-4 text-gray-700">
      <li className="flex items-center">
        <MapPin className="mr-2" />
        <span className="break-words">Gutt No. 1549, Plot No-2 Shelar Vasti, Dehu – Alandi Road, Chikhali, Pune-411062, Maharashtra.</span>
      </li>
      <li className="flex items-center">
        <Phone className="mr-2" />
        +91 9850952181
      </li>
      <li className="flex items-center">
        <Mail className="mr-2" />
        vihanahartaengineers@gmail.com
      </li>
      <li className="flex items-center">
        <Clock className="mr-2" />
        Mon-Fri: 9:00 AM - 8:00 PM
      </li>
      <li className="flex items-center">
        <strong className="mr-2">GST No:</strong>
        27AFZPN4054P1ZE
      </li>
    </ul>
  </div>

  <div className="bg-gray-100 p-6 rounded-lg max-w-full">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Location Map</h2>
    <iframe
      title="Google Map"
      className="w-full h-64 rounded-lg"
      src="https://www.google.com/maps/embed/v1/place?key=AIzaSyApYgQOI5yRIIlO6PGO8qXtl_DKKNTXMjk&q=Chikhali,+Pune,+India"
      allowFullScreen>
    </iframe>
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
