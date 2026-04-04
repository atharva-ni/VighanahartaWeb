"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useInView,
  useMotionValue,
  useSpring,
} from "framer-motion";
import {
  Building2,
  Wrench,
  Users,
  ArrowRight,
  Award,
  CheckCircle,
  Star,
} from "lucide-react";
import { portfolio, testimonials, clients } from "@/lib/data";
import ProcessTimeline from "@/components/ProcessTimeline";

function NumberCounter({ value, suffix = "+" }) {
  const ref = useRef(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) =>
      setDisplayValue(Math.floor(latest))
    );
  }, [springValue]);

  return (
    <span ref={ref}>
      {displayValue}
      {suffix}
    </span>
  );
}

const heroImages = [
  { src: "/services/s1.jpg", alt: "Engineering Workshop" },
  { src: "/services/s2.jpg", alt: "Precision Fabrication" },
  { src: "/services/s3.jpg", alt: "Industrial Manufacturing" },
];

export default function HomePage() {
  const [currentFeedback, setCurrentFeedback] = useState(0);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  useEffect(() => {
    if (!testimonials.length) return;
    const interval = setInterval(() => {
      setCurrentFeedback((prev) => (prev + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const featuredProjects = useMemo(() => portfolio.slice(0, 6), []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero */}
      <section className="relative bg-white overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.04) 1px, transparent 0)', backgroundSize: '40px 40px' }}>
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center min-h-[calc(100vh-4rem)] py-8 md:py-14">
            {/* Text */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <motion.span
                className="inline-flex flex-wrap items-center gap-1.5 bg-primary-50 text-primary-700 font-semibold text-[11px] tracking-wide uppercase px-3 py-2 rounded-full mb-4 border border-primary-100 max-w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Award className="h-3 w-3 flex-shrink-0" />
                <span className="sm:hidden">ISO 9001:2015 Certified</span>
                <span className="hidden sm:inline">
                  ISO 9001:2015 Certified &bull; 22+ Years of Excellence
                </span>
              </motion.span>
              <motion.h1
                className="text-3xl sm:text-4xl lg:text-[52px] font-bold text-gray-900 leading-[1.1] tracking-tight mb-4 sm:mb-5 font-[family-name:var(--font-manrope)]"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Precision Manufacturing &amp; Fabrication in Pune
                <span className="block text-primary-600">
                  for Reliable Industrial Output
                </span>
              </motion.h1>
              <motion.p
                className="text-base sm:text-lg text-gray-500 mb-6 sm:mb-8 max-w-lg leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                ISO 9001:2015 certified manufacturing partner in Pune offering
                CNC laser cutting, bending, welding, and conveyor fabrication
                for high-accuracy industrial applications.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-3 mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.45 }}
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary-600 text-white px-5 py-3 sm:px-7 sm:py-3.5 rounded-lg hover:bg-primary-700 transition-colors text-sm sm:text-base font-medium shadow-sm"
                >
                  Get a Quote <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/clients"
                  className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-5 py-3 sm:px-7 sm:py-3.5 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
                >
                  View Our Work
                </Link>
              </motion.div>
              {/* Stats row */}
              <div className="flex gap-5 sm:gap-8 pt-6 sm:pt-8 border-t border-gray-100">
                {[
                  { value: "22+", label: "Years" },
                  { value: "500+", label: "Projects" },
                  { value: "50+", label: "Partners" },
                ].map((s, i) => (
                  <div key={i}>
                    <p className="text-2xl font-bold text-gray-900">{s.value}</p>
                    <p className="text-sm text-gray-400">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              className="lg:col-span-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-xl lg:-mr-8 lg:scale-[0.97] origin-right">
                {heroImages.map((img, idx) => (
                  <Image
                    key={idx}
                    src={img.src}
                    alt={img.alt}
                    fill
                    className={`object-cover transition-opacity duration-1000 ${idx === currentHeroImage ? 'opacity-100' : 'opacity-0'}`}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={idx === 0}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Trust Bar - merged into hero */}
          <div className="pb-8 overflow-hidden">
            <p className="text-center text-[11px] font-medium text-gray-300 uppercase tracking-widest mb-4">
              Trusted by Leading Companies
            </p>
            <div className="relative">
              <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
              <div className="flex whitespace-nowrap" style={{ animation: 'marquee 30s linear infinite' }}>
                {[0, 1].map((setIdx) => (
                  <div key={setIdx} className="flex shrink-0 items-center">
                    {[...clients, ...clients, ...clients].map((client, i) => (
                      <div key={`${setIdx}-${i}`} className="flex-shrink-0 mx-10 grayscale opacity-30 hover:grayscale-0 hover:opacity-80 transition-all duration-300">
                        <Image
                          src={client.logo}
                          alt={client.name}
                          width={100}
                          height={40}
                          className="h-8 w-auto object-contain"
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

     

      {/* Services Overview */}
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-5 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
              What We Do
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
              Our Core Services
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive industrial solutions tailored to meet your specific
              requirements with precision and expertise.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Custom Hardware Design",
                description:
                  "Tailored engineering solutions for your specific manufacturing needs with precision CAD design.",
                icon: <Wrench className="h-8 w-8" />,
                cta: "Design-Led Engineering Support",
              },
              {
                title: "Precision Manufacturing",
                description:
                  "High-quality production with CNC laser cutting, bending, and strict quality control standards.",
                icon: <Building2 className="h-8 w-8" />,
                cta: "See CNC Manufacturing Capabilities",
              },
              {
                title: "Technical Consultation",
                description:
                  "Expert advice and engineering support from concept to completion for industrial projects.",
                icon: <Users className="h-8 w-8" />,
                cta: "Get Consultation for Your Project",
              },
            ].map((service, idx) => (
              <motion.div
                key={idx}
                className="group p-8 rounded-xl border border-gray-200 bg-white hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
              >
                <div className="mb-5 p-3 rounded-lg bg-primary-50 text-primary-600 inline-flex">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-1 mt-4 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors"
                >
                  {service.cta} <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
              Our Work
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-4">
              Featured Projects
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              A glimpse of our precision engineering and manufacturing work
              across industries.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                className={`group relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow ${idx > 1 ? "hidden sm:block" : "block"}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-xs font-medium text-primary-300 uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-white text-lg font-bold mt-1">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/clients"
              className="inline-flex items-center gap-2 bg-primary-600 text-white px-8 py-3.5 rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              View All Projects <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <ProcessTimeline />

      {/* Achievements */}
      <section className="py-12 md:py-20 bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-white mb-16">
            Our Achievements
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: 500, label: "Projects Completed", suffix: "+" },
              { number: 50, label: "Industry Partners", suffix: "+" },
              { number: 22, label: "Years Experience", suffix: "+" },
              { number: 100, label: "Client Satisfaction", suffix: "%" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
                className="p-6"
              >
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2">
                  <NumberCounter value={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-gray-400 text-sm sm:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2">
              What Our Clients Say
            </h2>
          </div>
          <div className="max-w-3xl mx-auto relative min-h-[200px] flex items-center justify-center">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                className={`w-full text-center px-4 sm:px-8 ${
                  idx === currentFeedback
                    ? "opacity-100 relative"
                    : "opacity-0 absolute"
                }`}
                initial={false}
                animate={{ opacity: idx === currentFeedback ? 1 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg">
                  <div className="flex justify-center gap-0.5 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <blockquote className="text-lg sm:text-xl italic text-gray-700 leading-relaxed mb-6">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 font-bold text-lg">
                      {testimonial.author.charAt(0)}
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-gray-800">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-gray-500">
                        {testimonial.position}, {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentFeedback(i)}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  i === currentFeedback
                    ? "w-8 bg-primary-600"
                    : "w-2.5 bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative rounded-xl overflow-hidden p-10 md:p-16 text-center">
            <Image
              src="/services/s1.jpg"
              alt="Manufacturing facility"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gray-900/85" />
            <div className="relative z-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
                Need Custom Fabrication or Industrial Equipment?
              </h2>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Talk with our engineering team to discuss your project
                requirements and get a tailored solution.
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
