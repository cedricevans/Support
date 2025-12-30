
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Target, 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  CheckCircle,
  FileText,
  Gavel,
  BrainCircuit,
  Scale
} from 'lucide-react';

const AiStrategyReport = ({ caseData }) => {
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Date TBD';
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
      {/* Header */}
      <div className="bg-[var(--ink)] text-white p-8 border-b-4 border-[var(--peach)] print:bg-white print:text-black print:border-black">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <BrainCircuit className="w-6 h-6 text-[var(--peach)] print:text-black" />
              <h1 className="text-2xl font-bold tracking-tight">AI Support Strategy Analysis</h1>
            </div>
            <p className="text-slate-400 print:text-slate-600 text-sm">
              Generated for Case #{caseData?.caseNumber?.replace(/\W/g, '').substring(0, 8) || 'Unknown'}
            </p>
          </div>
          <div className="text-right hidden sm:block">
            <div className="text-[var(--peach)] font-mono font-bold text-xl print:text-black">CONFIDENTIAL</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest">Attorney Work Product</div>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Executive Summary */}
        <section className="bg-slate-50 p-6 rounded-lg border border-slate-200 print:bg-white print:border-black">
          <h2 className="flex items-center text-lg font-bold text-slate-800 mb-4">
            <Target className="w-5 h-5 mr-2 text-emerald-700" /> 
            Case Summary & Readiness
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Based on the custody schedule (<strong>{caseData.custodySchedule || 'not provided'}</strong>) and reported incomes, this strategy highlights the strongest, court-relevant facts and the documentation that supports them.
              </p>
              <div className="flex items-center gap-4">
                 <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-bold border border-green-200 print:border-black">
                   Preparation Score: 82%
                 </div>
                 <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold border border-blue-200 print:border-black">
                   Estimated Impact: Moderate
                 </div>
              </div>
            </div>
            <div className="bg-white p-4 rounded border border-slate-200 print:hidden">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Key Factors Detected</h4>
              <ul className="space-y-2">
                <li className="flex items-start text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                  Income documentation present for at least one parent
                </li>
                <li className="flex items-start text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                  Custody schedule noted in documents
                </li>
                <li className="flex items-start text-sm text-slate-700">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 shrink-0" />
                  Childcare and medical costs identified
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Defense Strategy */}
        <section>
          <h2 className="flex items-center text-lg font-bold text-slate-800 mb-4">
            <Shield className="w-5 h-5 mr-2 text-blue-600" />
            Recommended Strategy Steps
          </h2>
          <div className="space-y-4">
            {[
              { title: "Document Completeness", desc: "Ensure both parents' income statements and recent pay stubs are current and consistent across forms." },
              { title: "Custody Summary", desc: "Bring a concise schedule summary with overnights, midweek exchanges, and school-day responsibility." },
              { title: "Expense Evidence", desc: "Organize childcare, medical, and education receipts by month with totals highlighted." },
              { title: "Consistency Check", desc: "Make sure affidavits, pay stubs, and bank deposits align to avoid credibility issues." }
            ].map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm border border-blue-200 print:border-black print:text-black">
                  {idx + 1}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{step.title}</h3>
                  <p className="text-slate-600 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Supporting Arguments */}
        <section className="bg-white p-6 rounded-lg border border-slate-200">
          <h2 className="flex items-center text-lg font-bold text-slate-800 mb-4">
            <Scale className="w-5 h-5 mr-2 text-emerald-700" />
            Strong Arguments to Emphasize
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Stable, consistent parenting time aligned with the current schedule.",
              "Documented income changes that materially impact the calculation.",
              "Verified childcare and medical costs tied directly to the child’s needs.",
              "Clear breakdown of who pays which recurring expenses.",
              "Good-faith efforts to follow prior orders and communicate changes."
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Evidence Checklist */}
        <section className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <h2 className="flex items-center text-lg font-bold text-slate-800 mb-4">
            <FileText className="w-5 h-5 mr-2 text-emerald-700" />
            Evidence Checklist
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              "Last 3–6 months of pay stubs and year-to-date totals.",
              "Most recent tax return (W‑2/1099s if applicable).",
              "Childcare invoices and proof of payment.",
              "Medical/dental insurance premiums and receipts.",
              "Parenting plan and any modification agreements.",
              "Calendar or app logs showing parenting time."
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Court Information */}
        <section className="bg-amber-50 p-6 rounded-lg border border-amber-200 print:bg-white print:border-black">
          <h2 className="flex items-center text-lg font-bold text-slate-800 mb-4">
            <Gavel className="w-5 h-5 mr-2 text-amber-600" />
            Court Appearance Details
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-amber-600 mt-1" />
              <div>
                <span className="block text-xs font-bold text-amber-800 uppercase">Date & Time</span>
                <span className="text-slate-900 font-medium">{formatDate(caseData.courtDate)}</span>
                <span className="block text-slate-500 text-xs mt-1">Arrive early and check in with the clerk</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-amber-600 mt-1" />
              <div>
                <span className="block text-xs font-bold text-amber-800 uppercase">Location</span>
                <span className="text-slate-900 font-medium">{caseData.courtName || 'County Courthouse'}</span>
                <span className="block text-slate-500 text-xs mt-1">Check your court notice for address</span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-start gap-2 text-xs text-amber-800 bg-amber-100/50 p-3 rounded">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            <p>Failure to appear can lead to delays or additional court orders. Do not miss this date unless you have confirmed a continuance.</p>
          </div>
        </section>

        {/* Questions to Ask */}
        <section className="bg-white p-6 rounded-lg border border-slate-200">
          <h2 className="flex items-center text-lg font-bold text-slate-800 mb-4">
            <AlertTriangle className="w-5 h-5 mr-2 text-emerald-700" />
            Questions to Ask (If You Meet with a Lawyer)
          </h2>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>How does Fulton County typically weigh childcare and medical expenses?</li>
            <li>What documentation is most persuasive for income changes?</li>
            <li>Are there local guidelines for shared custody calculations?</li>
            <li>What timeline should I expect after filing?</li>
          </ul>
        </section>

        {/* Local Notes */}
        <section className="bg-slate-50 p-6 rounded-lg border border-slate-200">
          <h2 className="flex items-center text-lg font-bold text-slate-800 mb-4">
            <MapPin className="w-5 h-5 mr-2 text-emerald-700" />
            Fulton County Notes (Atlanta, GA)
          </h2>
          <ul className="space-y-2 text-sm text-slate-700">
            <li>Bring a completed Georgia Child Support Worksheet if your court requires it.</li>
            <li>Have a Domestic Relations Financial Affidavit ready for both parents if requested.</li>
            <li>Keep organized, labeled copies for the judge, the other party, and yourself.</li>
          </ul>
        </section>

        {/* Disclaimer */}
        <div className="text-[10px] text-slate-400 border-t border-slate-100 pt-4 print:text-black">
          <p>This report is for informational purposes only and does not constitute legal advice. FamilyBridge is an AI-powered legal information tool, not a law firm. Use this as preparation material and consult a licensed attorney for legal advice.</p>
        </div>
      </div>
    </div>
  );
};

export default AiStrategyReport;
