import { WhyChooseUs } from '../../widgets/WhyChooseUs'
import { LatestTips } from '../../widgets/LatestTips'
import { PopularServices } from '../../widgets/PopularService'
import { HeroSection } from '../../widgets/HeroSection'

export default function HomePageComponent() {
  return (
    <>
      <HeroSection />
      <PopularServices />
      <LatestTips />
      <WhyChooseUs />
    </>
  )
}
