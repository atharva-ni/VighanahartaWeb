"use client";

import { useState, useCallback } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  ChevronRight,
  Award,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";

const contactInfo = [
  {
    icon: <MapPin className="h-5 w-5" />,
    label: "Address",
    value:
      "Gutt No. 1549, Plot No-2 Shelar Vasti, Dehu–Alandi Road, Chikhali, Pune-411062",
    href: "https://maps.app.goo.gl/gPTAQWufQfEVUcRp9",
  },
  {
    icon: <Phone className="h-5 w-5" />,
    label: "Phone",
    value: "+91 9850952181",
    href: "tel:+919850952181",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Email",
    value: "vihanahartaengineers@gmail.com",
    href: "mailto:vihanahartaengineers@gmail.com",
  },
  {
    icon: <Clock className="h-5 w-5" />,
    label: "Working Hours",
    value: "Mon-Sat: 9:00 AM - 8:00 PM",
  },
];

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  }, []);

  const validate = useCallback(() => {
    const errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = "Enter a valid email";
    if (!formData.message.trim()) errs.message = "Message is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!validate()) return;

      setSending(true);
      emailjs
        .sendForm(
          "service_oqe9z27",
          "template_rk1kr34",
          e.target,
          "-KwObMCsv7NTXEu2T"
        )
        .then(
          () => {
            setSent(true);
            setFormData({ name: "", email: "", message: "" });
            setSending(false);
            setTimeout(() => setSent(false), 5000);
          },
          () => {
            alert("Error sending message. Please try again.");
            setSending(false);
          }
        );
    },
    [validate]
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative bg-gray-900 py-20 md:py-28 overflow-hidden">
        <Image
          src="/services/s2.jpg"
          alt="Contact Vighanaharta Engineers"
          fill
          className="object-cover opacity-25"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white">Contact</span>
            </div>
            <span className="inline-flex items-center gap-2 bg-primary-600/20 text-primary-300 font-semibold text-xs tracking-wider uppercase px-3 py-1.5 rounded-full mb-4 border border-primary-500/30">
              <Award className="h-3.5 w-3.5" />
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-3 font-[family-name:var(--font-manrope)]">
              Contact Us
            </h1>
            <p className="text-lg text-gray-300 max-w-xl">
              We&apos;re here to help with any questions. Reach out and
              let&apos;s build something great together.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form */}
          <motion.section
            className="lg:col-span-3 bg-white p-8 md:p-10 rounded-xl shadow-lg border border-gray-100 self-start"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center">
                <MessageSquare className="text-white h-5 w-5" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Send a Message
              </h2>
            </div>

            {sent && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
                Message sent successfully! We&apos;ll get back to you soon.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2 text-sm"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all bg-gray-50"
                  placeholder="Your full name"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.name}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2 text-sm"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all bg-gray-50"
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2 text-sm"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full p-3.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:outline-none transition-all bg-gray-50 resize-none"
                  placeholder="Tell us about your project or requirements..."
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1.5">
                    {errors.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                disabled={sending}
                className="w-full bg-primary-600 text-white py-3.5 px-6 rounded-xl hover:bg-primary-700 transition-colors font-medium flex items-center justify-center gap-2 disabled:opacity-60 shadow-md"
              >
                {sending ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.section>

          {/* Sidebar */}
          <motion.section
            className="lg:col-span-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {/* Contact Info */}
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Contact Information
              </h2>
              <ul className="space-y-5">
                {contactInfo.map((info, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 text-primary-600 flex items-center justify-center flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="text-gray-700 hover:text-primary-600 transition-colors text-sm"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-700 text-sm">{info.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center flex-shrink-0">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium">GST No</p>
                    <p className="text-sm font-semibold text-gray-800">
                      27AFZPN4054P1ZE
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Our Location
              </h2>
              <div className="rounded-xl overflow-hidden">
                <iframe
                  title="Google Map - Vighanaharta Engineers"
                  className="w-full h-64"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3779.4251339704247!2d73.79897160000002!3d18.689775400000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b76ae0fd34ff%3A0x2925147aeb1fb92d!2sVighanaharta%20Engineers!5e0!3m2!1sen!2sin!4v1771046375708!5m2!1sen!2sin"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* WhatsApp CTA */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">
            Prefer WhatsApp?
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Reach us instantly on WhatsApp for quick quotes and project discussions.
          </p>
          <a
            href="https://wa.me/9146924531?text=Hello, I'd like to discuss a project."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors"
          >
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.37 0-4.567-.696-6.42-1.893l-.447-.293-2.944.987.987-2.944-.293-.447A9.958 9.958 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
            Chat on WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
