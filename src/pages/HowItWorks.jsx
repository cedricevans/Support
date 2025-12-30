
import React from 'react';
import { Helmet } from 'react-helmet-async';
import HowItWorksSection from '@/components/home/HowItWorksSection';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HowItWorks = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>How It Works - FamilyBridge | Atlanta, GA</title>
        <meta name="description" content="Learn how FamilyBridge analyzes child support papers and generates a court-ready strategy for Atlanta and Fulton County." />
      </Helmet>

      <main className="min-h-screen pt-24 pb-16 bg-[var(--cream)]">
        <HowItWorksSection />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <div className="bg-gradient-to-r from-[rgba(139,177,167,0.2)] to-[rgba(243,179,159,0.2)] border border-[var(--linen)] rounded-3xl p-12">
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--ink)] mb-4 font-display">
              Ready to prepare with clarity?
            </h2>
            <p className="text-lg text-[var(--moss)] mb-8 opacity-80">
              Scan your papers now and get a personalized support strategy
            </p>
            <Button
              onClick={() => navigate('/upload-ticket')}
              className="bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)] font-bold px-12 py-6 rounded-full text-lg"
            >
              Get Started Now
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default HowItWorks;
