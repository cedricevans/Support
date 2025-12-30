import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Clock, FileText, Sparkles, Scale, AlertCircle } from 'lucide-react';

const stages = [
  { id: 'submitted', label: 'Intake Submitted', icon: FileText, desc: 'We have received your documents.' },
  { id: 'review', label: 'Case Review', icon: Clock, desc: 'We are summarizing key details.' },
  { id: 'strategy_built', label: 'Strategy Drafted', icon: Sparkles, desc: 'Your plan is ready.' },
  { id: 'attorney', label: 'Attorney Review', icon: Scale, desc: 'Optional attorney review in progress.' },
  { id: 'ready', label: 'Ready for Court', icon: CheckCircle, desc: 'Your packet is complete.' },
];

const TicketStatus = ({ ticket }) => {
  const currentStageIndex = stages.findIndex(s => s.id === ticket.status) || 0;
  
  // Calculate progress percentage for bar
  const progress = (currentStageIndex / (stages.length - 1)) * 100;

  return (
    <div className="bg-white/80 border border-[var(--linen)] rounded-3xl p-6 sm:p-10 shadow-2xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-[var(--linen)] gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[var(--ink)] mb-1">Case #{ticket.case_number}</h2>
          <p className="text-[var(--moss)] opacity-70">Filed on {new Date(ticket.created_at).toLocaleDateString()}</p>
        </div>
        <div className="bg-[rgba(243,179,159,0.2)] text-[var(--moss)] px-4 py-2 rounded-full font-bold border border-[rgba(243,179,159,0.4)] capitalize">
           Status: {stages[currentStageIndex]?.label || ticket.status}
        </div>
      </div>

      {/* Progress Tracker */}
      <div className="relative mb-12 px-4 mt-8">
        {/* Progress Bar Background */}
        <div className="absolute top-5 left-0 w-full h-1 bg-[var(--linen)] rounded-full -z-10"></div>
        {/* Active Progress */}
        <div 
            className="absolute top-5 left-0 h-1 bg-[var(--moss)] rounded-full -z-10 transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
        ></div>

        <div className="flex justify-between items-start w-full">
          {stages.map((stage, index) => {
            const Icon = stage.icon;
            const isCompleted = index <= currentStageIndex;
            const isCurrent = index === currentStageIndex;

            return (
              <div key={stage.id} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border-4 transition-all duration-500 z-10 bg-[var(--cream)] ${
                    isCompleted 
                      ? 'border-[var(--moss)] text-[var(--moss)]' 
                      : 'border-[var(--linen)] text-[var(--moss)] opacity-40'
                  } ${isCurrent ? 'scale-110 shadow-[0_0_20px_rgba(79,98,87,0.35)] border-[var(--rose)] text-[var(--rose)]' : ''}`}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className={`mt-4 text-center transition-opacity duration-500 ${isCompleted ? 'opacity-100' : 'opacity-40'}`}>
                  <p className={`text-xs sm:text-sm font-bold mb-1 ${isCurrent ? 'text-[var(--rose)]' : 'text-[var(--ink)]'}`}>{stage.label}</p>
                  <p className="hidden md:block text-[10px] sm:text-xs text-[var(--moss)] max-w-[80px] mx-auto leading-tight opacity-70">{stage.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Details Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white rounded-xl p-6 mb-8 border border-[var(--linen)]">
          <div>
            <h3 className="text-[var(--ink)] font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-[var(--rose)]" />
                Next Steps
            </h3>
            <p className="text-[var(--moss)] text-sm opacity-80">
                {currentStageIndex === 0 && "We are reviewing your uploaded documents and confirming details."}
                {currentStageIndex === 1 && "Our AI is summarizing income, custody, and expense factors."}
                {currentStageIndex === 2 && "Your strategy draft is ready for review."}
                {currentStageIndex === 3 && "An attorney can review and suggest next steps."}
                {currentStageIndex === 4 && "Your packet is ready. Check your email for final documents."}
            </p>
          </div>
          <div>
            <h3 className="text-[var(--ink)] font-bold mb-4">Estimated Completion</h3>
            <p className="text-3xl font-black text-[var(--ink)]">
                {currentStageIndex === 4 ? "Completed" : "Oct 30, 2024"}
            </p>
            <p className="text-[var(--moss)] text-xs mt-1 opacity-70">Timeline is an estimate based on review volume.</p>
          </div>
      </div>
    </div>
  );
};

export default TicketStatus;
