
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Lightbulb, Gavel, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const QuickTips = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const tips = [
    {
      category: "Before Court",
      icon: FileText,
      items: [
        {
          title: "What to bring to court?",
          content: "Bring support orders, recent pay stubs, tax returns, childcare receipts, health insurance costs, and a copy of your parenting schedule."
        },
        {
          title: "How to request a continuance?",
          content: "If you cannot make your court date, contact the court clerk as soon as possible. Most courts allow one reschedule if you request it in advance."
        },
        {
          title: "Prepare a one-page summary",
          content: "Create a short summary of income, parenting time, and key expenses. Judges appreciate clear, organized facts."
        }
      ]
    },
    {
      category: "In The Courtroom",
      icon: Gavel,
      items: [
        {
          title: "Courtroom Etiquette",
          content: "Dress professionally. Address the judge as 'Your Honor.' Speak clearly and stick to facts, not emotions."
        },
        {
          title: "Keep it child-focused",
          content: "Frame requests around the child’s needs—stability, routine, and wellbeing—rather than conflict with the other parent."
        }
      ]
    },
    {
      category: "Common Misconceptions",
      icon: AlertCircle,
      items: [
        {
          title: "Verbal agreements are enough",
          content: "Courts rely on formal orders. If your agreement isn’t documented, it may not be enforceable."
        },
        {
          title: "Unreported income won't matter",
          content: "Courts can request updated financials. Transparency helps your case and avoids delays."
        }
      ]
    }
  ];

  return (
    <div className="pt-24 pb-16 bg-[var(--cream)] min-h-screen">
      <Helmet>
        <title>Quick Tips & Free Advice - FamilyBridge</title>
        <meta name="description" content="Free child support tips and advice. Learn what to bring to court, how to prepare, and understand the process." />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-[rgba(243,179,159,0.2)] rounded-full mb-4">
            <Lightbulb className="w-8 h-8 text-[var(--rose)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-[var(--ink)] mb-6 font-display">
            Quick Tips & <span className="text-[var(--rose)]">Free Advice</span>
          </h1>
          <p className="text-xl text-[var(--moss)] max-w-2xl mx-auto opacity-80">
            Simple, practical advice to help you navigate the child support court process. 
            This information is for educational purposes and is not legal advice.
          </p>
        </div>

        <div className="space-y-8">
          {tips.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white/80 border border-[var(--linen)] rounded-2xl overflow-hidden">
              <div className="p-6 bg-white border-b border-[var(--linen)] flex items-center gap-3">
                <section.icon className="w-6 h-6 text-[var(--moss)]" />
                <h2 className="text-xl font-bold text-[var(--ink)]">{section.category}</h2>
              </div>
              <div className="divide-y divide-[var(--linen)]">
                {section.items.map((item, itemIndex) => {
                  const globalIndex = `${sectionIndex}-${itemIndex}`;
                  const isOpen = openIndex === globalIndex;

                  return (
                    <div key={itemIndex} className="bg-transparent">
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                        className="w-full flex items-center justify-between p-6 text-left hover:bg-[var(--mist)] transition-colors"
                      >
                        <span className="font-bold text-[var(--ink)] text-lg pr-8">{item.title}</span>
                        <ChevronDown
                          className={`w-5 h-5 text-[var(--rose)] transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="px-6 pb-6 pt-2 text-[var(--moss)] leading-relaxed border-t border-[var(--linen)] opacity-80">
                              {item.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-[rgba(139,177,167,0.2)] to-[rgba(243,179,159,0.2)] border border-[var(--linen)] rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-[var(--ink)] mb-4">Need More Help?</h3>
          <p className="text-[var(--moss)] mb-8 max-w-2xl mx-auto opacity-80">
            These tips are a great start, but every case is unique. Get a personalized strategy guide or connect with an attorney.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <Link to="/pricing">
              <Button className="bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)] font-bold px-8 py-6 rounded-full text-lg w-full sm:w-auto">
                View Support Options
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickTips;
