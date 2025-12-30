
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle, 
  User,
  Users,
  Banknote,
  Scale,
  FileText,
  Sparkles,
  Maximize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const steps = [
  { id: 'parent', title: 'Parent Info', icon: User },
  { id: 'child', title: 'Child & Schedule', icon: Users },
  { id: 'finances', title: 'Financial Details', icon: Banknote },
  { id: 'court', title: 'Court Details', icon: Scale },
  { id: 'review', title: 'Review', icon: FileText },
];

const IntakeWizard = ({ initialData, ticketImage }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [formData, setFormData] = useState({
    parentFirstName: '',
    parentLastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    childName: '',
    childDob: '',
    custodySchedule: '',
    monthlyIncome: '',
    otherParentIncome: '',
    childcareCosts: '',
    medicalCosts: '',
    caseNumber: '',
    courtDate: '',
    courtName: '',
  });
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const { toast } = useToast();
  const navigate = useNavigate();

  // Load initial data if provided (OCR results)
  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({
        ...prev,
        parentFirstName: initialData.applicant?.firstName || '',
        parentLastName: initialData.applicant?.lastName || '',
        email: initialData.applicant?.email || '',
        phone: initialData.applicant?.phone || '',
        address: initialData.applicant?.address || '',
        city: initialData.applicant?.city || '',
        state: initialData.applicant?.state || '',
        zip: initialData.applicant?.zip || '',
        childName: initialData.child?.fullName || '',
        childDob: initialData.child?.dob || '',
        custodySchedule: initialData.support?.custodySchedule || '',
        monthlyIncome: initialData.support?.monthlyIncome || '',
        otherParentIncome: initialData.support?.otherParentIncome || '',
        childcareCosts: initialData.support?.childcareCosts || '',
        medicalCosts: initialData.support?.medicalCosts || '',
        caseNumber: initialData.support?.caseNumber || '',
        courtDate: initialData.court?.courtDate || '',
        courtName: initialData.court?.courtName || '',
      }));
      
      toast({
        title: "✨ Data Auto-filled",
        description: "We've pre-populated the form from your document scan. Please review for accuracy.",
        variant: "success",
        duration: 5000,
      });
    }
  }, [initialData, toast]);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setCurrentStep(curr => curr + 1);
    } else {
      // Submit
      navigate('/confirmation', { state: { caseData: formData } });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(curr => curr - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0
    })
  };

  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 ${ticketImage ? 'lg:grid-cols-2' : ''} gap-8 h-full`}>
      
      {/* LEFT COLUMN: FORM WIZARD */}
      <div className="flex flex-col min-h-[600px]">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-[var(--linen)] -z-10 rounded-full"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-[var(--moss)] -z-10 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            ></div>
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStep;
              const isCompleted = index < currentStep;
              return (
                <div key={step.id} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 bg-[var(--cream)]
                    ${isActive ? 'border-[var(--moss)] text-[var(--moss)] scale-110 shadow-[0_8px_20px_rgba(79,98,87,0.2)]' : 
                      isCompleted ? 'border-[var(--moss)] bg-[var(--moss)] text-[var(--cream)]' : 'border-[var(--linen)] text-[var(--moss)] opacity-40'}`}
                  >
                    {isCompleted ? <CheckCircle className="w-6 h-6" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={`text-xs mt-2 font-medium transition-colors duration-300 ${isActive ? 'text-[var(--moss)]' : 'text-[var(--moss)] opacity-40'}`}>
                    {step.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-grow bg-white/80 border border-[var(--linen)] rounded-2xl p-6 sm:p-8 relative overflow-hidden">
          {initialData && (
             <div className="absolute top-0 right-0 p-2 bg-[rgba(139,177,167,0.15)] rounded-bl-xl border-b border-l border-[rgba(139,177,167,0.2)] flex items-center gap-2">
                <Sparkles className="w-3 h-3 text-[var(--moss)]" />
                <span className="text-[10px] font-bold text-[var(--moss)] uppercase tracking-wider">Auto-filled via Scan</span>
             </div>
          )}

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="h-full"
            >
              <h2 className="text-2xl font-bold text-[var(--ink)] mb-6">{steps[currentStep].title}</h2>
              
              {/* Step 1: Parent Info */}
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[var(--moss)]">First Name</Label>
                      <Input name="parentFirstName" value={formData.parentFirstName} onChange={handleChange} className="bg-white border-[var(--linen)] text-[var(--ink)]" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--moss)]">Last Name</Label>
                      <Input name="parentLastName" value={formData.parentLastName} onChange={handleChange} className="bg-white border-[var(--linen)] text-[var(--ink)]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--moss)]">Email</Label>
                    <Input name="email" value={formData.email} onChange={handleChange} className="bg-white border-[var(--linen)] text-[var(--ink)]" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--moss)]">Phone</Label>
                    <Input name="phone" value={formData.phone} onChange={handleChange} className="bg-white border-[var(--linen)] text-[var(--ink)]" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--moss)]">Address</Label>
                    <Input name="address" value={formData.address} onChange={handleChange} className="bg-white border-[var(--linen)] text-[var(--ink)]" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2 col-span-2">
                      <Label className="text-[var(--moss)]">City</Label>
                      <Input name="city" value={formData.city} onChange={handleChange} className="bg-white border-[var(--linen)] text-[var(--ink)]" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--moss)]">State</Label>
                      <Input name="state" value={formData.state} onChange={handleChange} className="bg-white border-[var(--linen)] text-[var(--ink)]" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--moss)]">Zip</Label>
                    <Input name="zip" value={formData.zip} onChange={handleChange} className="bg-white border-[var(--linen)] text-[var(--ink)]" />
                  </div>
                </div>
              )}

              {/* Step 2: Child & Schedule */}
              {currentStep === 1 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                      <Label className="text-[var(--moss)]">Child Full Name</Label>
                      <Input name="childName" value={formData.childName} onChange={handleChange} className="bg-white border-[var(--linen)] text-[var(--ink)]" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--moss)]">Child Date of Birth</Label>
                    <Input type="date" name="childDob" value={formData.childDob} onChange={handleChange} className="bg-white border-[var(--linen)] text-[var(--ink)]" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[var(--moss)]">Custody Schedule</Label>
                    <Input name="custodySchedule" value={formData.custodySchedule} onChange={handleChange} placeholder="e.g. 60/40 shared schedule" className="bg-white border-[var(--linen)] text-[var(--ink)] placeholder:text-[var(--moss)] placeholder:opacity-60" />
                  </div>
                </div>
              )}

              {/* Step 3: Financial Details */}
              {currentStep === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[var(--moss)]">Your Monthly Income</Label>
                      <Input name="monthlyIncome" value={formData.monthlyIncome} onChange={handleChange} placeholder="$" className="bg-white border-[var(--linen)] text-[var(--ink)] placeholder:text-[var(--moss)] placeholder:opacity-60" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--moss)]">Other Parent Income</Label>
                      <Input name="otherParentIncome" value={formData.otherParentIncome} onChange={handleChange} placeholder="$" className="bg-white border-[var(--linen)] text-[var(--ink)] placeholder:text-[var(--moss)] placeholder:opacity-60" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-[var(--moss)]">Monthly Childcare Costs</Label>
                      <Input name="childcareCosts" value={formData.childcareCosts} onChange={handleChange} placeholder="$" className="bg-white border-[var(--linen)] text-[var(--ink)] placeholder:text-[var(--moss)] placeholder:opacity-60" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-[var(--moss)]">Monthly Medical Costs</Label>
                      <Input name="medicalCosts" value={formData.medicalCosts} onChange={handleChange} placeholder="$" className="bg-white border-[var(--linen)] text-[var(--ink)] placeholder:text-[var(--moss)] placeholder:opacity-60" />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Court Details */}
              {currentStep === 3 && (
                 <div className="space-y-4">
                   <div className="space-y-2">
                      <Label className="text-[var(--moss)]">Case Number</Label>
                      <Input name="caseNumber" value={formData.caseNumber} onChange={handleChange} className="bg-white border-[var(--linen)] text-[var(--ink)]" />
                  </div>
                  <div className="space-y-2">
                      <Label className="text-[var(--moss)]">Court Name</Label>
                      <Input name="courtName" value={formData.courtName} onChange={handleChange} className="bg-white border-[var(--linen)] text-[var(--ink)]" />
                  </div>
                  <div className="space-y-2">
                      <Label className="text-[var(--moss)]">Court Date (if set)</Label>
                      <Input type="date" name="courtDate" value={formData.courtDate} onChange={handleChange} className="bg-white border-[var(--linen)] text-[var(--ink)]" />
                  </div>
                </div>
              )}

              {/* Step 5: Review */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="bg-white rounded-lg p-4 space-y-3 border border-[var(--linen)]">
                    <h3 className="font-bold text-[var(--moss)]">Summary</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <span className="text-[var(--moss)] opacity-60">Parent:</span>
                      <span className="text-[var(--ink)] text-right">{formData.parentFirstName} {formData.parentLastName}</span>
                      
                      <span className="text-[var(--moss)] opacity-60">Child:</span>
                      <span className="text-[var(--ink)] text-right">{formData.childName}</span>
                      
                      <span className="text-[var(--moss)] opacity-60">Schedule:</span>
                      <span className="text-[var(--ink)] text-right">{formData.custodySchedule}</span>
                      
                      <span className="text-[var(--moss)] opacity-60">Court:</span>
                      <span className="text-[var(--ink)] text-right">{formData.courtDate}</span>
                    </div>
                  </div>
                  <p className="text-[var(--moss)] text-sm opacity-80">
                    By clicking submit, our AI will generate a preliminary child support strategy based on these details.
                  </p>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            onClick={handleBack}
            disabled={currentStep === 0}
            variant="outline"
            className="border-[var(--moss)] text-[var(--moss)] hover:bg-[var(--mist)] w-28"
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>
          <Button
            onClick={handleNext}
            className="bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)] font-bold w-28"
          >
            {currentStep === steps.length - 1 ? 'Submit' : 'Next'} <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* RIGHT COLUMN: TICKET PREVIEW (If Image Exists) */}
      {ticketImage && (
         <div className="hidden lg:block relative">
           <div className="sticky top-24 bg-[var(--ink)] border border-white/10 rounded-2xl overflow-hidden shadow-2xl h-[calc(100vh-8rem)]">
              <div className="absolute top-0 left-0 right-0 bg-black/60 backdrop-blur-md p-4 flex justify-between items-center z-10 border-b border-white/10">
                 <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[var(--peach)]" />
                    <span className="text-white font-bold text-sm">Scanned Document</span>
                 </div>
                 <Button size="icon" variant="ghost" className="h-8 w-8 text-white hover:bg-white/10" onClick={() => setIsImageExpanded(!isImageExpanded)}>
                    <Maximize2 className="w-4 h-4" />
                 </Button>
              </div>
              <div className="h-full overflow-auto p-4 flex items-start justify-center bg-[var(--ink)]">
                 <img 
                    src={ticketImage} 
                    alt="Scanned Document" 
                    className="w-full h-auto rounded shadow-lg object-contain"
                 />
              </div>
           </div>
         </div>
      )}

      {/* Mobile Image Toggle would go here ideally */}
    </div>
  );
};

export default IntakeWizard;
