"use client";

import { useEffect, useState } from "react";
import { ArrowDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "../Header";
import { Typewriter } from "react-simple-typewriter";

const imageList = ["/my.jpeg", "/my3.jpeg", "/my2.jpeg"];
const snowballCount = 40;

const generateSnowballs = () => {
  const snowballs = [];
  for (let i = 0; i < snowballCount; i++) {
    snowballs.push({
      id: i,
      size: Math.random() * 8 + 4,
      left: Math.random() * 100,
      delay: Math.random() * 20,
      duration: 10 + Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.3,
    });
  }
  return snowballs;
};

const snowballs = generateSnowballs();

const Home = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isIpad, setIsIpad] = useState(false);

  useEffect(() => {
    // Detect iPad devices
    const isIpad =
      /iPad|Macintosh/i.test(navigator.userAgent) && "ontouchend" in document;
    setIsIpad(isIpad);

    const interval = setInterval(() => {
      setCurrentImage((prevIndex) => (prevIndex + 1) % imageList.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSkills = () => {
    const skillsSection = document.getElementById("skills");
    if (skillsSection) {
      skillsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.8 } },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 0.6 } },
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center
      bg-gradient-to-b from-gray-900 to-gray-800 dark:from-gray-900 dark:to-gray-800 overflow-hidden"
    >
      <Header />

      <svg
        className="absolute left-0 top-0 h-full w-full pointer-events-none"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="#A74482"
          fillOpacity="0.1"
          d="M0,192 C360,288 1080,96 1440,192 L1440,320 L0,320 Z"
        >
          <animate
            attributeName="d"
            dur="10s"
            repeatCount="indefinite"
            values="
              M0,192 C360,288 1080,96 1440,192 L1440,320 L0,320 Z;
              M0,160 C400,240 1040,120 1440,160 L1440,320 L0,320 Z;
              M0,192 C360,288 1080,96 1440,192 L1440,320 L0,320 Z
            "
          />
        </path>
      </svg>

      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {snowballs.map(({ id, size, left, delay, duration, opacity }) => (
          <span
            key={id}
            className="absolute rounded-full bg-gray-300 dark:bg-gray-300"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `-${size}px`,
              opacity,
              animation: `snowFall ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
              filter: "drop-shadow(0 0 3px rgba(255,255,255,0.8))",
            }}
          />
        ))}
      </div>

      <motion.div
        className="container mx-auto px-4 pt-8 md:pt-10 pb-5 md:pb-24 relative z-10"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Profile Image - Adjusted for iPad */}
          <div className="w-full flex justify-center md:order-2 md:w-1/2">
            <motion.div
              className={`relative ${
                isIpad
                  ? "w-64 h-80 md:w-72 md:h-96"
                  : "w-52 h-60 sm:w-60 sm:h-64 md:w-[26rem] md:h-[34rem]"
              } flex items-center justify-center`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="absolute inset-0 rounded-xl border-2 sm:border-4 border-dashed border-purple-500 z-0"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              />

              <motion.div
                className="absolute inset-[3px] sm:inset-1 rounded-xl border-2 border-transparent z-0"
                animate={{
                  boxShadow: [
                    "0 0 0px rgba(255,255,255,0.1)",
                    "0 0 15px rgba(255,255,255,0.3)",
                    "0 0 30px rgba(255,255,255,0.5)",
                    "0 0 15px rgba(255,255,255,0.3)",
                    "0 0 0px rgba(255,255,255,0.1)",
                  ],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
              />

              <div className="absolute inset-[10px] sm:inset-4 bg-gray-900 dark:bg-gray-900 border-2 sm:border-4 border-gray-800 dark:border-gray-800 shadow-xl overflow-hidden rounded-xl z-10">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imageList[currentImage]}
                    src={imageList[currentImage]}
                    alt="Rotating headshot"
                    className="w-full h-full object-cover object-top absolute top-0 left-0"
                    variants={imageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  />
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Bio Section - Adjusted for iPad */}
          <div className="w-full md:w-1/2 text-center md:text-left md:order-1">
            <h1
              className={`${
                isIpad ? "text-5xl" : "text-4xl md:text-5xl lg:text-6xl"
              } font-bold text-white dark:text-white mb-4`}
            >
              Hi, I'm <span className="text-[#A74482]">Rimpal</span>
            </h1>

            <h2
              className={`${
                isIpad ? "text-2xl" : "text-xl md:text-2xl"
              } font-medium text-gray-300 dark:text-gray-300 mb-6`}
            >
              <Typewriter
                words={[
                  "Web Developer",
                  "Web Performance Optimizer",
                  "Turning Ideas into Websites",
                ]}
                loop={true}
                cursor
                cursorStyle="__"
                typeSpeed={100}
                deleteSpeed={80}
                delaySpeed={1500}
              />
            </h2>

            <p
              className={`${
                isIpad ? "text-lg" : "text-base md:text-lg"
              } text-gray-400 dark:text-gray-400 mb-8 max-w-lg mx-auto md:mx-0`}
            >
              I create beautiful, responsive websites with modern technologies.
              Passionate about clean code and user-friendly interfaces that
              deliver exceptional experiences.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button
                onClick={scrollToSkills}
                className="px-6 py-3 bg-[#A74482] hover:bg-[#A74482]/90 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                View My Skills
                <ArrowDown className="ml-2 h-4 w-4" />
              </button>
              <a
                href="#contact"
                className="px-6 py-3 bg-gray-700 dark:bg-gray-700 hover:bg-gray-600 dark:hover:bg-gray-600 text-white dark:text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
              >
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes snowFall {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 0.15;
          }
          50% {
            transform: translateX(10px) translateY(50vh);
            opacity: 0.3;
          }
          100% {
            transform: translateX(0) translateY(110vh);
            opacity: 0.15;
          }
        }

        /* iPad specific landscape adjustments */
        @media only screen and (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
          .container {
            padding-top: 4rem !important;
            padding-bottom: 4rem !important;
          }
        }

        /* iPad Pro 12.9" specific adjustments */
        @media only screen and (min-width: 1024px) and (max-width: 1366px) {
          .container {
            max-width: 90% !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Home;