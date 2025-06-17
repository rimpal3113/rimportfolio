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
                  ? "w-64 h-80 md:w-72 md:h-96" // iPad specific sizes
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

// "use client";
// import { useEffect, useState, useRef, useCallback } from "react";
// import {
//   ArrowDown,
//   GitlabIcon as GitHub,
//   Linkedin,
//   Mail,
//   Download,
//   ChevronDown,
//   Sparkles,
//   Code,
//   Palette,
// } from "lucide-react";
// import {
//   motion,
//   AnimatePresence,
//   useScroll,
//   useTransform,
//   useMotionValue,
//   useSpring,
// } from "framer-motion";
// import Header from "../Header"; // Adjust the path as needed
// import { Typewriter } from "react-simple-typewriter";

// // Image list for the profile carousel
// const imageList = ["/my.jpeg", "/my3.jpeg", "/my2.jpeg"];

// // Social media links - update with your actual links
// const socialLinks = [
//   { icon: GitHub, href: "https://github.com/yourusername", label: "GitHub" },
//   {
//     icon: Linkedin,
//     href: "https://linkedin.com/in/yourusername",
//     label: "LinkedIn",
//   },
//   { icon: Mail, href: "mailto:your.email@example.com", label: "Email" },
// ];

// // Skills data for the animated skill pills
// const skills = [
//   { name: "React", color: "bg-blue-500", icon: "⚛️" },
//   { name: "JavaScript", color: "bg-yellow-500", icon: "🟨" },
//   { name: "HTML/CSS", color: "bg-orange-500", icon: "🎨" },
//   { name: "Tailwind", color: "bg-cyan-500", icon: "💨" },
//   { name: "Node.js", color: "bg-green-500", icon: "🟢" },
//   { name: "Responsive Design", color: "bg-purple-500", icon: "📱" },
//   { name: "UI/UX", color: "bg-pink-500", icon: "✨" },
//   { name: "Git", color: "bg-red-500", icon: "🔧" },
// ];

// // Generate floating particles
// const generateParticles = (count = 20) => {
//   const particles = [];
//   for (let i = 0; i < count; i++) {
//     particles.push({
//       id: i,
//       size: Math.random() * 4 + 2,
//       left: Math.random() * 100,
//       top: Math.random() * 100,
//       delay: Math.random() * 10,
//       duration: 15 + Math.random() * 10,
//     });
//   }
//   return particles;
// };

// const particles = generateParticles();

// // Generate random snowballs data
// const generateSnowballs = (count = 30) => {
//   const snowballs = [];
//   for (let i = 0; i < count; i++) {
//     snowballs.push({
//       id: i,
//       size: Math.random() * 6 + 3,
//       left: Math.random() * 100,
//       delay: Math.random() * 20,
//       duration: 12 + Math.random() * 8,
//       opacity: 0.1 + Math.random() * 0.2,
//     });
//   }
//   return snowballs;
// };

// const snowballs = generateSnowballs();

// const Home = () => {
//   const [currentImage, setCurrentImage] = useState(0);
//   const [isVisible, setIsVisible] = useState(false);
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
//   const homeRef = useRef(null);
//   const cursorRef = useRef(null);
//   const magneticRef = useRef(null);

//   // Cursor tracking
//   const cursorX = useMotionValue(-100);
//   const cursorY = useMotionValue(-100);
//   const springConfig = { damping: 25, stiffness: 700 };
//   const cursorXSpring = useSpring(cursorX, springConfig);
//   const cursorYSpring = useSpring(cursorY, springConfig);

//   // Scroll animation setup
//   const { scrollYProgress } = useScroll({
//     target: homeRef,
//     offset: ["start start", "end start"],
//   });

//   const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
//   const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
//   const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

//   // Mouse movement handler
//   const handleMouseMove = useCallback(
//     (e) => {
//       const { clientX, clientY } = e;
//       setMousePosition({ x: clientX, y: clientY });
//       cursorX.set(clientX - 16);
//       cursorY.set(clientY - 16);
//     },
//     [cursorX, cursorY]
//   );

