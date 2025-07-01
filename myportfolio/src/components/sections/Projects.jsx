"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Infotech Digital Presence",
    description:
      "A dynamic and fully responsive digital presence platform for an IT company, built with React and Redux to manage state efficiently, featuring seamless navigation with React Router and a modern UI powered by Tailwind CSS.",
    technologies: ["React.js", "Tailwind css", "React Router DOM", "Redux"],
    image: "/ji.png",
  },
  {
    id: 2,
    title: "Online Cake Shop",
    description:
      "An online cake ordering platform with a visually appealing UI, real-time product listings, user authentication, and order management — built with the MERN stack for a seamless customer experience.",
    technologies: ["React.js", "Tailwind css", "Node.js", "Express", "MongoDB"],
    image: "/gr.png",
  },
  {
    id: 3,
    title: "Messenger App",
    description:
      "A real-time chat application built with React Native and Firebase, featuring user authentication, instant messaging, and cloud-based data storage for a smooth cross-platform mobile experience.",
    technologies: ["React-Native", "Firebase"],
    image: "/messenger.jpeg",
  },
  {
    id: 4,
    title: "Golden Glow Beauty Bar Website",
    description:
      "A professionally designed website for a beauty salon, featuring service listings, appointment booking, and dynamic content management. Built with ASP.NET and SQL Server for robust backend support, and styled with HTML, CSS, and JavaScript for a sleek user experience.",
    technologies: ["HTML", "CSS", "JavaScript", "C#", "ASP.NET", "SQL Server"],
    image: "/ggbb.png",
  },
  {
    id: 5,
    title: "Simple Math Calculation app",
    description:
      "An Android application developed using Java and XML for performing basic arithmetic operations like addition, subtraction, multiplication, and division with a clean and user-friendly interface.",
    technologies: ["XML", "Java"],
    image: "/smaths.jpeg",
  },
  {
    id: 6,
    title: "Course Registration app",
    description:
      "An Android-based course registration system that allows users to browse, register, and manage courses efficiently. Built using Java and XML for a responsive mobile UI, with SQLite integration for offline data storage and retrieval.",
    technologies: ["XML", "Java", "SQLite"],
    image: "/cregister.jpeg",
  },
];

const Projects = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const direction = i % 2 === 0 ? -100 : 100;
      gsap.fromTo(
        card,
        { opacity: 0, x: direction },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    });
  }, []);

  return (
    <section
      id="projects"
      className="py-16 md:py-24 px-6 md:px-16 bg-gray-800 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="relative mb-16 text-center">
            {/* Background title */}
            <h2
              className={`absolute left-1/2 transform -translate-x-1/2 text-4xl w-full -top-6 md:text-6xl md:-top-10 font-bold z-0 bg-gradient-to-b text-transparent bg-clip-text opacity-10 
      dark:from-blue-300 dark:to-blue-900 
      from-blue-300 to-blue-900`}
            >
              My Projects
            </h2>
            {/* Foreground title with motion */}
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative text-3xl md:text-5xl font-bold z-10 text-white inline-block"
            >
              <span className="border-b-4 border-[#A74482] pb-1">
                My Projects
              </span>
            </motion.h2>
          </div>
          <p className="text-gray-400 dark:text-gray-400 max-w-2xl mx-auto">
            Here are some of my recent projects. Each one was built to solve a
            specific problem and demonstrates different skills and technologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <div
              key={project.id}
              ref={(el) => (cardsRef.current[i] = el)}
              className="bg-gray-900 dark:bg-gray-900 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 opacity-0"
            >
              <div className="w-full aspect-[4/3] bg-black dark:bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-white dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 dark:text-gray-400 mb-4">
                  {project.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-[#A74482]/30 dark:bg-[#A74482]/30 text-blue-300 dark:text-blue-300 text-xs font-medium rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {/* Live Demo and GitHub links removed */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Projects;