import { getUserOnboardingStatus } from "@/actions/user"
import { redirect } from "next/navigation"

const IndustryInsightsPage = async () => {
  const { IsOnboarded } = await getUserOnboardingStatus()
  if(!IsOnboarded) redirect("/onboarding")
  return (
    <div>
      IndustryInsightsPage
    </div>
  )
}

export default IndustryInsightsPage