//   // Auto-rotate images
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentImage((prevIndex) => (prevIndex + 1) % imageList.length);
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   // Setup mouse tracking and reveal animation
//   useEffect(() => {
//     setIsVisible(true);

//     // Add mouse move listener
//     window.addEventListener("mousemove", handleMouseMove);

//     // Add intersection observer for additional animations
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             entry.target.classList.add("animate-fade-in");
//           }
//         });
//       },
//       { threshold: 0.1 }
//     );

//     document.querySelectorAll(".animate-on-scroll").forEach((el) => {
//       observer.observe(el);
//     });

//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//       observer.disconnect();
//     };
//   }, [handleMouseMove]);

//   const scrollToSkills = () => {
//     const skillsSection = document.getElementById("skills");
//     if (skillsSection) {
//       skillsSection.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   const scrollToNextSection = () => {
//     const nextSection = document.querySelector("#home + section");
//     if (nextSection) {
//       nextSection.scrollIntoView({ behavior: "smooth" });
//     }
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut",
//         staggerChildren: 0.15,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   };

//   const imageVariants = {
//     initial: { opacity: 0, scale: 0.9, rotateY: 15 },
//     animate: {
//       opacity: 1,
//       scale: 1,
//       rotateY: 0,
//       transition: { duration: 1, ease: "easeOut" },
//     },
//     exit: {
//       opacity: 0,
//       scale: 1.1,
//       rotateY: -15,
//       transition: { duration: 0.6 },
//     },
//   };

//   const socialVariants = {
//     hidden: { opacity: 0, x: -50 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 1,
//       },
//     },
//   };

//   const socialItemVariants = {
//     hidden: { opacity: 0, x: -30, scale: 0.8 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       scale: 1,
//       transition: { duration: 0.5, ease: "backOut" },
//     },
//   };

//   const skillPillVariants = {
//     hidden: { opacity: 0, scale: 0.8, y: 20 },
//     visible: (i) => ({
//       opacity: 1,
//       scale: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.1 + 0.5,
//         duration: 0.5,
//         ease: "backOut",
//       },
//     }),
//   };

//   const floatingAnimation = {
//     y: [-10, 10, -10],
//     transition: {
//       duration: 4,
//       repeat: Number.POSITIVE_INFINITY,
//       ease: "easeInOut",
//     },
//   };

//   return (
//     <section
//       id="home"
//       ref={homeRef}
//       className="relative min-h-screen flex flex-col justify-center
//       bg-gradient-to-br from-gray-900 via-gray-850 to-purple-900/20

//       overflow-hidden"
//       onMouseMove={handleMouseMove}
//     >
//       {/* Custom Cursor */}
//       <motion.div
//         ref={cursorRef}
//         className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-50 mix-blend-difference"
//         style={{
//           x: cursorXSpring,
//           y: cursorYSpring,
//         }}
//       >
//         <div className="w-full h-full bg-white rounded-full opacity-80"></div>
//       </motion.div>

//       {/* Cursor Trail Effect */}
//       <motion.div
//         className="fixed top-0 left-0 w-4 h-4 pointer-events-none z-40 bg-[#A74482]/30 rounded-full blur-sm"
//         animate={{
//           x: mousePosition.x - 8,
//           y: mousePosition.y - 8,
//         }}
//         transition={{ type: "spring", damping: 30, stiffness: 200 }}
//       />

//       {/* Fixed Header */}
//       <Header />

//       {/* Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden">
//         {/* Gradient Orbs */}
//         <motion.div
//           className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#A74482]/20 to-purple-500/20 rounded-full blur-3xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.5, 0.3],
//           }}
//           transition={{
//             duration: 8,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "easeInOut",
//           }}
//         />
//         <motion.div
//           className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl"
//           animate={{
//             scale: [1.2, 1, 1.2],
//             opacity: [0.2, 0.4, 0.2],
//           }}
//           transition={{
//             duration: 10,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "easeInOut",
//           }}
//         />
//       </div>

