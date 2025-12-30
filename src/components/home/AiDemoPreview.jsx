import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, AlertTriangle, TrendingDown, Target, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

/**
 * Strategy Preview Component
 * Replaces the old AI Demo with a more neutral "Strategy Preview"
 */
const AiDemoPreview = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleDemo = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const analysisResults = {
    parentingTime: '60/40 shared schedule',
    incomeGap: 'Income difference: $1,250/mo',
    supportEstimate: '$420/mo adjustment',
    successProbability: 82,
    strategyFocus: 'Document childcare costs and recent income changes',
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[var(--linen)] to-[var(--cream)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] mb-4 font-display">
            See the <span className="text-[var(--rose)]">strategy</span> take shape
          </h2>
          <p className="text-lg text-[var(--moss)] max-w-2xl mx-auto opacity-80">
            Watch how we analyze child support documents and draft a court-ready plan.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white/70 backdrop-blur-lg border border-[var(--linen)] rounded-3xl p-8 sm:p-12">
            <AnimatePresence mode="wait">
              {!isAnalyzing && !showResults && (
                <motion.div
                  key="initial"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <Sparkles className="h-16 w-16 text-[var(--rose)] mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-[var(--ink)] mb-4">
                    Preview The Process
                  </h3>
                  <p className="text-[var(--moss)] mb-8 opacity-80">
                    Click below to see a sample child support analysis
                  </p>
                  <Button
                    onClick={handleDemo}
                    className="bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)] font-bold px-8 py-4 rounded-full text-lg"
                  >
                    Run Sample Analysis
                  </Button>
                </motion.div>
              )}

              {isAnalyzing && (
                <motion.div
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="relative w-24 h-24 mx-auto mb-6">
                    <div className="absolute inset-0 border-4 border-[var(--moss)] border-t-transparent rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-4 border-[var(--rose)] border-t-transparent rounded-full animate-spin animation-delay-150"></div>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--ink)] mb-4">
                    Analyzing Support Details...
                  </h3>
                  <p className="text-[var(--moss)] opacity-80">
                    Reviewing income, custody schedule, and support history...
                  </p>
                </motion.div>
              )}

              {showResults && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-[var(--ink)] mb-6 text-center">
                    Analysis Complete ✓
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white border border-[var(--linen)] rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <AlertTriangle className="h-5 w-5 text-[var(--rose)]" />
                        <span className="text-sm text-[var(--moss)] opacity-80">Parenting Time</span>
                      </div>
                      <p className="text-lg font-bold text-[var(--ink)]">
                        {analysisResults.parentingTime}
                      </p>
                    </div>

                    <div className="bg-white border border-[var(--linen)] rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <TrendingDown className="h-5 w-5 text-[var(--moss)]" />
                        <span className="text-sm text-[var(--moss)] opacity-80">Income Context</span>
                      </div>
                      <p className="text-lg font-bold text-[var(--ink)]">
                        {analysisResults.incomeGap}
                      </p>
                    </div>

                    <div className="bg-white border border-[var(--linen)] rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <BarChart3 className="h-5 w-5 text-[var(--rose)]" />
                        <span className="text-sm text-[var(--moss)] opacity-80">Support Estimate</span>
                      </div>
                      <p className="text-lg font-bold text-[var(--ink)]">
                        {analysisResults.supportEstimate}
                      </p>
                    </div>

                    <div className="bg-white border border-[var(--linen)] rounded-xl p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Target className="h-5 w-5 text-[var(--moss)]" />
                        <span className="text-sm text-[var(--moss)] opacity-80">Strategy Strength</span>
                      </div>
                      <p className="text-lg font-bold text-[var(--rose)]">
                        High ({analysisResults.successProbability}%)
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-[rgba(139,177,167,0.2)] to-[rgba(243,179,159,0.2)] border border-[var(--linen)] rounded-xl p-6">
                    <h4 className="text-lg font-bold text-[var(--ink)] mb-2">
                      Strategy Focus
                    </h4>
                    <p className="text-[var(--moss)] opacity-80">
                      {analysisResults.strategyFocus}
                    </p>
                  </div>

                  <div className="text-center pt-4">
                    <Button
                      onClick={() => navigate('/upload-ticket')}
                      className="bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)] font-bold px-8 py-4 rounded-full text-lg"
                    >
                      Start Secure Scan
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiDemoPreview;
