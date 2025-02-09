import OnboardingForm from './_components/onboarding-form';
import { industries } from '@/data/industries';

export const dynamic = 'force-dynamic';

export default function OnboardingPage() {
  
  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
}
