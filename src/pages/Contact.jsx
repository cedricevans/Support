
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    toast({
      variant: 'success',
      title: 'Message sent successfully!',
      description: 'We\'ll get back to you within 24 hours.',
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email',
      content: 'support@familybridge.ai',
      link: 'mailto:support@familybridge.ai',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '1-800-FAMILY',
      link: 'tel:1-800-326-4599',
    },
    {
      icon: MapPin,
      title: 'Address',
      content: '120 Peachtree St NE, Atlanta, GA 30303',
      link: null,
    },
    {
      icon: Clock,
      title: 'Hours',
      content: 'Mon-Fri: 9AM-6PM EST',
      link: null,
    },
  ];

  return (
    <>
      <Helmet>
        <title>Contact Us - FamilyBridge | Atlanta, GA</title>
        <meta name="description" content="Get in touch with FamilyBridge. We're here to help with child support questions and court preparation in Atlanta and Fulton County." />
      </Helmet>

      <main className="min-h-screen pt-24 pb-16 bg-[var(--cream)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[var(--ink)] mb-6 font-display">
              Get in <span className="text-[var(--rose)]">Touch</span>
            </h1>
            <p className="text-xl text-[var(--moss)] max-w-2xl mx-auto opacity-80">
              Have questions? We're here to help with your child support preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white/80 backdrop-blur-lg border border-[var(--linen)] rounded-3xl p-8 sm:p-12">
              <h2 className="text-2xl font-bold text-[var(--ink)] mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-[var(--moss)] mb-2">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white border-[var(--linen)] text-[var(--ink)] placeholder:text-[var(--moss)] placeholder:opacity-60"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-[var(--moss)] mb-2">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white border-[var(--linen)] text-[var(--ink)] placeholder:text-[var(--moss)] placeholder:opacity-60"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <Label htmlFor="subject" className="text-[var(--moss)] mb-2">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="bg-white border-[var(--linen)] text-[var(--ink)] placeholder:text-[var(--moss)] placeholder:opacity-60"
                    placeholder="How can we help?"
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-[var(--moss)] mb-2">Message</Label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full bg-white border border-[var(--linen)] text-[var(--ink)] placeholder:text-[var(--moss)] placeholder:opacity-60 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--sage)]"
                    placeholder="Tell us more about your question or concern..."
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[var(--moss)] text-[var(--cream)] hover:bg-[var(--moss)] font-bold py-4 rounded-full text-lg"
                >
                  Send Message
                </Button>
              </form>
            </div>

            <div className="space-y-6">
              <div className="rounded-3xl overflow-hidden h-48 border border-[var(--linen)] shadow-lg mb-6 relative">
                 <img 
                    className="w-full h-full object-cover" 
                    alt="City streets"
                 src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa" />
                <div className="absolute inset-0 bg-[rgba(139,177,167,0.2)]"></div>
              </div>

              <h2 className="text-2xl font-bold text-[var(--ink)] mb-6">Contact Information</h2>
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-lg border border-[var(--linen)] rounded-2xl p-6 hover:bg-white transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[rgba(139,177,167,0.2)] rounded-xl flex items-center justify-center flex-shrink-0">
                      <info.icon className="h-6 w-6 text-[var(--moss)]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-[var(--ink)] mb-1">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-[var(--moss)] hover:text-[var(--ink)] transition-colors opacity-80"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-[var(--moss)] opacity-80">{info.content}</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-r from-[rgba(139,177,167,0.2)] to-[rgba(243,179,159,0.2)] border border-[var(--linen)] rounded-2xl p-8 mt-8">
                <h3 className="text-xl font-bold text-[var(--ink)] mb-4">Quick Response Guarantee</h3>
                <p className="text-[var(--moss)] opacity-80">
                  We typically respond to all inquiries within 24 hours during business days. For urgent matters, please call our support line.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Contact;
