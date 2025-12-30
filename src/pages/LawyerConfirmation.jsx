
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ShieldCheck, Mail, Phone, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LawyerConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { caseData, lawyer } = location.state || {};

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Pending Court Schedule';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleMessageAttorney = () => {
    navigate('/attorney-chat', {
        state: {
            caseData,
            lawyer
        }
    });
  };

  if (!lawyer) {
     return (
        <div className="min-h-screen bg-[var(--cream)] flex items-center justify-center text-[var(--ink)]">
           <div className="text-center">
              <p>No lawyer selected.</p>
              <Button onClick={() => navigate('/upload-ticket')} className="mt-4">Start Over</Button>
           </div>
        </div>
     );
  }

  return (
    <>
      <Helmet>
        <title>Representation Confirmed - FamilyBridge</title>
      </Helmet>

      <main className="min-h-screen pt-24 pb-16 bg-[var(--cream)]">
         <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="text-center mb-12">
               <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-20 h-20 bg-[var(--peach)] rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(243,179,159,0.4)]"
               >
                  <Check className="w-10 h-10 text-[var(--ink)] stroke-[3px]" />
               </motion.div>
               <h1 className="text-3xl sm:text-4xl font-black text-[var(--ink)] mb-4 font-display">
                  Attorney <span className="text-[var(--rose)]">Assigned</span>
               </h1>
               <p className="text-lg text-[var(--moss)] opacity-80">
                  Your case has been successfully submitted to your chosen attorney.
               </p>
            </div>

            <div className="bg-white/80 border border-[var(--linen)] rounded-3xl p-8 mb-8">
               <div className="flex flex-col md:flex-row gap-8 items-center md:items-start border-b border-[var(--linen)] pb-8 mb-8">
                  <img src={lawyer.image} alt={lawyer.name} className="w-24 h-24 rounded-full border-4 border-[rgba(139,177,167,0.2)]" />
                  <div className="text-center md:text-left">
                     <h2 className="text-2xl font-bold text-[var(--ink)]">{lawyer.name}</h2>
                     <p className="text-[var(--moss)] font-medium">{lawyer.firm}</p>
                     <div className="mt-2 flex items-center justify-center md:justify-start text-[var(--moss)] text-sm gap-2 opacity-70">
                        <ShieldCheck className="w-4 h-4" /> Bar Verified • License Active
                     </div>
                  </div>
               </div>

               <div className="space-y-6">
                  <h3 className="text-[var(--ink)] font-bold uppercase tracking-wider text-sm">Next Steps</h3>
                  
                  <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-[rgba(139,177,167,0.2)] flex items-center justify-center text-[var(--moss)] flex-shrink-0">1</div>
                     <div>
                        <h4 className="text-[var(--ink)] font-bold">Case Review</h4>
                        <p className="text-[var(--moss)] text-sm opacity-70">{lawyer.name} will review your support details ({caseData?.caseNumber || 'your case'}) within 24 hours.</p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-[rgba(139,177,167,0.2)] flex items-center justify-center text-[var(--moss)] flex-shrink-0">2</div>
                     <div>
                        <h4 className="text-[var(--ink)] font-bold">Initial Consultation</h4>
                        <p className="text-[var(--moss)] text-sm opacity-70">You will receive a secure message or call to discuss strategy.</p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="w-8 h-8 rounded-full bg-[rgba(139,177,167,0.2)] flex items-center justify-center text-[var(--moss)] flex-shrink-0">3</div>
                     <div>
                        <h4 className="text-[var(--ink)] font-bold">Court Appearance</h4>
                        <p className="text-[var(--moss)] text-sm opacity-70">Your attorney will prepare for the date: <span className="text-[var(--rose)]">{formatDate(caseData?.courtDate)}</span>.</p>
                     </div>
                  </div>
               </div>
            </div>

            <div className="flex justify-center gap-4">
               <Button variant="outline" onClick={() => navigate('/')} className="border-[var(--moss)] text-[var(--moss)] hover:bg-[var(--mist)]">
                  Return Home
               </Button>
               <Button 
                    onClick={handleMessageAttorney}
                    className="bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)]"
               >
                  <Mail className="w-4 h-4 mr-2" /> Message Attorney
               </Button>
            </div>

         </div>
      </main>
    </>
  );
};

export default LawyerConfirmation;
