
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  BookOpen, Shield, Gavel, AlertTriangle, FileText, 
  Search, Download, ChevronRight, Calculator,
  CheckCircle2, ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Accordion, AccordionContent, AccordionItem, AccordionTrigger 
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { Link } from 'react-router-dom';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Support Estimate Calculator State
  const [yourIncome, setYourIncome] = useState(4200);
  const [otherIncome, setOtherIncome] = useState(3100);
  const [childcareCosts, setChildcareCosts] = useState(450);

  const SUPPORT_RATE = 0.2;
  const CHILDCARE_SHARE = 0.5;

  const incomeGap = Math.max(0, otherIncome - yourIncome);
  const baseSupport = incomeGap * SUPPORT_RATE;
  const estimatedSupport = baseSupport + childcareCosts * CHILDCARE_SHARE;

  const topics = [
    {
      id: 'basics',
      title: 'Child Support Basics',
      description: 'Understand guidelines, factors, and terminology.',
      icon: Shield,
      color: 'text-[var(--rose)]',
      bg: 'bg-[rgba(243,179,159,0.2)]'
    },
    {
      id: 'income',
      title: 'Income & Expense Proof',
      description: 'What documents courts expect for income and costs.',
      icon: BookOpen,
      color: 'text-[var(--moss)]',
      bg: 'bg-[rgba(139,177,167,0.2)]'
    },
    {
      id: 'parenting',
      title: 'Parenting Time',
      description: 'How schedules affect support calculations.',
      icon: AlertTriangle,
      color: 'text-amber-500',
      bg: 'bg-amber-100'
    },
    {
      id: 'court',
      title: 'Court Process Explained',
      description: 'From filing to hearing: what happens inside court.',
      icon: Gavel,
      color: 'text-purple-500',
      bg: 'bg-purple-100'
    },
    {
      id: 'modifications',
      title: 'Modification Requests',
      description: 'When and how to request a change in support.',
      icon: FileText,
      color: 'text-pink-500',
      bg: 'bg-pink-100'
    },
    {
      id: 'prepare',
      title: 'Prepare for Court',
      description: 'Checklist of documents and evidence to bring.',
      icon: CheckCircle2,
      color: 'text-cyan-500',
      bg: 'bg-cyan-100'
    }
  ];

  const filteredTopics = topics.filter(topic => 
    topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>Child Support Resources - FamilyBridge | Atlanta, GA</title>
        <meta name="description" content="Comprehensive guide to child support preparation for Atlanta and Fulton County. Learn about documents, court processes, and estimate support scenarios." />
      </Helmet>

      <div className="min-h-screen bg-[var(--cream)] text-[var(--ink)] pt-24 pb-16">
        
        {/* Header Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(243,179,159,0.2)] text-[var(--moss)] text-sm font-bold uppercase tracking-wider mb-6">
              <BookOpen className="w-4 h-4" /> Free Expert Guide
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[var(--ink)] mb-6 tracking-tight font-display">
              Child Support <span className="gradient-text">Resource Hub</span>
            </h1>
            <p className="text-xl text-[var(--moss)] mb-8 leading-relaxed opacity-80">
              Everything you need to know about child support prep, required documents, and court expectations.
            </p>

            <div className="relative max-w-xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-[var(--moss)] opacity-50" />
              </div>
              <Input 
                type="text"
                placeholder="Search topics (e.g., 'income proof', 'custody schedule')..."
                className="pl-12 py-6 bg-white border-[var(--linen)] rounded-2xl text-[var(--ink)] placeholder:text-[var(--moss)] placeholder:opacity-60 focus:border-[var(--sage)] focus:ring-[var(--sage)] transition-all text-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </motion.div>
        </div>

        {/* Resource Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTopics.map((topic, index) => (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-white/80 border border-[var(--linen)] rounded-3xl p-6 hover:bg-white hover:border-[var(--sage)] transition-all duration-300 cursor-pointer overflow-hidden"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${topic.bg}`}>
                    <topic.icon className={`w-6 h-6 ${topic.color}`} />
                  </div>
                  <ChevronRight className="w-5 h-5 text-[var(--moss)] opacity-40 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all" />
                </div>
                
                <h3 className="text-xl font-bold text-[var(--ink)] mb-2 group-hover:text-[var(--moss)] transition-colors">{topic.title}</h3>
                <p className="text-[var(--moss)] text-sm leading-relaxed opacity-80">{topic.description}</p>
                
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[rgba(243,179,159,0.2)] opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Support Estimate Calculator Section */}
        <div className="bg-[var(--linen)] py-24 mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[rgba(139,177,167,0.2)] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[rgba(243,179,159,0.2)] rounded-full blur-3xl"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(139,177,167,0.2)] text-[var(--moss)] text-sm font-bold uppercase tracking-wider mb-6">
                  <Calculator className="w-4 h-4" /> Support Estimate
                </div>
                <h2 className="text-3xl sm:text-4xl font-black text-[var(--ink)] mb-6 font-display">
                  Estimate a starting <br />
                  <span className="text-[var(--moss)]">support range</span>
                </h2>
                <p className="text-[var(--moss)] text-lg mb-8 opacity-80">
                  This quick calculator gives a rough estimate based on income differences and childcare costs. It is not legal advice.
                </p>
                
                <div className="space-y-8">
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-[var(--moss)]">Your Monthly Income</label>
                      <span className="text-[var(--rose)] font-bold">${yourIncome}</span>
                    </div>
                    <Slider 
                      value={[yourIncome]} 
                      onValueChange={(val) => setYourIncome(val[0])} 
                      min={1000} 
                      max={12000} 
                      step={100} 
                      className="py-4"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-[var(--moss)]">Other Parent Income</label>
                      <span className="text-[var(--rose)] font-bold">${otherIncome}</span>
                    </div>
                    <Slider 
                      value={[otherIncome]} 
                      onValueChange={(val) => setOtherIncome(val[0])} 
                      min={1000} 
                      max={12000} 
                      step={100} 
                      className="py-4"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <label className="text-sm font-medium text-[var(--moss)]">Monthly Childcare Costs</label>
                      <span className="text-[var(--rose)] font-bold">${childcareCosts}</span>
                    </div>
                    <Slider 
                      value={[childcareCosts]} 
                      onValueChange={(val) => setChildcareCosts(val[0])} 
                      min={0} 
                      max={1500} 
                      step={25} 
                      className="py-4"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/80 border border-[var(--linen)] rounded-3xl p-8 backdrop-blur-sm">
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-[var(--cream)] p-4 rounded-xl border border-[var(--linen)]">
                    <p className="text-[var(--moss)] text-xs uppercase font-bold mb-1 opacity-70">Income Gap</p>
                    <p className="text-xl font-bold text-[var(--ink)]">${incomeGap.toFixed(0)}</p>
                  </div>
                  <div className="bg-[var(--cream)] p-4 rounded-xl border border-[var(--linen)]">
                    <p className="text-[var(--moss)] text-xs uppercase font-bold mb-1 opacity-70">Childcare Share</p>
                    <p className="text-xl font-bold text-[var(--rose)]">${(childcareCosts * CHILDCARE_SHARE).toFixed(0)}</p>
                  </div>
                </div>

                <div className="mb-8 p-6 bg-[rgba(139,177,167,0.12)] rounded-2xl border border-[rgba(139,177,167,0.3)]">
                  <div className="flex justify-between items-end mb-2">
                    <p className="text-[var(--moss)] font-bold">Estimated Monthly Support</p>
                    <p className="text-3xl font-black text-[var(--ink)]">${estimatedSupport.toFixed(0)}</p>
                  </div>
                  <p className="text-sm text-[var(--moss)] opacity-70">A rough estimate, not legal advice.</p>
                </div>

                <div className="text-center">
                  <p className="text-[var(--moss)] mb-2 text-sm opacity-70">Ready to build your strategy?</p>
                  <Link to="/upload-ticket">
                    <Button className="w-full bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)] font-bold py-6 text-lg rounded-xl shadow-[0_18px_34px_rgba(79,98,87,0.25)] hover:shadow-[0_24px_40px_rgba(79,98,87,0.35)] transition-all">
                      Scan My Papers <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--ink)] mb-4 font-display">Frequently Asked Questions</h2>
            <p className="text-[var(--moss)] opacity-70">Common questions about child support preparation</p>
          </div>

          <div className="bg-white/80 border border-[var(--linen)] rounded-3xl p-6 sm:p-8">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-[var(--linen)]">
                <AccordionTrigger className="text-[var(--ink)] hover:text-[var(--moss)] text-left">Do I need a lawyer?</AccordionTrigger>
                <AccordionContent className="text-[var(--moss)] leading-relaxed opacity-80">
                  Not always. You can use the strategy draft to prepare on your own, or you can connect with a licensed family-law attorney for advice and representation.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="border-[var(--linen)]">
                <AccordionTrigger className="text-[var(--ink)] hover:text-[var(--moss)] text-left">What documents should I bring?</AccordionTrigger>
                <AccordionContent className="text-[var(--moss)] leading-relaxed opacity-80">
                  Support orders, pay stubs, tax returns, childcare receipts, medical insurance statements, and any parenting plan or schedule.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-[var(--linen)]">
                <AccordionTrigger className="text-[var(--ink)] hover:text-[var(--moss)] text-left">How long does the process take?</AccordionTrigger>
                <AccordionContent className="text-[var(--moss)] leading-relaxed opacity-80">
                  Strategy drafts are ready within minutes. Attorney reviews typically arrive within 24 hours after you upload your documents.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="border-[var(--linen)]">
                <AccordionTrigger className="text-[var(--ink)] hover:text-[var(--moss)] text-left">Is my information secure?</AccordionTrigger>
                <AccordionContent className="text-[var(--moss)] leading-relaxed opacity-80">
                  Yes. Your documents are encrypted and never shared without your permission.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="border-[var(--linen)]">
                <AccordionTrigger className="text-[var(--ink)] hover:text-[var(--moss)] text-left">Can I use my own attorney?</AccordionTrigger>
                <AccordionContent className="text-[var(--moss)] leading-relaxed opacity-80">
                  Absolutely. You can share your FamilyBridge strategy report with any attorney.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {/* Downloads CTA */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[var(--moss)] to-[var(--ink)] rounded-3xl p-8 sm:p-12 border border-white/10 relative overflow-hidden">
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-center md:text-left">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Free Child Support Prep Checklist</h3>
                  <p className="text-white/80 max-w-xl">Download our PDF guide for organizing documents, timelines, and questions before your hearing.</p>
                </div>
                <Button variant="outline" className="border-white text-[var(--ink)] hover:bg-white hover:text-[var(--moss)] font-bold h-14 px-8 rounded-xl flex items-center gap-2">
                   <Download className="w-5 h-5" /> Download PDF
                </Button>
             </div>
             {/* Decorative */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Resources;
