
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  Cpu, 
  Shield, 
  Users, 
  Zap, 
  Database, 
  BarChart, 
  Lock, 
  Scale, 
  CheckCircle, 
  ArrowRight,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutThisApp = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <>
      <Helmet>
        <title>About This App - Platform Overview | FamilyBridge</title>
        <meta name="description" content="Overview of the FamilyBridge platform for child support preparation, AI capabilities, and partner options." />
      </Helmet>

      <div className="pt-24 pb-16 bg-[var(--cream)]">
        
        <section className="relative px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-20">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(243,179,159,0.2)] text-[var(--moss)] text-xs font-bold uppercase tracking-wider mb-6 border border-[rgba(243,179,159,0.4)]">
                <Target className="w-4 h-4" /> Platform Overview
              </div>
              <h1 className="text-4xl sm:text-6xl font-black text-[var(--ink)] mb-6 leading-tight font-display">
                The operating system for <span className="gradient-text">child support preparation</span>
              </h1>
              <p className="text-xl text-[var(--moss)] mb-8 leading-relaxed opacity-80">
                FamilyBridge bridges the gap between family-law complexity and everyday parents using AI intake, document extraction, and guided strategy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)] font-bold">
                  <Link to="/contact">Request Investor Deck</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-[var(--moss)] text-[var(--moss)] hover:bg-[var(--mist)]">
                  <Link to="/upload-ticket">Try the Demo</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-20 bg-[var(--linen)] border-y border-[var(--linen)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-[var(--ink)] mb-4 font-display">Core Workflow Engine</h2>
              <p className="text-[var(--moss)] max-w-2xl mx-auto opacity-80">
                Our platform automates the most labor-intensive parts of family-law intake and preparation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Users,
                  title: "1. Intelligent Intake",
                  desc: "Replaces lengthy phone intakes with a guided wizard that captures critical family support data and documents."
                },
                {
                  icon: Cpu,
                  title: "2. AI Analysis Layer",
                  desc: "Processes support orders, income statements, and schedules into structured, court-ready summaries."
                },
                {
                  icon: Scale,
                  title: "3. Attorney Routing",
                  desc: "Cases can stay AI-only or be routed to partner attorneys for review and representation."
                }
              ].map((step, idx) => (
                <div key={idx} className="bg-white p-8 rounded-2xl border border-[var(--linen)] relative overflow-hidden group hover:border-[var(--sage)] transition-colors">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[rgba(139,177,167,0.1)] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-[rgba(139,177,167,0.2)] transition-colors"></div>
                  <div className="w-12 h-12 bg-[var(--mist)] rounded-xl flex items-center justify-center text-[var(--moss)] mb-6">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--ink)] mb-3">{step.title}</h3>
                  <p className="text-[var(--moss)] leading-relaxed opacity-80">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 text-[var(--moss)] font-bold uppercase tracking-wider text-sm">
                <BriefcaseIcon className="w-4 h-4" /> For Legal Partners
              </div>
              <h2 className="text-4xl font-bold text-[var(--ink)]">Spend Less Time on Intake</h2>
              <p className="text-[var(--moss)] text-lg opacity-80">
                Family-law firms spend heavily on intake and document collection. FamilyBridge automates the prep work.
              </p>
              
              <div className="space-y-4">
                {[
                  "Receive pre-qualified, pre-paid cases.",
                  "Automated document collection (orders, affidavits, schedules).",
                  "Structured data output (JSON/CSV) for easy filings.",
                  "Filter cases by jurisdiction and case type."
                ].map((item, i) => (
                  <motion.div key={i} variants={itemVariants} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[var(--moss)] mt-1 flex-shrink-0" />
                    <span className="text-[var(--moss)] opacity-80">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-[var(--peach)] rounded-3xl p-8 sm:p-12 text-[var(--ink)]"
            >
              <div className="inline-flex items-center gap-2 text-[var(--ink)] font-bold uppercase tracking-wider text-sm mb-6 opacity-70">
                <Users className="w-4 h-4" /> For Consumers
              </div>
              <h2 className="text-3xl sm:text-4xl font-black mb-6">Democratizing Family-Law Access</h2>
              <p className="text-[var(--ink)] text-lg mb-8 opacity-80">
                We give parents clarity and confidence, whether they want to DIY or hire a professional.
              </p>
              
              <ul className="space-y-4 mb-8">
                {[
                  "Instant strategy draft at a low cost.",
                  "Transparent flat-rate pricing for attorney review.",
                  "Mobile-first experience, no office visits.",
                  "Track case status in real time."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-[var(--ink)]" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="pt-6 border-t border-white/30">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-2xl">95%</span>
                  <span className="text-sm font-medium opacity-70">Preparedness Score</span>
                </div>
              </div>
            </motion.div>

          </div>
        </section>

        <section className="py-20 bg-[var(--linen)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
             <div className="mb-16">
              <h2 className="text-3xl font-bold text-[var(--ink)] mb-4 font-display">Built for Scale & Security</h2>
              <p className="text-[var(--moss)] opacity-80">Enterprise-grade architecture designed for privacy and reliability.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
               <TechCard icon={Lock} title="SOC 2 Ready" desc="End-to-end encryption for all sensitive user data." />
               <TechCard icon={Database} title="Supabase" desc="Scalable PostgreSQL backend with real-time capabilities." />
               <TechCard icon={Zap} title="Edge Functions" desc="Serverless architecture for instant global response times." />
               <TechCard icon={BarChart} title="Analytics" desc="Comprehensive funnel tracking and conversion optimization." />
            </div>
          </div>
        </section>

        <section className="py-24">
           <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-4xl font-bold text-[var(--ink)] mb-6 font-display">Ready to Build Together?</h2>
              <p className="text-xl text-[var(--moss)] mb-10 opacity-80">
                We are actively seeking partnerships with forward-thinking family-law firms and strategic allies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                 <Button asChild className="h-14 px-8 bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)] font-bold text-lg">
                    <Link to="/contact">Partner With Us</Link>
                 </Button>
                 <Button asChild variant="ghost" className="h-14 px-8 text-[var(--moss)] hover:bg-[var(--mist)] font-medium text-lg">
                    <Link to="/legal-disclaimer">View Legal Disclaimers <ArrowRight className="ml-2 w-4 h-4" /></Link>
                 </Button>
              </div>
           </div>
        </section>
      </div>
    </>
  );
};

const TechCard = ({ icon: Icon, title, desc }) => (
  <div className="bg-white p-6 rounded-xl border border-[var(--linen)] flex flex-col items-center">
    <Icon className="w-8 h-8 text-[var(--moss)] mb-4" />
    <h3 className="text-[var(--ink)] font-bold mb-2">{title}</h3>
    <p className="text-xs text-[var(--moss)] opacity-70">{desc}</p>
  </div>
);

const BriefcaseIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

export default AboutThisApp;
