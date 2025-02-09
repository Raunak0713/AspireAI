import { industries } from '@/data/industries'
import React from 'react'
import OnboardingForm from './_components/onboardingForm'
// import { getUserOnboardingStatus } from '@/actions/user'
// import { redirect } from 'next/navigation'

const OnboardingPage = () => {
  return (
    <main>
      <OnboardingForm industries={industries}/>
    </main>
  )
}

export default OnboardingPage