"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rohan Kabir",
    role: "Job Seeker",
    quote: "This platform helped me land my dream job in just 2 weeks!",
    avatar: "/avatars/avatar1.jpg",
  },
  {
    name: "Ayesha Rahman",
    role: "HR Manager",
    quote: "Posting jobs and finding candidates has never been easier.",
    avatar: "/avatars/avatar2.jpg",
  },
  {
    name: "Tanvir Islam",
    role: "Job Seeker",
    quote: "The application process is so smooth and intuitive.",
    avatar: "/avatars/avatar3.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="max-w-screen-xl mx-auto px-6 py-16 my-12 rounded-3xl bg-gradient-to-r from-primary/10 via-accent/20 to-secondary/10">
      <h2 className="text-4xl font-extrabold text-center mb-16 text-primary">
        💬 What Our Users Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((t, idx) => (
          <motion.div
            key={idx}
            className="bg-neutral p-8 rounded-3xl shadow-lg flex flex-col items-center text-center border border-primary/30 hover:scale-105 transition-transform duration-500"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2, duration: 0.6 }}
          >
            <img
              src={t.avatar}
              alt={t.name}
              className="w-20 h-20 rounded-full mb-4 border-2 border-primary object-cover"
            />
            <p className="italic mb-4 relative text-lg before:content-['“'] before:text-4xl before:text-secondary/50 before:absolute before:-top-2 before:-left-2">
              {t.quote}
            </p>
            <h3 className="font-bold text-lg text-primary">{t.name}</h3>
            <span className="text-sm text-secondary">{t.role}</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
