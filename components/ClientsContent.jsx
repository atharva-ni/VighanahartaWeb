"use client";

import { useState, useMemo, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { portfolio, clients, testimonials } from "@/lib/data";
import {
  ChevronRight,
  ChevronLeft,
  Award,
  ArrowRight,
  Cog,
  Wrench,
  Factory,
  Flame,
  PenToolIcon as Tool,
  Layers,
  Star,
  Phone,
} from "lucide-react";

const categoryIcons = {
  All: <Layers className="h-3.5 w-3.5" />,
  "Belt Bucket": <Factory className="h-3.5 w-3.5" />,
  "CBR Moulds": <Tool className="h-3.5 w-3.5" />,
  "Cover Jackets for Pump": <Wrench className="h-3.5 w-3.5" />,
  Fabrication: <Cog className="h-3.5 w-3.5" />,
  "Hood Pocket Ventilation": <Flame className="h-3.5 w-3.5" />,
  "Material Handling": <Tool className="h-3.5 w-3.5" />,
  Equipment: <Tool className="h-3.5 w-3.5" />,
  "Structural Fabrication": <Cog className="h-3.5 w-3.5" />,
  "Storage Systems": <Layers className="h-3.5 w-3.5" />,
};

export default function ClientsContent() {
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(portfolio.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return portfolio;
    return portfolio.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const scrollRef = useRef(null);

  const scroll = useCallback((dir) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.querySelector("div")?.offsetWidth || 300;
    const amount = cardWidth + 20; // card width + gap
    scrollRef.current.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <section className="relative bg-gray-900 py-20 md:py-28 overflow-hidden">
        <Image
          src="/portfolio/1.jpg"
          alt="Industrial Projects"
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
              <span className="text-white">Clients & Portfolio</span>
            </div>
            <span className="inline-flex items-center gap-2 bg-primary-600/20 text-primary-300 font-semibold text-xs tracking-wider uppercase px-3 py-1.5 rounded-full mb-4 border border-primary-500/30">
              <Award className="h-3.5 w-3.5" />
              Portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight mb-3 font-[family-name:var(--font-manrope)]">
              Trusted by Industry Leaders<br />Across India
            </h1>
            <p className="text-lg text-gray-300 max-w-xl">
              Explore our completed fabrication, manufacturing, and engineering
              projects trusted by leading companies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
              Our Work
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-3">
              Work Portfolio
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10">
              Browse our industrial projects across fabrication, assembly, and precision engineering.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-primary-600 text-white shadow-md shadow-primary-600/25"
                      : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                  }`}
                >
                  {categoryIcons[cat]}
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            {/* Left Arrow */}
            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700" />
            </button>

            {/* Scrollable Row */}
            <div
              ref={scrollRef}
              className="flex gap-5 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    key={project.id}
                    className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 bg-white flex-shrink-0 snap-start w-[calc(50%-10px)] sm:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)]"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: idx * 0.03, duration: 0.3 }}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <span className="text-xs text-primary-300 uppercase tracking-wider font-medium">
                          {project.category}
                        </span>
                        <h3 className="text-white font-bold text-sm mt-1">
                          {project.title}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Right Arrow */}
            <button
              onClick={() => scroll("right")}
              className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors hidden md:flex"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-5 w-5 text-gray-700" />
            </button>
          </div>
        </div>
      </section>

      {/* Clients Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
              Partners
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Our Trusted Clients
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We&apos;re proud to work with industry leaders who trust us with
              their manufacturing needs.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {clients.map((client, idx) => (
              <motion.div
                key={client.id}
                className="group bg-white p-8 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="h-16 w-full flex items-center justify-center mb-4">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={120}
                    height={64}
                    className="max-h-full w-auto object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                </div>
                <h3 className="text-sm font-bold text-gray-800">
                  {client.name}
                </h3>
                <p className="text-[11px] text-gray-400 mt-1">
                  {client.industry}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
              Feedback
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Client Testimonials
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don&apos;t just take our word for it — hear from our valued
              clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={testimonial.id}
                className="bg-white p-7 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.4 }}
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-sm">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800 text-sm">
                      {testimonial.author}
                    </p>
                    <p className="text-xs text-gray-400">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="relative rounded-xl overflow-hidden p-10 md:p-16 text-center">
            <Image
              src="/portfolio/3.jpg"
              alt="Industrial facility"
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
                  <Phone className="mr-2 h-4 w-4" /> Call Us Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
