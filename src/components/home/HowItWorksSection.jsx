import React from 'react';
import { Upload, FileSearch, Scale, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * How It Works Section Component
 * Updated to reflect the bifurcated path (DIY or Done-For-You)
 */
const HowItWorksSection = () => {
  const steps = [
    {
      icon: Upload,
      title: '1. Scan Papers',
      description: 'Upload your child support order, affidavits, and parenting plan.',
      color: '#8bb1a7',
    },
    {
      icon: FileSearch,
      title: '2. AI Strategy',
      description: 'We summarize income, custody, and expense factors that matter.',
      color: '#e6877a',
    },
    {
      icon: Scale,
      title: '3. Choose Support',
      description: 'Use the strategy yourself or connect with a family-law attorney.',
      color: '#8bb1a7',
    },
    {
      icon: CheckCircle,
      title: '4. Prepare & File',
      description: 'Walk in with a clear plan, timelines, and the right documents.',
      color: '#e6877a',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[var(--cream)] relative overflow-hidden">
       {/* Background decorative element */}
       <div className="absolute top-0 right-0 w-full md:w-1/3 h-full opacity-20 pointer-events-none">
         <img 
          className="w-full h-full object-cover" 
          alt="Soft abstract pattern"
         src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] mb-4 font-display">
            How <span className="text-[var(--moss)]">FamilyBridge</span> Works
          </h2>
          <p className="text-lg text-[var(--moss)] max-w-2xl mx-auto opacity-80">
            A calm, guided flow to prepare for child support court with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-[var(--mist)] to-transparent -z-10"></div>
              )}

              <div className="bg-white/70 backdrop-blur-lg border border-[var(--linen)] rounded-2xl p-6 hover:bg-white transition-all duration-300 group h-full">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden"
                  style={{ backgroundColor: step.color + '20' }}
                >
                  <step.icon className="h-8 w-8 relative z-10" style={{ color: step.color }} />
                </div>
                <h3 className="text-xl font-bold text-[var(--ink)] mb-2">{step.title}</h3>
                <p className="text-[var(--moss)] opacity-80">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Visual reinforcement */}
        <div className="mt-16 rounded-3xl overflow-hidden relative h-64 md:h-80 w-full border border-[var(--linen)]">
           <img 
            className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-500" 
            alt="Family meeting at a table"
           src="https://images.unsplash.com/photo-1521791136064-7986c2920216" />
           <div className="absolute inset-0 flex items-center justify-center bg-[rgba(47,49,44,0.35)]">
             <div className="text-center p-6 backdrop-blur-sm bg-[rgba(47,49,44,0.35)] rounded-2xl border border-white/20">
               <p className="text-xl md:text-2xl font-bold text-white">Step into court with clarity and calm</p>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
