import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Twitter, Linkedin, Facebook, Mail, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--moss)] border-t border-black/5 pt-16 pb-8 text-[var(--cream)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/20 group-hover:bg-white/20 transition-colors">
                <Heart className="w-6 h-6 text-[var(--cream)]" />
              </div>
              <span className="text-xl font-bold text-[var(--cream)] font-display">
                FamilyBridge
              </span>
            </Link>
            <p className="text-sm text-white/70 leading-relaxed">
              A calmer way to prepare for child support court. Scan your documents, get a clear strategy, and connect with a family-law attorney when you want representation.
            </p>
            <div className="flex gap-4">
              <SocialLink href="#" icon={Twitter} />
              <SocialLink href="#" icon={Linkedin} />
              <SocialLink href="#" icon={Facebook} />
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-white font-bold mb-6">Platform</h3>
            <ul className="space-y-4">
              <FooterLink to="/about-app">About This App</FooterLink>
              <FooterLink to="/how-it-works">How It Works</FooterLink>
              <FooterLink to="/pricing">Plans</FooterLink>
              <FooterLink to="/tracker">My Plan</FooterLink>
              <FooterLink to="/upload-ticket">Scan Papers</FooterLink>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-white font-bold mb-6">Legal</h3>
            <ul className="space-y-4">
              <FooterLink to="/legal-disclaimer">Disclaimer</FooterLink>
              <FooterLink to="/legal-disclaimer">Privacy Policy</FooterLink>
              <FooterLink to="/legal-disclaimer">Terms of Service</FooterLink>
              <li className="text-xs text-white/50 pt-2 leading-relaxed">
                * FamilyBridge is not a law firm. We provide informational guidance and connect users to independent family-law attorneys.
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white font-bold mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="w-5 h-5 text-white/80 shrink-0" />
                <span>120 Peachtree St NE<br />Atlanta, GA 30303</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <Mail className="w-5 h-5 text-white/80 shrink-0" />
                <a href="mailto:support@familybridge.ai" className="hover:text-white transition-colors">support@familybridge.ai</a>
              </li>
              <li>
                <Button asChild variant="outline" size="sm" className="mt-2 border-white/20 hover:bg-white/10 text-white w-full">
                  <Link to="/contact">Contact Support</Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/60">
            © {currentYear} FamilyBridge Inc. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-white/60">
             <span>v3.0.0</span>
             <span>Status: Secure & Private</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

const FooterLink = ({ to, children }) => (
  <li>
    <Link to={to} className="text-sm text-white/70 hover:text-white transition-colors">
      {children}
    </Link>
  </li>
);

const SocialLink = ({ href, icon: Icon }) => (
  <a 
    href={href} 
    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:bg-white hover:text-[var(--moss)] transition-all"
    target="_blank"
    rel="noopener noreferrer"
  >
    <Icon className="w-4 h-4" />
  </a>
);

export default Footer;