//       {/* Floating Particles */}
//       <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
//         {particles.map(({ id, size, left, top, delay, duration }) => (
//           <motion.div
//             key={id}
//             className="absolute rounded-full bg-gradient-to-r from-[#A74482]/30 to-purple-500/30 blur-sm"
//             style={{
//               width: size,
//               height: size,
//               left: `${left}%`,
//               top: `${top}%`,
//             }}
//             animate={{
//               y: [-20, 20, -20],
//               x: [-10, 10, -10],
//               opacity: [0.3, 0.7, 0.3],
//             }}
//             transition={{
//               duration,
//               delay,
//               repeat: Number.POSITIVE_INFINITY,
//               ease: "easeInOut",
//             }}
//           />
//         ))}
//       </div>

//       {/* Animated Curve Lines */}
//       <svg
//         className="absolute left-0 top-0 h-full w-full pointer-events-none opacity-40"
//         viewBox="0 0 1440 320"
//         preserveAspectRatio="none"
//       >
//         <defs>
//           <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
//             <stop offset="0%" stopColor="#A74482" stopOpacity="0.1" />
//             <stop offset="50%" stopColor="#6B46C1" stopOpacity="0.2" />
//             <stop offset="100%" stopColor="#A74482" stopOpacity="0.1" />
//           </linearGradient>
//         </defs>
//         <path
//           fill="url(#gradient1)"
//           d="M0,192 C360,288 1080,96 1440,192 L1440,320 L0,320 Z"
//         >
//           <animate
//             attributeName="d"
//             dur="15s"
//             repeatCount="indefinite"
//             values="
//               M0,192 C360,288 1080,96 1440,192 L1440,320 L0,320 Z;
//               M0,160 C400,240 1040,120 1440,160 L1440,320 L0,320 Z;
//               M0,224 C320,320 1120,64 1440,224 L1440,320 L0,320 Z;
//               M0,192 C360,288 1080,96 1440,192 L1440,320 L0,320 Z
//             "
//           />
//         </path>
//       </svg>

//       {/* Snowballs Background */}
//       <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
//         {snowballs.map(({ id, size, left, delay, duration, opacity }) => (
//           <motion.span
//             key={id}
//             className="absolute rounded-full bg-gradient-to-br from-gray-300 to-gray-400 "
//             style={{
//               width: size,
//               height: size,
//               left: `${left}%`,
//               top: `-${size}px`,
//               opacity,
//               animation: `snowFall ${duration}s linear infinite`,
//               animationDelay: `${delay}s`,
//               filter: "drop-shadow(0 0 4px rgba(255,255,255,0.6))",
//             }}
//           />
//         ))}
//       </div>

//       {/* Social Media Sidebar */}
//       <motion.div
//         className="fixed left-6 bottom-0 z-20 hidden md:flex flex-col items-center gap-4"
//         variants={socialVariants}
//         initial="hidden"
//         animate="visible"
//       >
//         {socialLinks.map((link, index) => (
//           <motion.a
//             key={index}
//             href={link.href}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="group relative p-3 rounded-full bg-gray-800/90  text-gray-300
//                       hover:text-white hover:bg-[#A74482]
//                       shadow-lg backdrop-blur-sm transition-all duration-300 transform hover:-translate-y-2 hover:scale-110
//                       border border-gray-700/50 "
//             aria-label={link.label}
//             variants={socialItemVariants}
//             whileHover={{
//               scale: 1.1,
//               boxShadow: "0 10px 30px rgba(167, 68, 130, 0.3)",
//             }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <link.icon className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12" />

//             {/* Tooltip */}
//             <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
//               {link.label}
//             </div>
//           </motion.a>
//         ))}
//         <motion.div
//           className="h-24 w-px bg-gradient-to-b from-[#A74482]/60 to-transparent mt-4"
//           variants={socialItemVariants}
//         />
//       </motion.div>

