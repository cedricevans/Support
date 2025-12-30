import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { ArrowRight, Building2, Briefcase, Sparkles, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const Business = () => {
  return (
    <>
      <Helmet>
        <title>Business & Partnerships - FamilyBridge</title>
        <meta name="description" content="SaaS and white‑label options for family‑law firms, plus investment opportunities and a go‑to‑market plan." />
      </Helmet>

      <main className="min-h-screen pt-24 pb-16 bg-[var(--cream)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[rgba(139,177,167,0.2)] text-[var(--moss)] text-xs font-bold uppercase tracking-wider mb-6">
              <Building2 className="w-4 h-4" /> Business & Partnerships
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-[var(--ink)] font-display mb-4">
              SaaS, White‑Label, and Investment Options
            </h1>
            <p className="text-[var(--moss)] text-lg opacity-80 max-w-3xl mx-auto">
              This offering lives outside the consumer app experience and is designed for firms,
              partners, and investors who want to deploy FamilyBridge at scale.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Briefcase,
                title: 'SaaS for Law Firms',
                desc: 'Multi‑user access, branded portals, secure intake, and reporting.',
              },
              {
                icon: Sparkles,
                title: 'White‑Label',
                desc: 'Your brand, domain, and workflows with our AI pipeline under the hood.',
              },
              {
                icon: TrendingUp,
                title: 'Investment + Partnerships',
                desc: 'Growth capital, market expansion, and shared‑revenue partnerships.',
              },
            ].map((card) => (
              <div key={card.title} className="bg-white/80 border border-[var(--linen)] rounded-2xl p-6">
                <card.icon className="w-8 h-8 text-[var(--moss)] mb-4" />
                <h3 className="text-xl font-bold text-[var(--ink)] mb-2">{card.title}</h3>
                <p className="text-[var(--moss)] opacity-80">{card.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-white/80 border border-[var(--linen)] rounded-3xl p-8 sm:p-10 mb-16">
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--ink)] font-display mb-4">
              Go‑To‑Market Plan
            </h2>
            <p className="text-[var(--moss)] opacity-80 mb-6">
              A focused marketing plan that keeps consumer trust high while opening a B2B revenue lane.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Phase 1: Local Proof',
                  points: [
                    'Pilot with Atlanta/Fulton County firms',
                    'Collect outcomes + testimonials',
                    'Tight feedback loop on intake flow',
                  ],
                },
                {
                  title: 'Phase 2: Regional Growth',
                  points: [
                    'Partner webinars and CLE sponsorships',
                    'Local SEO for firm‑branded portals',
                    'Referral network with transparent fees',
                  ],
                },
                {
                  title: 'Phase 3: Scale',
                  points: [
                    'White‑label rollouts for multi‑office firms',
                    'Marketplace partnerships with family‑law groups',
                    'Performance reporting for ROI visibility',
                  ],
                },
                {
                  title: 'Phase 4: Enterprise',
                  points: [
                    'Dedicated onboarding + SLA support',
                    'API integrations with firm CRMs',
                    'National firm and platform deals',
                  ],
                },
              ].map((block) => (
                <div key={block.title} className="bg-[var(--cream)] border border-[var(--linen)] rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-[var(--ink)] mb-3">{block.title}</h3>
                  <ul className="space-y-2 text-[var(--moss)] opacity-80 text-sm">
                    {block.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-[rgba(139,177,167,0.2)] to-[rgba(243,179,159,0.2)] border border-[var(--linen)] rounded-3xl p-8 sm:p-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--ink)] font-display mb-3">
              Want the partnership deck?
            </h2>
            <p className="text-[var(--moss)] opacity-80 mb-6">
              We can share pricing, rollout timelines, and partnership structures.
            </p>
            <Button asChild className="bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)] font-bold px-8 py-4 rounded-full">
              <Link to="/contact">
                Request Partnerships Info <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default Business;
