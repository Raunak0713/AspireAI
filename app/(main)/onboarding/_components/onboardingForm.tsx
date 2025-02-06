import { Industry } from '@/types/industry'
import React from 'react'

interface OnboardingFormProps {
  industries: Industry[]
}

const OnboardingForm = ({ industries }: OnboardingFormProps) => {
  return (
    <div>
      <h2>Available Industries</h2>
      <ul>
        {industries.map((industry) => (
          <li key={industry.id}>
            {industry.name} (Sub-industries: {industry.subIndustries.join(', ') || 'None'})
          </li>
        ))}
      </ul>
    </div>
  )
}

export default OnboardingForm
