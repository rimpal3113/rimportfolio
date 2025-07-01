"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";
import emailjs from "emailjs-com"; // <-- Add this import

const SERVICE_ID = "service_xowti7j"; // Replace with your EmailJS service ID
const TEMPLATE_ID = "template_usm5f9d"; // Replace with your EmailJS template ID
const PUBLIC_KEY = "JD1XzWoME1pcvUgGt"; // Replace with your EmailJS public key

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);

      // EmailJS send
      try {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          },
          PUBLIC_KEY
        );
        setIsSubmitting(false);
        setSubmitSuccess(true);
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => {
          setSubmitSuccess(false);
        }, 5000);
      } catch (error) {
        setIsSubmitting(false);
        setErrors({ submit: "Failed to send message. Please try again later." });
      }
    }
  };

  return (
    <div
      id="contact"
      className="pt-24 md:pt-28 min-h-screen py-16 md:py-24 px-6 md:px-16 bg-gray-900 dark:bg-gray-900 scroll-smooth"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="relative mb-16 text-center">
            <h2
              className={`absolute left-1/2 transform -translate-x-1/2 text-4xl w-full -top-6 md:text-6xl md:-top-10 font-bold z-0 bg-gradient-to-b text-transparent bg-clip-text opacity-10 
      dark:from-blue-300 dark:to-blue-900 
      from-blue-300 to-blue-900`}
            >
              Get In Touch
            </h2>
            <motion.h2
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="relative text-3xl md:text-5xl font-bold z-10 text-white inline-block"
            >
              <span className="border-b-4 border-[#A74482] pb-1">
                Get In Touch
              </span>
            </motion.h2>
          </div>
          <p className="text-gray-400 dark:text-gray-400 max-w-2xl mx-auto">
            Have a question or want to work together? Fill out the form below or
            reach out through my social media.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8"
          >
            {submitSuccess && (
              <div className="bg-green-900/30 dark:bg-green-900/30 text-green-300 dark:text-green-300 p-4 rounded-lg mb-6">
                Thank you for your message! I'll get back to you soon.
              </div>
            )}
            {errors.submit && (
              <div className="bg-red-900/30 dark:bg-red-900/30 text-red-300 dark:text-red-300 p-4 rounded-lg mb-6">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Name */}
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-gray-300 dark:text-gray-300 font-medium mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none bg-gray-700 border-gray-600 text-white ${
                    errors.name
                      ? "border-red-500 focus:ring-red-900 dark:focus:ring-red-900"
                      : "border-gray-300 focus:ring-blue-900 dark:focus:ring-blue-900"
                  }`}
                  placeholder="Your name"
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-red-500 text-sm">{errors.name}</p>
                )}
              </div>

              {/* Email */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-300 dark:text-gray-300 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none bg-gray-700 border-gray-600 text-white ${
                    errors.email
                      ? "border-red-500 focus:ring-red-900 dark:focus:ring-red-900"
                      : "border-gray-300 focus:ring-blue-900 dark:focus:ring-blue-900"
                  }`}
                  placeholder="your.email@example.com"
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              {/* Message */}
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-300 dark:text-gray-300 font-medium mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:outline-none bg-gray-700 border-gray-600 text-white ${
                    errors.message
                      ? "border-red-500 focus:ring-red-900 dark:focus:ring-red-900"
                      : "border-gray-300 focus:ring-blue-900 dark:focus:ring-blue-900"
                  }`}
                  placeholder="Your message..."
                  required
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-red-500 text-sm">{errors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-[#A74482] hover:bg-[#A74482]/90 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center disabled:opacity-70"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8 mb-8">
              <h3 className="text-xl font-bold text-white dark:text-white mb-6">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-blue-400 dark:text-blue-400 mt-1 mr-3" />
                  <div>
                    <p className="text-gray-300 dark:text-gray-300 font-medium">
                      Email
                    </p>
                    <a
                      href="mailto:thakorrimpal30@gmail.com"
                      className="text-gray-400 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400"
                    >
                      thakorrimpal30@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-blue-400 dark:text-blue-400 mt-1 mr-3" />
                  <div>
                    <p className="text-gray-300 dark:text-gray-300 font-medium">
                      Phone
                    </p>
                    <a
                      href="tel:+918488904795"
                      className="text-gray-400 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-400"
                    >
                      +91 8488904795
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-blue-400 dark:text-blue-400 mt-1 mr-3" />
                  <div>
                    <p className="text-gray-300 dark:text-gray-300 font-medium">
                      Location
                    </p>
                    <p className="text-gray-400 dark:text-gray-400">
                      B/H rajmandir studio anand
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 dark:bg-gray-800 rounded-lg shadow-md p-6 md:p-8">
              <h3 className="text-xl font-bold text-white dark:text-white mb-6">
                Connect With Me
              </h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.linkedin.com/in/rimpal-thakor-7848a2342/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center justify-center w-12 h-12 bg-gray-700 dark:bg-gray-700 rounded-full hover:bg-blue-900/30 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <Linkedin className="h-5 w-5 text-gray-300 dark:text-gray-300" />
                </a>
                <a
                  href="https://wa.me/918488904795"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex items-center justify-center w-12 h-12 bg-gray-700 dark:bg-gray-700 rounded-full hover:bg-green-900/30 dark:hover:bg-green-900/30 transition-colors"
                >
                  <FaWhatsapp className="h-5 w-5 text-gray-300 dark:text-gray-300" />
                </a>
                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="flex items-center justify-center w-12 h-12 bg-gray-700 dark:bg-gray-700 rounded-full hover:bg-blue-900/30 dark:hover:bg-blue-900/30 transition-colors"
                >
                  <Github className="h-5 w-5 text-gray-300 dark:text-gray-300" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;