"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  Target,
  Eye,
  Building2,
  Users,
  Briefcase,
  Award,
  Factory,
  Cog,
  Wrench,
  Package,
  CheckCircle,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

function AnimatedNumber({ value, suffix = "" }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (v) => setDisplay(Math.floor(v)));
  }, [springValue]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function AboutContent() {
  return (
    <div className="min-h-screen bg-white">
      {/* Page Header with background image */}
      <section className="relative bg-gray-900 py-14 md:py-24 overflow-hidden">
        <Image
          src="/services/s1.jpg"
          alt="Factory"
          fill
          className="object-cover opacity-30"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/70" />
        <div className="container mx-auto px-5 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 text-gray-400 text-sm mb-4">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-white">About</span>
            </div>
            <span className="inline-flex items-center gap-2 bg-primary-600/20 text-primary-300 font-semibold text-xs tracking-wider uppercase px-3 py-1.5 rounded-full mb-4 border border-primary-500/30">
              <Award className="h-3.5 w-3.5" />
              About Us
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-3 font-[family-name:var(--font-manrope)]">
              About Vighanaharta Engineers
            </h1>
            <p className="text-lg text-gray-300 max-w-xl">
              22+ years of engineering excellence in precision manufacturing and fabrication solutions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Row - tight to header */}
      <section className="py-10 md:py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: 2017, label: "Established", icon: <Building2 className="h-5 w-5" />, suffix: "" },
              { number: 5000, label: "Sq.Ft Shed Area", icon: <Factory className="h-5 w-5" />, suffix: "+" },
              { number: 25000, label: "Sq.Ft Open Area", icon: <Briefcase className="h-5 w-5" />, suffix: "+" },
              { number: 0, label: "9001:2015 Certified", icon: <Award className="h-5 w-5" />, suffix: "", isISO: true },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="group p-5 rounded-xl border border-gray-200 bg-white text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary-100 text-primary-700 mb-3 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  {item.isISO ? "ISO" : <AnimatedNumber value={item.number} suffix={item.suffix} />}
                </div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">{item.label}</div>
              </motion.div>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-6">
            Serving manufacturing, industrial, and fabrication clients with precision engineering solutions.
          </p>
        </div>
      </section>

      {/* Image + Mission/Vision — side by side */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* Factory Image */}
            <motion.div
              className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Image
                src="/services/s2.jpg"
                alt="Vighanaharta Engineers Workshop"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </motion.div>

            {/* Mission & Vision */}
            <div className="space-y-6">
              <motion.div
                className="p-7 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-primary-100 text-primary-700">
                    <Target className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Our Mission</h2>
                </div>
                <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  {[
                    { icon: <Cog className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />, text: "Deliver precision engineering solutions" },
                    { icon: <CheckCircle className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />, text: "Maintain highest manufacturing standards" },
                    { icon: <Users className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />, text: "Build long-term client relationships" },
                    { icon: <Package className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />, text: "Ensure on-time project delivery" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      {item.icon}
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                className="p-7 rounded-xl border border-gray-200 bg-white hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-primary-100 text-primary-700">
                    <Eye className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Our Vision</h2>
                </div>
                <ul className="space-y-3 text-gray-600 text-sm leading-relaxed">
                  {[
                    { icon: <Cog className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />, text: "Be a global leader in precision fabrication" },
                    { icon: <Wrench className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />, text: "Set benchmarks in quality and innovation" },
                    { icon: <Factory className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />, text: "Expand manufacturing capabilities" },
                    { icon: <Award className="h-4 w-4 text-primary-500 flex-shrink-0 mt-0.5" />, text: "Achieve industry-wide recognition for excellence" },
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      {item.icon}
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story + Timeline */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-5 md:px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              className="text-center mb-10"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
                Our Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
                Company Overview
              </h2>
            </motion.div>

            <motion.p
              className="text-gray-600 leading-relaxed text-lg text-center mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Vighnaharta Engineers was established in 2017 in Chikhali, Pune. Operating with a
              5000 sq. ft. shed area and 25,000 sq. ft. open area, we are ISO 9001:2015
              certified and specialize in welding, material handling equipment, and engineering
              services for automobile, engineering, and civil sectors.
            </motion.p>

            {/* Timeline */}
            <div className="relative">
              {[
                { year: "2017", title: "Company Founded", desc: "Established manufacturing operations in Pune" },
                { year: "2019", title: "Expanded Manufacturing", desc: "Increased shed and open area capacity" },
                { year: "2022", title: "ISO Certification", desc: "Achieved international quality standards" },
                { year: "2024", title: "500+ Projects", desc: "Serving 50+ industry partners across India" },
                { year: "2026", title: "Continued Growth", desc: "Expanding capabilities and client partnerships" },
              ].map((item, idx, arr) => (
                <motion.div
                  key={`mobile-${idx}`}
                  className="relative md:hidden pl-12 pb-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.35 }}
                >
                  {idx !== arr.length - 1 && (
                    <div className="absolute left-4 top-9 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 to-primary-200" />
                  )}
                  <div className="absolute left-0 top-1 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center text-[10px] font-bold shadow-md ring-4 ring-primary-100">
                    {item.year.slice(2)}
                  </div>
                  <div className="rounded-xl border border-primary-100 bg-white p-4 shadow-sm">
                    <span className="text-primary-600 font-semibold text-xs tracking-wide uppercase">{item.year}</span>
                    <h3 className="text-base font-bold text-gray-900 mt-1">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              ))}

              {/* Desktop timeline (unchanged layout) */}
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 hidden md:block" />
              <div className="hidden md:grid md:grid-cols-5 gap-6">
                {[
                  { year: "2017", title: "Company Founded", desc: "Established manufacturing operations in Pune" },
                  { year: "2019", title: "Expanded Manufacturing", desc: "Increased shed and open area capacity" },
                  { year: "2022", title: "ISO Certification", desc: "Achieved international quality standards" },
                  { year: "2024", title: "500+ Projects", desc: "Serving 50+ industry partners across India" },
                  { year: "2026", title: "Continued Growth", desc: "Expanding capabilities and client partnerships" },
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    className="relative text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.15, duration: 0.4 }}
                  >
                    <div className="relative z-10 w-10 h-10 mx-auto rounded-full bg-primary-600 text-white flex items-center justify-center text-xs font-bold shadow-md mb-4">
                      {item.year.slice(2)}
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-md transition-shadow">
                      <span className="text-primary-600 font-bold text-sm">{item.year}</span>
                      <h3 className="text-base font-bold text-gray-900 mt-1">{item.title}</h3>
                      <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Management */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-5 md:px-6">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
              Our Leaders
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">Management</h2>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Proprietor */}
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <Image
                  src="/services/profile.webp"
                  alt="Nilesh - Proprietor"
                  fill
                  className="rounded-full object-cover ring-4 ring-gray-100"
                  sizes="128px"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Nilesh Nighot</h3>
              <p className="text-primary-600 font-medium">
                Proprietor & Mechanical Engineer
              </p>
            </motion.div>

            {/* Team */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {[
                { name: "Swati Nighot", role: "Accountant" },
                { name: "Avinash Jadhav", role: "Plant 1 Manager" },
                { name: "Bharat Surywanshi", role: "Plant 2 Manager" },
              ].map((member, idx) => (
                <motion.div
                  key={idx}
                  className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-md transition-shadow"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="relative w-24 h-24 mx-auto mb-4">
                    <Image
                      src="/services/profile.webp"
                      alt={member.name}
                      fill
                      className="rounded-full object-cover"
                      sizes="96px"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{member.role}</p>
                </motion.div>
              ))}
            </div>
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
                Partner With Us for Your Next Project
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                22+ years of precision manufacturing experience. Let our
                engineering team bring your vision to reality.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg text-primary-700 bg-white hover:bg-primary-50 transition-colors"
                >
                  Request a Quote <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <a
                  href="tel:+919146924531"
                  className="inline-flex items-center justify-center px-6 py-3 font-medium rounded-lg text-white border border-white/30 hover:bg-white/10 transition-colors"
                >
                  Call Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
