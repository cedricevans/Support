import React from 'react';
import { Shield, DollarSign, Clock, Award } from 'lucide-react';

/**
 * Guarantees Component
 * Displays money-back and service guarantees
 */
const Guarantees = () => {
  const guarantees = [
    {
      icon: DollarSign,
      title: 'Straightforward Pricing',
      description: 'Know exactly what you get before you pay. No surprise fees.',
    },
    {
      icon: Shield,
      title: 'Privacy Protected',
      description: 'Your family documents are encrypted and never shared without permission.',
    },
    {
      icon: Clock,
      title: 'Fast Turnaround',
      description: 'Strategy drafts are ready within minutes. Attorney reviews within 24 hours.',
    },
    {
      icon: Award,
      title: 'Vetted Attorneys',
      description: 'We only partner with licensed family-law attorneys in your area.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[var(--linen)] to-[var(--cream)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] mb-4 font-display">
            Our <span className="text-[var(--rose)]">Commitments</span>
          </h2>
          <p className="text-lg text-[var(--moss)] max-w-2xl mx-auto opacity-80">
            Calm, clear support built for families and privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guarantees.map((guarantee, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-lg border border-[var(--linen)] rounded-2xl p-8 hover:bg-white transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[rgba(139,177,167,0.2)] rounded-2xl flex items-center justify-center mb-4">
                <guarantee.icon className="h-7 w-7 text-[var(--moss)]" />
              </div>
              <h3 className="text-xl font-bold text-[var(--ink)] mb-3">{guarantee.title}</h3>
              <p className="text-[var(--moss)] opacity-80">{guarantee.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Guarantees;
