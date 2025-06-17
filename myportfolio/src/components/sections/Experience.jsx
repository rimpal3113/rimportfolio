import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    role: "Web Development Intern",
    company: "NativeSoftTech",
    year: "May 2025 – June 2025",
    description: `Designed and developed a fully responsive, animated personal portfolio website using React.

Integrated GSAP and Framer Motion for engaging scroll-based and UI animations.

Gained hands-on experience in modern frontend practices including component-based architecture, responsive design, and animation libraries.`,
  },
  {
    role: "Web Development Intern",
    company: "Jinarth Infotech",
    year: "Jan 2025 – April 2025",
    description: `Crafted 15+ responsive user interfaces using React.js and Tailwind CSS, boosting user engagement by 25% through intuitive and mobile-optimized designs.

Engineered backend services with Node.js and MongoDB, managing 500+ database entries and achieving 99% API responsiveness.

Spearheaded the live project "Infotech Digital Presence", streamlining client-side navigation with React Router DOM and enhancing page load times by 30% through optimized Redux state management.`,
  },
];

const Experience = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll(".experience-card");

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { x: 100, opacity: 0 },
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
    <section id="experience">
      <div className="bg-gray-900 dark:bg-gray-900 py-16 md:py-24 px-6 md:px-16">
        {/* <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-bold text-center mb-10 text-white dark:text-white"
        >
          Experience
        </motion.h2> */}
        {/* Title with background + foreground */}
        <div className="relative mb-16 text-center">
          {/* Background title */}
          <h2
            className={`absolute left-1/2 transform -translate-x-1/2 text-4xl w-full -top-6 md:text-6xl md:-top-10 font-bold z-0 bg-gradient-to-b text-transparent bg-clip-text opacity-10 
      dark:from-blue-300 dark:to-blue-900 
      from-blue-300 to-blue-900`}
          >
            Experience
          </h2>

          {/* Foreground title with motion */}
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="relative text-3xl md:text-5xl font-bold z-10 text-white inline-block"
          >
            <span className="border-b-4 border-[#A74482] pb-1">Experience</span>
          </motion.h2>
        </div>
        <div ref={containerRef} className="space-y-8 max-w-4xl mx-auto">
          {experienceData.map((exp, index) => (
            <motion.div
              key={index}
              className="experience-card bg-gray-800 dark:bg-gray-800 p-5 sm:p-6 rounded-2xl shadow-md"
              style={{ borderLeft: "4px solid #E1A5C4" }}
            >
              <h3 className="text-lg sm:text-xl font-semibold text-[#A74482]">
                {exp.role}
              </h3>
              <p className="text-sm font-medium text-[#A74482]">
                {exp.company} —{" "}
                <span className="italic text-gray-300 dark:text-gray-300">
                  {exp.year}
                </span>
              </p>
              <p className="mt-3 text-sm sm:text-base text-gray-300 dark:text-gray-300 whitespace-pre-line">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
