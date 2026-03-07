"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import {
  ClipboardList,
  PenTool,
  Factory,
  BadgeCheck,
  Truck,
} from "lucide-react";

const steps = [
  {
    title: "Consultation & Planning",
    description:
      "Understanding your requirements, specs, and project goals with feasibility analysis.",
    icon: <ClipboardList className="w-6 h-6 text-white" />,
    color: "bg-blue-500",
    border: "border-blue-500",
  },
  {
    title: "Design & Engineering",
    description:
      "Precise CAD models and technical drawings to meet your exact standards.",
    icon: <PenTool className="w-6 h-6 text-white" />,
    color: "bg-indigo-500",
    border: "border-indigo-500",
  },
  {
    title: "Precision Fabrication",
    description:
      "Advanced machinery and skilled craftsmanship to produce high-quality components.",
    icon: <Factory className="w-6 h-6 text-white" />,
    color: "bg-purple-500",
    border: "border-purple-500",
  },
  {
    title: "Quality Assurance",
    description:
      "Multi-stage testing and inspection to guarantee defect-free, reliable products.",
    icon: <BadgeCheck className="w-6 h-6 text-white" />,
    color: "bg-teal-500",
    border: "border-teal-500",
  },
  {
    title: "Delivery & Support",
    description:
      "On-time delivery with continued technical support for seamless integration.",
    icon: <Truck className="w-6 h-6 text-white" />,
    color: "bg-green-500",
    border: "border-green-500",
  },
];

export default function ProcessTimeline() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section ref={containerRef} className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="text-center mb-10">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
            How We Work
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
            Our Process
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            From concept to completion, we follow a rigorous workflow to deliver
            excellence.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Background Line */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-gray-200 -ml-0.5" />

          {/* Progress Line */}
          <motion.div
            className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-1 bg-primary-600 -ml-0.5 origin-top"
            style={{ scaleY }}
          />

          <div className="space-y-8 md:space-y-14">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex items-center md:justify-between ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Icon Marker */}
                <div className="absolute left-0 md:left-1/2 w-10 h-10 rounded-full border-4 border-white shadow-md z-10 flex items-center justify-center -translate-x-[0px] md:-translate-x-1/2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${step.color} shadow-lg`}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className={`ml-16 md:ml-0 md:w-[45%] bg-white p-5 rounded-xl shadow-md border-t-4 ${step.border} hover:shadow-lg transition-shadow`}
                >
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>

                {/* Spacer */}
                <div className="hidden md:block md:w-[45%]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
