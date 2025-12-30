
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, RefreshCw, Scale, Sparkles, FileSearch } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * Ticket Analysis Results Component
 * Displays comprehensive AI analysis results and offers two distinct flows:
 * 1. AI Strategy (Pricing -> Confirmation)
 * 2. Lawyer Matching (Lawyer Selection -> Confirmation)
 */
const TicketAnalysisResults = ({ analysis, ticketFile, onReset }) => {
  const navigate = useNavigate();

  // Use passed analysis or fallback to default structure if missing (safeguard)
  const data = analysis || {};
  const summaryLines = [
    data.ai?.quickSummary,
    data.applicant?.fullName ? `Applicant: ${data.applicant.fullName}` : null,
    data.child?.fullName ? `Child: ${data.child.fullName} (${data.child?.dob || 'DOB not listed'})` : null,
    data.support?.custodySchedule ? `Custody schedule: ${data.support.custodySchedule}` : null,
    data.support?.monthlyIncome || data.support?.otherParentIncome
      ? `Income: ${data.support?.monthlyIncome || 'N/A'} (you) vs ${data.support?.otherParentIncome || 'N/A'} (other parent)`
      : null,
    data.support?.childcareCosts || data.support?.medicalCosts
      ? `Expenses: Childcare ${data.support?.childcareCosts || 'N/A'}, Medical ${data.support?.medicalCosts || 'N/A'}`
      : null,
    data.court?.courtDate || data.court?.courtName
      ? `Court: ${data.court?.courtName || 'Family Court'} on ${data.court?.courtDate || 'date TBD'}`
      : null
  ].filter(Boolean);

  // Helper to normalize the OCR data into a flat structure for the app's intake/confirmation pages
  const normalizeCaseData = (ocrData) => {
    return {
      parentFirstName: ocrData.applicant?.firstName || '',
      parentLastName: ocrData.applicant?.lastName || '',
      email: ocrData.applicant?.email || '',
      phone: ocrData.applicant?.phone || '',
      address: ocrData.applicant?.address || '',
      city: ocrData.applicant?.city || '',
      state: ocrData.applicant?.state || '',
      zip: ocrData.applicant?.zip || '',
      childName: ocrData.child?.fullName || '',
      childDob: ocrData.child?.dob || '',
      custodySchedule: ocrData.support?.custodySchedule || '',
      monthlyIncome: ocrData.support?.monthlyIncome || '',
      otherParentIncome: ocrData.support?.otherParentIncome || '',
      childcareCosts: ocrData.support?.childcareCosts || '',
      medicalCosts: ocrData.support?.medicalCosts || '',
      caseNumber: ocrData.support?.caseNumber || '',
      courtDate: ocrData.court?.courtDate || '',
      courtName: ocrData.court?.courtName || '',
      rawAnalysis: ocrData
    };
  };

  const handleAiStrategyFlow = () => {
    const caseData = normalizeCaseData(data);
    // Navigate to pricing with the case data
    navigate('/pricing', { 
      state: { 
        caseData,
        ticketImage: data.ticketImage || null,
        flow: 'ai-strategy'
      } 
    });
  };

  const handleLawyerFlow = () => {
    const caseData = normalizeCaseData(data);
    // Navigate to lawyer matching with the case data
    navigate('/lawyer-matching', { 
      state: { 
        caseData,
        ticketImage: data.ticketImage || null,
        flow: 'lawyer-match'
      } 
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center justify-center w-20 h-20 bg-[rgba(243,179,159,0.25)] rounded-full mb-6 relative"
        >
          <div className="absolute inset-0 rounded-full animate-ping bg-[rgba(243,179,159,0.2)]"></div>
          <FileSearch className="h-10 w-10 text-[var(--rose)]" />
        </motion.div>
        <h1 className="text-4xl sm:text-5xl font-black text-[var(--ink)] mb-4 font-display">
          Scan <span className="text-[var(--rose)]">Successful</span>
        </h1>
        <p className="text-lg text-[var(--moss)] opacity-80">
          We've extracted the details from your papers. Choose how you want to proceed.
        </p>
      </div>

      {/* Extracted Data Summary */}
      <div className="bg-white/80 border border-[var(--linen)] rounded-2xl p-6 sm:p-8">
        <h3 className="text-xl font-bold text-[var(--ink)] mb-6 border-b border-[var(--linen)] pb-4">Extracted Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
           <div>
             <span className="text-[var(--moss)] text-xs uppercase tracking-wider font-bold block mb-1 opacity-60">Parent</span>
             <p className="text-[var(--ink)] font-medium text-lg">{data.applicant?.fullName || 'N/A'}</p>
           </div>
           <div>
             <span className="text-[var(--moss)] text-xs uppercase tracking-wider font-bold block mb-1 opacity-60">Child</span>
             <p className="text-[var(--ink)] font-medium">{data.child?.fullName || 'N/A'}</p>
           </div>
           <div>
             <span className="text-[var(--moss)] text-xs uppercase tracking-wider font-bold block mb-1 opacity-60">Case Number</span>
             <p className="text-[var(--ink)] font-medium">{data.support?.caseNumber || 'N/A'}</p>
           </div>
           <div>
             <span className="text-[var(--moss)] text-xs uppercase tracking-wider font-bold block mb-1 opacity-60">Court Date</span>
             <p className="text-[var(--rose)] font-bold">{data.court?.courtDate || 'Not specified'}</p>
           </div>
        </div>
        
        {summaryLines.length > 0 && (
          <div className="mt-6 bg-[rgba(139,177,167,0.12)] border border-[rgba(139,177,167,0.3)] rounded-lg p-4">
            <span className="text-[var(--moss)] text-xs font-bold uppercase tracking-wider mb-2 block">AI Summary</span>
            <ul className="text-[var(--moss)] text-sm opacity-80 space-y-1">
              {summaryLines.map((line, index) => (
                <li key={index}>{line}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Dual Flow Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
        {/* Option 1: AI Strategy Path */}
        <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col h-full"
        >
          <Button
            onClick={handleAiStrategyFlow}
            className="w-full h-full min-h-[140px] flex flex-col items-center justify-center bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)] font-bold p-6 rounded-2xl shadow-[0_18px_34px_rgba(79,98,87,0.25)] space-y-3"
          >
            <Sparkles className="h-8 w-8 mb-2" />
            <div className="text-xl">Get AI Strategy Draft</div>
            <span className="text-sm font-normal opacity-80">Instant summary + prep checklist</span>
            <div className="flex items-center text-xs font-bold uppercase tracking-wider bg-white/10 px-3 py-1 rounded-full mt-2">
              Recommended <ArrowRight className="ml-1 w-3 h-3" />
            </div>
          </Button>
        </motion.div>

        {/* Option 2: Lawyer Only Path */}
        <motion.div 
            whileHover={{ scale: 1.02 }}
            className="flex flex-col h-full"
        >
          <Button
            onClick={handleLawyerFlow}
            className="w-full h-full min-h-[140px] flex flex-col items-center justify-center bg-white/80 text-[var(--ink)] hover:bg-white border border-[var(--linen)] font-bold p-6 rounded-2xl space-y-3"
          >
            <Scale className="h-8 w-8 mb-2 text-[var(--rose)]" />
            <div className="text-xl">Connect with an Attorney</div>
            <span className="text-sm font-normal opacity-70">Get matched with family-law counsel</span>
            <div className="flex items-center text-xs font-bold uppercase tracking-wider bg-[var(--mist)] px-3 py-1 rounded-full mt-2">
              Attorney Match <ArrowRight className="ml-1 w-3 h-3" />
            </div>
          </Button>
        </motion.div>
      </div>

      {/* Reset Link */}
      <div className="text-center pt-4">
        <button 
          onClick={onReset} 
          className="text-[var(--moss)] hover:text-[var(--ink)] flex items-center justify-center gap-2 mx-auto text-sm transition-colors opacity-60"
        >
          <RefreshCw className="w-4 h-4" /> Scan a different document
        </button>
      </div>
    </motion.div>
  );
};

export default TicketAnalysisResults;
