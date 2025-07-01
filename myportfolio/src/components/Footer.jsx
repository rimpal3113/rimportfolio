import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaFileDownload,
  FaWhatsapp,
  FaPhoneAlt,
  FaArrowUp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

const FloatingBackgroundElements = () => {
  const elements = useMemo(() => {
    return [...Array(10)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-white animate-float"
        style={{
          width: `${Math.random() * 100 + 50}px`,
          height: `${Math.random() * 100 + 50}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${i * 0.2}s`,
          animationDuration: `${Math.random() * 5 + 3}s`,
        }}
      />
    ));
  }, []);

  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
      {elements}
    </div>
  );
};

const FloatingButtons = ({ showScroll }) => {
  const [isHovered, setIsHovered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
      {/* Back to Top Button */}
      {showScroll && (
        <motion.button
          onClick={scrollToTop}
          className="bg-purple-600 text-white p-4 rounded-full shadow-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center relative"
          aria-label="Back to top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          whileHover={{
            y: -5,
            backgroundColor: "rgba(147, 51, 234, 0.9)",
          }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            animate={{
              y: isHovered ? [-2, 2, -2] : 0,
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          >
            <FaArrowUp className="text-lg md:text-xl" />
          </motion.div>
          {isHovered && (
            <motion.span
              className="absolute -left-28 bg-purple-700 text-white px-3 py-1 rounded-md text-sm whitespace-nowrap"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              Back to Top
            </motion.span>
          )}
        </motion.button>
      )}

      {/* Phone Button */}
      
    </div>
  );
};

function Footer() {
  const [showScroll, setShowScroll] = useState(false);
  const socialLinks = [
    { icon: <FaGithub className="text-xl" />, url: "https://github.com" },
    { icon: <FaLinkedin className="text-xl" />, url: "https://linkedin.com" },
    { icon: <FaEnvelope className="text-xl" />, url: "mailto:you@example.com" },
  ];

  // Map nav link names to section IDs
  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about-section" }, // Make sure this matches your About section's id
    { name: "Skills", id: "skills" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const checkScroll = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, [showScroll]);

  // Smooth scroll handler for nav links
  const handleNavClick = (id) => (e) => {
    e.preventDefault();
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <FloatingButtons showScroll={showScroll} />
      <footer className="bg-gradient-to-r from-[#8A2BE2] to-[#A74482] text-white py-12 relative overflow-hidden">
        <FloatingBackgroundElements />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Brand Column */}
            <div className="flex flex-col">
              <motion.h3
                className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 to-white"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                MyPortfolio
              </motion.h3>
              <p className="text-purple-100 mb-4">
                Creating digital experiences that inspire and engage.
              </p>
              <p className="text-sm text-purple-100 mt-auto">
                © {new Date().getFullYear()} All rights reserved.
              </p>
            </div>

            {/* Navigation Column */}
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold mb-4 border-b border-purple-300 pb-2 w-max">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {navLinks.map((item) => (
                  <motion.li
                    key={item.name}
                    whileHover={{ x: 5 }}
                    whileTap={{ x: 0 }}
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={handleNavClick(item.id)}
                      className="flex items-center text-purple-100 hover:text-white transition-colors duration-200"
                    >
                      <span className="w-2 h-2 bg-purple-300 rounded-full mr-2"></span>
                      {item.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Contact Column */}
            <div className="flex flex-col">
              <h4 className="text-lg font-semibold mb-4 border-b border-purple-300 pb-2 w-max">
                Let's Connect
              </h4>
              <p className="text-purple-100 mb-4">
                Interested in working together? Let's talk!
              </p>

              <div className="flex space-x-4 mb-6">
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-purple-800 p-3 rounded-full hover:bg-purple-700 transition-colors duration-200"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>

              <motion.a
                href="/RIMPAL_THAKOR-3.pdf"
                download
                className="inline-flex items-center w-48 px-4 py-2 bg-white text-purple-800 rounded-lg font-medium hover:bg-purple-100 transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaFileDownload className="mr-2" />
                Download Resume
              </motion.a>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="border-t border-purple-300 mt-8 pt-6 text-center text-purple-100 text-sm">
            <p>Built with React, Tailwind CSS, and Framer Motion</p>
            <p className="mt-1">Designed with ❤️ by Rimpal</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;