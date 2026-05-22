import { HeroSection } from '@/components/home/HeroSection';
import { HomeStats } from '@/components/home/HomeStats';
import { TopDestinations } from '@/components/home/TopDestinations';
import { PopularPackages } from '@/components/home/PopularPackages';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { TravelGallery } from '@/components/home/TravelGallery';
import { Testimonials } from '@/components/home/Testimonials';
import { TravelTips } from '@/components/home/TravelTips';
import { CtaBanner } from '@/components/home/CtaBanner';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HomeStats />
      <TopDestinations />
      <PopularPackages />
      <WhyChooseUs />
      <TravelGallery />
      <Testimonials />
      <TravelTips />
      <CtaBanner />
    </div>
  );
}
