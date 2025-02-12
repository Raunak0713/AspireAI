import { getUserOnboardingStatus } from "@/actions/user"
import pushTo from "@/lib/pushTo"

const IndustryInsightsPage = async () => {
  const { IsOnboarded } = await getUserOnboardingStatus()
  if(!IsOnboarded) pushTo("onboarding")
  return (
    <div>
      IndustryInsightsPage
    </div>
  )
}

export default IndustryInsightsPage