
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Download, Calendar, ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from '@/components/ui/use-toast';
import AiStrategyReport from '@/components/intake/AiStrategyReport';
import { getGoogleCalendarUrl, getOutlookCalendarUrl, downloadIcsFile } from '@/lib/calendar';

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { caseData } = location.state || {};
  
  const isLegalFullPlan = caseData?.planType === 'legal-full';

  useEffect(() => {
    if (!caseData) {
      navigate('/upload-ticket');
      toast({
        variant: 'destructive',
        title: 'No case data found',
        description: 'Please upload your documents or complete the intake form first.',
      });
    }
  }, [caseData, navigate, toast]);

  if (!caseData) return null;

  const handlePrint = () => {
    window.print();
    toast({
      title: "Generating PDF",
      description: "Use the system dialog to 'Save as PDF'",
    });
  };

  const handleCalendar = (type) => {
    let url;
    switch (type) {
      case 'google':
        url = getGoogleCalendarUrl(caseData);
        window.open(url, '_blank');
        break;
      case 'outlook':
        url = getOutlookCalendarUrl(caseData);
        window.open(url, '_blank');
        break;
      case 'ics':
        downloadIcsFile(caseData);
        toast({
          title: "Downloaded",
          description: "Calendar file (.ics) has been saved.",
          variant: "success",
        });
        return; 
      default:
        return;
    }
  };

  const handleUpgradeToLawyer = () => {
    navigate('/lawyer-matching', { 
        state: { 
            caseData: {
                ...caseData,
                planType: 'legal-full'
            } 
        } 
    });
  };

  return (
    <>
      <Helmet>
        <title>Your Support Strategy - FamilyBridge | Atlanta, GA</title>
        <meta name="description" content="View and download your AI-generated child support strategy for court in Atlanta and Fulton County." />
      </Helmet>

      <div className="min-h-screen pt-24 pb-16 bg-[var(--cream)] relative print:bg-white print:p-0 print:min-h-0">
        
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none print:hidden">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[rgba(139,177,167,0.35)] rounded-full blur-[120px] mix-blend-multiply opacity-30"></div>
           <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[rgba(243,179,159,0.35)] rounded-full blur-[100px] mix-blend-multiply opacity-20"></div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-10 print:hidden">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--peach)] rounded-full mb-6 shadow-[0_0_20px_rgba(243,179,159,0.4)]">
                <Check className="h-8 w-8 text-[var(--ink)] stroke-[3px]" />
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-[var(--ink)] mb-4 font-display">
                Strategy <span className="text-[var(--rose)]">Ready</span>
              </h1>
              <p className="text-lg text-[var(--moss)] max-w-2xl mx-auto opacity-80">
                Our AI has analyzed your documents ({caseData.caseNumber || 'your case'}) and generated a personalized support plan.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 mb-8 justify-end print:hidden"
          >
            <Button 
              onClick={handlePrint}
              variant="outline" 
              className="bg-white border-[var(--linen)] text-[var(--ink)] hover:bg-[var(--mist)] gap-2"
            >
              <Download className="w-4 h-4" /> Download Strategy PDF
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="bg-[var(--moss)] hover:bg-[var(--moss)] text-[var(--cream)] gap-2 shadow-lg shadow-[rgba(79,98,87,0.25)]">
                  <Calendar className="w-4 h-4" /> Add to Calendar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-white border-[var(--linen)] text-[var(--ink)]">
                <DropdownMenuItem onClick={() => handleCalendar('google')} className="focus:bg-[var(--mist)] focus:text-[var(--ink)] cursor-pointer">
                  Google Calendar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCalendar('outlook')} className="focus:bg-[var(--mist)] focus:text-[var(--ink)] cursor-pointer">
                  Outlook Calendar
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleCalendar('ics')} className="focus:bg-[var(--mist)] focus:text-[var(--ink)] cursor-pointer">
                  Apple / iCal (.ics)
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="print:block print:w-full print:absolute print:top-0 print:left-0"
          >
            <AiStrategyReport caseData={caseData} />
          </motion.div>

          <div className="mt-12 text-center print:hidden">
            {isLegalFullPlan ? (
              <div className="bg-[rgba(243,179,159,0.2)] border border-[rgba(243,179,159,0.4)] rounded-xl p-8 max-w-2xl mx-auto">
                <h3 className="text-[var(--ink)] font-bold text-2xl mb-2">Complete Your Attorney Match</h3>
                <p className="text-[var(--moss)] mb-6 opacity-80">
                  You've unlocked attorney review. The final step is to select your preferred family-law attorney.
                </p>
                <Button 
                  onClick={handleUpgradeToLawyer}
                  className="bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)] font-bold py-6 px-8 rounded-full text-lg shadow-[0_18px_34px_rgba(79,98,87,0.25)] w-full sm:w-auto"
                >
                  Select Your Attorney Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="max-w-2xl mx-auto">
                <h3 className="text-[var(--ink)] font-bold text-xl mb-4">Want a professional to handle this for you?</h3>
                <div className="bg-white border border-[var(--linen)] rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="text-left">
                        <div className="flex items-center gap-2 mb-2">
                             <ShieldCheck className="text-[var(--rose)] h-5 w-5" />
                             <h4 className="font-bold text-[var(--ink)]">Upgrade to Attorney Review</h4>
                        </div>
                        <p className="text-sm text-[var(--moss)] opacity-70">
                            We'll credit your $49 payment towards hiring a local attorney.
                        </p>
                    </div>
                    <Button 
                        onClick={handleUpgradeToLawyer}
                        className="bg-transparent border border-[var(--moss)] text-[var(--moss)] hover:bg-[var(--moss)] hover:text-[var(--cream)] font-bold"
                    >
                        Find an Attorney
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default Confirmation;
