
import React from 'react';
import { Check, Scale, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useToast } from '@/components/ui/use-toast';

const PricingTiers = ({ caseData }) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePlanSelection = (planType) => {
    // If we have case data, proceed to confirmation (Simulating Checkout)
    if (caseData) {
      toast({
        title: "Processing Payment...",
        description: "Securely processing your transaction.",
        duration: 1500,
      });

      // Simulate network delay for payment
      setTimeout(() => {
        // Both tracks go to confirmation first to show the AI report
        // The confirmation page will handle the "Next Steps" based on planType
        navigate('/confirmation', { 
            state: { 
                caseData: {
                    ...caseData,
                    planType: planType
                } 
            } 
        });
      }, 1500);
    } else {
      // If no case data, go to upload flow
      navigate('/upload-ticket');
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-transparent relative overflow-hidden" id="pricing">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] mb-4 font-display">
            Select your <span className="text-[var(--moss)]">support plan</span>
          </h2>
          <p className="text-lg text-[var(--moss)] max-w-2xl mx-auto opacity-80">
            Choose the level of guidance you need for court preparation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Option 1: AI Strategy (Budget) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative bg-white/70 backdrop-blur-lg border border-[var(--linen)] rounded-3xl p-8 hover:bg-white transition-all duration-300 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[rgba(139,177,167,0.2)] rounded-xl text-[var(--moss)]">
                    <Zap className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-[var(--ink)]">AI Strategy Draft</h3>
                    <p className="text-[var(--moss)] text-sm opacity-70">Best for quick clarity</p>
                </div>
            </div>

            <div className="mb-6">
                <div className="text-5xl font-black text-[var(--ink)] mb-1">$49</div>
                <p className="text-[var(--moss)] text-sm opacity-70">One-time fee</p>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[var(--moss)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--ink)] text-sm">AI-generated court strategy</span>
                </li>
                 <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[var(--moss)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--ink)] text-sm">Document checklist + timeline</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[var(--moss)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--ink)] text-sm">Talking points for hearings</span>
                </li>
            </ul>

            <Button
                onClick={() => handlePlanSelection('ai-basic')}
                className="w-full bg-transparent border border-[var(--moss)] text-[var(--moss)] hover:bg-[var(--moss)] hover:text-[var(--cream)] font-bold py-6 rounded-full transition-all duration-300"
            >
                Get Strategy Draft
            </Button>
          </motion.div>

          {/* Option 2: Full Legal Defense */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative bg-white rounded-3xl p-8 hover:bg-white transition-all duration-300 shadow-[0_20px_40px_rgba(79,98,87,0.15)] border border-[var(--sage)] flex flex-col"
          >
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[var(--peach)] text-[var(--ink)] px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  Most Popular
            </div>

            <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-[rgba(243,179,159,0.2)] rounded-xl text-[var(--rose)]">
                    <Scale className="w-8 h-8" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-[var(--ink)]">Attorney Review + Match</h3>
                    <p className="text-[var(--moss)] text-sm opacity-70">For complex cases</p>
                </div>
            </div>

            <div className="mb-6">
                <div className="text-5xl font-black text-[var(--ink)] mb-1">$149</div>
                <p className="text-[var(--moss)] text-sm opacity-70">Starting at</p>
            </div>

            <ul className="space-y-4 mb-8 flex-grow">
                <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[var(--rose)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--ink)] text-sm font-bold text-[var(--rose)]">Attorney review within 24 hours</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[var(--rose)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--ink)] text-sm">Custom filing checklist</span>
                </li>
                <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[var(--rose)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--ink)] text-sm">Direct attorney messaging</span>
                </li>
                 <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-[var(--rose)] flex-shrink-0 mt-0.5" />
                    <span className="text-[var(--ink)] text-sm">Court prep session</span>
                </li>
            </ul>

            <Button
                onClick={() => handlePlanSelection('legal-full')}
                className="w-full bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)] font-bold py-6 rounded-full transition-all duration-300"
            >
                Connect with an Attorney
            </Button>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default PricingTiers;
