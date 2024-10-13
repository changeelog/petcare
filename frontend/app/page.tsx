import { Navigation } from '../widgets/Navigation'
import { Footer } from '../widgets/Footer'
import { WhyChooseUs } from '../widgets/WhyChooseUs'
import { LatestTips } from '../widgets/LatestTips'
import { PopularServices } from '@/components/popular-service'
import { HeroSection } from '../widgets/HeroSection'

export default function HomePageComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <PopularServices />
        <LatestTips />
        <WhyChooseUs />
      </main>
      <Footer />
    </div>
  )
}
