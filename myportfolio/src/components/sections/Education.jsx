import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const educationData = [
  {
    title: "Master of Computer Applications (MCA)",
    institution: "Gujarat Technological University",
    year: "2023 - 2025",
    cpi: "8.46",
    description: "",
  },
  {
    title: "Bachelor of Commerce (B.Com)",
    institution: "Sardar Patel University",
    year: "2020 - 2023",
    cgpa: "6.81",
    description: "",
  },
];

const Education = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll(".education-card");

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          delay: index * 0.3,
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section id="education">
      <div className="bg-gray-900 dark:bg-gray-900 py-16 md:py-24 px-6 md:px-16">
        {/* <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl  font-bold text-center mb-10"
          style={{ color: "black" }}
        >
          Education
        </motion.h2> */}
        {/* Title with background + foreground */}
        <div className="relative mb-16 text-center">
          {/* Background title */}
          <h2
            className={`absolute left-1/2 transform -translate-x-1/2 text-4xl w-full -top-6 md:text-6xl md:-top-10 font-bold z-0 bg-gradient-to-b text-transparent bg-clip-text opacity-10 
      dark:from-blue-300 dark:to-blue-900 
      from-blue-600 to-blue-300`}
          >
            Education
          </h2>

          {/* Foreground title with motion */}
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative text-3xl md:text-5xl font-bold z-10 text-white inline-block"
          >
            <span className="border-b-4 border-[#A74482] dark:border-blue-400 pb-1">
              Education
            </span>
          </motion.h2>
        </div>

        <div ref={containerRef} className="space-y-8 max-w-4xl mx-auto">
          {educationData.map((edu, index) => (
            <motion.div
              key={index}
              className="education-card bg-gray-800 dark:bg-gray-800 p-5 sm:p-6 rounded-2xl shadow-md"
              style={{ borderLeft: "4px solid #E1A5C4" }}
            >
              <h3
                className="text-xl font-semibold"
                style={{ color: "#A74482" }}
              >
                {edu.title}
              </h3>
              <p className="text-sm" style={{ color: "#A74482" }}>
                {edu.institution} — <span className="italic">{edu.year}</span>
              </p>

              {/* Conditionally render CPI or CGPA */}
              {edu.cpi && (
                <p className="mt-1 text-sm text-white">
                  <strong>CPI:</strong> {edu.cpi}
                </p>
              )}
              {edu.cgpa && (
                <p className="mt-1 text-sm text-white">
                  <strong>CGPA:</strong> {edu.cgpa}
                </p>
              )}

              {edu.description && (
                <p className="mt-2 text-sm text-gray-700">{edu.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
