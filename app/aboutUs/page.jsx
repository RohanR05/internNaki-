"use client";

import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <section className="max-w-screen-xl mx-auto my-16 px-6 py-12 bg-accent">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-primary mb-4">🌟 About Us</h2>
        <p className="text-pretty max-w-2xl mx-auto">
          We are a dedicated team connecting job seekers with the right
          opportunities and helping businesses find the perfect candidates.
          Our platform ensures smooth communication, efficient application
          management, and a better hiring experience for everyone.
        </p>
      </motion.div>

      {/* Image + Text */}
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="rounded-2xl border-2 border-secondary shadow-lg bg-accent p-2">
            <img
              src="/team.jpg" // replace with your image path
              alt="Our Team"
              className="rounded-xl w-full"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <div className="p-4 rounded-xl bg-neutral  border-2 border-primary shadow-md">
            <h3 className="text-2xl font-semibold text-primary mb-2">
              Our Mission
            </h3>
            <p className="">
              To empower both job seekers and employers by providing a seamless
              platform that bridges the gap between talent and opportunity.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-neutral border-2 border-primary shadow-md">
            <h3 className="text-2xl font-semibold text-primary mb-2">
              Our Vision
            </h3>
            <p className="text-secondary">
              To become the most trusted and efficient job platform, making
              recruitment easier, faster, and more effective for everyone.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUs;
