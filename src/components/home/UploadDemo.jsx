import React, { useState } from 'react';
import { Upload, File, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

/**
 * Upload Papers Demo Component
 * Interactive demo showing the document scan process
 */
const UploadDemo = () => {
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    navigate('/upload-ticket');
  };

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-[var(--cream)] to-[var(--linen)] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <div className="mb-8">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] mb-4 font-display">
                    Scan support papers in <span className="text-[var(--rose)]">seconds</span>
                </h2>
                <p className="text-lg text-[var(--moss)] opacity-80">
                    Drag & drop your child support order, financial affidavit, or parenting plan. Our AI extracts the key facts and builds your court strategy.
                </p>
                </div>

                <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                >
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer ${
                    isDragging
                        ? 'border-[var(--rose)] bg-[rgba(243,179,159,0.2)]'
                        : 'border-[var(--sage)] bg-white/70 hover:border-[var(--moss)] hover:bg-white'
                    }`}
                    onClick={() => navigate('/upload-ticket')}
                >
                    <Upload className="h-16 w-16 text-[var(--moss)] mx-auto mb-4" />
                    <h3 className="text-2xl font-bold text-[var(--ink)] mb-2">
                    Drop your papers here
                    </h3>
                    <p className="text-[var(--moss)] mb-6 opacity-70">
                    or click to select from your device
                    </p>
                    <Button className="bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)] font-bold px-8 py-3 rounded-full">
                    Browse documents
                    </Button>

                    <div className="mt-8 flex items-center justify-center gap-6 text-sm text-[var(--moss)] opacity-70">
                    <div className="flex items-center gap-2">
                        <File className="h-4 w-4" />
                        <span>PDF, JPG, PNG</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        <span>Max 10MB</span>
                    </div>
                    </div>
                </div>
                </motion.div>
            </div>

            <div className="relative h-64 sm:h-96 lg:h-full lg:min-h-[500px] rounded-3xl overflow-hidden border border-[var(--linen)] shadow-2xl mt-8 lg:mt-0">
                 <img 
                    className="absolute inset-0 w-full h-full object-cover" 
                    alt="Parent reviewing documents at a table"
                 src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85" />
                <div className="absolute inset-0 bg-gradient-to-t from-[rgba(47,49,44,0.75)] via-[rgba(47,49,44,0.2)] to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8">
                     <div className="bg-white/15 backdrop-blur-md border border-white/30 p-6 rounded-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-[var(--moss)] rounded-full flex items-center justify-center">
                                <CheckCircle className="text-[var(--cream)] w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Strategy Drafted</h4>
                                <p className="text-white/70 text-sm">Summarizing income, custody, and expenses...</p>
                            </div>
                        </div>
                        <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
                             <div className="bg-[var(--peach)] h-full w-3/4"></div>
                        </div>
                     </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default UploadDemo;
