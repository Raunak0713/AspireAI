import { industries } from "@/data/industries";
import OnboardingForm from "@/components/onboarding-form";

export default function OnboardingPage() {
  return (
    <div>
      <OnboardingForm industries={industries}/>
    </div>
  );
}
