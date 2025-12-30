
import React from 'react';
import { useLocation } from 'react-router-dom';
import IntakeWizard from '@/components/intake/IntakeWizard';
import { Helmet } from 'react-helmet-async';

const Intake = () => {
  const location = useLocation();
  const { prefilledData, ticketImage } = location.state || {};

  return (
    <>
      <Helmet>
        <title>Support Intake - FamilyBridge</title>
        <meta name="description" content="Provide child support details to generate a custom court strategy and preparation plan." />
      </Helmet>
      
      <main className="min-h-screen pt-20 pb-16 bg-[var(--cream)]">
         <IntakeWizard 
            initialData={prefilledData} 
            ticketImage={ticketImage}
         />
      </main>
    </>
  );
};

export default Intake;
