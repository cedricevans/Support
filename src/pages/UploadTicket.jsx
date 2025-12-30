
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Upload as UploadIcon, FileText, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import TicketAnalysisResults from '@/components/upload/TicketAnalysisResults';

// Demo data for a child support document scan
const demoScanResult = {
  ticketImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
  applicant: {
    firstName: 'JORDAN',
    lastName: 'LEE',
    fullName: 'JORDAN LEE',
    address: '245 PEACHTREE ST NE',
    city: 'ATLANTA',
    state: 'GA',
    zip: '30303',
    email: 'jordan.lee@email.com',
    phone: '(404) 555-0142',
  },
  child: {
    fullName: 'AVERY LEE',
    dob: '2016-04-12',
  },
  support: {
    caseNumber: 'FC-2024-1029',
    monthlyIncome: '$4,200',
    otherParentIncome: '$3,100',
    childcareCosts: '$450',
    medicalCosts: '$180',
    custodySchedule: '60/40 shared schedule',
  },
  court: {
    courtDate: '2024-03-22',
    courtName: 'FULTON COUNTY FAMILY COURT',
    courtAddress: '185 CENTRAL AVE SW, ATLANTA, GA 30303',
  },
  ai: {
    confidence: 0.97,
    notes: ['High confidence extraction.', 'Parenting schedule and income data detected.'],
    quickSummary: 'Child support modification review for Fulton County with a shared 60/40 schedule, updated income figures, and documented childcare and medical expenses. Recommended focus: highlight consistent parenting time, recent income changes, and verified monthly costs.',
  },
};

const UploadTicket = () => {
  const [file, setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast({
        variant: 'destructive',
        title: 'File too large',
        description: 'Please select a file smaller than 10MB',
      });
      return;
    }

    setFile(selectedFile);
    setAnalysisComplete(false);
    setAnalysisData(null);

    toast({
      variant: 'success',
      title: 'File uploaded',
      description: `${selectedFile.name} ready for analysis`,
    });
  };

  const handleAnalyze = () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please upload your documents first',
      });
      return;
    }

    setIsAnalyzing(true);

    // Demo: simulate scan + extraction
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisData(demoScanResult);
      setAnalysisComplete(true);

      toast({
        variant: 'success',
        title: 'Analysis complete',
        description: 'Ticket details extracted successfully',
      });
    }, 2000);
  };

  const handleReset = () => {
    setAnalysisComplete(false);
    setFile(null);
    setAnalysisData(null);
  };

  return (
    <>
      <Helmet>
        <title>Scan Support Papers - FamilyBridge | Atlanta, GA</title>
        <meta
          name="description"
          content="Scan child support papers and get AI-powered analysis with a court-ready strategy for Atlanta and Fulton County."
        />
      </Helmet>

      <main className="min-h-screen pt-24 pb-16 relative bg-[var(--cream)]">
        <div className="fixed inset-0 z-0 opacity-10 pointer-events-none">
          <img
            className="w-full h-full object-cover"
            alt="Warm abstract background"
            src="https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d"
          />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {!analysisComplete ? (
            <>
              <div className="text-center mb-12">
                <h1 className="text-4xl sm:text-5xl font-black text-[var(--ink)] mb-4 font-display">
                  Scan your <span className="text-[var(--rose)]">support papers</span>
                </h1>
                <p className="text-lg text-[var(--moss)] opacity-80">Get AI-powered analysis and a court-ready strategy in minutes</p>
              </div>

              <div className="bg-white/80 backdrop-blur-lg border border-[var(--linen)] rounded-3xl p-8 sm:p-12 mb-8 shadow-2xl">
                <div className="mb-8">
                  <label
                    htmlFor="ticket-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-[var(--sage)] rounded-2xl cursor-pointer hover:border-[var(--moss)] hover:bg-white transition-all duration-300 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                      <UploadIcon className="w-48 h-48" />
                    </div>

                    {file ? (
                      <div className="flex flex-col items-center z-10">
                        <CheckCircle className="h-16 w-16 text-[var(--rose)] mb-4" />
                        <p className="text-[var(--ink)] font-semibold mb-2">{file.name}</p>
                        <p className="text-[var(--moss)] text-sm opacity-70">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center z-10">
                        <UploadIcon className="h-16 w-16 text-[var(--moss)] mb-4 group-hover:scale-110 transition-transform" />
                        <p className="text-[var(--ink)] font-semibold mb-2">Click to upload or drag and drop</p>
                        <p className="text-[var(--moss)] text-sm opacity-70">PDF, JPG, PNG (Max 10MB)</p>
                      </div>
                    )}

                    <input
                      id="ticket-upload"
                      type="file"
                      className="hidden"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-4">
                  <Button
                    onClick={handleAnalyze}
                    disabled={!file || isAnalyzing}
                    className="w-full bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)] font-bold py-6 text-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_16px_30px_rgba(79,98,87,0.25)]"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Scanning & Extracting Data...
                      </div>
                    ) : (
                      'Start AI Analysis'
                    )}
                  </Button>

                  <div className="relative flex items-center py-6">
                    <div className="flex-grow border-t border-[var(--linen)]"></div>
                    <span className="flex-shrink-0 mx-4 text-[var(--moss)] text-sm font-semibold tracking-wider opacity-70">
                      OR PREFER MANUAL ENTRY?
                    </span>
                    <div className="flex-grow border-t border-[var(--linen)]"></div>
                  </div>

                  <Button
                    onClick={() => navigate('/intake')}
                    className="w-full bg-transparent border-2 border-[var(--rose)] text-[var(--rose)] hover:bg-[var(--rose)] hover:text-[var(--cream)] font-bold py-6 text-lg rounded-full transition-all duration-300 shadow-[0_10px_24px_rgba(230,135,122,0.15)] hover:shadow-[0_18px_34px_rgba(230,135,122,0.3)] group"
                  >
                    Don't have documents? Start Manual Intake
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white/80 border border-[var(--linen)] rounded-xl p-6 text-center">
                  <FileText className="h-8 w-8 text-[var(--moss)] mx-auto mb-3" />
                  <h3 className="text-[var(--ink)] font-bold mb-1">OCR Extraction</h3>
                  <p className="text-[var(--moss)] text-sm opacity-70">Autofills your case details</p>
                </div>
                <div className="bg-white/80 border border-[var(--linen)] rounded-xl p-6 text-center">
                  <CheckCircle className="h-8 w-8 text-[var(--rose)] mx-auto mb-3" />
                  <h3 className="text-[var(--ink)] font-bold mb-1">High Accuracy</h3>
                  <p className="text-[var(--moss)] text-sm opacity-70">Powered by document AI</p>
                </div>
                <div className="bg-white/80 border border-[var(--linen)] rounded-xl p-6 text-center">
                  <AlertCircle className="h-8 w-8 text-[var(--moss)] mx-auto mb-3" />
                  <h3 className="text-[var(--ink)] font-bold mb-1">Secure Upload</h3>
                  <p className="text-[var(--moss)] text-sm opacity-70">Encrypted processing</p>
                </div>
              </div>
            </>
          ) : (
            <TicketAnalysisResults
              analysis={analysisData}
              ticketFile={file}
              onReset={handleReset}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default UploadTicket;
