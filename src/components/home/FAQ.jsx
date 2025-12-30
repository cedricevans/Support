import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * FAQ Component
 * Frequently Asked Questions with accordion
 */
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: 'How does the AI analysis work?',
      answer: 'Our AI reads your child support documents, extracts key facts (income, custody time, expenses), and organizes them into a court-ready summary and strategy outline.',
    },
    {
      question: 'Is this legal advice?',
      answer: 'No. FamilyBridge provides informational guidance and preparation tools. You can connect with a licensed family-law attorney for legal advice.',
    },
    {
      question: 'How long does the analysis take?',
      answer: 'Most strategy drafts are generated within minutes. Attorney reviews typically arrive within 24 hours.',
    },
    {
      question: 'Can I still hire a lawyer?',
      answer: 'Yes. You can match with a vetted attorney at any time, or use your existing attorney and share the report.',
    },
    {
      question: 'What documents should I upload?',
      answer: 'Child support orders, income statements, pay stubs, childcare receipts, and parenting plans are the most helpful to start.',
    },
    {
      question: 'Is my information secure?',
      answer: 'Absolutely. All data is encrypted end-to-end, and we never share your information without permission.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[var(--linen)] to-[var(--cream)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] mb-4 font-display">
            Frequently Asked <span className="text-[var(--rose)]">Questions</span>
          </h2>
          <p className="text-lg text-[var(--moss)] opacity-80">
            Everything you need to know about FamilyBridge
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-lg border border-[var(--linen)] rounded-2xl overflow-hidden hover:bg-white transition-all duration-300"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="text-lg font-bold text-[var(--ink)] pr-8">{faq.question}</span>
                <ChevronDown
                  className={`h-6 w-6 text-[var(--rose)] flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="px-6 pb-6 text-[var(--moss)] opacity-80">{faq.answer}</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
