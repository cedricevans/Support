
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Users, Award, Target, Heart } from 'lucide-react';

const About = () => {
  const values = [
    {
      icon: Users,
      title: 'Customer First',
      description: 'We put your success and satisfaction at the center of everything we do.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We strive for the highest quality in our AI analysis and customer service.',
    },
    {
      icon: Target,
      title: 'Results Driven',
      description: 'Our focus is on delivering real, measurable outcomes for our clients.',
    },
    {
      icon: Heart,
      title: 'Integrity',
      description: 'We operate with honesty, transparency, and ethical business practices.',
    },
  ];

  return (
    <>
      <Helmet>
        <title>About Us - FamilyBridge | Atlanta, GA</title>
        <meta name="description" content="Learn how FamilyBridge helps parents in Atlanta prepare for child support court with clarity, confidence, and access to family-law attorneys." />
      </Helmet>

      <main className="min-h-screen pt-24 pb-16 bg-[var(--cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--ink)] mb-6 font-display">
              About <span className="text-[var(--moss)]">FamilyBridge</span>
            </h1>
            <p className="text-xl text-[var(--moss)] max-w-3xl mx-auto opacity-80">
              We're on a mission to make child support preparation calmer, clearer, and more human.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center">
             <div className="order-2 lg:order-1 bg-white/80 backdrop-blur-lg border border-[var(--linen)] rounded-3xl p-8 sm:p-12">
                <h2 className="text-3xl font-bold text-[var(--ink)] mb-6">Our Story</h2>
                <div className="space-y-4 text-[var(--moss)] text-lg opacity-80">
                <p>
                    FamilyBridge started with one question: why is child support court so confusing for families who are already under stress? Most parents face a stack of paperwork, a tight timeline, and little guidance.
                </p>
                <p>
                    We built a tool that reads your documents, highlights the facts that matter, and turns them into a simple strategy you can understand. If you want legal advice, we connect you with licensed family-law attorneys in your area.
                </p>
                <p>
                    Today, families use FamilyBridge to prepare for hearings, stay organized, and walk into court with confidence.
                </p>
                </div>
            </div>
            <div className="order-1 lg:order-2 rounded-3xl overflow-hidden border border-[var(--linen)] shadow-2xl h-[400px]">
                <img 
                    className="w-full h-full object-cover" 
                    alt="Family meeting at a table"
                 src="https://images.unsplash.com/photo-1521791136064-7986c2920216" />
            </div>
          </div>

          <div className="mb-16">
            <h2 className="text-3xl font-bold text-[var(--ink)] mb-8 text-center font-display">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-lg border border-[var(--linen)] rounded-2xl p-8 hover:bg-white transition-all duration-300"
                >
                  <div className="w-14 h-14 bg-[rgba(139,177,167,0.2)] rounded-2xl flex items-center justify-center mb-4">
                    <value.icon className="h-7 w-7 text-[var(--moss)]" />
                  </div>
                  <h3 className="text-xl font-bold text-[var(--ink)] mb-3">{value.title}</h3>
                  <p className="text-[var(--moss)] opacity-80">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden">
             <div className="absolute inset-0">
                <img 
                    className="w-full h-full object-cover opacity-20" 
                    alt="Family walking outdoors"
                 src="https://images.unsplash.com/photo-1504151932400-72d4384f04b3" />
                <div className="absolute inset-0 bg-[rgba(139,177,167,0.2)] mix-blend-overlay"></div>
             </div>
            <div className="relative z-10 bg-gradient-to-r from-[rgba(139,177,167,0.2)] to-[rgba(243,179,159,0.2)] border border-[var(--linen)] p-12 text-center backdrop-blur-sm">
                <h2 className="text-3xl font-bold text-[var(--ink)] mb-4">Supporting Families Nationwide</h2>
                <p className="text-lg text-[var(--moss)] mb-8 max-w-2xl mx-auto opacity-80">
                Experience the clarity of AI-driven preparation and the confidence of legal support when you want it.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <div className="text-5xl font-black text-[var(--rose)] mb-2">12K+</div>
                    <div className="text-[var(--moss)] opacity-70">Families Supported</div>
                </div>
                <div>
                    <div className="text-5xl font-black text-[var(--rose)] mb-2">96%</div>
                    <div className="text-[var(--moss)] opacity-70">Feel More Prepared</div>
                </div>
                <div>
                    <div className="text-5xl font-black text-[var(--rose)] mb-2">24 hrs</div>
                    <div className="text-[var(--moss)] opacity-70">Avg. Attorney Response</div>
                </div>
                </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default About;
