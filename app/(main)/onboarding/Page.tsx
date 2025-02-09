import { industries } from '@/data/industries'
import React from 'react'
import OnboardingForm from './_components/onboardingForm'
// import { getUserOnboardingStatus } from '@/actions/user'
// import { redirect } from 'next/navigation'

const onboardingPage = () => {
  return (
    <main>
      <OnboardingForm industries={industries}/>
    </main>
  )
}

export default onboardingPage