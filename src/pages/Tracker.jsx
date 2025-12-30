
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/customSupabaseClient';
import TicketStatus from '@/components/tracker/TicketStatus';
import { useToast } from '@/components/ui/use-toast';

const Tracker = () => {
  const [searchParams] = useSearchParams();
  const [caseNumber, setCaseNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [caseData, setCaseData] = useState(null);
  const { toast } = useToast();

  useEffect(() => {
    const caseParam = searchParams.get('case');
    const emailParam = searchParams.get('email');
    if (caseParam) setCaseNumber(caseParam);
    if (emailParam) setEmail(emailParam);
    
    if (caseParam && emailParam) {
        fetchTicket(caseParam, emailParam);
    }
  }, [searchParams]);

  const fetchTicket = async (tNum, tEmail) => {
    setLoading(true);
    setCaseData(null);
    try {
        const { data, error } = await supabase
            .from('cases')
            .select('*')
            .eq('case_number', tNum)
            .eq('email', tEmail)
            .single();

        if (error) throw error;
        if (data) {
            setCaseData(data);
        } else {
            toast({
                variant: "destructive",
                title: "Case Not Found",
                description: "We couldn't find a case with those details.",
            });
        }
    } catch (err) {
        console.error(err);
        if (err.code !== 'PGRST116') {
             toast({
                variant: "destructive",
                title: "Error",
                description: "Something went wrong while searching.",
            });
        } else {
             toast({
                variant: "destructive",
                title: "Not Found",
                description: "No record matches that case number and email.",
            });
        }
    } finally {
        setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!caseNumber || !email) {
         toast({
            variant: "destructive",
            title: "Missing Information",
            description: "Please enter both Case Number and Email.",
        });
        return;
    }
    fetchTicket(caseNumber, email);
  };

  return (
    <>
      <Helmet>
        <title>Track Your Case - FamilyBridge | Atlanta, GA</title>
        <meta name="description" content="Check the real-time status of your child support preparation in Atlanta and Fulton County." />
      </Helmet>

      <main className="min-h-screen pt-28 pb-20 relative bg-[var(--cream)]">
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center opacity-15 pointer-events-none"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-[rgba(248,242,236,0.85)] via-[rgba(248,242,236,0.9)] to-[var(--cream)]"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] mb-4 font-display">
              Track Your <span className="text-[var(--rose)]">Case Status</span>
            </h1>
            <p className="text-lg text-[var(--moss)] opacity-80">
              Enter your case number to see real-time updates on your preparation.
            </p>
          </div>

          {!caseData ? (
            <div className="bg-white/80 backdrop-blur-lg border border-[var(--linen)] rounded-3xl p-8 sm:p-12 shadow-2xl max-w-xl mx-auto">
                <form onSubmit={handleSearch} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="caseNumber" className="text-[var(--moss)]">Case Number</Label>
                        <Input 
                            id="caseNumber" 
                            value={caseNumber} 
                            onChange={(e) => setCaseNumber(e.target.value)} 
                            placeholder="e.g. FB-2024-1082"
                            className="bg-white border-[var(--linen)] text-[var(--ink)] h-12"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-[var(--moss)]">Email Address</Label>
                        <Input 
                            id="email" 
                            type="email"
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="john@example.com"
                            className="bg-white border-[var(--linen)] text-[var(--ink)] h-12"
                        />
                    </div>
                    <Button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)] font-bold h-12 rounded-full text-lg mt-4"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : <><Search className="mr-2 h-5 w-5" /> Track Case</>}
                    </Button>
                </form>
            </div>
          ) : (
            <div>
                 <Button 
                    variant="ghost" 
                    onClick={() => setCaseData(null)}
                    className="mb-6 text-[var(--moss)] hover:text-[var(--ink)] pl-0"
                 >
                    ← Search Another Case
                 </Button>
                 <TicketStatus ticket={caseData} />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Tracker;
