"use client";

import { motion } from "framer-motion";
import FAQ from "./Components/FAQ/FAQ";
import FeaturedJobs from "./Components/FeaturedJobs/FeaturedJobs";
import Banner from "./Components/HomeSection/Banner";
import JobStatistic from "./Components/JobStatistic/JobStatistic";
import Testimonials from "./Components/Testimonials/Testimonials";
import TotalUser from "./Components/TotoalUser/TotoalUser";

export default function Home() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="max-w-screen-xl mx-auto my-6 md:my-12 lg:my-16 space-y-12">
      {/* Banner with fade-in */}
    

      {/* Total User */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <TotalUser />
      </motion.div>

      {/* Job Statistics */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <JobStatistic />
      </motion.div>

      {/* Featured Jobs */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <FeaturedJobs />
      </motion.div>

      {/* Testimonials */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <Testimonials />
      </motion.div>

      {/* FAQ */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariants}
      >
        <FAQ />
      </motion.div>
    </div>
  );
}
