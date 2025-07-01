import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef(null);

  // Close mobile menu on window resize if desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  // Close menu on Escape key press for accessibility
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen]);

  // Add scroll effect to header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  // Navigation items data
  const navItems = [
    { id: 1, name: "Home", href: "#home" },
     { id: 1, name: "About", href: "#About" },
    { id: 2, name: "Skills", href: "#skills" },
    { id: 4, name: "Projects", href: "#projects" },
    { id: 6, name: "Contact", href: "#contact" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const mobileMenuVariants = {
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        scrolled
          ? "bg-gray-900/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg py-2"
          : "bg-gray-900 dark:bg-gray-900 shadow-sm py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo with animation */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <a
              href="#home"
              className="text-2xl font-bold bg-gradient-to-r from-[#A74482] to-[#6A3093] bg-clip-text text-transparent cursor-pointer select-none"
            >
              MyPortfolio
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="hidden md:flex space-x-1"
            aria-label="Primary Navigation"
          >
            {navItems.map((item) => (
              <motion.a
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -2, color: "#A74482" }}
                whileTap={{ scale: 0.95 }}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  const targetElement =
                    item.href === "#home"
                      ? document.body // scroll to top
                      : document.querySelector(item.href);
                  if (targetElement) {
                    targetElement.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }
                }}
                className="px-4 py-2 text-sm font-medium text-gray-200 dark:text-gray-200 rounded-md hover:text-[#A74482] transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#A74482] transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}
          </motion.nav>

          {/* Mobile Toggle Button */}
          <motion.button
            onClick={toggleMenu}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-md text-[#A74482] focus:outline-none focus:ring-2 focus:ring-[#A74482] focus:ring-opacity-50"
          >
            {isOpen ? (
              <X size={24} className="text-current" />
            ) : (
              <Menu size={24} className="text-current" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            id="mobile-menu"
            initial="closed"
            animate="open"
            exit="closed"
            variants={mobileMenuVariants}
            className="md:hidden bg-gray-900 dark:bg-gray-900 shadow-lg overflow-hidden"
            aria-label="Mobile Navigation"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 100 }}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsOpen(false);
                    setTimeout(() => {
                      const targetElement =
                        item.href === "#home"
                          ? document.body
                          : document.querySelector(item.href);
                      if (targetElement) {
                        targetElement.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }, 300);
                  }}
                  className="block px-3 py-3 rounded-md text-base font-medium text-gray-200 dark:text-gray-200 hover:text-[#A74482] hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

export default Header;