//       {/* Main Content */}
//       <motion.div
//         className="container mx-auto px-4 pt-20 md:pt-24 pb-12 md:pb-24 relative z-10"
//         style={{ opacity, y, scale }}
//         initial="hidden"
//         animate={isVisible ? "visible" : "hidden"}
//         variants={containerVariants}
//       >
//         <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
//           {/* Bio Section */}
//           <motion.div
//             className="w-full md:w-1/2 text-center md:text-left md:order-1"
//             variants={containerVariants}
//           >
//             <motion.div variants={itemVariants} className="mb-4 inline-block">
//               <motion.span
//                 className="px-4 py-2 rounded-full bg-gradient-to-r from-[#A74482]/20 to-purple-500/20
//                           text-[#E1A5C4]
//                            text-sm font-medium border border-[#A74482]/20
//                           backdrop-blur-sm flex items-center gap-2"
//                 whileHover={{ scale: 1.05 }}
//                 animate={floatingAnimation}
//               >
//                 <Sparkles className="h-4 w-4" />
//                 Welcome to my portfolio
//               </motion.span>
//             </motion.div>

//             <motion.h1
//               className="text-4xl md:text-5xl lg:text-6xl font-bold text-white  mb-6 leading-tight"
//               variants={itemVariants}
//             >
//               Hi, I'm{" "}
//               <motion.span
//                 className="text-transparent bg-clip-text bg-gradient-to-r from-[#E1A5C4] to-purple-400
//                            relative inline-block"
//                 whileHover={{ scale: 1.05 }}
//               >
//                 Rimpal
//                 <motion.span
//                   className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#A74482] to-purple-600 rounded-full"
//                   initial={{ scaleX: 0 }}
//                   animate={{ scaleX: 1 }}
//                   transition={{ delay: 1, duration: 0.8 }}
//                 />
//               </motion.span>
//             </motion.h1>

//             <motion.div
//               className="text-xl md:text-2xl font-medium text-gray-300 dark:text-gray-300 mb-8 h-8 flex items-center justify-center md:justify-start"
//               variants={itemVariants}
//             >
//               <Code className="h-6 w-6 mr-2 text-[#A74482]" />
//               <Typewriter
//                 words={[
//                   "Web Developer",
//                   "JavaScript Enthusiast",
//                   "UI/UX Designer",
//                   "Performance Optimizer",
//                   "Problem Solver",
//                 ]}
//                 loop={true}
//                 cursor
//                 cursorStyle="__"
//                 typeSpeed={100}
//                 deleteSpeed={80}
//                 delaySpeed={1500}
//               />
//             </motion.div>

//             <motion.p
//               className="text-gray-400 dark:text-gray-400 text-lg mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed"
//               variants={itemVariants}
//             >
//               I create{" "}
//               <span className="text-[#A74482] font-semibold">beautiful</span>,
//               <span className="text-[#A74482] font-semibold"> responsive</span>{" "}
//               websites with modern technologies. Passionate about clean code and
//               user-friendly interfaces that deliver
//               <span className="text-[#A74482] font-semibold">
//                 {" "}
//                 exceptional experiences
//               </span>
//               .
//             </motion.p>

//             {/* Skill Pills */}
//             <motion.div
//               className="flex flex-wrap gap-3 mb-10 justify-center md:justify-start"
//               variants={containerVariants}
//             >
//               {skills.slice(0, 6).map((skill, index) => (
//                 <motion.span
//                   key={index}
//                   custom={index}
//                   variants={skillPillVariants}
//                   className={`${skill.color} text-white text-sm font-medium px-4 py-2 rounded-full
//                             shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer
//                             flex items-center gap-2 backdrop-blur-sm border border-white/20`}
//                   whileHover={{
//                     scale: 1.05,
//                     y: -2,
//                     boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//                   }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <span>{skill.icon}</span>
//                   {skill.name}
//                 </motion.span>
//               ))}
//               <motion.span
//                 custom={6}
//                 variants={skillPillVariants}
//                 className="bg-gradient-to-r from-gray-500 to-gray-600 text-white text-sm font-medium px-4 py-2 rounded-full
//                           shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer
//                           flex items-center gap-2 backdrop-blur-sm border border-white/20"
//                 onClick={scrollToSkills}
//                 whileHover={{
//                   scale: 1.05,
//                   y: -2,
//                   boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
//                 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <Palette className="h-4 w-4" />+{skills.length - 6} more
//               </motion.span>
//             </motion.div>

