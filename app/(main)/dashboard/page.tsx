import { getIndustryInsights } from "@/actions/dashboard"
import { getUserOnboardingStatus } from "@/actions/user"
import DashboardView from "@/components/DashboardView"
import pushTo from "@/lib/pushTo"

const IndustryInsightsPage = async () => {
  const { IsOnboarded } = await getUserOnboardingStatus()
  const insights = await getIndustryInsights()

  if(!IsOnboarded) pushTo("onboarding")
  return (
    <div className="mx-auto">
      <DashboardView insights={insights} />
    </div>
  )
}

export default IndustryInsightsPage