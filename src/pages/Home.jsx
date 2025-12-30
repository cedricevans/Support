
import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSection from '@/components/home/HeroSection';
import UploadDemo from '@/components/home/UploadDemo';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import AiDemoPreview from '@/components/home/AiDemoPreview';
import PricingTiers from '@/components/home/PricingTiers';
import Testimonials from '@/components/home/Testimonials';
import Guarantees from '@/components/home/Guarantees';
import FAQ from '@/components/home/FAQ';
import TrustBadges from '@/components/home/TrustBadges';

const Home = () => {
  return (
    <>
      <Helmet>
        <title>FamilyBridge - Child Support Strategy & Lawyer Match</title>
        <meta name="description" content="Scan child support papers, get an AI-generated strategy for court, and connect with a family-law attorney when you need representation." />
      </Helmet>

      <main>
        <HeroSection />
        <TrustBadges />
        <UploadDemo />
        <HowItWorksSection />
        <AiDemoPreview />
        <PricingTiers />
        <Guarantees />
        <Testimonials />
        <FAQ />
      </main>
    </>
  );
};

export default Home;
