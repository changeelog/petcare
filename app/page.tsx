import { Navigation } from '../components/navigation'
import { Footer } from '../components/footer'
import { WhyChooseUs } from '../components/why-choose-us'
import { LatestTips } from '../components/latest-tips'
import { PopularServices } from '../components/popular-service'
import { HeroSection } from '../components/hero'

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
