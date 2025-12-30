import React from 'react';
import { Shield, Award, Users, Lock } from 'lucide-react';

/**
 * Trust Badges Component
 * Displays credibility indicators and trust signals
 */
const TrustBadges = () => {
  const badges = [
    { icon: Shield, text: 'Bank-grade encryption' },
    { icon: Award, text: 'Family-law vetted network' },
    { icon: Users, text: '12,000+ families supported' },
    { icon: Lock, text: 'Private & confidential' },
  ];

  return (
    <section className="bg-[var(--linen)] py-12 border-y border-[var(--mist)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-4 group hover:scale-105 transition-transform duration-300"
            >
              <badge.icon className="h-8 w-8 text-[var(--moss)] mb-2 group-hover:text-[var(--rose)] transition-colors" />
              <span className="text-sm font-semibold text-[var(--ink)] text-center opacity-70">
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
