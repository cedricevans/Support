
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const lawyers = [
  {
    id: 1,
    name: "Alicia Brooks, Esq.",
    firm: "Brooks Family Law Group",
    rating: 4.9,
    reviews: 218,
    experience: "14 Years",
    specialty: "Child support & custody",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=200&h=200",
    fee: "$249 flat fee",
    location: "Fulton County, GA"
  },
  {
    id: 2,
    name: "Marcus Hill, Esq.",
    firm: "Hill & Parker Family Law",
    rating: 4.8,
    reviews: 176,
    experience: "11 Years",
    specialty: "Support modifications",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200&h=200",
    fee: "$219 flat fee",
    location: "Atlanta, GA"
  },
  {
    id: 3,
    name: "Danielle Carter, Esq.",
    firm: "Carter & Fields Family Law",
    rating: 5.0,
    reviews: 241,
    experience: "16 Years",
    specialty: "Complex family matters",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=200&h=200",
    fee: "$299 flat fee",
    location: "Fulton County, GA"
  },
  {
    id: 4,
    name: "James Whitaker, Esq.",
    firm: "Whitaker Family Law",
    rating: 4.7,
    reviews: 133,
    experience: "9 Years",
    specialty: "Initial support orders",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200&h=200",
    fee: "$199 flat fee",
    location: "DeKalb County, GA"
  }
];

const LawyerMatching = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { caseData } = location.state || {};

  const handleHire = (lawyer) => {
    toast({
      title: "Connecting...",
      description: `Sending your case details to ${lawyer.name}`,
      duration: 1500,
    });

    setTimeout(() => {
      navigate('/lawyer-confirmation', { 
        state: { 
          caseData, 
          lawyer 
        } 
      });
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Select Attorney - FamilyBridge | Atlanta, GA</title>
        <meta name="description" content="Choose a top-rated family-law attorney in Atlanta and Fulton County to handle your case." />
      </Helmet>

      <main className="min-h-screen pt-24 pb-16 bg-[var(--cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
             {caseData?.planType === 'legal-full' ? (
                <Button 
                    variant="ghost" 
                    onClick={() => navigate('/confirmation', { state: { caseData } })}
                    className="text-[var(--moss)] hover:text-[var(--ink)] pl-0"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Strategy
                </Button>
             ) : (
                <Button 
                    variant="ghost" 
                    onClick={() => navigate(-1)}
                    className="text-[var(--moss)] hover:text-[var(--ink)] pl-0"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                </Button>
             )}
          </div>

          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-black text-[var(--ink)] mb-4 font-display">
              Match With A <span className="text-[var(--moss)]">Top Attorney</span>
            </h1>
            <p className="text-[var(--moss)] max-w-2xl mx-auto opacity-80">
              Work directly with a vetted family-law professional focused on Atlanta and Fulton County.
              {caseData && <span className="block mt-2 text-[var(--rose)]">Showing attorneys near {caseData.city || 'Atlanta, GA'}</span>}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lawyers.map((lawyer, index) => (
              <motion.div
                key={lawyer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 border border-[var(--linen)] rounded-2xl p-6 hover:border-[var(--sage)] transition-all duration-300 group flex flex-col"
              >
                <div className="flex items-start gap-4 mb-4">
                   <img src={lawyer.image} alt={lawyer.name} className="w-16 h-16 rounded-full object-cover border-2 border-[var(--linen)]" />
                   <div>
                      <h3 className="font-bold text-[var(--ink)] text-lg">{lawyer.name}</h3>
                      <p className="text-[var(--moss)] text-sm opacity-70">{lawyer.firm}</p>
                      <div className="flex items-center mt-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-[var(--ink)] text-sm ml-1 font-bold">{lawyer.rating}</span>
                        <span className="text-[var(--moss)] text-xs ml-1 opacity-60">({lawyer.reviews} reviews)</span>
                      </div>
                   </div>
                </div>

                <div className="space-y-3 mb-6 flex-grow">
                   <div className="flex items-center text-sm text-[var(--moss)] opacity-80">
                      <MapPin className="w-4 h-4 mr-2 text-[var(--moss)]" />
                      {lawyer.location}
                   </div>
                   <div className="flex items-center text-sm text-[var(--moss)] opacity-80">
                      <Shield className="w-4 h-4 mr-2 text-[var(--moss)]" />
                      {lawyer.experience} Experience
                   </div>
                   <div className="flex items-center text-sm text-[var(--moss)] opacity-80">
                      <CheckCircle className="w-4 h-4 mr-2 text-[var(--moss)]" />
                      Specializes in {lawyer.specialty}
                   </div>
                </div>

                <div className="pt-4 border-t border-[var(--linen)]">
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-[var(--moss)] text-sm opacity-70">Estimated Fee</span>
                      <span className="text-[var(--ink)] font-bold text-lg">{lawyer.fee}</span>
                   </div>
                   <Button 
                      onClick={() => handleHire(lawyer)}
                      className="w-full bg-[var(--moss)] hover:bg-[var(--moss)] text-[var(--cream)] font-bold"
                   >
                      Select Attorney
                   </Button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>
    </>
  );
};

export default LawyerMatching;
