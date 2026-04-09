"use client";

import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Linkedin,
  Award,
} from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Team", href: "/about" },
    { label: "Portfolio", href: "/clients" },
    { label: "Contact Us", href: "/contact" },
  ],
  services: [
    { label: "Material Handling", href: "/services" },
    { label: "Fabrication", href: "/services" },
    { label: "Manufacturing", href: "/services" },
    { label: "Welding Services", href: "/services" },
    { label: "Conveyor Systems", href: "/services" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 lg:gap-14">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="text-white font-bold text-lg mb-4">
              Vighanaharta Engineers
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              ISO 9001:2015 certified precision manufacturing and fabrication
              solutions since 2017. Trusted by Mahindra, Thermax & more.
            </p>
            <div className="flex items-center gap-2 mb-5">
              <Award className="h-4 w-4 text-primary-400" />
              <span className="text-xs text-primary-400 font-medium">ISO 9001:2015 Certified</span>
            </div>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-800 flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-5">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 text-primary-400 mt-0.5 flex-shrink-0" />
                <a
                  href="https://maps.app.goo.gl/gPTAQWufQfEVUcRp9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Plot No-2, Dehu–Alandi Road, Chikhali, Pune-411062
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <a
                  href="tel:+919850952181"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  +91 9850952181
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <a
                  href="tel:+919146924531"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  +91 9146924531
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-primary-400 flex-shrink-0" />
                <a
                  href="mailto:vihanahartaengineers@gmail.com"
                  className="text-gray-400 hover:text-white transition-colors break-all"
                >
                  vihanahartaengineers@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} Vighanaharta Engineers. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <span>GST: 27AFZPN4054P1ZE</span>
            <span>|</span>
            <span>ISO 9001:2015</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
