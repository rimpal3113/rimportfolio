"use client";

import { useEffect, useRef } from "react";
import {
  Code,
  Server,
  Database,
  Palette,
  Terminal,
  Settings,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const skillCategories = [
    {
      id: 1,
      name: "Frontend Development",
      icon: <Code className="h-6 w-6 text-[#A74482] dark:text-[#A74482]" />,
      skills: [
        { name: "HTML/CSS", proficiency: 90 },
        { name: "JavaScript", proficiency: 80 },
        { name: "React", proficiency: 80 },
        { name: "Tailwind CSS", proficiency: 80 },
      ],
    },
    {
      id: 2,
      name: "Backend Development",
      icon: <Server className="h-6 w-6 text-[#A74482] dark:text-[#A74482]" />,
      skills: [
        { name: "Node.js", proficiency: 80 },
        { name: "Express", proficiency: 75 },
        { name: "RESTful APIs", proficiency: 80 },
      ],
    },
    {
      id: 3,
      name: "Database",
      icon: <Database className="h-6 w-6 text-[#A74482] dark:text-[#A74482]" />,
      skills: [
        { name: "MongoDB", proficiency: 80 },
        { name: "MySQL", proficiency: 70 },
        { name: "Firebase", proficiency: 70},
      ],
    },
    {
      id: 4,
      name: "Design",
      icon: <Palette className="h-6 w-6 text-[#A74482] dark:text-[#A74482]" />,
      skills: [
        { name: "UI/UX Design", proficiency: 75 },
        { name: "Responsive Design", proficiency: 85 },
      ],
    },
    {
      id: 5,
      name: "Tools & DevOps",
      icon: <Terminal className="h-6 w-6 text-[#A74482] dark:text-[#A74482]" />,
      skills: [
        { name: "Git", proficiency: 60 },
        
      ],
    },
    {
      id: 6,
      name: "Other Skills",
      icon: <Settings className="h-6 w-6 text-[#A74482] dark:text-[#A74482]" />,
      skills: [
        { name: "Problem Solving", proficiency: 90 },
        { name: "Team Collaboration", proficiency: 85 },
        { name: "Agile Methodology", proficiency: 80 },
        { name: "Project Management", proficiency: 75 },
      ],
    },
  ];

  const cardsRef = useRef([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (card) {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, rotateY: 90 },
          {
            opacity: 1,
            y: 0,
            rotateY: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 80%",
              toggleActions: "play none none none",
            },
            delay: i * 0.1,
          }
        );
      }
    });
  }, []);

  return (
    <section
      id="skills"
      className="py-16 md:py-24 px-6 md:px-16 bg-gray-800 dark:bg-gray-800"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          {/* <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            My Skills
          </h2> */}
          {/* Title with background + foreground */}
          <div className="relative mb-16 text-center">
            {/* Background title */}
            <h2
              className={`absolute left-1/2 transform -translate-x-1/2 text-4xl w-full -top-6 md:text-6xl md:-top-10 font-bold z-0 bg-gradient-to-b text-transparent bg-clip-text opacity-10 
      dark:from-blue-300 dark:to-blue-900 
      from-blue-300 to-blue-900`}
            >
              My Skills
            </h2>

            {/* Foreground title with motion */}
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative text-3xl md:text-5xl font-bold z-10 text-white inline-block"
            >
              <span className="border-b-4 border-[#A74482] pb-1">My Skills</span>
            </motion.h2>
          </div>
          <p className="text-gray-400 dark:text-gray-400 max-w-2xl mx-auto">
            Here's a comprehensive overview of my technical skills and expertise
            across various domains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, i) => (
            <div
              key={category.id}
              className="bg-gray-900 dark:bg-gray-900 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 opacity-0 transform"
              ref={(el) => (cardsRef.current[i] = el)}
            >
              <div className="flex items-center mb-4">
                {category.icon}
                <h3 className="text-xl font-bold text-white dark:text-white ml-2">
                  {category.name}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-300 dark:text-gray-300 font-medium">
                        {skill.name}
                      </span>
                      <span className="text-gray-400 dark:text-gray-400">
                        {skill.proficiency}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-700 dark:bg-gray-700 rounded-full h-2.5">
                      <div
                        className="bg-[#A74482] dark:bg-[#A74482] h-2.5 rounded-full"
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