//             <motion.div
//               className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
//               variants={itemVariants}
//             >
//               <motion.button
//                 onClick={scrollToSkills}
//                 className="group px-8 py-4 bg-gradient-to-r from-[#A74482] to-purple-600 hover:from-[#A74482]/90 hover:to-purple-600/90
//                           text-white font-semibold rounded-xl shadow-lg shadow-[#A74482]/25
//                           hover:shadow-xl hover:shadow-[#A74482]/40 transition-all duration-300
//                           flex items-center justify-center relative overflow-hidden"
//                 whileHover={{
//                   scale: 1.02,
//                   y: -2,
//                 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <span className="relative z-10 flex items-center">
//                   View My Skills
//                   <ArrowDown className="ml-2 h-5 w-5 group-hover:translate-y-1 transition-transform duration-300" />
//                 </span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </motion.button>

//               <motion.a
//                 href="#contact"
//                 className="group px-8 py-4 bg-gray-800/80 dark:bg-gray-800/80 hover:bg-gray-700 dark:hover:bg-gray-700
//                           text-white dark:text-white font-semibold rounded-xl border-2 border-gray-600 dark:border-gray-600
//                           hover:border-[#E1A5C4] dark:hover:border-[#E1A5C4] shadow-lg hover:shadow-xl
//                           transition-all duration-300 flex items-center justify-center backdrop-blur-sm
//                           relative overflow-hidden"
//                 whileHover={{
//                   scale: 1.02,
//                   y: -2,
//                 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <span className="relative z-10">Contact Me</span>
//                 <div className="absolute inset-0 bg-gradient-to-r from-[#A74482]/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//               </motion.a>

//               <motion.a
//                 href="/resume.pdf"
//                 className="group px-6 py-4 bg-transparent text-gray-300 dark:text-gray-300 hover:text-[#E1A5C4] dark:hover:text-[#E1A5C4]
//                           font-semibold rounded-xl border-2 border-gray-600 dark:border-gray-600 hover:border-[#E1A5C4] dark:hover:border-[#E1A5C4]
//                           transition-all duration-300 flex items-center justify-center sm:hidden md:flex
//                           hover:bg-[#A74482]/10 dark:hover:bg-[#A74482]/10"
//                 download
//                 whileHover={{
//                   scale: 1.02,
//                   y: -2,
//                 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <Download className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
//                 Resume
//               </motion.a>
//             </motion.div>
//           </motion.div>

//           {/* Profile Image */}
//           <motion.div
//             className="w-full flex justify-center md:order-2 md:w-1/2"
//             variants={itemVariants}
//           >
//             <motion.div
//               className="relative w-52 h-60 sm:w-60 sm:h-64 md:w-[26rem] md:h-[34rem] flex items-center justify-center"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8 }}
//               whileHover={{ scale: 1.02 }}
//             >
//               {/* Decorative elements */}
//               <motion.div
//                 className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-orange-500/30 rounded-full blur-xl"
//                 animate={{
//                   scale: [1, 1.2, 1],
//                   opacity: [0.3, 0.6, 0.3],
//                 }}
//                 transition={{
//                   duration: 4,
//                   repeat: Number.POSITIVE_INFINITY,
//                   ease: "easeInOut",
//                 }}
//               />
//               <motion.div
//                 className="absolute -bottom-10 -left-10 w-20 h-20 bg-gradient-to-br from-[#A74482]/30 to-purple-500/30 rounded-full blur-xl"
//                 animate={{
//                   scale: [1.2, 1, 1.2],
//                   opacity: [0.2, 0.5, 0.2],
//                 }}
//                 transition={{
//                   duration: 5,
//                   repeat: Number.POSITIVE_INFINITY,
//                   ease: "easeInOut",
//                 }}
//               />

//               {/* Rotating dashed border */}
//               <motion.div
//                 className="absolute inset-0 rounded-2xl border-2 sm:border-4 border-dashed border-purple-500/60 z-0"
//                 animate={{ rotate: [0, 360] }}
//                 transition={{
//                   duration: 25,
//                   repeat: Number.POSITIVE_INFINITY,
//                   ease: "linear",
//                 }}
//               />

