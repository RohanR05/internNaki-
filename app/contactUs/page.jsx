"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const ContactUs = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-accent px-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center bg-neutral p-12 rounded-3xl shadow-2xl border-4 border-primary max-w-lg"
      >
        <h1 className="text-5xl font-bold text-primary mb-4">🚧 Coming Soon</h1>
        <p className="text-secondary text-lg mb-6">
          Our Contact Us page is under construction. We’ll be live soon!
        </p>
        <div className="flex justify-center mt-4">
          <motion.button
          
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-primary text-neutral font-semibold rounded-xl shadow-md hover:bg-secondary transition-colors duration-300"
          >
           <Link href={'/'}> Back to Home</Link>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
