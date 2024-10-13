import React from 'react'
import { Feature } from '../model/types'

export const FeatureCard: React.FC<Feature> = ({
  icon: Icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 transition-all">
      <Icon className="h-12 w-12 text-primary mb-4" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}
