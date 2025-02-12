import { getUserOnboardingStatus } from '@/actions/user'
import OnboardingForm from '@/components/onboarding-form'
import { industries } from '@/data/industries'
import { redirect } from 'next/navigation'
import React from 'react'

const OnboardingPage = async () => {
  const IsOnboarded = getUserOnboardingStatus()
  if(!IsOnboarded){
    return redirect("/dashboard")
  }
  return (
    <div>
      <OnboardingForm industries={industries}/>
    </div>
  )
}

export default OnboardingPage