//               {/* Pulsing glow effect */}
//               <motion.div
//                 className="absolute inset-[3px] sm:inset-1 rounded-2xl border-2 border-transparent z-0"
//                 animate={{
//                   boxShadow: [
//                     "0 0 0px rgba(167,68,130,0.1)",
//                     "0 0 20px rgba(167,68,130,0.4)",
//                     "0 0 40px rgba(167,68,130,0.6)",
//                     "0 0 20px rgba(167,68,130,0.4)",
//                     "0 0 0px rgba(167,68,130,0.1)",
//                   ],
//                 }}
//                 transition={{
//                   duration: 4,
//                   repeat: Number.POSITIVE_INFINITY,
//                   repeatType: "mirror",
//                 }}
//               />

//               {/* Actual image container */}
//               <motion.div
//                 className="absolute inset-[10px] sm:inset-4 bg-gray-900 dark:bg-gray-900 border-4
//                            border-gray-800 dark:border-gray-800 shadow-2xl overflow-hidden rounded-2xl z-10
//                            backdrop-blur-sm"
//                 whileHover={{
//                   boxShadow: "0 25px 50px rgba(167, 68, 130, 0.3)",
//                 }}
//               >
//                 <AnimatePresence mode="wait">
//                   <motion.img
//                     key={imageList[currentImage]}
//                     src={imageList[currentImage]}
//                     alt="Rimpal's profile"
//                     className="w-full h-full object-cover object-top absolute top-0 left-0"
//                     variants={imageVariants}
//                     initial="initial"
//                     animate="animate"
//                     exit="exit"
//                   />
//                 </AnimatePresence>

//                 {/* Image indicators */}
//                 <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
//                   {imageList.map((_, index) => (
//                     <motion.button
//                       key={index}
//                       onClick={() => setCurrentImage(index)}
//                       className={`w-3 h-3 rounded-full transition-all duration-300 backdrop-blur-sm ${
//                         currentImage === index
//                           ? "bg-white scale-125 shadow-lg"
//                           : "bg-white/60 hover:bg-white/80 hover:scale-110"
//                       }`}
//                       aria-label={`View image ${index + 1}`}
//                       whileHover={{ scale: 1.2 }}
//                       whileTap={{ scale: 0.9 }}
//                     />
//                   ))}
//                 </div>

//                 {/* Overlay gradient */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Scroll down indicator */}
//         <motion.div
//           className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center cursor-pointer group"
//           onClick={scrollToNextSection}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{
//             delay: 2,
//             duration: 0.6,
//           }}
//           whileHover={{ scale: 1.1 }}
//         >
//           <motion.span
//             className="text-sm text-gray-400 dark:text-gray-400 mb-2 group-hover:text-[#A74482] transition-colors duration-300"
//             animate={{ opacity: [0.5, 1, 0.5] }}
//             transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//           >
//             Scroll Down
//           </motion.span>
//           <motion.div
//             animate={{
//               y: [0, 8, 0],
//             }}
//             transition={{
//               duration: 1.5,
//               repeat: Number.POSITIVE_INFINITY,
//               ease: "easeInOut",
//             }}
//           >
//             <ChevronDown className="h-6 w-6 text-[#E1A5C4] dark:text-[#E1A5C4] group-hover:scale-110 transition-transform duration-300" />
//           </motion.div>
//         </motion.div>
//       </motion.div>

//       {/* Snowfall Animation Keyframes */}
//       <style jsx>{`
//         @keyframes snowFall {
//           0% {
//             transform: translateX(0) translateY(0) rotate(0deg);
//             opacity: 0.1;
//           }
//           50% {
//             transform: translateX(15px) translateY(50vh) rotate(180deg);
//             opacity: 0.3;
//           }
//           100% {
//             transform: translateX(0) translateY(110vh) rotate(360deg);
//             opacity: 0.1;
//           }
//         }

//         .animate-fade-in {
//           animation: fadeIn 1s ease-out forwards;
//         }

//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         /* Hide default cursor on the home section */
//         #home {
//           cursor: none;
//         }

//         /* Show default cursor on interactive elements */
//         #home button,
//         #home a,
//         #home [role="button"] {
//           cursor: pointer;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default Home;
