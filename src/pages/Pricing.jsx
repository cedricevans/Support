
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import PricingTiers from '@/components/home/PricingTiers';

const Pricing = () => {
  const location = useLocation();
  const { caseData } = location.state || {};

  return (
    <>
      <Helmet>
        <title>Select Support Plan - FamilyBridge</title>
        <meta name="description" content="Choose your support strategy. Affordable AI-powered plans or attorney review." />
      </Helmet>

      <main className="min-h-screen pt-24 pb-16 relative bg-[var(--cream)]">
         <div className="absolute top-0 left-0 w-full h-[500px] z-0 overflow-hidden opacity-25 pointer-events-none">
            <img 
                className="w-full h-full object-cover" 
                alt="Soft paper texture background"
             src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f" />
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(248,242,236,0.6)] to-[var(--cream)]"></div>
         </div>
         
        <div className="relative z-10">
            {caseData && (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
                 <div className="bg-white/80 border border-[var(--linen)] p-4 rounded-xl text-center">
                    <p className="text-[var(--moss)] text-sm">
                       <span className="font-bold text-[var(--moss)]">Case Loaded:</span> Strategy for {caseData.caseNumber || 'your case'} is ready. Select a plan to continue.
                    </p>
                 </div>
              </div>
            )}
            <PricingTiers caseData={caseData} />
        </div>
      </main>
    </>
  );
};

export default Pricing;
