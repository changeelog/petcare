'use client'

import React from 'react'
import { FeatureCard } from '../FeatureCard'
import { features } from '../../config/features'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function WhyChooseUs() {
  return (
    <section
      className="w-full py-16 md:py-24 bg-gray-50 dark:bg-gray-900"
      aria-labelledby="why-choose-us-title"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <h2
          id="why-choose-us-title"
          className="text-2xl font-semibold tracking-tight mb-12 text-center text-gray-900 dark:text-white"
        >
          Почему выбирают нас
        </h2>
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              {...feature}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
