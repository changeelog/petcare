'use client'

import React from 'react'
import { Feature } from '../../model/types'
import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export const FeatureCard: React.FC<Feature> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <motion.div
      className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col items-start"
      variants={cardVariants}
    >
      <Icon
        className="h-10 w-10 text-primary mb-4"
        aria-hidden="true"
      />
      <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </motion.div>
  )
}
