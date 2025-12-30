
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X, Search, Upload, BookOpen, Info, Phone, DollarSign, Lightbulb, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'Family Tips', path: '/quick-tips', icon: Lightbulb },
    { name: 'Plans', path: '/pricing', icon: DollarSign },
    { name: 'How It Works', path: '/how-it-works', icon: Info },
    { name: 'Contact', path: '/contact', icon: Phone },
  ];

  const isActive = (path) => location.pathname === path;

  // Animation variants for staggered reveal
  const menuVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.2,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: {
        duration: 0.2,
        when: "afterChildren",
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-[rgba(248,242,236,0.95)] backdrop-blur-md border-b border-[var(--linen)] shadow-sm supports-[backdrop-filter]:bg-[rgba(248,242,236,0.85)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 relative z-[101]">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group relative z-[102]" onClick={() => setIsOpen(false)}>
            <div className="bg-gradient-to-tr from-[var(--sage)] to-[var(--peach)] p-2 rounded-lg group-hover:scale-105 transition-transform shadow-[0_10px_24px_rgba(79,98,87,0.2)]">
              <Heart className="h-6 w-6 text-[var(--ink)] fill-current" />
            </div>
            <span className="text-xl font-black text-[var(--ink)] tracking-tight font-display">
              Family<span className="text-[var(--moss)]">Bridge</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-bold transition-all hover:text-[var(--moss)] hover:scale-105 flex items-center gap-2 ${
                    isActive(link.path) ? 'text-[var(--moss)]' : 'text-[var(--ink)] opacity-80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {link.name}
                </Link>
              );
            })}
            
            <Link 
              to="/resources" 
              className={`flex items-center gap-2 text-sm font-bold transition-all hover:text-[var(--moss)] hover:scale-105 ${
                isActive('/resources') ? 'text-[var(--moss)]' : 'text-[var(--ink)] opacity-80'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Resources
            </Link>

            <Link 
              to="/tracker"
              className={`flex items-center gap-2 text-sm font-bold transition-all hover:text-[var(--moss)] hover:scale-105 ${
                isActive('/tracker') ? 'text-[var(--moss)]' : 'text-[var(--ink)] opacity-80'
              }`}
            >
              <Search className="w-4 h-4" />
              My Plan
            </Link>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/upload-ticket">
              <Button className="bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)] font-bold rounded-full px-6 shadow-[0_12px_24px_rgba(79,98,87,0.25)] hover:shadow-[0_18px_32px_rgba(79,98,87,0.35)] transition-all duration-300 flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Scan Papers
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            className="lg:hidden p-2 text-[var(--ink)] hover:bg-[var(--linen)] active:bg-[var(--mist)] rounded-lg transition-colors z-[102] relative flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            type="button"
          >
            {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu-overlay"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 top-[80px] bg-[rgba(248,242,236,0.98)] backdrop-blur-xl z-[100] overflow-y-auto lg:hidden flex flex-col border-t border-[var(--linen)]"
            style={{ height: 'calc(100dvh - 80px)' }} // Use dvh for better mobile browser support
          >
            <div className="flex flex-col p-6 min-h-full">
              
              {/* Primary Actions Section */}
              <div className="grid grid-cols-1 gap-4 mb-8">
                <motion.div variants={itemVariants}>
                  <Link to="/upload-ticket" onClick={() => setIsOpen(false)} className="block">
                    <Button className="w-full bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)] font-bold rounded-xl h-14 text-base shadow-lg flex items-center justify-center gap-2.5">
                      <Upload className="w-5 h-5" />
                      Scan Your Papers
                    </Button>
                  </Link>
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <Link to="/resources" onClick={() => setIsOpen(false)} className="block">
                    <Button variant="outline" className="w-full bg-white/60 border-[var(--linen)] text-[var(--ink)] hover:bg-white hover:text-[var(--moss)] hover:border-[var(--sage)] font-bold rounded-xl h-14 text-base flex items-center justify-center gap-2.5 transition-all">
                      <BookOpen className="w-5 h-5" />
                      View Resources
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                <motion.p variants={itemVariants} className="text-[var(--moss)] text-xs font-bold uppercase tracking-wider px-4 mb-2 opacity-60">
                  Menu
                </motion.p>
                
                {/* My Case Link (Styled specially) */}
                <motion.div variants={itemVariants}>
                   <Link
                    to="/tracker"
                    onClick={() => setIsOpen(false)}
                    className={`group flex items-center justify-between p-4 rounded-xl transition-all border ${
                        isActive('/tracker') 
                        ? 'bg-[var(--mist)] border-[var(--sage)]' 
                        : 'hover:bg-white/70 border-transparent hover:border-[var(--linen)]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isActive('/tracker') ? 'bg-[var(--moss)] text-[var(--cream)]' : 'bg-[var(--mist)] text-[var(--moss)] group-hover:bg-[var(--moss)] group-hover:text-[var(--cream)]'
                      }`}>
                        <Search className="w-5 h-5" />
                      </div>
                      <span className={`text-base font-bold ${
                        isActive('/tracker') ? 'text-[var(--ink)]' : 'text-[var(--ink)] group-hover:text-[var(--moss)]'
                      }`}>My Plan</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-[var(--moss)] opacity-40 group-hover:opacity-100" />
                  </Link>
                </motion.div>

                {/* Standard Links */}
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.path);
                  
                  return (
                    <motion.div variants={itemVariants} key={link.name}>
                      <Link
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className={`group flex items-center justify-between p-4 rounded-xl transition-all border ${
                          active 
                            ? 'bg-white border-[var(--linen)]' 
                            : 'hover:bg-white/70 border-transparent hover:border-[var(--linen)]'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                            active ? 'bg-[var(--moss)] text-[var(--cream)]' : 'bg-[var(--mist)] text-[var(--moss)] group-hover:bg-[var(--moss)] group-hover:text-[var(--cream)]'
                          }`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className={`text-base font-bold transition-colors ${
                            active ? 'text-[var(--ink)]' : 'text-[var(--ink)] opacity-80 group-hover:text-[var(--moss)]'
                          }`}>
                            {link.name}
                          </span>
                        </div>
                        <ChevronRight className={`w-5 h-5 transition-colors ${
                          active ? 'text-[var(--moss)]' : 'text-[var(--moss)] opacity-40 group-hover:opacity-100'
                        }`} />
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
              
              <motion.div variants={itemVariants} className="mt-auto pt-8 pb-4 text-center">
                 <p className="text-[var(--moss)] text-xs font-medium opacity-50">© 2024 FamilyBridge</p>
              </motion.div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
