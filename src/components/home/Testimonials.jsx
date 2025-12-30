import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * Testimonials Component
 * Displays customer testimonials and reviews
 */
const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Martinez',
      role: 'Co-parent',
      rating: 5,
      text: 'FamilyBridge helped me understand what mattered before my hearing. The plan was clear and my attorney said it saved hours.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    {
      name: 'David Chen',
      role: 'Father of two',
      rating: 5,
      text: "I uploaded my paperwork and got a strategy that explained the numbers in plain language. It made court feel less intimidating.",
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    },
    {
      name: 'Jessica Williams',
      role: 'Single parent',
      rating: 5,
      text: 'The document checklist and timeline kept me organized. I felt prepared and confident walking into court.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[var(--cream)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--ink)] mb-4 font-display">
            What families <span className="text-[var(--rose)]">are saying</span>
          </h2>
          <p className="text-lg text-[var(--moss)] max-w-2xl mx-auto opacity-80">
            Calm, guided support for a stressful moment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/80 backdrop-blur-lg border border-[var(--linen)] rounded-2xl p-8 hover:bg-white transition-all duration-300"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[var(--gold)] text-[var(--gold)]" />
                ))}
              </div>
              <p className="text-[var(--moss)] mb-6 italic opacity-80">&ldquo;{testimonial.text}&rdquo;</p>
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-[var(--ink)]">{testimonial.name}</div>
                  <div className="text-sm text-[var(--moss)] opacity-70">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
